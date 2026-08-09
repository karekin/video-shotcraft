import { useCurrentFrame } from 'remotion';
import { chartMax, reveal } from './chart-utils';
import { INSIGHT_FONT, INSIGHT_TOKENS } from '../tokens';

export type WaterfallStep = { label: string; value: number; kind?: 'total' | 'positive' | 'negative' };
export type WaterfallProps = { title: string; steps: WaterfallStep[]; durationInFrames: number; unit?: string };

/** Bridge chart for explaining how a starting metric becomes an ending metric. */
export const Waterfall: React.FC<WaterfallProps> = ({ title, steps, durationInFrames: _durationInFrames, unit = '' }) => {
  const frame = useCurrentFrame();
  let running = 0;
  const entries = steps.map((step) => {
    const before = running;
    if (step.kind === 'total') running = step.value;
    else running += step.value;
    return { ...step, before, after: running, isTotal: step.kind === 'total' };
  });
  const max = chartMax(entries.flatMap((entry) => [entry.before, entry.after, 0]));
  const chartHeight = 360;
  return <div style={{ width: 1480 }}>
    <h2 style={{ color: INSIGHT_TOKENS.text, fontFamily: INSIGHT_FONT.serif, fontSize: 52, fontWeight: 500, margin: '0 0 54px' }}>{title}</h2>
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 26, height: 440, borderBottom: `1px solid ${INSIGHT_TOKENS.line}`, padding: '0 12px' }}>
      {entries.map((step, index) => {
        const progress = reveal(frame, index * 16 + 4, 22);
        const height = Math.max(18, Math.abs(step.after - (step.isTotal ? 0 : step.before)) / max * chartHeight * progress);
        const bottom = (step.isTotal ? 0 : Math.min(step.before, step.after)) / max * chartHeight;
        const color = step.isTotal ? INSIGHT_TOKENS.amber : step.value >= 0 ? INSIGHT_TOKENS.green : INSIGHT_TOKENS.red;
        return <div key={step.label} style={{ flex: 1, height: '100%', position: 'relative' }}>
          <div style={{ position: 'absolute', left: 10, right: 10, bottom, height, background: color, borderRadius: '4px 4px 0 0' }} />
          {index < entries.length - 1 ? <span style={{ position: 'absolute', left: '50%', right: '-50%', bottom: step.after / max * chartHeight, borderTop: `1px dashed ${INSIGHT_TOKENS.muted}`, opacity: .55 }} /> : null}
          <span style={{ position: 'absolute', bottom: Math.max(0, bottom + height + 12), left: 0, right: 0, textAlign: 'center', color: INSIGHT_TOKENS.text, fontFamily: INSIGHT_FONT.mono, fontSize: 24 }}>{step.isTotal ? step.after : `${step.value > 0 ? '+' : ''}${step.value}`}{unit}</span>
          <span style={{ position: 'absolute', bottom: -48, left: 0, right: 0, textAlign: 'center', color: INSIGHT_TOKENS.muted, fontFamily: INSIGHT_FONT.sans, fontSize: 22 }}>{step.label}</span>
        </div>;
      })}
    </div>
  </div>;
};
