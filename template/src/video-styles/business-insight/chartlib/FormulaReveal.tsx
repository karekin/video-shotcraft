import { Easing, interpolate, useCurrentFrame } from 'remotion';
import { INSIGHT_FONT, INSIGHT_TOKENS } from '../tokens';

export type FormulaToken = { text: string; type: 'term' | 'operator' | 'result'; accent?: boolean };
export type FormulaRevealProps = { tokens: FormulaToken[]; durationInFrames: number; caption?: string };

export const FormulaReveal: React.FC<FormulaRevealProps> = ({ tokens, durationInFrames, caption }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 34 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', columnGap: 24, rowGap: 16 }}>
        {tokens.map((token, index) => {
          const stagger = Math.max(8, Math.floor((durationInFrames - 24) / tokens.length));
          const start = Math.min(10 + index * stagger, Math.max(0, durationInFrames - 9));
          const end = Math.max(start + 1, Math.min(durationInFrames - 8, start + 14));
          const reveal = interpolate(frame, [start, end], [0, 1], {
            extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic),
          });
          const color = token.type === 'operator' ? INSIGHT_TOKENS.muted : token.accent || token.type === 'result' ? INSIGHT_TOKENS.amber : INSIGHT_TOKENS.text;
          return <span key={`${token.text}-${index}`} style={{ color, fontFamily: token.type === 'operator' ? INSIGHT_FONT.serif : INSIGHT_FONT.sans, fontWeight: token.type === 'operator' ? 400 : 650, fontSize: token.type === 'operator' ? 64 : 54, opacity: reveal, filter: `blur(${(1 - reveal) * 8}px)`, transform: `translateY(${(1 - reveal) * 22}px)` }}>{token.text}</span>;
        })}
      </div>
      {caption ? <div style={{ color: INSIGHT_TOKENS.muted, fontFamily: INSIGHT_FONT.sans, fontSize: 28 }}>{caption}</div> : null}
    </div>
  );
};
