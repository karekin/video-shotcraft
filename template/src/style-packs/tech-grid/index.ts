import type { CSSProperties } from 'react';

export const TECH_GRID = {
  id: 'tech-grid',
  tokens: {
    ink: '#151417',
    paper: '#F5F1EA',
    paperSoft: '#DDD7CF',
    violet: '#5B60C8',
    violetSoft: '#A8ACFF',
    pink: '#F0B4C5',
    lime: '#E3E889',
    muted: '#A8A0A1',
    white: '#FFFDFC',
  },
  font: 'Inter, "Noto Sans SC", "PingFang SC", system-ui, sans-serif',
} as const;

export const techGridBackground: CSSProperties = {
  backgroundColor: TECH_GRID.tokens.ink,
  backgroundImage: 'radial-gradient(circle at 12% 17%, rgba(255,255,255,.13) 0 1px, transparent 1.7px), radial-gradient(circle at 82% 68%, rgba(255,255,255,.10) 0 1px, transparent 1.8px), linear-gradient(115deg, rgba(255,255,255,.03), transparent 55%)',
  backgroundSize: '13px 13px, 19px 19px, auto',
};
