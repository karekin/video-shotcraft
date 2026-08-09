// S4 推演（v2）：每单 UE 恶化 + 「订单量↑ vs 每单UE↓」双线交叉图（增长幻觉）
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from 'remotion';
import { T, FONT } from '../tokens';

const CL = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

export const SceneDrill: React.FC<{ duration: number }> = ({ duration }) => {
  const f = useCurrentFrame();
  const headOp = interpolate(f, [0, 16], [0, 1], { ...CL });
  const ue = interpolate(f, [30, 80], [9.2, 17.9], { ...CL, easing: Easing.inOut(Easing.cubic) });
  const drawT = interpolate(f, [96, 176], [0, 1], { ...CL, easing: Easing.out(Easing.cubic) });
  const crossOp = interpolate(f, [150, 176], [0, 1], { ...CL });
  const conclOp = interpolate(f, [200, 226], [0, 1], { ...CL });

  return (
    <AbsoluteFill style={{ background: T.bg, fontFamily: FONT.sans, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 80, left: 0, width: 1920, textAlign: 'center', opacity: headOp }}>
        <div style={{ fontSize: 54, fontWeight: 700, color: T.text }}>单位经济，正在崩塌</div>
      </div>

      {/* UE 数字对比 */}
      <div style={{ position: 'absolute', top: 190, left: 0, width: 1920, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 70 }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 26, color: T.muted, marginBottom: 12 }}>上季度 每单 UE</div>
          <div style={{ fontFamily: FONT.mono, fontSize: 110, fontWeight: 800, color: T.muted }}>−9.2<span style={{ fontSize: 42 }}> 元</span></div>
        </div>
        <div style={{ fontSize: 70, color: T.muted }}>→</div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 26, color: T.down, marginBottom: 12 }}>本季度 每单 UE</div>
          <div style={{ fontFamily: FONT.mono, fontSize: 140, fontWeight: 800, color: T.down, textShadow: '0 0 50px rgba(255,77,94,0.3)' }}>−{ue.toFixed(1)}<span style={{ fontSize: 50 }}> 元</span></div>
        </div>
      </div>

      {/* 双线交叉图：订单量↑（绿） vs 每单UE↓（红） */}
      <div style={{ position: 'absolute', top: 540, left: 610, width: 700, opacity: interpolate(f, [88, 100], [0, 1], { ...CL }) }}>
        <svg width={700} height={260} style={{ overflow: 'visible' }}>
          {/* 基线 */}
          <line x1={0} y1={130} x2={700} y2={130} stroke={T.stroke} strokeWidth={1} />
          {/* 订单量上升（绿）：左下→右上 */}
          <path d="M0,220 L700,40" stroke={T.up} strokeWidth={5} fill="none" strokeLinecap="round" strokeDasharray={800} strokeDashoffset={800 * (1 - drawT)} />
          {/* 每单UE下降（红）：左上→右下 */}
          <path d="M0,60 L700,240" stroke={T.down} strokeWidth={5} fill="none" strokeLinecap="round" strokeDasharray={800} strokeDashoffset={800 * (1 - drawT)} />
          {/* 交叉点 */}
          <circle cx={350} cy={130} r={7} fill={T.amber} opacity={crossOp} />
        </svg>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, padding: '0 4px' }}>
          <span style={{ fontFamily: FONT.mono, fontSize: 20, color: T.up }}>▲ 订单量</span>
          <span style={{ fontFamily: FONT.mono, fontSize: 20, color: T.down }}>▼ 每单 UE</span>
        </div>
      </div>

      {/* 底部结论 */}
      <div style={{ position: 'absolute', bottom: 70, left: 0, width: 1920, textAlign: 'center', opacity: conclOp }}>
        <div style={{ fontSize: 42, fontWeight: 700, color: T.text }}>每多做一单，<span style={{ color: T.down }}>多亏 8.7 元</span></div>
      </div>
    </AbsoluteFill>
  );
};
