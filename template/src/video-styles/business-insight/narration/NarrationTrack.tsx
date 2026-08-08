import { Audio, Sequence, staticFile } from 'remotion';
import { INSIGHT_FONT, INSIGHT_TOKENS } from '../tokens';

export type NarrationSegment = {
  from: number;
  duration: number;
  text: string;
  source: string;
  audio?: string;
};

export const NarrationTrack: React.FC<{ segments: readonly NarrationSegment[]; enabled?: boolean }> = ({ segments, enabled = true }) => (
  <>
    {segments.map((segment) => (
      <Sequence key={`${segment.from}-${segment.text}`} from={segment.from} durationInFrames={segment.duration}>
        {enabled && segment.audio ? <Audio src={staticFile(`audio/narration/${segment.audio}`)} volume={1} /> : null}
        <div style={{ position: 'absolute', left: 160, right: 160, bottom: 130, textAlign: 'center', color: INSIGHT_TOKENS.text, fontFamily: INSIGHT_FONT.serif, fontSize: 58, lineHeight: 1.25, textShadow: '0 3px 18px rgba(0,0,0,0.65)' }}>
          {segment.text}
        </div>
        <div style={{ position: 'absolute', right: 74, bottom: 70, color: INSIGHT_TOKENS.muted, fontFamily: INSIGHT_FONT.mono, fontSize: 16, letterSpacing: '0.08em' }}>
          {segment.source}
        </div>
      </Sequence>
    ))}
  </>
);
