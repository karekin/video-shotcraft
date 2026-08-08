import { useCurrentFrame } from 'remotion';
import { INSIGHT_CHART_PALETTE, reveal } from './chart-utils';
import { INSIGHT_FONT, INSIGHT_TOKENS } from '../tokens';

export type WaffleSegment = { label: string; value: number; color?: string; accent?: boolean };
export type WaffleChartProps = { title: string; segments: WaffleSegment[]; durationInFrames: number; columns?: number; total?: number; unit?: string };

/** Unit grid for proportions when individual units make the scale easier to grasp. */
export const WaffleChart: React.FC<WaffleChartProps> = ({ title, segments, durationInFrames: _durationInFrames, columns = 10, total = 100, unit = '%' }) => {
  const frame = useCurrentFrame(); const cells = Array.from({ length: total }, (_, index) => { let boundary = 0; for (let segmentIndex = 0; segmentIndex < segments.length; segmentIndex += 1) { boundary += segments[segmentIndex].value; if (index < boundary || segmentIndex === segments.length - 1) return { segment: segments[segmentIndex], segmentIndex }; } return { segment: segments[segments.length - 1], segmentIndex: segments.length - 1 }; });
  return <div style={{ width: 1340 }}><h2 style={{ color: INSIGHT_TOKENS.text, fontFamily: INSIGHT_FONT.serif, fontSize: 52, fontWeight: 500, margin: '0 0 42px' }}>{title}</h2><div style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 48px)`, gap: 10 }}>{cells.map(({ segment, segmentIndex }, index) => { const progress = reveal(frame, 6 + index * .65, 8); const color = segment.color ?? (segment.accent ? INSIGHT_TOKENS.amber : INSIGHT_CHART_PALETTE[segmentIndex % INSIGHT_CHART_PALETTE.length]); return <span key={index} style={{ width: 48, height: 48, background: color, opacity: .12 + progress * .88, borderRadius: 3 }} />; })}</div><div style={{ display: 'flex', flexWrap: 'wrap', gap: 28, marginTop: 32 }}>{segments.map((segment, index) => <span key={segment.label} style={{ color: INSIGHT_TOKENS.muted, fontFamily: INSIGHT_FONT.sans, fontSize: 22 }}><i style={{ display: 'inline-block', width: 12, height: 12, marginRight: 9, background: segment.color ?? (segment.accent ? INSIGHT_TOKENS.amber : INSIGHT_CHART_PALETTE[index % INSIGHT_CHART_PALETTE.length]) }} />{segment.label} {segment.value}{unit}</span>)}</div></div>;
};
