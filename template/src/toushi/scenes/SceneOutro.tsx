// S5 结论（v2）：逐词点亮「订单涨28%，亏损涨200%」+ 副标（系列标移到 S6 片尾）
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from 'remotion';
import { T, FONT } from '../tokens';

const CL = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
const wordT = (f: number, start: number) => ({
  op: interpolate(f, [start, start + 12], [0, 1], { ...CL, easing: Easing.out(Easing.quad) }),
  y: interpolate(f, [start, start + 12], [16, 0], { ...CL, easing: Easing.out(Easing.quad) }),
});

export const SceneOutro: React.FC<{ duration: number }> = ({ duration }) => {
  const f = useCurrentFrame();
  const a1 = wordT(f, 8), a2 = wordT(f, 22), a3 = wordT(f, 36);
  const b1 = wordT(f, 54), b2 = wordT(f, 68), b3 = wordT(f, 82);
  const pulse = interpolate(f, [82, 90, 100], [1, 1.08, 1], { ...CL, easing: Easing.out(Easing.quad) });
  const subOp = interpolate(f, [104, 124], [0, 1], { ...CL });

  const W = (children: React.ReactNode, t: { op: number; y: number }, color: string = T.text) => (
    <span style={{ display: 'inline-block', opacity: t.op, transform: `translateY(${t.y}px)`, color }}>{children}</span>
  );

  return (
    <AbsoluteFill style={{ background: T.bg, fontFamily: FONT.sans, overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ textAlign: 'center', lineHeight: 1.35 }}>
        <div style={{ fontSize: 80, fontWeight: 700 }}>
          {W('订单涨了 ', a1)}
          {W('28%', a2, T.up)}
          {W('，', a3)}
        </div>
        <div style={{ fontSize: 80, fontWeight: 800, marginTop: 14, transform: `scale(${pulse})`, transformOrigin: 'center' }}>
          {W('亏损涨了 ', b1, T.down)}
          {W('200%', b2, T.down)}
          {W('。', b3, T.down)}
        </div>
      </div>
      <div style={{ marginTop: 52, fontSize: 42, color: T.muted, opacity: subOp, letterSpacing: '0.1em' }}>补 贴，给 错 了 人</div>
    </AbsoluteFill>
  );
};
