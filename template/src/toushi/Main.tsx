// 透视商业 EP.01《外卖补贴，越花越亏》—— v2 旁白版
// 45s @ 30fps，6 段叙事弧，每段画面/旁白/字幕同段对齐。确定性渲染。
import React from 'react';
import { AbsoluteFill, Sequence, Audio, staticFile } from 'remotion';
import { SceneOpen } from './scenes/SceneOpen';
import { SceneHook } from './scenes/SceneHook';
import { SceneReveal } from './scenes/SceneReveal';
import { SceneDrill } from './scenes/SceneDrill';
import { SceneOutro } from './scenes/SceneOutro';
import { SceneEnd } from './scenes/SceneEnd';
import { T } from './tokens';

export const TOUSHI_SHOTS = {
  open: { from: 0, duration: 120 }, // 0–4s   片头
  hook: { from: 120, duration: 330 }, // 4–15s  战报 → 警示 → −2400万
  reveal: { from: 450, duration: 390 }, // 15–28s 虚荣 vs 健康
  drill: { from: 840, duration: 270 }, // 28–37s UE 崩塌
  outro: { from: 1110, duration: 150 }, // 37–42s 结论
  end: { from: 1260, duration: 90 }, // 42–45s 片尾
} as const;

export const TOUSHI_TOTAL = 1350;

// 声音设计：声明式钉帧（绝对帧）。电影系词汇 whoosh/impact/riser/sparkle/data。
const SFX: { from: number; src: string; volume: number }[] = [
  { from: 10, src: 'transition-soft.mp3', volume: 0.35 },
  // S2 战报三连入场 + 讽刺庆功
  { from: 130, src: 'swoosh-quick.mp3', volume: 0.35 },
  { from: 154, src: 'swoosh-quick.mp3', volume: 0.35 },
  { from: 178, src: 'swoosh-quick.mp3', volume: 0.35 },
  { from: 200, src: 'sparkle.mp3', volume: 0.28 },
  // 财务警示 + −2400万 砸落
  { from: 285, src: 'impact-cine.mp3', volume: 0.55 },
  { from: 320, src: 'bass-hit-short.mp3', volume: 0.5 },
  // S3 扫描揭出
  { from: 485, src: 'whoosh-fast.mp3', volume: 0.4 },
  { from: 760, src: 'sparkle.mp3', volume: 0.28 },
  // S4 UE 崩塌
  { from: 860, src: 'data-scan.mp3', volume: 0.4 },
  { from: 980, src: 'bass-hit-short.mp3', volume: 0.45 },
  { from: 1080, src: 'impact-cine.mp3', volume: 0.5 },
  // S5 结尾句式
  { from: 1160, src: 'riser-cine.mp3', volume: 0.4 },
  { from: 1220, src: 'impact-cine.mp3', volume: 0.5 },
  { from: 1232, src: 'sparkle.mp3', volume: 0.35 },
  // S6 片尾
  { from: 1270, src: 'transition-soft.mp3', volume: 0.35 },
];

export const ToushiMain: React.FC<{ bgm?: boolean }> = ({ bgm = true }) => {
  return (
    <AbsoluteFill style={{ background: T.bg }}>
      <Sequence from={TOUSHI_SHOTS.open.from} durationInFrames={TOUSHI_SHOTS.open.duration} name="S1 片头">
        <SceneOpen duration={TOUSHI_SHOTS.open.duration} />
        <Audio src={staticFile('audio/narration_1.wav')} volume={0.95} />
      </Sequence>
      <Sequence from={TOUSHI_SHOTS.hook.from} durationInFrames={TOUSHI_SHOTS.hook.duration} name="S2 钩子">
        <SceneHook duration={TOUSHI_SHOTS.hook.duration} />
        <Audio src={staticFile('audio/narration_2.wav')} volume={0.95} />
      </Sequence>
      <Sequence from={TOUSHI_SHOTS.reveal.from} durationInFrames={TOUSHI_SHOTS.reveal.duration} name="S3 反转">
        <SceneReveal duration={TOUSHI_SHOTS.reveal.duration} />
        <Audio src={staticFile('audio/narration_3.wav')} volume={0.95} />
      </Sequence>
      <Sequence from={TOUSHI_SHOTS.drill.from} durationInFrames={TOUSHI_SHOTS.drill.duration} name="S4 推演">
        <SceneDrill duration={TOUSHI_SHOTS.drill.duration} />
        <Audio src={staticFile('audio/narration_4.wav')} volume={0.95} />
      </Sequence>
      <Sequence from={TOUSHI_SHOTS.outro.from} durationInFrames={TOUSHI_SHOTS.outro.duration} name="S5 结论">
        <SceneOutro duration={TOUSHI_SHOTS.outro.duration} />
        <Audio src={staticFile('audio/narration_5.wav')} volume={0.95} />
      </Sequence>
      <Sequence from={TOUSHI_SHOTS.end.from} durationInFrames={TOUSHI_SHOTS.end.duration} name="S6 片尾">
        <SceneEnd duration={TOUSHI_SHOTS.end.duration} />
        <Audio src={staticFile('audio/narration_6.wav')} volume={0.95} />
      </Sequence>

      {/* SFX */}
      {SFX.map((s, i) => (
        <Sequence key={i} from={s.from} durationInFrames={90}>
          <Audio src={staticFile(`audio/${s.src}`)} volume={s.volume} />
        </Sequence>
      ))}

      {/* BGM 极低，不压旁白；bgm inputProp 可关 */}
      {bgm && <Audio src={staticFile('audio/bgm-tech-house.mp3')} volume={0.1} />}
    </AbsoluteFill>
  );
};
