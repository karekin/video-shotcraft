import { useCurrentFrame } from 'remotion';
import { chartMax, reveal } from './chart-utils';
import { INSIGHT_FONT, INSIGHT_TOKENS } from '../tokens';

export type GroupedBarGroup = { label: string; values: { label: string; value: number; color?: string }[] };
export type GroupedBarsProps = { title: string; groups: GroupedBarGroup[]; durationInFrames: number; unit?: string };

/** Side-by-side bars for direct comparisons between a small number of measures in each category. */
export const GroupedBars: React.FC<GroupedBarsProps> = ({ title, groups, durationInFrames: _durationInFrames, unit = '' }) => {
  const frame = useCurrentFrame(); const max = chartMax(groups.flatMap((group) => group.values.map((item) => item.value))); const colors = [INSIGHT_TOKENS.amber, INSIGHT_TOKENS.blue, INSIGHT_TOKENS.green, '#A78BFA'];
  return <div style={{ width: 1460 }}><h2 style={{ color: INSIGHT_TOKENS.text, fontFamily: INSIGHT_FONT.serif, fontSize: 52, fontWeight: 500, margin: '0 0 46px' }}>{title}</h2><div style={{ display: 'flex', alignItems: 'end', gap: 42, height: 460, borderBottom: `1px solid ${INSIGHT_TOKENS.line}` }}>{groups.map((group, index) => { const progress = reveal(frame, 8 + index * 12, 20); return <div key={group.label} style={{ flex: 1, display: 'flex', alignItems: 'end', justifyContent: 'center', gap: 14, height: '100%', position: 'relative' }}>{group.values.map((item, itemIndex) => { const h = item.value / max * 380 * progress; return <div key={item.label} style={{ width: 56, height: h, background: item.color ?? colors[itemIndex % colors.length], position: 'relative', borderRadius: '4px 4px 0 0' }}><span style={{ position: 'absolute', top: -30, left: 0, right: 0, textAlign: 'center', color: INSIGHT_TOKENS.text, fontFamily: INSIGHT_FONT.mono, fontSize: 18 }}>{item.value}{unit}</span></div>; })}<span style={{ position: 'absolute', bottom: -42, color: INSIGHT_TOKENS.muted, fontFamily: INSIGHT_FONT.sans, fontSize: 23 }}>{group.label}</span></div>; })}</div></div>;
};
