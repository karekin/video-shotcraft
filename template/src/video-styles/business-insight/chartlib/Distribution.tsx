import { useCurrentFrame } from 'remotion';
import { chartMax, reveal } from './chart-utils';
import { INSIGHT_FONT, INSIGHT_TOKENS } from '../tokens';

export type DistributionProps = { title: string; bins: { label: string; value: number }[]; durationInFrames: number; highlightIndex?: number; unit?: string };

/** Histogram component for exposing spread and concentration rather than a misleading average. */
export const Distribution: React.FC<DistributionProps> = ({ title, bins, durationInFrames: _durationInFrames, highlightIndex, unit = '' }) => {
  const frame = useCurrentFrame();
  const max = chartMax(bins.map((bin) => bin.value));
  return <div style={{ width: 1420 }}>
    <h2 style={{ color: INSIGHT_TOKENS.text, fontFamily: INSIGHT_FONT.serif, fontSize: 52, fontWeight: 500, margin: '0 0 44px' }}>{title}</h2>
    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', height: 460, borderBottom: `1px solid ${INSIGHT_TOKENS.line}`, padding: '0 8px' }}>
      {bins.map((bin, index) => {
        const progress = reveal(frame, 8 + index * 10, 18);
        const isHighlight = index === highlightIndex;
        const height = Math.max(10, bin.value / max * 370 * progress);
        return <div key={bin.label} style={{ flex: 1, height: '100%', position: 'relative' }}>
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height, background: isHighlight ? INSIGHT_TOKENS.amber : INSIGHT_TOKENS.blue, opacity: isHighlight ? 1 : .68, borderRadius: '3px 3px 0 0' }} />
          {isHighlight ? <span style={{ position: 'absolute', bottom: height + 14, left: 0, right: 0, textAlign: 'center', color: INSIGHT_TOKENS.amberSoft, fontFamily: INSIGHT_FONT.mono, fontSize: 22 }}>{bin.value}{unit}</span> : null}
          <span style={{ position: 'absolute', bottom: -42, left: 0, right: 0, textAlign: 'center', color: INSIGHT_TOKENS.muted, fontFamily: INSIGHT_FONT.mono, fontSize: 19 }}>{bin.label}</span>
        </div>;
      })}
    </div>
  </div>;
};
