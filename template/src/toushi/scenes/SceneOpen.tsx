// S1 片头（v2 增强）：数据点阵 + 流线 + 系列标 materialize + 角标栏 + 本期标题
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from 'remotion';
import { T, FONT, SERIES, mulberry32 } from '../tokens';

const CL = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
const DOTS = (() => {
  const r = mulberry32(7);
  return Array.from({ length: 150 }, () => ({ x: r() * 1920, y: r() * 1080, s: 1 + r() * 2.2, op: 0.05 + r() * 0.16, d: Math.floor(r() * 36) }));
})();
const LINES = [{ y: 360, from: 'l' }, { y: 720, from: 'l' }, { y: 470, from: 'r' }, { y: 610, from: 'r' }];

export const SceneOpen: React.FC<{ duration: number }> = ({ duration }) => {
  const f = useCurrentFrame();
  const cornerOp = interpolate(f, [0, 14], [0, 1], { ...CL });
  const lineT = interpolate(f, [8, 54], [0, 1], { ...CL, easing: Easing.out(Easing.cubic) });
  const tOp = interpolate(f, [26, 62], [0, 1], { ...CL, easing: Easing.out(Easing.quad) });
  const tTrack = interpolate(f, [26, 74], [0.34, 0.08], { ...CL, easing: Easing.out(Easing.quad) });
  const tScale = interpolate(f, [26, 74], [1.14, 1], { ...CL, easing: Easing.out(Easing.quad) });
  const subOp = interpolate(f, [60, 84], [0, 1], { ...CL });
  const epOp = interpolate(f, [70, 92], [0, 1], { ...CL });

  return (
    <AbsoluteFill style={{ background: T.bg, fontFamily: FONT.sans, overflow: 'hidden' }}>
      {DOTS.map((d, i) => {
        const op = d.op * interpolate(f, [d.d, d.d + 30], [0, 1], { ...CL });
        return <div key={i} style={{ position: 'absolute', left: d.x, top: d.y, width: d.s, height: d.s, borderRadius: '50%', background: T.data, opacity: op }} />;
      })}
      {LINES.map((ln, i) => {
        const w = 620 * lineT;
        const x = ln.from === 'l' ? 960 - w - 40 : 960 + 40;
        return <div key={`l${i}`} style={{ position: 'absolute', left: x, top: ln.y, width: w, height: 1, background: `linear-gradient(${ln.from === 'l' ? '90deg' : '270deg'}, ${T.data}, transparent)`, opacity: 0.55 * lineT }} />;
      })}

      {/* 角标栏 */}
      <div style={{ position: 'absolute', top: 56, left: 80, right: 80, display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: cornerOp }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ width: 10, height: 10, background: T.amber, display: 'inline-block' }} />
          <span style={{ fontFamily: FONT.mono, fontSize: 22, color: T.muted, letterSpacing: '0.2em' }}>{SERIES} · 商业分析系列</span>
        </div>
        <span style={{ fontFamily: FONT.mono, fontSize: 22, color: T.down, fontWeight: 700, letterSpacing: '0.15em' }}>EP.01</span>
      </div>

      {/* 系列标 + 副标 + 本期标题 */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 28 }}>
        <div style={{ fontSize: 168, fontWeight: 800, color: T.amber, letterSpacing: `${tTrack}em`, opacity: tOp, transform: `scale(${tScale})`, textShadow: '0 0 70px rgba(211,146,60,0.28)' }}>{SERIES}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, opacity: subOp }}>
          <span style={{ width: 44, height: 2, background: T.muted }} />
          <span style={{ fontFamily: FONT.mono, fontSize: 30, color: T.muted, letterSpacing: '0.2em' }}>用数据看穿生意的真相</span>
          <span style={{ width: 44, height: 2, background: T.muted }} />
        </div>
        <div style={{ marginTop: 14, fontSize: 46, color: T.text, fontWeight: 600, opacity: epOp }}>外卖补贴，越花越亏</div>
      </div>
    </AbsoluteFill>
  );
};
