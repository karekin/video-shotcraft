import { useCurrentFrame } from 'remotion';
import { reveal } from './chart-utils';
import { INSIGHT_FONT, INSIGHT_TOKENS } from '../tokens';

export type HexbinCell = { x: number; y: number; value: number; label?: string };
export type HexbinDensityProps = { title: string; cells: HexbinCell[]; durationInFrames: number; xLabel: string; yLabel: string };

/** Aggregated two-dimensional density for datasets too crowded for individual scatter points. */
export const HexbinDensity: React.FC<HexbinDensityProps> = ({ title, cells, durationInFrames: _durationInFrames, xLabel, yLabel }) => {
  const frame = useCurrentFrame(); const max = Math.max(...cells.map((cell) => cell.value), 1);
  return <svg viewBox="0 0 1500 720" style={{ width: 1500, height: 720 }}><text x="90" y="58" fill={INSIGHT_TOKENS.text} fontFamily={INSIGHT_FONT.serif} fontSize="48">{title}</text><text x="120" y="130" fill={INSIGHT_TOKENS.muted} fontFamily={INSIGHT_FONT.mono} fontSize="18">{yLabel}</text><text x="1310" y="665" fill={INSIGHT_TOKENS.muted} fontFamily={INSIGHT_FONT.mono} fontSize="18">{xLabel}</text>{cells.map((cell, index) => { const progress = reveal(frame, 8 + index * 3, 10); const opacity = .12 + cell.value / max * .84; const cx = 180 + cell.x * 1080; const cy = 590 - cell.y * 400; return <polygon key={index} points={`${cx},${cy - 28} ${cx + 26},${cy - 14} ${cx + 26},${cy + 14} ${cx},${cy + 28} ${cx - 26},${cy + 14} ${cx - 26},${cy - 14}`} fill={INSIGHT_TOKENS.blue} opacity={opacity * progress} />; })}</svg>;
};
