import { useCurrentFrame } from 'remotion';
import { INSIGHT_CHART_PALETTE, reveal } from './chart-utils';
import { INSIGHT_FONT, INSIGHT_TOKENS } from '../tokens';

export type ScatterPoint = { label: string; x: number; y: number; size?: number; color?: string; accent?: boolean };
export type ScatterPlotProps = { title: string; points: ScatterPoint[]; xLabel: string; yLabel: string; durationInFrames: number };

/** Relationship chart for two variables; point size may encode a third dimension. */
export const ScatterPlot: React.FC<ScatterPlotProps> = ({ title, points, xLabel, yLabel, durationInFrames: _durationInFrames }) => {
  const frame = useCurrentFrame(); const xs = points.map((point) => point.x); const ys = points.map((point) => point.y); const minX = Math.min(...xs); const maxX = Math.max(...xs); const minY = Math.min(...ys); const maxY = Math.max(...ys);
  const x = (value: number) => 180 + (value - minX) / Math.max(maxX - minX, 1) * 1120; const y = (value: number) => 580 - (value - minY) / Math.max(maxY - minY, 1) * 390;
  return <svg viewBox="0 0 1500 720" style={{ width: 1500, height: 720 }}>
    <text x="90" y="58" fill={INSIGHT_TOKENS.text} fontFamily={INSIGHT_FONT.serif} fontSize="48">{title}</text><text x="130" y="130" fill={INSIGHT_TOKENS.muted} fontFamily={INSIGHT_FONT.mono} fontSize="18">{yLabel}</text><text x="1320" y="660" fill={INSIGHT_TOKENS.muted} fontFamily={INSIGHT_FONT.mono} fontSize="18">{xLabel}</text>
    {[0, 1, 2, 3].map((i) => <line key={i} x1="180" x2="1300" y1={190 + i * 120} y2={190 + i * 120} stroke={INSIGHT_TOKENS.line} />)}
    {points.map((point, index) => { const progress = reveal(frame, 8 + index * 8, 16); const color = point.color ?? (point.accent ? INSIGHT_TOKENS.amber : INSIGHT_CHART_PALETTE[index % INSIGHT_CHART_PALETTE.length]); return <g key={point.label} opacity={progress} transform={`translate(0 ${(1 - progress) * 24})`}><circle cx={x(point.x)} cy={y(point.y)} r={(point.size ?? 15) * progress} fill={color} opacity=".85" /><text x={x(point.x) + 18} y={y(point.y) - 16} fill={INSIGHT_TOKENS.text} fontFamily={INSIGHT_FONT.sans} fontSize="20">{point.label}</text></g>; })}
  </svg>;
};
