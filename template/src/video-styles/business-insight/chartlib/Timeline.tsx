import { useCurrentFrame } from 'remotion';
import { reveal } from './chart-utils';
import { INSIGHT_FONT, INSIGHT_TOKENS } from '../tokens';

export type TimelineEvent = { date: string; title: string; detail?: string; accent?: boolean };
export type TimelineProps = { title: string; events: TimelineEvent[]; durationInFrames: number };

/** Chronology component for causal sequences, milestones, and strategy shifts. */
export const Timeline: React.FC<TimelineProps> = ({ title, events, durationInFrames: _durationInFrames }) => {
  const frame = useCurrentFrame();
  return <div style={{ width: 1540, height: 650, boxSizing: 'border-box' }}>
    <h2 style={{ color: INSIGHT_TOKENS.text, fontFamily: INSIGHT_FONT.serif, fontSize: 52, fontWeight: 500, margin: '0 0 28px' }}>{title}</h2>
    <div style={{ height: 500, display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 245, height: 3, background: INSIGHT_TOKENS.line }} />
      {events.map((event, index) => {
        const progress = reveal(frame, 10 + index * 18, 20);
        const isTop = index % 2 === 0;
        const cardTop = isTop ? 38 : 304;
        const connectorTop = isTop ? 170 : 248;
        return <div key={`${event.date}-${event.title}`} style={{ width: `${100 / Math.max(events.length, 1)}%`, position: 'relative', opacity: progress }}>
          <span style={{ position: 'absolute', top: 234, width: 24, height: 24, background: event.accent ? INSIGHT_TOKENS.amber : INSIGHT_TOKENS.blue, borderRadius: 99, transform: `scale(${progress})` }} />
          <div style={{ position: 'absolute', left: 0, width: 2, height: 76, top: connectorTop, background: INSIGHT_TOKENS.line }} />
          <div style={{ position: 'absolute', left: 0, top: cardTop, width: 270 }}>
            <div style={{ color: INSIGHT_TOKENS.amber, fontFamily: INSIGHT_FONT.mono, fontSize: 20, marginBottom: 12 }}>{event.date}</div>
            <div style={{ color: INSIGHT_TOKENS.text, fontFamily: INSIGHT_FONT.sans, fontSize: 29, fontWeight: 650 }}>{event.title}</div>
            {event.detail ? <div style={{ color: INSIGHT_TOKENS.muted, fontFamily: INSIGHT_FONT.sans, fontSize: 21, marginTop: 10, lineHeight: 1.35 }}>{event.detail}</div> : null}
          </div>
        </div>;
      })}
    </div>
  </div>;
};
