// S3 反转（v2）：虚荣 vs 健康，扫描揭出，每栏加注释。深底高对比。
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from 'remotion';
import { T, FONT } from '../tokens';

const CL = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
const VANITY = [{ k: '新用户数', v: '+40%' }, { k: '日均订单', v: '+28%' }, { k: '客单价', v: '+6%' }];
const HEALTH = [{ k: '每单 UE', v: '−17.9 元' }, { k: '有效 CAC', v: '+100%' }, { k: 'LTV / CAC', v: '0.57' }];

export const SceneReveal: React.FC<{ duration: number }> = ({ duration }) => {
  const f = useCurrentFrame();
  const headOp = interpolate(f, [0, 16], [0, 1], { ...CL });
  const scanX = interpolate(f, [120, 210], [300, 1760], { ...CL, easing: Easing.inOut(Easing.cubic) });
  const reveal = Math.max(0, 1760 - scanX);
  const scanOp = interpolate(f, [114, 122, 210, 222], [0, 1, 1, 0], { ...CL });
  const noteOp = interpolate(f, [226, 252], [0, 1], { ...CL });
  const conclOp = interpolate(f, [250, 278], [0, 1], { ...CL });

  return (
    <AbsoluteFill style={{ background: T.bg, fontFamily: FONT.sans, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 96, left: 0, width: 1920, textAlign: 'center', opacity: headOp }}>
        <div style={{ fontSize: 60, fontWeight: 700, color: T.text }}>两份报表，两个故事</div>
        <div style={{ marginTop: 12, fontFamily: FONT.mono, fontSize: 24, color: T.muted, letterSpacing: '0.2em' }}>虚荣指标 · vs · 健康指标</div>
      </div>

      <div style={{ position: 'absolute', top: 280, left: 160, width: 1600, display: 'flex' }}>
        {/* 左栏 虚荣 */}
        <div style={{ flex: 1, padding: '40px 50px', background: T.surface, borderRadius: '16px 0 0 16px', borderRight: `1px solid ${T.stroke}` }}>
          <div style={{ fontSize: 26, color: T.up, fontFamily: FONT.mono, letterSpacing: '0.15em', marginBottom: 30 }}>VANITY · 看起来很美</div>
          {VANITY.map((r, i) => {
            const t = interpolate(f, [24 + i * 14, 24 + i * 14 + 16], [0, 1], { ...CL, easing: Easing.out(Easing.cubic) });
            return (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 26, opacity: t, transform: `translateX(${(1 - t) * -22}px)` }}>
                <span style={{ fontSize: 34, color: T.muted }}>{r.k}</span>
                <span style={{ fontSize: 48, fontWeight: 700, color: T.up }}>▲ {r.v}</span>
              </div>
            );
          })}
          <div style={{ marginTop: 14, fontSize: 24, color: T.muted, opacity: noteOp }}>只告诉你「规模在变大」</div>
        </div>
        {/* 右栏 健康（clipPath 扫描揭出） */}
        <div style={{ flex: 1, padding: '40px 50px', background: T.surfaceHi, borderRadius: '0 16px 16px 0' }}>
          <div style={{ clipPath: `inset(0 ${reveal}px 0 0)` }}>
            <div style={{ fontSize: 26, color: T.down, fontFamily: FONT.mono, letterSpacing: '0.15em', marginBottom: 30 }}>HEALTH · 真实在流血</div>
            {HEALTH.map((r, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 26 }}>
                <span style={{ fontSize: 34, color: T.muted }}>{r.k}</span>
                <span style={{ fontSize: 48, fontWeight: 700, color: T.down }}>▼ {r.v}</span>
              </div>
            ))}
            <div style={{ marginTop: 14, fontSize: 24, color: T.muted }}>才告诉你「赚不赚钱」</div>
          </div>
        </div>
      </div>

      <div style={{ position: 'absolute', left: scanX, top: 270, width: 3, height: 460, background: T.data, boxShadow: `0 0 22px ${T.data}`, opacity: scanOp }} />

      <div style={{ position: 'absolute', bottom: 90, left: 0, width: 1920, textAlign: 'center', opacity: conclOp }}>
        <div style={{ fontSize: 42, fontWeight: 600, color: T.text }}>规模在变大，<span style={{ color: T.down }}>生意却在失血</span></div>
      </div>
    </AbsoluteFill>
  );
};
