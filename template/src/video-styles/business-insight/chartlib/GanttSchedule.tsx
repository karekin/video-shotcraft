import { useCurrentFrame } from 'remotion';
import { INSIGHT_FONT, INSIGHT_TOKENS } from '../tokens';
import { reveal } from './chart-utils';

export type GanttTask = { label: string; start: number; end: number; progress?: number; group?: string; accent?: boolean };
export type GanttScheduleProps = { title: string; periods: string[]; tasks: GanttTask[]; durationInFrames: number };

/** Interval workplan for launches, capacity, and projects; start/end are normalized to the supplied period range. */
export const GanttSchedule: React.FC<GanttScheduleProps> = ({ title, periods, tasks, durationInFrames: _durationInFrames }) => {
  const frame = useCurrentFrame(); const left = 330; const width = 1010; const scale = (value: number) => left + value / Math.max(periods.length - 1, 1) * width;
  return <svg viewBox="0 0 1500 720" style={{ width: 1500, height: 720 }}><text x="90" y="58" fill={INSIGHT_TOKENS.text} fontFamily={INSIGHT_FONT.serif} fontSize="48">{title}</text>{periods.map((period, index) => <g key={period}><line x1={scale(index)} y1="130" x2={scale(index)} y2="640" stroke={INSIGHT_TOKENS.line} strokeWidth="2" /><text x={scale(index)} y="112" textAnchor="middle" fill={INSIGHT_TOKENS.muted} fontFamily={INSIGHT_FONT.mono} fontSize="18">{period}</text></g>)}{tasks.map((task, index) => { const y = 170 + index * 94; const progress = reveal(frame, 8 + index * 10, 17); const x = scale(task.start); const w = Math.max(12, (scale(task.end) - x) * progress); const fill = task.accent ? INSIGHT_TOKENS.amber : INSIGHT_TOKENS.blue; return <g key={task.label}><text x="290" y={y + 28} textAnchor="end" fill={INSIGHT_TOKENS.text} fontFamily={INSIGHT_FONT.sans} fontSize="22">{task.label}</text>{task.group && <text x="96" y={y + 28} fill={INSIGHT_TOKENS.muted} fontFamily={INSIGHT_FONT.mono} fontSize="15">{task.group}</text>}<rect x={x} y={y} width={w} height="44" rx="5" fill={fill} opacity=".8" />{task.progress !== undefined && <rect x={x} y={y} width={w * Math.min(task.progress, 1)} height="44" rx="5" fill={INSIGHT_TOKENS.text} opacity=".28" />}</g>; })}</svg>;
};
