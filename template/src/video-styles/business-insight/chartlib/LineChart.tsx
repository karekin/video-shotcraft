import { Easing, interpolate, useCurrentFrame } from 'remotion';
import { INSIGHT_FONT, INSIGHT_TOKENS } from '../tokens';

export type LineChartProps = {
  data: number[];
  xLabels: string[];
  label: string;
  durationInFrames: number;
};

export const LineChart: React.FC<LineChartProps> = ({ data, xLabels, label, durationInFrames }) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [8, durationInFrames - 26], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic),
  });
  const width = 1320;
  const top = 156;
  const bottom = 548;
  const height = bottom - top;
  const left = 94;
  const rawMin = Math.min(...data);
  const rawMax = Math.max(...data);
  const padding = Math.max((rawMax - rawMin) * 0.12, 1);
  const min = rawMin - padding;
  const max = rawMax + padding;
  const toPoint = (value: number, index: number) => ({
    x: left + (index / Math.max(data.length - 1, 1)) * width,
    y: bottom - ((value - min) / (max - min)) * height,
  });
  const points = data.map(toPoint);
  const path = points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ');

  return (
    <svg viewBox="0 0 1500 700" style={{ width: 1500, height: 700 }}>
      <text x="94" y="66" fill={INSIGHT_TOKENS.text} fontFamily={INSIGHT_FONT.serif} fontSize="46">{label}</text>
      {[0, 1, 2, 3].map((row) => {
        const y = top + row * (height / 3);
        return <line key={row} x1="94" x2="1414" y1={y} y2={y} stroke={INSIGHT_TOKENS.line} strokeWidth="1" />;
      })}
      <path d={path} fill="none" stroke={INSIGHT_TOKENS.blue} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - progress} />
      {points.map((point, index) => {
        const revealAt = index / Math.max(points.length - 1, 1);
        const visible = revealAt === 1
          ? progress
          : interpolate(progress, [revealAt, Math.min(1, revealAt + 0.18)], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        return (
          <g key={xLabels[index]} opacity={visible}>
            <circle cx={point.x} cy={point.y} r="12" fill={INSIGHT_TOKENS.bg} stroke={INSIGHT_TOKENS.amber} strokeWidth="6" />
            <text x={point.x} y="652" textAnchor="middle" fill={INSIGHT_TOKENS.muted} fontFamily={INSIGHT_FONT.mono} fontSize="24">{xLabels[index]}</text>
            <text x={point.x} y={Math.max(112, point.y - 26)} textAnchor="middle" fill={INSIGHT_TOKENS.text} fontFamily={INSIGHT_FONT.mono} fontSize="27">{data[index].toFixed(1)}</text>
          </g>
        );
      })}
    </svg>
  );
};
