import { useCurrentFrame } from 'remotion';
import { INSIGHT_FONT, INSIGHT_TOKENS } from '../tokens';
import { reveal } from './chart-utils';

export type ChordNode = { id: string; label: string; color?: string; accent?: boolean };
export type ChordLink = { from: string; to: string; value: number };
export type ChordDiagramProps = { title: string; nodes: ChordNode[]; links: ChordLink[]; durationInFrames: number };

/** Bidirectional, high-level category flows; keep node counts intentionally small for readability. */
export const ChordDiagram: React.FC<ChordDiagramProps> = ({ title, nodes, links, durationInFrames: _durationInFrames }) => {
  const frame = useCurrentFrame(); const cx = 750; const cy = 390; const radius = 250; const palette = [INSIGHT_TOKENS.blue, INSIGHT_TOKENS.green, INSIGHT_TOKENS.red, '#8D7DC8', '#5D89AA']; const anchor = (id: string) => { const i = nodes.findIndex((node) => node.id === id); const angle = -Math.PI / 2 + i / Math.max(nodes.length, 1) * Math.PI * 2; return { x: cx + radius * Math.cos(angle), y: cy + radius * Math.sin(angle), angle, index: i }; };
  return <svg viewBox="0 0 1500 720" style={{ width: 1500, height: 720 }}><text x="90" y="58" fill={INSIGHT_TOKENS.text} fontFamily={INSIGHT_FONT.serif} fontSize="48">{title}</text>{links.map((link, index) => { const a = anchor(link.from); const b = anchor(link.to); const color = nodes[a.index]?.color ?? palette[a.index % palette.length]; return <path key={`${link.from}-${link.to}`} d={`M ${a.x} ${a.y} Q ${cx} ${cy} ${b.x} ${b.y}`} stroke={color} strokeOpacity={reveal(frame, 8 + index * 4, 15) * .58} strokeWidth={6 + link.value * 1.7} fill="none" />; })}{nodes.map((node, index) => { const p = anchor(node.id); const progress = reveal(frame, 8 + index * 5, 16); const labelX = cx + (radius + 54) * Math.cos(p.angle); const labelY = cy + (radius + 54) * Math.sin(p.angle); const color = node.color ?? (node.accent ? INSIGHT_TOKENS.amber : palette[index % palette.length]); return <g key={node.id} opacity={progress}><circle cx={p.x} cy={p.y} r="22" fill={color} /><text x={labelX} y={labelY + 7} textAnchor="middle" fill={INSIGHT_TOKENS.text} fontFamily={INSIGHT_FONT.sans} fontSize="20">{node.label}</text></g>; })}</svg>;
};
