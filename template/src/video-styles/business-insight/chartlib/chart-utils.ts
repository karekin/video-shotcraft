import { Easing, interpolate } from 'remotion';
import { INSIGHT_TOKENS } from '../tokens';

export const INSIGHT_CHART_PALETTE = [
  INSIGHT_TOKENS.amber,
  INSIGHT_TOKENS.blue,
  INSIGHT_TOKENS.green,
  '#A78BFA',
  '#F472B6',
  '#67E8F9',
] as const;

export const reveal = (frame: number, start: number, length = 18) => interpolate(
  frame,
  [start, start + length],
  [0, 1],
  { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) },
);

export const chartMax = (values: number[]) => Math.max(...values, 1);
