import { useCurrentFrame } from 'remotion';
import { chartMax, INSIGHT_CHART_PALETTE, reveal } from './chart-utils';
import { INSIGHT_FONT, INSIGHT_TOKENS } from '../tokens';

export type BeeswarmGroup = { label: string; values: number[]; color?: string; accent?: boolean };
export type BeeswarmStripProps = { title: string; groups: BeeswarmGroup[]; durationInFrames: number; unit?: string };

/** Shows every observation for small-to-medium samples while avoiding dot overlap. */
export const BeeswarmStrip: React.FC<BeeswarmStripProps> = ({ title, groups, durationInFrames: _durationInFrames, unit = '' }) => {
  const frame = useCurrentFrame(); const max = chartMax(groups.flatMap((group) => group.values));
  return <div style={{ width: 1420 }}><h2 style={{ color: INSIGHT_TOKENS.text, fontFamily: INSIGHT_FONT.serif, fontSize: 52, fontWeight: 500, margin: '0 0 44px' }}>{title}</h2>{groups.map((group, groupIndex) => { const color = group.color ?? (group.accent ? INSIGHT_TOKENS.amber : INSIGHT_CHART_PALETTE[groupIndex % INSIGHT_CHART_PALETTE.length]); return <div key={group.label} style={{ display: 'grid', gridTemplateColumns: '220px 1fr', height: 100, alignItems: 'center' }}><span style={{ color: INSIGHT_TOKENS.text, fontFamily: INSIGHT_FONT.sans, fontSize: 26 }}>{group.label}</span><div style={{ height: 2, background: INSIGHT_TOKENS.line, position: 'relative' }}>{group.values.map((value, index) => { const progress = reveal(frame, 8 + (groupIndex * 8 + index) * 4, 12); const jitter = ((index * 17) % 5 - 2) * 10; return <span key={index} style={{ position: 'absolute', left: `${value / max * 100 * progress}%`, top: jitter - 9, width: 18, height: 18, borderRadius: 99, background: color, opacity: .82, transform: 'translateX(-50%)' }} />; })}<span style={{ position: 'absolute', right: 0, top: 20, color: INSIGHT_TOKENS.muted, fontFamily: INSIGHT_FONT.mono, fontSize: 16 }}>0–{max}{unit}</span></div></div>; })}</div>;
};
