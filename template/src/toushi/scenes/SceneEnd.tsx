// S6 片尾：系列标 + 本期署名 + 下期预告 + 追更引导
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from 'remotion';
import { T, FONT, SERIES } from '../tokens';

const CL = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

export const SceneEnd: React.FC<{ duration: number }> = ({ duration }) => {
  const f = useCurrentFrame();
  const markOp = interpolate(f, [4, 24], [0, 1], { ...CL, easing: Easing.out(Easing.quad) });
  const epOp = interpolate(f, [20, 36], [0, 1], { ...CL });
  const nextOp = interpolate(f, [34, 50], [0, 1], { ...CL });
  const ctaOp = interpolate(f, [46, 62], [0, 1], { ...CL });

  return (
    <AbsoluteFill style={{ background: T.bg, fontFamily: FONT.sans, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 22 }}>
      <div style={{ fontSize: 100, fontWeight: 800, color: T.amber, letterSpacing: '0.08em', opacity: markOp, textShadow: '0 0 50px rgba(211,146,60,0.3)' }}>
        {SERIES}
      </div>
      <div style={{ fontFamily: FONT.mono, fontSize: 24, color: T.muted, letterSpacing: '0.2em', opacity: epOp }}>EP.01 · 外卖补贴越花越亏</div>

      <div style={{ marginTop: 26, padding: '20px 40px', borderRadius: 14, background: T.surface, border: `1px solid ${T.stroke}`, opacity: nextOp }}>
        <div style={{ fontFamily: FONT.mono, fontSize: 18, color: T.data, letterSpacing: '0.18em' }}>▶ 下 期 预 告</div>
        <div style={{ fontSize: 34, color: T.text, fontWeight: 600, marginTop: 8 }}>9.9 体验装，如何毁掉复购</div>
      </div>

      <div style={{ marginTop: 20, fontSize: 22, color: T.data, fontFamily: FONT.mono, letterSpacing: '0.2em', opacity: ctaOp }}>▲ 关 注 · 追 更 系 列</div>
    </AbsoluteFill>
  );
};
