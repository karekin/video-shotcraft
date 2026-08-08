import { useCurrentFrame } from 'remotion';
import { INSIGHT_CHART_PALETTE, reveal } from './chart-utils';
import { INSIGHT_FONT, INSIGHT_TOKENS } from '../tokens';

export type SankeyNode = { id: string; label: string; side: 'left' | 'right' };
export type SankeyLink = { from: string; to: string; value: number; color?: string };
export type SankeyFlowProps = { title: string; nodes: SankeyNode[]; links: SankeyLink[]; durationInFrames: number; unit?: string };

/** Lightweight alluvial diagram for bounded many-to-many allocation questions. */
export const SankeyFlow: React.FC<SankeyFlowProps> = ({ title, nodes, links, durationInFrames: _durationInFrames, unit = '' }) => {
  const frame = useCurrentFrame();
  const left = nodes.filter((node) => node.side === 'left'); const right = nodes.filter((node) => node.side === 'right');
  const nodeY = (index: number, count: number) => 150 + index * (470 / Math.max(count - 1, 1));
  const lookup = new Map(nodes.map((node) => [node.id, node]));
  return <svg viewBox="0 0 1500 720" style={{ width: 1500, height: 720 }}>
    <text x="60" y="58" fill={INSIGHT_TOKENS.text} fontFamily={INSIGHT_FONT.serif} fontSize="48">{title}</text>
    {links.map((link, index) => {
      const fromIndex = left.findIndex((node) => node.id === link.from); const toIndex = right.findIndex((node) => node.id === link.to);
      const progress = reveal(frame, 8 + index * 12, 20); const y1 = nodeY(fromIndex, left.length); const y2 = nodeY(toIndex, right.length);
      return <path key={`${link.from}-${link.to}`} d={`M 380 ${y1} C 680 ${y1}, 820 ${y2}, 1120 ${y2}`} fill="none" stroke={link.color ?? INSIGHT_CHART_PALETTE[index % INSIGHT_CHART_PALETTE.length]} strokeWidth={Math.max(8, link.value * .72)} opacity={progress * .68} strokeLinecap="round" />;
    })}
    {[...left, ...right].map((node) => {
      const isLeft = node.side === 'left'; const collection = isLeft ? left : right; const index = collection.findIndex((entry) => entry.id === node.id); const y = nodeY(index, collection.length); const progress = reveal(frame, 4 + index * 12, 18);
      return <g key={node.id} opacity={progress}><rect x={isLeft ? 230 : 1120} y={y - 28} width="160" height="56" rx="5" fill={INSIGHT_TOKENS.surfaceElevated} stroke={INSIGHT_TOKENS.line} /><text x={isLeft ? 310 : 1200} y={y + 7} textAnchor="middle" fill={INSIGHT_TOKENS.text} fontFamily={INSIGHT_FONT.sans} fontSize="22">{node.label}</text></g>;
    })}
    {links.map((link, index) => <text key={`value-${link.from}-${link.to}`} x="750" y={115 + index * 28} textAnchor="middle" fill={INSIGHT_TOKENS.muted} fontFamily={INSIGHT_FONT.mono} fontSize="18">{lookup.get(link.from)?.label} → {lookup.get(link.to)?.label} {link.value}{unit}</text>)}
  </svg>;
};
