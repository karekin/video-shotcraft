import { Easing, interpolate, useCurrentFrame } from 'remotion';
import { INSIGHT_FONT, INSIGHT_TOKENS } from '../tokens';

export type BarRankItem = { label: string; value: number; annotation?: string; accent?: boolean };
export type BarRankProps = { items: BarRankItem[]; durationInFrames: number; title: string; valueSuffix?: string };

export const BarRank: React.FC<BarRankProps> = ({ items, durationInFrames, title, valueSuffix = '' }) => {
  const frame = useCurrentFrame();
  const maxValue = Math.max(...items.map((item) => item.value), 1);
  return (
    <div style={{ width: 1400 }}>
      <div style={{ color: INSIGHT_TOKENS.text, fontFamily: INSIGHT_FONT.serif, fontSize: 52, marginBottom: 58 }}>{title}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
        {items.map((item, index) => {
          const progress = interpolate(frame, [12 + index * 16, Math.min(durationInFrames - 6, 36 + index * 16)], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
          const color = item.accent ? INSIGHT_TOKENS.amber : INSIGHT_TOKENS.blue;
          return (
            <div key={item.label} style={{ display: 'grid', gridTemplateColumns: '220px 1fr 170px', gap: 24, alignItems: 'center' }}>
              <div style={{ color: INSIGHT_TOKENS.text, fontFamily: INSIGHT_FONT.sans, fontSize: 30 }}>{item.label}</div>
              <div style={{ height: 42, background: INSIGHT_TOKENS.surfaceElevated, overflow: 'hidden', borderRadius: 4 }}><div style={{ height: '100%', width: `${(item.value / maxValue) * 100 * progress}%`, background: color, borderRadius: 4 }} /></div>
              <div style={{ color: item.accent ? INSIGHT_TOKENS.amberSoft : INSIGHT_TOKENS.text, fontFamily: INSIGHT_FONT.mono, fontSize: 30, textAlign: 'right' }}>{item.value}{valueSuffix}{item.annotation ? ` ${item.annotation}` : ''}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
