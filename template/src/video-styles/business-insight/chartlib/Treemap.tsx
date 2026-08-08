import { useCurrentFrame } from 'remotion';
import { INSIGHT_CHART_PALETTE, reveal } from './chart-utils';
import { INSIGHT_FONT, INSIGHT_TOKENS } from '../tokens';

export type TreemapTile = { label: string; value: number; color?: string; accent?: boolean };
export type TreemapProps = { title: string; tiles: TreemapTile[]; durationInFrames: number; unit?: string };

/** Proportional tiles for many named parts of a whole where hierarchy or portfolio scale matters. */
export const Treemap: React.FC<TreemapProps> = ({ title, tiles, durationInFrames: _durationInFrames, unit = '' }) => {
  const frame = useCurrentFrame(); const total = tiles.reduce((sum, tile) => sum + tile.value, 0) || 1; const columns = [tiles.filter((_, i) => i % 3 === 0), tiles.filter((_, i) => i % 3 === 1), tiles.filter((_, i) => i % 3 === 2)];
  return <div style={{ width: 1460 }}><h2 style={{ color: INSIGHT_TOKENS.text, fontFamily: INSIGHT_FONT.serif, fontSize: 52, fontWeight: 500, margin: '0 0 40px' }}>{title}</h2><div style={{ display: 'flex', height: 500, gap: 5 }}>{columns.map((column, colIndex) => { const colTotal = column.reduce((sum, tile) => sum + tile.value, 0) || 1; return <div key={colIndex} style={{ width: `${colTotal / total * 100}%`, display: 'flex', flexDirection: 'column', gap: 5 }}>{column.map((tile, index) => { const progress = reveal(frame, 8 + (colIndex * 4 + index) * 10, 16); const color = tile.color ?? (tile.accent ? INSIGHT_TOKENS.amber : INSIGHT_CHART_PALETTE[(colIndex + index) % INSIGHT_CHART_PALETTE.length]); return <div key={tile.label} style={{ height: `${tile.value / colTotal * 100 * progress}%`, minHeight: progress ? 20 : 0, background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: INSIGHT_TOKENS.bg, fontFamily: INSIGHT_FONT.sans, fontSize: 25, fontWeight: 700 }}>{progress > .5 ? `${tile.label} ${tile.value}${unit}` : ''}</div>; })}</div>; })}</div></div>;
};
