import { useCurrentFrame } from 'remotion';
import { chartMax, reveal } from './chart-utils';
import { INSIGHT_FONT, INSIGHT_TOKENS } from '../tokens';

export type DumbbellItem = { label: string; before: number; after: number; accent?: boolean };
export type DumbbellProps = { title: string; beforeLabel: string; afterLabel: string; items: DumbbellItem[]; durationInFrames: number; unit?: string };

/** Paired-value comparison for before/after changes across several business units. */
export const Dumbbell: React.FC<DumbbellProps> = ({ title, beforeLabel, afterLabel, items, durationInFrames: _durationInFrames, unit = '' }) => {
  const frame = useCurrentFrame();
  const max = chartMax(items.flatMap((item) => [item.before, item.after]));
  return <div style={{ width: 1420 }}>
    <h2 style={{ color: INSIGHT_TOKENS.text, fontFamily: INSIGHT_FONT.serif, fontSize: 52, fontWeight: 500, margin: '0 0 32px' }}>{title}</h2>
    <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 26, color: INSIGHT_TOKENS.muted, fontFamily: INSIGHT_FONT.mono, fontSize: 20, marginBottom: 14 }}><span /><span>{beforeLabel} <span style={{ float: 'right' }}>{afterLabel}</span></span></div>
    {items.map((item, index) => {
      const progress = reveal(frame, 8 + index * 14, 18);
      const before = item.before / max * 100; const after = item.before / max * 100 + (item.after / max * 100 - before) * progress;
      const color = item.accent ? INSIGHT_TOKENS.amber : INSIGHT_TOKENS.blue;
      return <div key={item.label} style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 26, alignItems: 'center', height: 82 }}>
        <span style={{ color: INSIGHT_TOKENS.text, fontFamily: INSIGHT_FONT.sans, fontSize: 28 }}>{item.label}</span>
        <div style={{ height: 4, background: INSIGHT_TOKENS.line, position: 'relative' }}>
          <div style={{ position: 'absolute', top: -2, left: `${Math.min(before, after)}%`, width: `${Math.abs(after - before)}%`, height: 8, background: color, opacity: .72 }} />
          <span style={{ position: 'absolute', left: `${before}%`, top: -12, transform: 'translateX(-50%)', width: 28, height: 28, borderRadius: 99, background: INSIGHT_TOKENS.surface, border: `3px solid ${INSIGHT_TOKENS.muted}` }} />
          <span style={{ position: 'absolute', left: `${after}%`, top: -14, transform: 'translateX(-50%)', width: 34, height: 34, borderRadius: 99, background: color }} />
          <span style={{ position: 'absolute', left: `${after}%`, top: 30, transform: 'translateX(-50%)', color: INSIGHT_TOKENS.text, fontFamily: INSIGHT_FONT.mono, fontSize: 19, whiteSpace: 'nowrap' }}>{item.before} → {item.after}{unit}</span>
        </div>
      </div>;
    })}
  </div>;
};
