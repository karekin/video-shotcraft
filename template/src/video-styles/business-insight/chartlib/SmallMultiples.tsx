import { useCurrentFrame } from 'remotion';
import { INSIGHT_CHART_PALETTE, reveal } from './chart-utils';
import { INSIGHT_FONT, INSIGHT_TOKENS } from '../tokens';

export type SmallMultiple = { label: string; values: number[]; accent?: boolean; color?: string };
export type SmallMultiplesProps = { title: string; series: SmallMultiple[]; durationInFrames: number; columns?: number; xLabels?: string[] };

/** Repeated small charts for many comparable trends without an unreadable multi-line chart. */
export const SmallMultiples: React.FC<SmallMultiplesProps> = ({ title, series, durationInFrames: _durationInFrames, columns = 3, xLabels }) => {
  const frame = useCurrentFrame();
  return <div style={{ width: 1500 }}><h2 style={{ color: INSIGHT_TOKENS.text, fontFamily: INSIGHT_FONT.serif, fontSize: 52, fontWeight: 500, margin: '0 0 30px' }}>{title}</h2><div style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: 24 }}>{series.map((item, seriesIndex) => { const progress = reveal(frame, 8 + seriesIndex * 11, 18); const min = Math.min(...item.values); const max = Math.max(...item.values); const points = item.values.map((value, index) => ({ x: 16 + index / Math.max(item.values.length - 1, 1) * 430, y: 150 - (value - min) / Math.max(max - min, 1) * 110 })); const path = points.map((point, index) => `${index ? 'L' : 'M'} ${point.x} ${point.y}`).join(' '); const color = item.color ?? (item.accent ? INSIGHT_TOKENS.amber : INSIGHT_CHART_PALETTE[seriesIndex % INSIGHT_CHART_PALETTE.length]); return <div key={item.label} style={{ padding: '22px 20px 12px', background: INSIGHT_TOKENS.surface, border: `1px solid ${INSIGHT_TOKENS.line}`, opacity: progress }}><div style={{ color: INSIGHT_TOKENS.text, fontFamily: INSIGHT_FONT.sans, fontSize: 24, marginBottom: 6 }}>{item.label}</div><svg viewBox="0 0 460 180" style={{ width: '100%', height: 180 }}><line x1="16" x2="446" y1="150" y2="150" stroke={INSIGHT_TOKENS.line} /><path d={path} fill="none" stroke={color} strokeWidth="5" strokeLinecap="round" /><text x="446" y={points[points.length - 1].y - 10} textAnchor="end" fill={color} fontFamily={INSIGHT_FONT.mono} fontSize="17">{item.values[item.values.length - 1]}</text></svg>{xLabels ? <div style={{ color: INSIGHT_TOKENS.muted, fontFamily: INSIGHT_FONT.mono, fontSize: 14 }}>{xLabels.join('  ·  ')}</div> : null}</div>; })}</div></div>;
};
