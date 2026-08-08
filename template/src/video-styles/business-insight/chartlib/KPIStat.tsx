import { interpolate, useCurrentFrame } from 'remotion';
import { DigitRoll } from '../../../aifl/DigitRoll';
import { INSIGHT_FONT, INSIGHT_TOKENS } from '../tokens';

export type KPIStatProps = {
  value: string;
  label: string;
  suffix?: string;
  delta?: { value: string; direction: 'up' | 'down' };
  durationInFrames: number;
};

export const KPIStat: React.FC<KPIStatProps> = ({ value, label, suffix, delta, durationInFrames }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 16, durationInFrames - 14, durationInFrames], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const accent = delta?.direction === 'down' ? INSIGHT_TOKENS.red : INSIGHT_TOKENS.green;
  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'flex-start', gap: 24, opacity }}>
      <div style={{ color: INSIGHT_TOKENS.amber, fontFamily: INSIGHT_FONT.mono, fontSize: 20, letterSpacing: '0.16em' }}>KEY INDICATOR</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 20 }}>
        <DigitRoll value={value} delay={10} fontSize={164} color={INSIGHT_TOKENS.text} />
        {suffix ? <span style={{ color: INSIGHT_TOKENS.amberSoft, fontFamily: INSIGHT_FONT.sans, fontSize: 40 }}>{suffix}</span> : null}
      </div>
      <div style={{ display: 'flex', gap: 24, alignItems: 'baseline' }}>
        <span style={{ color: INSIGHT_TOKENS.muted, fontFamily: INSIGHT_FONT.sans, fontSize: 32 }}>{label}</span>
        {delta ? <span style={{ color: accent, fontFamily: INSIGHT_FONT.mono, fontSize: 28 }}>{delta.direction === 'up' ? '▲' : '▼'} {delta.value}</span> : null}
      </div>
    </div>
  );
};
