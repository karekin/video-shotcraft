import { useCurrentFrame } from 'remotion';
import { chartMax, reveal } from './chart-utils';
import { INSIGHT_FONT, INSIGHT_TOKENS } from '../tokens';

export type BoxWhiskerItem = { label: string; min: number; q1: number; median: number; q3: number; max: number; outliers?: number[]; accent?: boolean };
export type BoxWhiskerProps = { title: string; items: BoxWhiskerItem[]; durationInFrames: number; unit?: string };

/** Distribution summary with median, quartiles, spread, and optional outliers. */
export const BoxWhisker: React.FC<BoxWhiskerProps> = ({ title, items, durationInFrames: _durationInFrames, unit = '' }) => {
  const frame = useCurrentFrame(); const max = chartMax(items.flatMap((item) => [item.min, item.max, ...(item.outliers ?? [])]));
  return <div style={{ width: 1440 }}><h2 style={{ color: INSIGHT_TOKENS.text, fontFamily: INSIGHT_FONT.serif, fontSize: 52, fontWeight: 500, margin: '0 0 42px' }}>{title}</h2>{items.map((item, index) => { const progress = reveal(frame, 8 + index * 14, 18); const left = (v: number) => v / max * 100 * progress; const color = item.accent ? INSIGHT_TOKENS.amber : INSIGHT_TOKENS.blue; return <div key={item.label} style={{ display: 'grid', gridTemplateColumns: '240px 1fr', alignItems: 'center', height: 82 }}><span style={{ color: INSIGHT_TOKENS.text, fontFamily: INSIGHT_FONT.sans, fontSize: 26 }}>{item.label}</span><div style={{ height: 4, background: INSIGHT_TOKENS.line, position: 'relative' }}><span style={{ position: 'absolute', left: `${left(item.min)}%`, width: `${Math.max(0, left(item.max) - left(item.min))}%`, top: -2, borderTop: `4px solid ${color}` }} /><span style={{ position: 'absolute', left: `${left(item.q1)}%`, width: `${Math.max(0, left(item.q3) - left(item.q1))}%`, top: -18, height: 36, background: color, opacity: .72 }} /><span style={{ position: 'absolute', left: `${left(item.median)}%`, top: -22, height: 44, borderLeft: `4px solid ${INSIGHT_TOKENS.text}` }} />{(item.outliers ?? []).map((outlier, outlierIndex) => <span key={outlierIndex} style={{ position: 'absolute', left: `${left(outlier)}%`, top: -7, width: 14, height: 14, borderRadius: 99, background: INSIGHT_TOKENS.red }} />)}<span style={{ position: 'absolute', left: `${left(item.median)}%`, top: 30, color: INSIGHT_TOKENS.text, fontFamily: INSIGHT_FONT.mono, fontSize: 17 }}>{item.median}{unit}</span></div></div>; })}</div>;
};
