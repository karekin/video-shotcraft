import { useCurrentFrame } from 'remotion';
import { reveal } from './chart-utils';
import { INSIGHT_FONT, INSIGHT_TOKENS } from '../tokens';

export type ScenarioPoint = { label: string; low: number; high: number; median: number };
export type ScenarioFanProps = { title: string; points: ScenarioPoint[]; durationInFrames: number; unit?: string; highlightFrom?: number };

/** Forecast range chart that keeps uncertainty visible instead of presenting a single deterministic projection. */
export const ScenarioFan: React.FC<ScenarioFanProps> = ({ title, points, durationInFrames: _durationInFrames, unit = '', highlightFrom = 0 }) => {
  const frame = useCurrentFrame(); const values = points.flatMap((point) => [point.low, point.high]); const min = Math.min(...values); const max = Math.max(...values); const x = (index: number) => 150 + index / Math.max(points.length - 1, 1) * 1180; const y = (value: number) => 600 - (value - min) / Math.max(max - min, 1) * 410;
  const low = points.map((point, index) => `${index ? 'L' : 'M'} ${x(index)} ${y(point.low)}`).join(' '); const high = [...points].reverse().map((point, reverseIndex) => `L ${x(points.length - 1 - reverseIndex)} ${y(point.high)}`).join(' '); const median = points.map((point, index) => `${index ? 'L' : 'M'} ${x(index)} ${y(point.median)}`).join(' ');
  const progress = reveal(frame, 10, 28);
  return <svg viewBox="0 0 1500 720" style={{ width: 1500, height: 720 }}><text x="90" y="58" fill={INSIGHT_TOKENS.text} fontFamily={INSIGHT_FONT.serif} fontSize="48">{title}</text><path d={`${low} ${high} Z`} fill={INSIGHT_TOKENS.blue} opacity={progress * .22} /><path d={median} fill="none" stroke={INSIGHT_TOKENS.amber} strokeWidth="6" opacity={progress} />{points.map((point, index) => <g key={point.label}><text x={x(index)} y="670" textAnchor="middle" fill={index >= highlightFrom ? INSIGHT_TOKENS.amberSoft : INSIGHT_TOKENS.muted} fontFamily={INSIGHT_FONT.mono} fontSize="18">{point.label}</text>{index === points.length - 1 ? <text x={x(index) + 16} y={y(point.median) - 12} fill={INSIGHT_TOKENS.text} fontFamily={INSIGHT_FONT.mono} fontSize="21">{point.median}{unit}</text> : null}</g>)}</svg>;
};
