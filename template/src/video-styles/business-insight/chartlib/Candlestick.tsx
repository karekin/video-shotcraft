import { useCurrentFrame } from 'remotion';
import { reveal } from './chart-utils';
import { INSIGHT_FONT, INSIGHT_TOKENS } from '../tokens';

export type Candle = { label: string; open: number; high: number; low: number; close: number };
export type CandlestickProps = { title: string; candles: Candle[]; durationInFrames: number; unit?: string };

/** OHLC component for price, margin, or any interval with opening/closing values and extremes. */
export const Candlestick: React.FC<CandlestickProps> = ({ title, candles, durationInFrames: _durationInFrames, unit = '' }) => {
  const frame = useCurrentFrame();
  const values = candles.flatMap((candle) => [candle.low, candle.high]);
  const min = Math.min(...values); const max = Math.max(...values); const y = (value: number) => 610 - (value - min) / Math.max(max - min, 1) * 430;
  const step = 1160 / Math.max(candles.length - 1, 1);
  return <svg viewBox="0 0 1500 720" style={{ width: 1500, height: 720 }}>
    <text x="90" y="62" fill={INSIGHT_TOKENS.text} fontFamily={INSIGHT_FONT.serif} fontSize="48">{title}</text>
    {[0, 1, 2, 3].map((row) => <line key={row} x1="110" x2="1410" y1={180 + row * 130} y2={180 + row * 130} stroke={INSIGHT_TOKENS.line} />)}
    {candles.map((candle, index) => {
      const progress = reveal(frame, 8 + index * 10, 16); const x = 150 + index * step;
      const rise = candle.close >= candle.open; const color = rise ? INSIGHT_TOKENS.green : INSIGHT_TOKENS.red;
      const top = y(Math.max(candle.open, candle.close)); const bottom = y(Math.min(candle.open, candle.close));
      return <g key={candle.label} opacity={progress} transform={`translate(${(1 - progress) * -18} 0)`}>
        <line x1={x} x2={x} y1={y(candle.high)} y2={y(candle.low)} stroke={color} strokeWidth="4" />
        <rect x={x - 20} y={top} width="40" height={Math.max(6, bottom - top)} fill={color} />
        <text x={x} y="672" textAnchor="middle" fill={INSIGHT_TOKENS.muted} fontFamily={INSIGHT_FONT.mono} fontSize="19">{candle.label}</text>
        {index === candles.length - 1 ? <text x={x + 32} y={top + 8} fill={INSIGHT_TOKENS.text} fontFamily={INSIGHT_FONT.mono} fontSize="22">{candle.close}{unit}</text> : null}
      </g>;
    })}
  </svg>;
};
