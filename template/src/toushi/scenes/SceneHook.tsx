// S2 钩子（v2 配色修复版）：Q1 战报三连绿涨 + 讽刺庆功 → 红色警示条闪过（不铺满）→ 深底砸出 −2400 万
// 配色铁律：彩色不作大面积背景。−2400万 用深底 + 红字高对比。
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from 'remotion';
import { T, FONT, mulberry32 } from '../tokens';
import { DigitRoll } from '../../aifl/DigitRoll';

const CL = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

const METRICS = [
  { label: '新用户', value: '40', from: 10, color: T.up },
  { label: '日均订单', value: '28', from: 34, color: T.data },
  { label: '客单价', value: '6', from: 58, color: T.amber },
];

const CONFETTI = (() => {
  const r = mulberry32(21);
  return Array.from({ length: 70 }, () => ({
    x: r() * 1920,
    delay: r() * 40,
    fall: 240 + r() * 320,
    rot: r() * 360,
    w: 6 + r() * 8,
    ci: Math.floor(r() * 4),
  }));
})();
const CCOL = [T.up, T.data, T.amber, T.text];

export const SceneHook: React.FC<{ duration: number }> = ({ duration }) => {
  const f = useCurrentFrame();
  // 段切：A 战报 0–150 / B 红警示 150–188（闪过不残留）/ C −2400万 185–330
  const alertT = interpolate(f, [150, 160, 180, 190], [0, 1, 1, 0], { ...CL });
  const reportOp = interpolate(f, [140, 154], [1, 0], { ...CL });
  const lossOp = interpolate(f, [182, 202], [0, 1], { ...CL });
  const headOp = interpolate(f, [0, 14], [0, 1], { ...CL });

  return (
    <AbsoluteFill style={{ background: T.bg, fontFamily: FONT.sans, overflow: 'hidden' }}>
      {/* 段A：战报 */}
      <AbsoluteFill style={{ opacity: reportOp }}>
        <div style={{ position: 'absolute', top: 118, left: 0, width: 1920, textAlign: 'center', opacity: headOp }}>
          <div style={{ fontFamily: FONT.mono, fontSize: 26, color: T.muted, letterSpacing: '0.3em' }}>Q1 战报 · 业务大捷</div>
          <div style={{ marginTop: 12, fontSize: 30, color: T.up }}>群 里 几 十 朵 红 花 🎉</div>
        </div>
        <div style={{ position: 'absolute', top: 320, left: 0, width: 1920, display: 'flex', justifyContent: 'center', gap: 70 }}>
          {METRICS.map((m, i) => {
            const enter = interpolate(f, [m.from, m.from + 18], [0, 1], { ...CL, easing: Easing.out(Easing.cubic) });
            return (
              <div
                key={i}
                style={{
                  width: 380,
                  padding: '42px 0',
                  borderRadius: 18,
                  background: T.surface,
                  border: `1px solid ${T.stroke}`,
                  textAlign: 'center',
                  opacity: enter,
                  transform: `translateY(${(1 - enter) * 42}px)`,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', color: m.color }}>
                  <span style={{ fontSize: 90, fontWeight: 800 }}>+</span>
                  <DigitRoll value={m.value} delay={m.from + 6} fontSize={150} color={m.color} />
                  <span style={{ fontSize: 90, fontWeight: 800 }}>%</span>
                </div>
                <div style={{ marginTop: 18, fontSize: 32, color: T.muted }}>{m.label}</div>
              </div>
            );
          })}
        </div>
        {CONFETTI.map((c, i) => {
          const t = interpolate(f, [82 + c.delay, 82 + c.delay + 60], [0, 1], { ...CL });
          return (
            <div
              key={`c${i}`}
              style={{
                position: 'absolute',
                left: c.x,
                top: -20 + t * c.fall,
                width: c.w,
                height: c.w * 1.6,
                background: CCOL[c.ci],
                opacity: (1 - t) * 0.8,
                transform: `rotate(${c.rot + t * 360}deg)`,
              }}
            />
          );
        })}
      </AbsoluteFill>

      {/* 段B：红色警示条（顶/底，闪过不铺满）+ 极淡氛围闪 */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: 1920, height: 88, background: T.down, opacity: alertT * 0.95, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontFamily: FONT.mono, fontSize: 34, fontWeight: 700, color: '#FFFFFF', letterSpacing: '0.3em' }}>⚠ 财 务 预 警</span>
      </div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: 1920, height: 88, background: T.down, opacity: alertT * 0.95 }} />
      <AbsoluteFill style={{ background: T.down, opacity: alertT * 0.1, pointerEvents: 'none' }} />

      {/* 段C：−2400万（深底 + 红字，高对比） */}
      <AbsoluteFill style={{ opacity: lossOp, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ fontFamily: FONT.mono, fontSize: 30, color: T.down, letterSpacing: '0.3em', marginBottom: 24 }}>本 季 度 亏 损</div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', color: T.down, textShadow: '0 0 60px rgba(255,77,94,0.4)' }}>
          <span style={{ fontSize: 200, fontWeight: 800 }}>−</span>
          <DigitRoll value="2400" delay={185} fontSize={260} color={T.down} />
          <span style={{ fontSize: 110, fontWeight: 800, marginLeft: 14 }}>万</span>
        </div>
        <div style={{ marginTop: 40, display: 'flex', alignItems: 'center', gap: 30, fontSize: 40 }}>
          <span style={{ color: T.muted }}>上季度 <b style={{ color: T.text }}>−800万</b></span>
          <span style={{ color: T.muted, fontSize: 30 }}>→</span>
          <span style={{ color: T.muted }}>亏损涨了 <b style={{ color: T.down }}>200%</b></span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
