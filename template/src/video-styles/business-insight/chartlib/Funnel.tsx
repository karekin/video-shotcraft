import { useCurrentFrame } from 'remotion';
import { chartMax, reveal } from './chart-utils';
import { INSIGHT_FONT, INSIGHT_TOKENS } from '../tokens';

export type FunnelStage = { label: string; value: number; detail?: string; accent?: boolean };
export type FunnelProps = { title: string; stages: FunnelStage[]; durationInFrames: number; unit?: string };

/** Conversion sequence; explicitly labels each stage to avoid decorative funnel usage. */
export const Funnel: React.FC<FunnelProps> = ({ title, stages, durationInFrames: _durationInFrames, unit = '' }) => {
  const frame = useCurrentFrame();
  const max = chartMax(stages.map((stage) => stage.value));
  return <div style={{ width: 1260 }}>
    <h2 style={{ color: INSIGHT_TOKENS.text, fontFamily: INSIGHT_FONT.serif, fontSize: 52, fontWeight: 500, margin: '0 0 46px' }}>{title}</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {stages.map((stage, index) => {
        const progress = reveal(frame, 8 + index * 16, 20);
        const width = 48 + stage.value / max * 52 * progress;
        const color = stage.accent ? INSIGHT_TOKENS.amber : index === stages.length - 1 ? INSIGHT_TOKENS.green : INSIGHT_TOKENS.blue;
        return <div key={stage.label} style={{ width: `${width}%`, alignSelf: 'center', minHeight: 86, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 30px', boxSizing: 'border-box', background: color, color: INSIGHT_TOKENS.bg, fontFamily: INSIGHT_FONT.sans, opacity: progress }}>
          <span style={{ fontWeight: 700, fontSize: 28 }}>{stage.label}</span><span style={{ fontFamily: INSIGHT_FONT.mono, fontWeight: 800, fontSize: 27 }}>{stage.value}{unit}{stage.detail ? ` · ${stage.detail}` : ''}</span>
        </div>;
      })}
    </div>
  </div>;
};
