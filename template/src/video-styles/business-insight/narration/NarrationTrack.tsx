import { Audio, Sequence, staticFile } from 'remotion';
import type { NarrationSegment } from '../../../core/contracts';
import { INSIGHT_FONT, INSIGHT_TOKENS } from '../tokens';

export type { NarrationSegment } from '../../../core/contracts';

export const NarrationTrack: React.FC<{ segments: readonly NarrationSegment[]; enabled?: boolean }> = ({ segments, enabled = true }) => (
  <>
    {segments.map((segment) => (
      <Sequence key={`${segment.from}-${segment.text}`} from={segment.from} durationInFrames={segment.duration}>
        {enabled && segment.audio ? <Audio src={staticFile(`audio/narration/${segment.audio}`)} volume={1} /> : null}
        <div style={{ position: 'absolute', left: 180, right: 180, bottom: 130, textAlign: 'center', color: '#E4DDD1', fontFamily: INSIGHT_FONT.serif, fontSize: 46, fontWeight: 400, lineHeight: 1.3, textShadow: '0 1px 8px rgba(0,0,0,0.42)' }}>
          {segment.text}
        </div>
        <div style={{ position: 'absolute', right: 74, bottom: 70, color: INSIGHT_TOKENS.muted, fontFamily: INSIGHT_FONT.mono, fontSize: 16, letterSpacing: '0.08em' }}>
          {segment.source}
        </div>
      </Sequence>
    ))}
  </>
);
