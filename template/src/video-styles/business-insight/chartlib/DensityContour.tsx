import { useCurrentFrame } from 'remotion';
import { reveal } from './chart-utils';
import { INSIGHT_FONT, INSIGHT_TOKENS } from '../tokens';

export type DensityContourLevel = { cx: number; cy: number; rx: number; ry: number; label?: string; color?: string };
export type DensityContourProps = { title: string; levels: DensityContourLevel[]; durationInFrames: number; xLabel: string; yLabel: string };

/** Smoothed cluster outlines for communicating hotspots and separation in a dense two-variable field. */
export const DensityContour: React.FC<DensityContourProps> = ({ title, levels, durationInFrames: _durationInFrames, xLabel, yLabel }) => {
  const frame = useCurrentFrame();
  return <svg viewBox="0 0 1500 720" style={{ width: 1500, height: 720 }}><text x="90" y="58" fill={INSIGHT_TOKENS.text} fontFamily={INSIGHT_FONT.serif} fontSize="48">{title}</text><text x="120" y="130" fill={INSIGHT_TOKENS.muted} fontFamily={INSIGHT_FONT.mono} fontSize="18">{yLabel}</text><text x="1310" y="665" fill={INSIGHT_TOKENS.muted} fontFamily={INSIGHT_FONT.mono} fontSize="18">{xLabel}</text>{levels.map((level, index) => { const progress = reveal(frame, 8 + index * 9, 18); const cx = 180 + level.cx * 1080; const cy = 590 - level.cy * 400; const color = level.color ?? (index % 2 ? INSIGHT_TOKENS.green : INSIGHT_TOKENS.amber); return <g key={index} opacity={progress}><ellipse cx={cx} cy={cy} rx={level.rx * progress} ry={level.ry * progress} fill={color} fillOpacity=".09" stroke={color} strokeWidth="3" /><ellipse cx={cx} cy={cy} rx={level.rx * .6 * progress} ry={level.ry * .6 * progress} fill="none" stroke={color} strokeWidth="2" opacity=".7" />{level.label ? <text x={cx} y={cy} textAnchor="middle" fill={INSIGHT_TOKENS.text} fontFamily={INSIGHT_FONT.sans} fontSize="20">{level.label}</text> : null}</g>; })}</svg>;
};
