import { useCurrentFrame } from 'remotion';
import { chartMax, reveal } from './chart-utils';
import { INSIGHT_FONT, INSIGHT_TOKENS } from '../tokens';

export type DivergingItem = { label: string; value: number; annotation?: string; accent?: boolean };
export type DivergingBarsProps = { title: string; items: DivergingItem[]; durationInFrames: number; unit?: string };

/** Deviation-from-zero chart for sentiment, surplus/deficit, or favorable/unfavorable movement. */
export const DivergingBars: React.FC<DivergingBarsProps> = ({ title, items, durationInFrames: _durationInFrames, unit = '' }) => {
  const frame = useCurrentFrame(); const max = chartMax(items.map((item) => Math.abs(item.value)));
  return <div style={{ width: 1420 }}><h2 style={{ color: INSIGHT_TOKENS.text, fontFamily: INSIGHT_FONT.serif, fontSize: 52, fontWeight: 500, margin: '0 0 42px' }}>{title}</h2><div style={{ position: 'relative' }}><div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, borderLeft: `2px solid ${INSIGHT_TOKENS.muted}` }} />{items.map((item, index) => { const progress = reveal(frame, 8 + index * 12, 18); const width = Math.abs(item.value) / max * 46 * progress; const positive = item.value >= 0; const color = item.accent ? INSIGHT_TOKENS.amber : positive ? INSIGHT_TOKENS.green : INSIGHT_TOKENS.red; return <div key={item.label} style={{ display: 'grid', gridTemplateColumns: '1fr 220px 1fr', height: 68, alignItems: 'center' }}><div style={{ display: 'flex', justifyContent: 'flex-end' }}>{!positive ? <div style={{ width: `${width}%`, height: 35, background: color, borderRadius: '4px 0 0 4px' }} /> : null}</div><span style={{ color: INSIGHT_TOKENS.text, fontFamily: INSIGHT_FONT.sans, fontSize: 25, textAlign: 'center' }}>{item.label}</span><div>{positive ? <div style={{ width: `${width}%`, height: 35, background: color, borderRadius: '0 4px 4px 0' }} /> : null}</div><span style={{ position: 'absolute', left: positive ? `calc(50% + ${Math.abs(item.value) / max * 46}%)` : `calc(50% - ${Math.abs(item.value) / max * 46}%)`, color, fontFamily: INSIGHT_FONT.mono, fontSize: 18, transform: 'translateX(-50%)' }}>{item.value > 0 ? '+' : ''}{item.value}{unit}</span></div>; })}</div></div>;
};
