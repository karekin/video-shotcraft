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
const voice = process.env.GLM_TTS_VOICE ?? 'female';
const speed = Number(process.env.GLM_TTS_SPEED ?? '1');
const manifestPath = resolve(root, 'src/video-styles/business-insight/narration/segments.json');
const outputDir = resolve(root, 'public/audio/narration');

if (!apiKey) throw new Error('ZHIPU_API_KEY or ZAI_API_KEY is required. On macOS, a video-shotcraft-zhipu-api-key Keychain item is also supported.');
if (!Number.isFinite(speed) || speed <= 0) throw new Error('GLM_TTS_SPEED must be a positive number.');

const segments = JSON.parse(await readFile(manifestPath, 'utf8'));
await mkdir(outputDir, { recursive: true });

for (const [index, segment] of segments.entries()) {
  const response = await fetch('https://open.bigmodel.cn/api/paas/v4/audio/speech', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: 'glm-tts', input: segment.text, voice, speed, volume: 1, response_format: 'wav' }),
  });
  if (!response.ok) throw new Error(`GLM-TTS failed for segment ${index + 1}: HTTP ${response.status}`);
  await writeFile(resolve(outputDir, segment.audio), Buffer.from(await response.arrayBuffer()));
  console.log(`Generated ${segment.audio}`);
}
