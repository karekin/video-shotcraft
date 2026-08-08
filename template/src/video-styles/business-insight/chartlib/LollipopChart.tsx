import { useCurrentFrame } from 'remotion';
import { chartMax, reveal } from './chart-utils';
import { INSIGHT_FONT, INSIGHT_TOKENS } from '../tokens';

export type LollipopItem = { label: string; value: number; accent?: boolean };
export type LollipopChartProps = { title: string; items: LollipopItem[]; durationInFrames: number; unit?: string };

/** Minimal alternative to a bar chart when ranking and value positions are the message. */
export const LollipopChart: React.FC<LollipopChartProps> = ({ title, items, durationInFrames: _durationInFrames, unit = '' }) => {
  const frame = useCurrentFrame(); const max = chartMax(items.map((item) => item.value));
  return <div style={{ width: 1420 }}><h2 style={{ color: INSIGHT_TOKENS.text, fontFamily: INSIGHT_FONT.serif, fontSize: 52, fontWeight: 500, margin: '0 0 42px' }}>{title}</h2>{items.map((item, index) => { const progress = reveal(frame, 8 + index * 12, 18); const x = item.value / max * 100 * progress; const color = item.accent ? INSIGHT_TOKENS.amber : INSIGHT_TOKENS.blue; return <div key={item.label} style={{ display: 'grid', gridTemplateColumns: '230px 1fr', alignItems: 'center', height: 74 }}><span style={{ color: INSIGHT_TOKENS.text, fontFamily: INSIGHT_FONT.sans, fontSize: 27 }}>{item.label}</span><div style={{ height: 2, background: INSIGHT_TOKENS.line, position: 'relative' }}><div style={{ width: `${x}%`, borderTop: `4px solid ${color}` }} /><span style={{ position: 'absolute', top: -15, left: `${x}%`, width: 32, height: 32, background: color, borderRadius: 99, transform: 'translateX(-50%)' }} /><span style={{ position: 'absolute', top: 28, left: `${x}%`, color: INSIGHT_TOKENS.text, fontFamily: INSIGHT_FONT.mono, fontSize: 18, transform: 'translateX(-50%)' }}>{item.value}{unit}</span></div></div>; })}</div>;
};
