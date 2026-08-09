import { Easing, interpolate, useCurrentFrame } from 'remotion';
import { INSIGHT_FONT, INSIGHT_TOKENS } from '../tokens';

export type CompareMatrixProps = {
  columns: string[];
  rows: string[];
  cells: string[][];
  durationInFrames: number;
};

export const CompareMatrix: React.FC<CompareMatrixProps> = ({ columns, rows, cells, durationInFrames }) => {
  const frame = useCurrentFrame();
  const headerHeight = 120;
  const rowHeight = 150;
  const labelWidth = 260;
  const cellWidth = 360;
  const startX = 40;
  const startY = 70;
  const reveal = (index: number) => interpolate(frame, [index * 12, index * 12 + 18], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic),
  });
  const endFade = interpolate(frame, [durationInFrames - 16, durationInFrames], [1, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <div style={{ display: 'grid', gridTemplateColumns: `${labelWidth}px repeat(${columns.length}, ${cellWidth}px)`, width: labelWidth + columns.length * cellWidth, opacity: endFade }}>
      <div style={{ height: headerHeight }} />
      {columns.map((column, index) => <div key={column} style={{ height: headerHeight, display: 'flex', alignItems: 'center', padding: '0 30px', borderBottom: `2px solid ${INSIGHT_TOKENS.amber}`, color: INSIGHT_TOKENS.text, fontFamily: INSIGHT_FONT.serif, fontSize: 34 }}>{column}</div>)}
      {rows.flatMap((row, rowIndex) => {
        const items = [
          <div key={`${row}-label`} style={{ height: rowHeight, display: 'flex', alignItems: 'center', paddingRight: 28, color: INSIGHT_TOKENS.amberSoft, fontFamily: INSIGHT_FONT.sans, fontSize: 24, fontWeight: 700 }}>{row}</div>,
          ...columns.map((column, columnIndex) => {
            const index = rowIndex * columns.length + columnIndex;
            const opacity = reveal(index);
            return <div key={`${row}-${column}`} style={{ height: rowHeight, display: 'flex', alignItems: 'center', padding: '22px 30px', borderLeft: `1px solid ${INSIGHT_TOKENS.line}`, borderBottom: `1px solid ${INSIGHT_TOKENS.line}`, color: INSIGHT_TOKENS.text, fontFamily: INSIGHT_FONT.sans, fontSize: 26, lineHeight: 1.35, opacity, transform: `translateY(${(1 - opacity) * 12}px)` }}>{cells[rowIndex]?.[columnIndex]}</div>;
          }),
        ];
        return items;
      })}
    </div>
  );
};
