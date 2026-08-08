import { useCurrentFrame } from 'remotion';
import { reveal } from './chart-utils';
import { INSIGHT_FONT, INSIGHT_TOKENS } from '../tokens';

export type HeatmapProps = { title: string; rows: string[]; columns: string[]; values: number[][]; durationInFrames: number; formatValue?: (value: number) => string };

/** Pattern scanner for time, segment, channel, or cohort grids. */
export const Heatmap: React.FC<HeatmapProps> = ({ title, rows, columns, values, durationInFrames: _durationInFrames, formatValue = (value) => String(value) }) => {
  const frame = useCurrentFrame();
  const all = values.flat(); const min = Math.min(...all, 0); const max = Math.max(...all, 1);
  const color = (value: number) => {
    const ratio = (value - min) / Math.max(max - min, 1);
    return `rgba(121, 169, 255, ${0.12 + ratio * 0.78})`;
  };
  return <div style={{ width: 1460 }}>
    <h2 style={{ color: INSIGHT_TOKENS.text, fontFamily: INSIGHT_FONT.serif, fontSize: 52, fontWeight: 500, margin: '0 0 46px' }}>{title}</h2>
    <div style={{ display: 'grid', gridTemplateColumns: `180px repeat(${columns.length}, 1fr)`, gap: 7 }}>
      <div />
      {columns.map((column) => <div key={column} style={{ color: INSIGHT_TOKENS.muted, fontFamily: INSIGHT_FONT.mono, fontSize: 21, padding: '0 0 12px 12px' }}>{column}</div>)}
      {rows.flatMap((row, rowIndex) => [
        <div key={`${row}-label`} style={{ display: 'flex', alignItems: 'center', color: INSIGHT_TOKENS.text, fontFamily: INSIGHT_FONT.sans, fontSize: 26 }}>{row}</div>,
        ...columns.map((column, columnIndex) => {
          const progress = reveal(frame, 8 + (rowIndex * columns.length + columnIndex) * 5, 14);
          const value = values[rowIndex]?.[columnIndex] ?? 0;
          return <div key={`${row}-${column}`} style={{ height: 92, display: 'flex', justifyContent: 'center', alignItems: 'center', opacity: progress, background: color(value), border: `1px solid ${INSIGHT_TOKENS.line}`, color: value / Math.max(max, 1) > .56 ? INSIGHT_TOKENS.bg : INSIGHT_TOKENS.text, fontFamily: INSIGHT_FONT.mono, fontSize: 23 }}>{formatValue(value)}</div>;
        }),
      ])}
    </div>
  </div>;
};
