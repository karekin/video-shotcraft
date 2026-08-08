import { useCurrentFrame } from 'remotion';
import { INSIGHT_FONT, INSIGHT_TOKENS } from '../tokens';
import { reveal } from './chart-utils';

export type SunburstRing = { label: string; segments: { label: string; value: number; color?: string; accent?: boolean }[] };
export type SunburstProps = { title: string; rings: SunburstRing[]; durationInFrames: number };

/** Concentric composition rings; use for a deliberately limited, legible hierarchy from total to sub-segments. */
export const Sunburst: React.FC<SunburstProps> = ({ title, rings, durationInFrames: _durationInFrames }) => {
  const frame = useCurrentFrame(); const cx = 750; const cy = 380; const colors = [INSIGHT_TOKENS.blue, INSIGHT_TOKENS.green, INSIGHT_TOKENS.red, '#8D7DC8', '#5D89AA'];
  const arc = (start: number, end: number, inner: number, outer: number) => { const p = (r: number, angle: number) => `${cx + r * Math.cos(angle)} ${cy + r * Math.sin(angle)}`; const large = end - start > Math.PI ? 1 : 0; return `M ${p(outer, start)} A ${outer} ${outer} 0 ${large} 1 ${p(outer, end)} L ${p(inner, end)} A ${inner} ${inner} 0 ${large} 0 ${p(inner, start)} Z`; };
  return <svg viewBox="0 0 1500 720" style={{ width: 1500, height: 720 }}><text x="90" y="58" fill={INSIGHT_TOKENS.text} fontFamily={INSIGHT_FONT.serif} fontSize="48">{title}</text>{rings.map((ring, ringIndex) => { const total = ring.segments.reduce((sum, segment) => sum + segment.value, 0) || 1; let cursor = -Math.PI / 2; const inner = 92 + ringIndex * 82; const outer = inner + 66; return ring.segments.map((segment, segmentIndex) => { const start = cursor; const end = cursor + segment.value / total * Math.PI * 2; cursor = end; const opacity = reveal(frame, 10 + ringIndex * 13 + segmentIndex * 4, 18); return <path key={`${ring.label}-${segment.label}`} d={arc(start, end, inner, outer)} fill={segment.color ?? (segment.accent ? INSIGHT_TOKENS.amber : colors[segmentIndex % colors.length])} stroke={INSIGHT_TOKENS.bg} strokeWidth="5" opacity={opacity} />; }); })}<circle cx={cx} cy={cy} r="78" fill={INSIGHT_TOKENS.surfaceElevated} /><text x={cx} y={cy - 8} textAnchor="middle" fill={INSIGHT_TOKENS.text} fontFamily={INSIGHT_FONT.sans} fontSize="23">{rings[0]?.label ?? '总量'}</text><text x={cx} y={cy + 25} textAnchor="middle" fill={INSIGHT_TOKENS.amber} fontFamily={INSIGHT_FONT.mono} fontSize="19">层级构成</text>{rings.map((ring, index) => <text key={ring.label} x="1120" y={220 + index * 52} fill={INSIGHT_TOKENS.muted} fontFamily={INSIGHT_FONT.mono} fontSize="19">{String(index + 1).padStart(2, '0')} / {ring.label}</text>)}</svg>;
};
