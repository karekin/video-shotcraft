import { Easing, interpolate, useCurrentFrame } from 'remotion';
import { INSIGHT_FONT, INSIGHT_TOKENS } from '../tokens';

export type FlowStep = { id: string; label: string; detail?: string };
export type FlowDiagramProps = { steps: FlowStep[]; durationInFrames: number; title?: string };

export const FlowDiagram: React.FC<FlowDiagramProps> = ({ steps, durationInFrames, title }) => {
  const frame = useCurrentFrame();
  const stepGap = Math.min(30, Math.max(14, (durationInFrames - 32) / Math.max(steps.length - 1, 1)));
  return (
    <div style={{ width: 1560 }}>
      {title ? <div style={{ color: INSIGHT_TOKENS.text, fontFamily: INSIGHT_FONT.serif, fontSize: 52, marginBottom: 82 }}>{title}</div> : null}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {steps.map((step, index) => {
          const start = index * stepGap;
          const reveal = interpolate(frame, [start, Math.min(durationInFrames - 8, start + 18)], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
          const lineStart = Math.min(durationInFrames - 12, start + 14);
          const lineReveal = interpolate(frame, [lineStart, Math.min(durationInFrames - 4, lineStart + 14)], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          return (
            <div key={step.id} style={{ display: 'flex', alignItems: 'center', flex: index === steps.length - 1 ? undefined : 1 }}>
              <div style={{ width: 250, minHeight: 164, boxSizing: 'border-box', padding: '30px 26px', background: INSIGHT_TOKENS.surface, border: `1px solid ${index === steps.length - 1 ? INSIGHT_TOKENS.amber : INSIGHT_TOKENS.line}`, borderRadius: 8, opacity: reveal, transform: `translateY(${(1 - reveal) * 30}px)` }}>
                <div style={{ color: INSIGHT_TOKENS.amber, fontFamily: INSIGHT_FONT.mono, fontSize: 18, marginBottom: 14 }}>0{index + 1}</div>
                <div style={{ color: INSIGHT_TOKENS.text, fontFamily: INSIGHT_FONT.sans, fontSize: 29, fontWeight: 650 }}>{step.label}</div>
                {step.detail ? <div style={{ color: INSIGHT_TOKENS.muted, fontFamily: INSIGHT_FONT.sans, fontSize: 20, marginTop: 12 }}>{step.detail}</div> : null}
              </div>
              {index < steps.length - 1 ? <div style={{ flex: 1, height: 2, margin: '0 16px', background: INSIGHT_TOKENS.line, position: 'relative' }}><div style={{ position: 'absolute', inset: 0, transformOrigin: 'left', transform: `scaleX(${lineReveal})`, background: INSIGHT_TOKENS.amber }} /></div> : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};
