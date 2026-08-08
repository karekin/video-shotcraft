import { interpolate, useCurrentFrame } from 'remotion';
import { INSIGHT_FONT, INSIGHT_TOKENS } from '../tokens';

export type ShareSegment = { label: string; value: number; color?: string };
export type ShareStackProps = { segments: ShareSegment[]; durationInFrames: number; title: string; unit?: string };

export const ShareStack: React.FC<ShareStackProps> = ({ segments, durationInFrames, title, unit = '%' }) => {
  const frame = useCurrentFrame();
  const total = segments.reduce((sum, segment) => sum + segment.value, 0) || 1;
  const palette = [INSIGHT_TOKENS.amber, INSIGHT_TOKENS.blue, INSIGHT_TOKENS.green, '#9C7CEB', INSIGHT_TOKENS.muted];
  let offset = 0;
  return (
    <div style={{ width: 1420 }}>
      <div style={{ color: INSIGHT_TOKENS.text, fontFamily: INSIGHT_FONT.serif, fontSize: 52, marginBottom: 56 }}>{title}</div>
      <div style={{ display: 'flex', height: 126, overflow: 'hidden', borderRadius: 8, background: INSIGHT_TOKENS.surface }}>
        {segments.map((segment, index) => {
          const start = offset;
          offset += segment.value;
          const progress = interpolate(frame, [index * 18, Math.min(durationInFrames - 8, index * 18 + 24)], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          const width = (segment.value / total) * 100 * progress;
          return <div key={segment.label} style={{ width: `${width}%`, minWidth: width > 10 ? 0 : undefined, display: 'flex', alignItems: 'center', justifyContent: 'center', background: segment.color ?? palette[index % palette.length], color: INSIGHT_TOKENS.bg, fontFamily: INSIGHT_FONT.mono, fontWeight: 750, fontSize: 28, overflow: 'hidden', whiteSpace: 'nowrap' }}>{width > 8 ? `${segment.value}${unit}` : ''}</div>;
        })}
      </div>
      <div style={{ display: 'flex', gap: 34, marginTop: 34, flexWrap: 'wrap' }}>
        {segments.map((segment, index) => <div key={segment.label} style={{ display: 'flex', alignItems: 'center', gap: 10, color: INSIGHT_TOKENS.muted, fontFamily: INSIGHT_FONT.sans, fontSize: 24 }}><span style={{ width: 12, height: 12, background: segment.color ?? palette[index % palette.length], display: 'inline-block' }} />{segment.label} {segment.value}{unit}</div>)}
      </div>
    </div>
  );
};
