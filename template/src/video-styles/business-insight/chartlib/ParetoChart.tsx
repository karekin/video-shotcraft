import { useCurrentFrame } from 'remotion';
import { chartMax, reveal } from './chart-utils';
import { INSIGHT_FONT, INSIGHT_TOKENS } from '../tokens';

export type ParetoItem = { label: string; value: number; accent?: boolean };
export type ParetoChartProps = { title: string; items: ParetoItem[]; durationInFrames: number; unit?: string };

/** Ordered contribution bars plus cumulative line for identifying the few drivers behind most impact. */
export const ParetoChart: React.FC<ParetoChartProps> = ({ title, items, durationInFrames: _durationInFrames, unit = '' }) => {
  const frame = useCurrentFrame(); const sorted = [...items].sort((a, b) => b.value - a.value); const total = sorted.reduce((sum, item) => sum + item.value, 0) || 1; const max = chartMax(sorted.map((item) => item.value)); let cumulative = 0; const points = sorted.map((item, index) => { cumulative += item.value; return { x: 150 + index / Math.max(sorted.length - 1, 1) * 1160, y: 590 - cumulative / total * 390 }; }); const progress = reveal(frame, 12, 28); const path = points.map((point, index) => `${index ? 'L' : 'M'} ${point.x} ${point.y}`).join(' ');
  return <svg viewBox="0 0 1500 720" style={{ width: 1500, height: 720 }}><text x="90" y="58" fill={INSIGHT_TOKENS.text} fontFamily={INSIGHT_FONT.serif} fontSize="48">{title}</text><line x1="110" x2="1410" y1="278" y2="278" stroke={INSIGHT_TOKENS.muted} strokeDasharray="8 8" /><text x="1415" y="274" fill={INSIGHT_TOKENS.muted} fontFamily={INSIGHT_FONT.mono} fontSize="17">80%</text>{sorted.map((item, index) => { const height = item.value / max * 320 * progress; const x = 115 + index / sorted.length * 1280; return <g key={item.label}><rect x={x} y={600 - height} width={Math.max(24, 1140 / sorted.length)} height={height} fill={item.accent ? INSIGHT_TOKENS.amber : INSIGHT_TOKENS.blue} /><text x={x + 24} y="650" textAnchor="middle" fill={INSIGHT_TOKENS.muted} fontFamily={INSIGHT_FONT.mono} fontSize="17">{item.label}</text><text x={x + 24} y={590 - height} textAnchor="middle" fill={INSIGHT_TOKENS.text} fontFamily={INSIGHT_FONT.mono} fontSize="16">{item.value}{unit}</text></g>; })}<path d={path} fill="none" stroke={INSIGHT_TOKENS.green} strokeWidth="5" opacity={progress} /></svg>;
};
