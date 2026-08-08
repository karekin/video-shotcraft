import { useCurrentFrame } from 'remotion';
import { chartMax, reveal } from './chart-utils';
import { INSIGHT_FONT, INSIGHT_TOKENS } from '../tokens';

export type DotPlotItem = { label: string; value: number; annotation?: string; accent?: boolean };
export type DotPlotProps = { title: string; items: DotPlotItem[]; durationInFrames: number; unit?: string };

/** Ranked dots reduce chart ink when the exact order matters more than magnitude bars. */
export const DotPlot: React.FC<DotPlotProps> = ({ title, items, durationInFrames: _durationInFrames, unit = '' }) => {
  const frame = useCurrentFrame();
  const max = chartMax(items.map((item) => item.value));
  return <div style={{ width: 1420 }}>
    <h2 style={{ color: INSIGHT_TOKENS.text, fontFamily: INSIGHT_FONT.serif, fontSize: 52, fontWeight: 500, margin: '0 0 54px' }}>{title}</h2>
    {items.map((item, index) => {
      const progress = reveal(frame, 8 + index * 14, 18);
      const x = 200 + (item.value / max) * 1000 * progress;
      const color = item.accent ? INSIGHT_TOKENS.amber : INSIGHT_TOKENS.blue;
      return <div key={item.label} style={{ height: 88, display: 'grid', gridTemplateColumns: '200px 1fr', alignItems: 'center' }}>
        <span style={{ color: INSIGHT_TOKENS.text, fontFamily: INSIGHT_FONT.sans, fontSize: 28 }}>{item.label}</span>
        <div style={{ height: 2, background: INSIGHT_TOKENS.line, position: 'relative' }}>
          <span style={{ position: 'absolute', left: x - 200, top: -16, width: 34, height: 34, borderRadius: 99, background: color, boxShadow: item.accent ? `0 0 0 7px ${INSIGHT_TOKENS.surface}` : undefined }} />
          <span style={{ position: 'absolute', left: x - 146, top: -18, color: item.accent ? INSIGHT_TOKENS.amberSoft : INSIGHT_TOKENS.muted, fontFamily: INSIGHT_FONT.mono, fontSize: 25 }}>{item.value}{unit}{item.annotation ? ` · ${item.annotation}` : ''}</span>
        </div>
      </div>;
    })}
  </div>;
};
