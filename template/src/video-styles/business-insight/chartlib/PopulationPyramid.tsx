import { useCurrentFrame } from 'remotion';
import { chartMax, reveal } from './chart-utils';
import { INSIGHT_FONT, INSIGHT_TOKENS } from '../tokens';

export type PyramidRow = { label: string; left: number; right: number };
export type PopulationPyramidProps = { title: string; leftLabel: string; rightLabel: string; rows: PyramidRow[]; durationInFrames: number; unit?: string };

/** Bilateral segment comparison for cohorts, supply/demand, or two-market structures. */
export const PopulationPyramid: React.FC<PopulationPyramidProps> = ({ title, leftLabel, rightLabel, rows, durationInFrames: _durationInFrames, unit = '' }) => {
  const frame = useCurrentFrame();
  const max = chartMax(rows.flatMap((row) => [row.left, row.right]));
  return <div style={{ width: 1460 }}>
    <h2 style={{ color: INSIGHT_TOKENS.text, fontFamily: INSIGHT_FONT.serif, fontSize: 52, fontWeight: 500, margin: '0 0 34px' }}>{title}</h2>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 180px 1fr', marginBottom: 18, color: INSIGHT_TOKENS.muted, fontFamily: INSIGHT_FONT.mono, fontSize: 21 }}><span style={{ textAlign: 'right' }}>{leftLabel}</span><span /><span>{rightLabel}</span></div>
    {rows.map((row, index) => {
      const progress = reveal(frame, 8 + index * 13, 18);
      return <div key={row.label} style={{ display: 'grid', gridTemplateColumns: '1fr 180px 1fr', gap: 18, height: 62, alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><span style={{ color: INSIGHT_TOKENS.text, fontFamily: INSIGHT_FONT.mono, fontSize: 19, whiteSpace: 'nowrap' }}>{row.left}{unit}</span><div style={{ flex: 1, height: 38, background: INSIGHT_TOKENS.surfaceElevated, display: 'flex', justifyContent: 'flex-end' }}><div style={{ width: `${row.left / max * 100 * progress}%`, background: INSIGHT_TOKENS.blue }} /></div></div>
        <div style={{ color: INSIGHT_TOKENS.text, fontFamily: INSIGHT_FONT.mono, fontSize: 22, textAlign: 'center' }}>{row.label}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><div style={{ flex: 1, height: 38, background: INSIGHT_TOKENS.surfaceElevated }}><div style={{ width: `${row.right / max * 100 * progress}%`, height: '100%', background: INSIGHT_TOKENS.amber }} /></div><span style={{ color: INSIGHT_TOKENS.text, fontFamily: INSIGHT_FONT.mono, fontSize: 19, whiteSpace: 'nowrap' }}>{row.right}{unit}</span></div>
      </div>;
    })}
  </div>;
};
