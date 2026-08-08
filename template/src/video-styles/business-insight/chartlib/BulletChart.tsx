import { useCurrentFrame } from 'remotion';
import { chartMax, reveal } from './chart-utils';
import { INSIGHT_FONT, INSIGHT_TOKENS } from '../tokens';

export type BulletMetric = { label: string; actual: number; target: number; unit?: string; accent?: boolean };
export type BulletChartProps = { title: string; metrics: BulletMetric[]; durationInFrames: number; note?: string };

/** Actual-vs-target comparison; use for progress and operating-plan gaps. */
export const BulletChart: React.FC<BulletChartProps> = ({ title, metrics, durationInFrames: _durationInFrames, note }) => {
  const frame = useCurrentFrame();
  return <div style={{ width: 1420 }}>
    <h2 style={{ color: INSIGHT_TOKENS.text, fontFamily: INSIGHT_FONT.serif, fontSize: 52, fontWeight: 500, margin: '0 0 52px' }}>{title}</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
      {metrics.map((metric, index) => {
        const progress = reveal(frame, 8 + index * 16, 24);
        const max = chartMax([metric.actual, metric.target]);
        const color = metric.accent ? INSIGHT_TOKENS.amber : INSIGHT_TOKENS.blue;
        return <div key={metric.label} style={{ display: 'grid', gridTemplateColumns: '220px 1fr 270px', gap: 26, alignItems: 'center' }}>
          <span style={{ color: INSIGHT_TOKENS.text, fontFamily: INSIGHT_FONT.sans, fontSize: 29 }}>{metric.label}</span>
          <div style={{ height: 46, position: 'relative', background: INSIGHT_TOKENS.surfaceElevated, borderRadius: 4 }}>
            <div style={{ height: '100%', width: `${metric.actual / max * 100 * progress}%`, background: color, borderRadius: 4 }} />
            <span style={{ position: 'absolute', left: `${metric.target / max * 100}%`, top: -13, height: 72, borderLeft: `3px solid ${INSIGHT_TOKENS.text}` }} />
          </div>
          <span style={{ color: INSIGHT_TOKENS.muted, fontFamily: INSIGHT_FONT.mono, fontSize: 26, textAlign: 'right', whiteSpace: 'nowrap' }}>{metric.actual}{metric.unit ?? ''} <span style={{ color: INSIGHT_TOKENS.text }}>/ {metric.target}{metric.unit ?? ''}</span></span>
        </div>;
      })}
    </div>
    {note ? <p style={{ color: INSIGHT_TOKENS.muted, fontFamily: INSIGHT_FONT.sans, fontSize: 23, marginTop: 42 }}>{note}</p> : null}
  </div>;
};
