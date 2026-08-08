import { useCurrentFrame } from 'remotion';
import { INSIGHT_CHART_PALETTE, reveal } from './chart-utils';
import { INSIGHT_FONT, INSIGHT_TOKENS } from '../tokens';

export type MarimekkoColumn = { label: string; value: number; segments: { label: string; value: number; color?: string }[] };
export type MarimekkoProps = { title: string; columns: MarimekkoColumn[]; durationInFrames: number; unit?: string };

/** Variable-width stacked chart for joint market size and within-market composition. */
export const Marimekko: React.FC<MarimekkoProps> = ({ title, columns, durationInFrames: _durationInFrames, unit = '%' }) => {
  const frame = useCurrentFrame(); const total = columns.reduce((sum, column) => sum + column.value, 0) || 1;
  return <div style={{ width: 1440 }}><h2 style={{ color: INSIGHT_TOKENS.text, fontFamily: INSIGHT_FONT.serif, fontSize: 52, fontWeight: 500, margin: '0 0 42px' }}>{title}</h2><div style={{ display: 'flex', height: 500, gap: 5, borderBottom: `1px solid ${INSIGHT_TOKENS.line}`, paddingBottom: 38 }}>{columns.map((column, columnIndex) => { const columnProgress = reveal(frame, 8 + columnIndex * 12, 18); const segmentTotal = column.segments.reduce((sum, segment) => sum + segment.value, 0) || 1; return <div key={column.label} style={{ width: `${column.value / total * 100 * columnProgress}%`, minWidth: 2, height: '100%', position: 'relative', opacity: columnProgress }}><div style={{ height: '100%', display: 'flex', flexDirection: 'column-reverse', gap: 3, overflow: 'hidden' }}>{column.segments.map((segment, segmentIndex) => <div key={segment.label} style={{ height: `${segment.value / segmentTotal * 100}%`, background: segment.color ?? INSIGHT_CHART_PALETTE[segmentIndex % INSIGHT_CHART_PALETTE.length], display: 'flex', alignItems: 'center', justifyContent: 'center', color: INSIGHT_TOKENS.bg, fontFamily: INSIGHT_FONT.mono, fontSize: 19, overflow: 'hidden', whiteSpace: 'nowrap' }}>{segment.value >= 18 ? `${segment.label} ${segment.value}${unit}` : ''}</div>)}</div><span style={{ position: 'absolute', left: 0, bottom: -32, color: INSIGHT_TOKENS.muted, fontFamily: INSIGHT_FONT.mono, fontSize: 19 }}>{column.label}</span></div>; })}</div></div>;
};
