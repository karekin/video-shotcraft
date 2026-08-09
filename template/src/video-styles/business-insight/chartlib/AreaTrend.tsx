import { useCurrentFrame } from 'remotion';
import { reveal } from './chart-utils';
import { INSIGHT_FONT, INSIGHT_TOKENS } from '../tokens';

export type AreaTrendProps = { title: string; values: number[]; labels: string[]; durationInFrames: number; unit?: string; baseline?: number };

/** Filled time series for cumulative magnitude or a total whose volume matters as much as direction. */
export const AreaTrend: React.FC<AreaTrendProps> = ({ title, values, labels, durationInFrames: _durationInFrames, unit = '', baseline = 0 }) => {
  const frame = useCurrentFrame(); const min = Math.min(baseline, ...values); const max = Math.max(baseline, ...values); const x = (i: number) => 120 + i / Math.max(values.length - 1, 1) * 1260; const y = (v: number) => 600 - (v - min) / Math.max(max - min, 1) * 410; const baseY = y(baseline); const line = values.map((v, i) => `${i ? 'L' : 'M'} ${x(i)} ${y(v)}`).join(' '); const area = `${line} L ${x(values.length - 1)} ${baseY} L ${x(0)} ${baseY} Z`; const progress = reveal(frame, 8, 28);
  return <svg viewBox="0 0 1500 720" style={{ width: 1500, height: 720 }}><text x="90" y="58" fill={INSIGHT_TOKENS.text} fontFamily={INSIGHT_FONT.serif} fontSize="48">{title}</text><path d={area} fill={INSIGHT_TOKENS.blue} opacity={progress * .32} /><path d={line} fill="none" stroke={INSIGHT_TOKENS.amber} strokeWidth="6" strokeLinecap="round" opacity={progress} />{labels.map((label, i) => <text key={label} x={x(i)} y="665" textAnchor="middle" fill={INSIGHT_TOKENS.muted} fontFamily={INSIGHT_FONT.mono} fontSize="18">{label}</text>)}<text x={x(values.length - 1) + 18} y={y(values[values.length - 1])} fill={INSIGHT_TOKENS.amberSoft} fontFamily={INSIGHT_FONT.mono} fontSize="22">{values[values.length - 1]}{unit}</text></svg>;
};
