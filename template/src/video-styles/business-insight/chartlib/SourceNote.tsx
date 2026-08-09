import { interpolate, useCurrentFrame } from 'remotion';
import { INSIGHT_FONT, INSIGHT_TOKENS } from '../tokens';

export const SourceNote: React.FC<{ source: string; caveat?: string }> = ({ source, caveat }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [12, 28], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div style={{
      position: 'absolute', left: 80, right: 80, bottom: 56, opacity,
      color: INSIGHT_TOKENS.muted, fontFamily: INSIGHT_FONT.sans, fontSize: 22,
      letterSpacing: '0.01em', lineHeight: 1.45, display: 'flex', gap: 16,
    }}>
      <span style={{ color: INSIGHT_TOKENS.amber, fontFamily: INSIGHT_FONT.mono }}>SOURCE</span>
      <span>{source}{caveat ? ` · 口径：${caveat}` : ''}</span>
    </div>
  );
};
