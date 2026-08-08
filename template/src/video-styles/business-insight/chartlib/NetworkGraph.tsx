import { useCurrentFrame } from 'remotion';
import { INSIGHT_FONT, INSIGHT_TOKENS } from '../tokens';
import { reveal } from './chart-utils';

export type NetworkNode = { id: string; label: string; x: number; y: number; size?: number; accent?: boolean };
export type NetworkLink = { from: string; to: string; value?: number };
export type NetworkGraphProps = { title: string; nodes: NetworkNode[]; links: NetworkLink[]; durationInFrames: number };

/** Explicitly positioned network for partnerships, supply dependence, and entity relationships. */
export const NetworkGraph: React.FC<NetworkGraphProps> = ({ title, nodes, links, durationInFrames: _durationInFrames }) => {
  const frame = useCurrentFrame(); const point = (node: NetworkNode) => ({ x: 160 + node.x * 1180, y: 145 + node.y * 470 });
  return <svg viewBox="0 0 1500 720" style={{ width: 1500, height: 720 }}><text x="90" y="58" fill={INSIGHT_TOKENS.text} fontFamily={INSIGHT_FONT.serif} fontSize="48">{title}</text>{links.map((link, index) => { const from = nodes.find((node) => node.id === link.from); const to = nodes.find((node) => node.id === link.to); if (!from || !to) return null; const a = point(from); const b = point(to); return <line key={`${link.from}-${link.to}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={INSIGHT_TOKENS.blue} strokeOpacity={reveal(frame, 4 + index * 3, 14) * .58} strokeWidth={2 + (link.value ?? 1) * .7} />; })}{nodes.map((node, index) => { const p = point(node); const progress = reveal(frame, 14 + index * 5, 16); const r = (node.size ?? 1) * 18 + 15; return <g key={node.id} opacity={progress}><circle cx={p.x} cy={p.y} r={r} fill={node.accent ? INSIGHT_TOKENS.amber : INSIGHT_TOKENS.surfaceElevated} stroke={node.accent ? INSIGHT_TOKENS.amberSoft : INSIGHT_TOKENS.blue} strokeWidth="3" /><text x={p.x} y={p.y + 6} textAnchor="middle" fill={node.accent ? INSIGHT_TOKENS.bg : INSIGHT_TOKENS.text} fontFamily={INSIGHT_FONT.sans} fontSize="17">{node.label}</text></g>; })}</svg>;
};
