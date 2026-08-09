import { execFileSync } from 'node:child_process';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const readMacOsKeychain = () => {
  if (process.platform !== 'darwin') return undefined;

  try {
    return execFileSync(
      'security',
      ['find-generic-password', '-a', process.env.USER ?? '', '-s', 'video-shotcraft-zhipu-api-key', '-w'],
      { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] },
    ).trim() || undefined;
  } catch {
    return undefined;
  }
};

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const apiKey = process.env.ZHIPU_API_KEY ?? process.env.ZAI_API_KEY ?? readMacOsKeychain();
const voice = process.env.GLM_TTS_VOICE ?? 'xiaochen';
const speed = Number(process.env.GLM_TTS_SPEED ?? '0.92');
const manifestPath = resolve(root, 'src/video-styles/business-insight/narration/segments.json');
const outputDir = resolve(root, 'public/audio/narration');
const fps = 30;
const handoffFrames = 6;
const finalHoldFrames = 18;
const syncOnly = process.argv.includes('--sync-only');

const getWavDurationInFrames = (audio, index) => {
  if (audio.toString('ascii', 0, 4) !== 'RIFF' || audio.toString('ascii', 8, 12) !== 'WAVE') {
    throw new Error(`GLM-TTS returned an invalid WAV file for segment ${index + 1}.`);
  }

  let offset = 12;
  let byteRate;
  let dataLength;
  while (offset + 8 <= audio.length) {
    const chunkId = audio.toString('ascii', offset, offset + 4);
    const chunkLength = audio.readUInt32LE(offset + 4);
    const chunkDataOffset = offset + 8;
    if (chunkDataOffset + chunkLength > audio.length) break;

    if (chunkId === 'fmt ' && chunkLength >= 12) byteRate = audio.readUInt32LE(chunkDataOffset + 8);
    if (chunkId === 'data') {
      dataLength = chunkLength;
      break;
    }
    offset = chunkDataOffset + chunkLength + (chunkLength % 2);
  }

  if (!byteRate || !dataLength) throw new Error(`GLM-TTS returned an empty WAV file for segment ${index + 1}.`);
  return Math.ceil((dataLength / byteRate) * fps);
};

const segments = JSON.parse(await readFile(manifestPath, 'utf8'));
const generatedSegments = [];

if (syncOnly) {
  for (const [index, segment] of segments.entries()) {
    const audio = await readFile(resolve(outputDir, segment.audio));
    generatedSegments.push({ ...segment, audioDurationInFrames: getWavDurationInFrames(audio, index) });
  }
} else {
  if (!apiKey) throw new Error('ZHIPU_API_KEY or ZAI_API_KEY is required. On macOS, a video-shotcraft-zhipu-api-key Keychain item is also supported.');
  if (!Number.isFinite(speed) || speed <= 0) throw new Error('GLM_TTS_SPEED must be a positive number.');
  await mkdir(outputDir, { recursive: true });

  for (const [index, segment] of segments.entries()) {
    const response = await fetch('https://open.bigmodel.cn/api/paas/v4/audio/speech', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: 'glm-tts', input: segment.text, voice, speed, volume: 1, response_format: 'wav' }),
    });
    if (!response.ok) throw new Error(`GLM-TTS failed for segment ${index + 1}: HTTP ${response.status}`);
    const audio = Buffer.from(await response.arrayBuffer());
    await writeFile(resolve(outputDir, segment.audio), audio);
    generatedSegments.push({ ...segment, audioDurationInFrames: getWavDurationInFrames(audio, index) });
    console.log(`Generated ${segment.audio}`);
  }
}

let from = 0;
const timedSegments = generatedSegments.map((segment, index) => {
  const duration = segment.audioDurationInFrames + (index === generatedSegments.length - 1 ? finalHoldFrames : handoffFrames);
  const timedSegment = { ...segment, from, duration };
  from += duration;
  return timedSegment;
});

await writeFile(manifestPath, `${JSON.stringify(timedSegments, null, 2)}\n`);
console.log(`Synced narration timing: ${from} frames / ${(from / fps).toFixed(1)} seconds`);
