import { useCurrentFrame } from 'remotion';
import { chartMax, reveal } from './chart-utils';
import { INSIGHT_FONT, INSIGHT_TOKENS } from '../tokens';

export type SlopeSeries = { label: string; from: number; to: number; accent?: boolean };
export type SlopeGraphProps = { title: string; leftLabel: string; rightLabel: string; series: SlopeSeries[]; durationInFrames: number; unit?: string };

/** Two-point comparison for showing movement without implying continuous time-series data. */
export const SlopeGraph: React.FC<SlopeGraphProps> = ({ title, leftLabel, rightLabel, series, durationInFrames: _durationInFrames, unit = '' }) => {
  const frame = useCurrentFrame();
  const max = chartMax(series.flatMap((item) => [item.from, item.to]));
  const toY = (value: number) => 590 - value / max * 430;
  return <svg viewBox="0 0 1500 720" style={{ width: 1500, height: 720 }}>
    <text x="70" y="58" fill={INSIGHT_TOKENS.text} fontFamily={INSIGHT_FONT.serif} fontSize="48">{title}</text>
    <text x="170" y="120" fill={INSIGHT_TOKENS.muted} fontFamily={INSIGHT_FONT.mono} fontSize="23">{leftLabel}</text>
    <text x="1240" y="120" fill={INSIGHT_TOKENS.muted} fontFamily={INSIGHT_FONT.mono} fontSize="23">{rightLabel}</text>
    <line x1="230" x2="230" y1="150" y2="620" stroke={INSIGHT_TOKENS.line} /><line x1="1240" x2="1240" y1="150" y2="620" stroke={INSIGHT_TOKENS.line} />
    {series.map((item, index) => {
      const progress = reveal(frame, 10 + index * 13, 20);
      const color = item.accent ? INSIGHT_TOKENS.amber : INSIGHT_TOKENS.blue;
      const y1 = toY(item.from); const y2 = y1 + (toY(item.to) - y1) * progress;
      return <g key={item.label} opacity={progress}>
        <path d={`M 230 ${y1} L 1240 ${y2}`} stroke={color} strokeWidth={item.accent ? 7 : 4} fill="none" />
        <circle cx="230" cy={y1} r="8" fill={color} /><circle cx="1240" cy={y2} r="8" fill={color} />
        <text x="202" y={y1 + 8} textAnchor="end" fill={INSIGHT_TOKENS.text} fontFamily={INSIGHT_FONT.mono} fontSize="22">{item.from}{unit}</text>
        <text x="1268" y={y2 + 8} fill={INSIGHT_TOKENS.text} fontFamily={INSIGHT_FONT.mono} fontSize="22">{item.to}{unit} · {item.label}</text>
      </g>;
    })}
  </svg>;
};
