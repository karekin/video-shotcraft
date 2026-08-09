import { useCurrentFrame } from 'remotion';
import { INSIGHT_CHART_PALETTE, reveal } from './chart-utils';
import { INSIGHT_FONT, INSIGHT_TOKENS } from '../tokens';

export type IndexedSeries = { label: string; values: number[]; color?: string; accent?: boolean };
export type IndexedLineProps = { title: string; xLabels: string[]; series: IndexedSeries[]; durationInFrames: number; base?: number };

/** Normalizes several series to a shared start point, for comparable relative performance. */
export const IndexedLine: React.FC<IndexedLineProps> = ({ title, xLabels, series, durationInFrames: _durationInFrames, base = 100 }) => {
  const frame = useCurrentFrame();
  const indexed = series.map((item) => item.values.map((value) => value / Math.max(item.values[0], 1) * base));
  const all = indexed.flat(); const min = Math.min(...all); const max = Math.max(...all); const toY = (value: number) => 600 - (value - min) / Math.max(max - min, 1) * 410;
  const toX = (index: number) => 120 + index / Math.max(xLabels.length - 1, 1) * 1260;
  return <svg viewBox="0 0 1500 720" style={{ width: 1500, height: 720 }}>
    <text x="90" y="58" fill={INSIGHT_TOKENS.text} fontFamily={INSIGHT_FONT.serif} fontSize="48">{title}</text>
    <line x1="110" x2="1410" y1={toY(base)} y2={toY(base)} stroke={INSIGHT_TOKENS.muted} strokeDasharray="8 8" opacity=".6" />
    <text x="112" y={toY(base) - 10} fill={INSIGHT_TOKENS.muted} fontFamily={INSIGHT_FONT.mono} fontSize="18">基期 {base}</text>
    {series.map((item, seriesIndex) => {
      const progress = reveal(frame, 10 + seriesIndex * 14, 28); const values = indexed[seriesIndex]; const color = item.color ?? (item.accent ? INSIGHT_TOKENS.amber : INSIGHT_CHART_PALETTE[seriesIndex % INSIGHT_CHART_PALETTE.length]);
      const path = values.map((value, index) => `${index ? 'L' : 'M'} ${toX(index)} ${toY(value)}`).join(' ');
      const last = values[values.length - 1];
      return <g key={item.label} opacity={progress}><path d={path} fill="none" stroke={color} strokeWidth={item.accent ? 7 : 4} strokeLinecap="round" /><text x="1418" y={toY(last) + 7} fill={color} fontFamily={INSIGHT_FONT.sans} fontSize="22">{item.label} {last.toFixed(0)}</text></g>;
    })}
    {xLabels.map((label, index) => <text key={label} x={toX(index)} y="668" textAnchor="middle" fill={INSIGHT_TOKENS.muted} fontFamily={INSIGHT_FONT.mono} fontSize="18">{label}</text>)}
  </svg>;
};
