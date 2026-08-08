import { useCurrentFrame } from 'remotion';
import { chartMax, reveal } from './chart-utils';
import { INSIGHT_FONT, INSIGHT_TOKENS } from '../tokens';

export type RangeBandItem = { label: string; low: number; high: number; actual?: number; accent?: boolean };
export type RangeBandProps = { title: string; items: RangeBandItem[]; durationInFrames: number; unit?: string };

/** Benchmark range chart for showing an observed value against a plausible or peer range. */
export const RangeBand: React.FC<RangeBandProps> = ({ title, items, durationInFrames: _durationInFrames, unit = '' }) => {
  const frame = useCurrentFrame();
  const max = chartMax(items.flatMap((item) => [item.low, item.high, item.actual ?? 0]));
  return <div style={{ width: 1420 }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', margin: '0 0 54px' }}>
      <h2 style={{ color: INSIGHT_TOKENS.text, fontFamily: INSIGHT_FONT.serif, fontSize: 52, fontWeight: 500, margin: 0 }}>{title}</h2>
      <div style={{ color: INSIGHT_TOKENS.muted, fontFamily: INSIGHT_FONT.mono, fontSize: 17 }}>色带：行业区间　○：当前值</div>
    </div>
    {items.map((item, index) => {
      const progress = reveal(frame, 8 + index * 15, 20);
      const left = item.low / max * 100; const width = (item.high - item.low) / max * 100 * progress;
      const actualColor = item.actual !== undefined && (item.actual < item.low || item.actual > item.high) ? INSIGHT_TOKENS.red : INSIGHT_TOKENS.amber;
      return <div key={item.label} style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 28, alignItems: 'center', height: 94 }}>
        <div style={{ color: INSIGHT_TOKENS.text, fontFamily: INSIGHT_FONT.sans, fontSize: 28 }}>{item.label}</div>
        <div style={{ height: 3, background: INSIGHT_TOKENS.line, position: 'relative' }}>
          <div style={{ position: 'absolute', top: -7, left: `${left}%`, width: `${width}%`, height: 16, borderRadius: 99, background: item.accent ? INSIGHT_TOKENS.amber : INSIGHT_TOKENS.blue, opacity: .9 }} />
          {item.actual !== undefined ? <><div style={{ position: 'absolute', top: -9, left: `${item.actual / max * 100}%`, width: 14, height: 14, borderRadius: 99, background: INSIGHT_TOKENS.bg, border: `3px solid ${actualColor}`, boxSizing: 'border-box', transform: 'translateX(-50%)' }} /><div style={{ position: 'absolute', top: 24, left: `${item.actual / max * 100}%`, color: actualColor, fontFamily: INSIGHT_FONT.mono, fontSize: 21, transform: 'translateX(-50%)' }}>{item.actual}{unit}</div></> : null}
          <span style={{ position: 'absolute', top: -48, left: `${left}%`, color: INSIGHT_TOKENS.muted, fontFamily: INSIGHT_FONT.mono, fontSize: 19 }}>{item.low}{unit}</span>
          <span style={{ position: 'absolute', top: -48, left: `${item.high / max * 100}%`, color: INSIGHT_TOKENS.muted, fontFamily: INSIGHT_FONT.mono, fontSize: 19, transform: 'translateX(-100%)' }}>{item.high}{unit}</span>
        </div>
      </div>;
    })}
  </div>;
};
