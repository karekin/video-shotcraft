import { useCurrentFrame } from 'remotion';
import { INSIGHT_CHART_PALETTE, reveal } from './chart-utils';
import { INSIGHT_FONT, INSIGHT_TOKENS } from '../tokens';

export type BumpSeries = { label: string; ranks: number[]; color?: string; accent?: boolean };
export type BumpChartProps = { title: string; xLabels: string[]; series: BumpSeries[]; durationInFrames: number; maxRank?: number };

/** Rank-over-time component. Use when order, not absolute value, is the story. */
export const BumpChart: React.FC<BumpChartProps> = ({ title, xLabels, series, durationInFrames: _durationInFrames, maxRank }) => {
  const frame = useCurrentFrame();
  const rankMax = maxRank ?? Math.max(...series.flatMap((item) => item.ranks)); const x = (i: number) => 170 + i / Math.max(xLabels.length - 1, 1) * 1120; const y = (rank: number) => 160 + (rank - 1) / Math.max(rankMax - 1, 1) * 420;
  return <svg viewBox="0 0 1500 720" style={{ width: 1500, height: 720 }}>
    <text x="90" y="58" fill={INSIGHT_TOKENS.text} fontFamily={INSIGHT_FONT.serif} fontSize="48">{title}</text>
    {Array.from({ length: rankMax }, (_, index) => <g key={index}><line x1="150" x2="1340" y1={y(index + 1)} y2={y(index + 1)} stroke={INSIGHT_TOKENS.line} /><text x="128" y={y(index + 1) + 7} textAnchor="end" fill={INSIGHT_TOKENS.muted} fontFamily={INSIGHT_FONT.mono} fontSize="18">#{index + 1}</text></g>)}
    {series.map((item, seriesIndex) => { const progress = reveal(frame, 8 + seriesIndex * 12, 24); const color = item.color ?? (item.accent ? INSIGHT_TOKENS.amber : INSIGHT_CHART_PALETTE[seriesIndex % INSIGHT_CHART_PALETTE.length]); const path = item.ranks.map((rank, index) => `${index ? 'L' : 'M'} ${x(index)} ${y(rank)}`).join(' '); const last = item.ranks[item.ranks.length - 1]; return <g key={item.label} opacity={progress}><path d={path} fill="none" stroke={color} strokeWidth={item.accent ? 7 : 4} /><text x="1360" y={y(last) + 8} fill={color} fontFamily={INSIGHT_FONT.sans} fontSize="21">{item.label}</text></g>; })}
    {xLabels.map((label, index) => <text key={label} x={x(index)} y="660" textAnchor="middle" fill={INSIGHT_TOKENS.muted} fontFamily={INSIGHT_FONT.mono} fontSize="18">{label}</text>)}
  </svg>;
};
