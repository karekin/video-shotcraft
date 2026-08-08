import { useCurrentFrame } from 'remotion';
import { chartMax, reveal } from './chart-utils';
import { INSIGHT_FONT, INSIGHT_TOKENS } from '../tokens';

export type HistogramBin = { from: number; to: number; count: number; highlight?: boolean };
export type HistogramProps = { title: string; bins: HistogramBin[]; durationInFrames: number; unit?: string };

/** Continuous-value histogram; bins are numeric intervals rather than unrelated categories. */
export const Histogram: React.FC<HistogramProps> = ({ title, bins, durationInFrames: _durationInFrames, unit = '' }) => {
  const frame = useCurrentFrame(); const max = chartMax(bins.map((bin) => bin.count));
  return <div style={{ width: 1460 }}><h2 style={{ color: INSIGHT_TOKENS.text, fontFamily: INSIGHT_FONT.serif, fontSize: 52, fontWeight: 500, margin: '0 0 40px' }}>{title}</h2><div style={{ display: 'flex', alignItems: 'end', height: 460, borderBottom: `1px solid ${INSIGHT_TOKENS.line}` }}>{bins.map((bin, index) => { const progress = reveal(frame, 8 + index * 8, 16); const h = bin.count / max * 380 * progress; return <div key={`${bin.from}-${bin.to}`} style={{ flex: 1, height: '100%', position: 'relative' }}><div style={{ position: 'absolute', bottom: 0, left: 1, right: 1, height: h, background: bin.highlight ? INSIGHT_TOKENS.amber : INSIGHT_TOKENS.blue, opacity: bin.highlight ? 1 : .72 }} /><span style={{ position: 'absolute', bottom: h + 10, left: 0, right: 0, textAlign: 'center', color: INSIGHT_TOKENS.text, fontFamily: INSIGHT_FONT.mono, fontSize: 17 }}>{bin.count}</span><span style={{ position: 'absolute', bottom: -38, left: 0, right: 0, textAlign: 'center', color: INSIGHT_TOKENS.muted, fontFamily: INSIGHT_FONT.mono, fontSize: 15 }}>{bin.from}–{bin.to}{unit}</span></div>; })}</div></div>;
};
