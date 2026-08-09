import { useCurrentFrame } from 'remotion';
import { reveal } from './chart-utils';
import { INSIGHT_FONT, INSIGHT_TOKENS } from '../tokens';

export type BollingerPoint = { label: string; value: number; mean: number; low: number; high: number };
export type BollingerBandProps = { title: string; points: BollingerPoint[]; durationInFrames: number; unit?: string };

/** Trend line plus volatility envelope for market, demand, or operational time series. */
export const BollingerBand: React.FC<BollingerBandProps> = ({ title, points, durationInFrames: _durationInFrames, unit = '' }) => {
  const frame = useCurrentFrame(); const all = points.flatMap((point) => [point.low, point.high]); const min = Math.min(...all); const max = Math.max(...all); const x = (i: number) => 130 + i / Math.max(points.length - 1, 1) * 1240; const y = (v: number) => 600 - (v - min) / Math.max(max - min, 1) * 410; const build = (key: 'value' | 'mean' | 'low' | 'high') => points.map((point, i) => `${i ? 'L' : 'M'} ${x(i)} ${y(point[key])}`).join(' '); const area = `${build('low')} ${[...points].reverse().map((point, ri) => `L ${x(points.length - 1 - ri)} ${y(point.high)}`).join(' ')} Z`; const progress = reveal(frame, 8, 28);
  return <svg viewBox="0 0 1500 720" style={{ width: 1500, height: 720 }}><text x="90" y="58" fill={INSIGHT_TOKENS.text} fontFamily={INSIGHT_FONT.serif} fontSize="48">{title}</text><path d={area} fill={INSIGHT_TOKENS.blue} opacity={progress * .18} /><path d={build('mean')} fill="none" stroke={INSIGHT_TOKENS.muted} strokeWidth="3" strokeDasharray="8 8" opacity={progress} /><path d={build('value')} fill="none" stroke={INSIGHT_TOKENS.amber} strokeWidth="6" opacity={progress} />{points.map((point, i) => <text key={point.label} x={x(i)} y="665" textAnchor="middle" fill={INSIGHT_TOKENS.muted} fontFamily={INSIGHT_FONT.mono} fontSize="17">{point.label}</text>)}<text x={x(points.length - 1) + 14} y={y(points[points.length - 1].value)} fill={INSIGHT_TOKENS.amberSoft} fontFamily={INSIGHT_FONT.mono} fontSize="20">{points[points.length - 1].value}{unit}</text></svg>;
};
