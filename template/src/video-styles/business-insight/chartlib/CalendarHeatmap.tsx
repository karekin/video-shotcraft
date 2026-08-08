import { useCurrentFrame } from 'remotion';
import { INSIGHT_FONT, INSIGHT_TOKENS } from '../tokens';
import { reveal } from './chart-utils';

export type CalendarHeatCell = { label: string; week: number; day: number; value: number };
export type CalendarHeatmapProps = { title: string; cells: CalendarHeatCell[]; weeks: number; dayLabels?: string[]; durationInFrames: number };

/** Day-level activity grid that exposes weekly rhythm and abnormal dates without a faux geographic map. */
export const CalendarHeatmap: React.FC<CalendarHeatmapProps> = ({ title, cells, weeks, dayLabels = ['一', '二', '三', '四', '五', '六', '日'], durationInFrames: _durationInFrames }) => {
  const frame = useCurrentFrame(); const max = Math.max(...cells.map((cell) => cell.value), 1); const cellW = 1040 / Math.max(weeks, 1); const cellH = 58; const left = 280; const top = 170;
  const shade = (value: number) => { const alpha = .13 + value / max * .8; return `rgba(201, 153, 66, ${alpha})`; };
  return <svg viewBox="0 0 1500 720" style={{ width: 1500, height: 720 }}><text x="90" y="58" fill={INSIGHT_TOKENS.text} fontFamily={INSIGHT_FONT.serif} fontSize="48">{title}</text>{dayLabels.map((label, index) => <text key={label} x="250" y={top + index * cellH + 34} textAnchor="end" fill={INSIGHT_TOKENS.muted} fontFamily={INSIGHT_FONT.mono} fontSize="18">{label}</text>)}{cells.map((cell, index) => <g key={cell.label} opacity={reveal(frame, 5 + index * 1.5, 11)}><rect x={left + cell.week * cellW} y={top + cell.day * cellH} width={cellW - 7} height={cellH - 7} rx="4" fill={shade(cell.value)} /><title>{cell.label}: {cell.value}</title></g>)}<text x={left} y="650" fill={INSIGHT_TOKENS.muted} fontFamily={INSIGHT_FONT.mono} fontSize="17">低</text><rect x={left + 42} y="635" width="160" height="16" fill="url(#heat-scale)" /><text x={left + 215} y="650" fill={INSIGHT_TOKENS.muted} fontFamily={INSIGHT_FONT.mono} fontSize="17">高</text><defs><linearGradient id="heat-scale"><stop stopColor="rgba(201, 153, 66, .13)" /><stop offset="1" stopColor="rgba(201, 153, 66, .93)" /></linearGradient></defs></svg>;
};
