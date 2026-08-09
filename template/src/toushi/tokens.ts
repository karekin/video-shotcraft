// 透视商业系列 · 财经数据感 design tokens
// 确定性渲染：伪随机固定种子（copy 自 video-shotcraft/assets/lib/helpers/rand.ts）

/** Deterministic PRNG — same seed always yields the same sequence. */
export const mulberry32 = (seed: number) => {
  let a = seed | 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

// 配色：冷墨底 + 警示红主角色 + 增长绿 + 数据蓝 + 系列琥珀（克制）
export const T = {
  bg: '#0E0E12',
  surface: '#16161E',
  surfaceHi: '#1E1E28',
  stroke: '#2A2A35',
  text: '#ECECF1',
  muted: '#8B8B96',
  up: '#2DD4A7', // 正向：增长
  down: '#FF4D5E', // 负向：亏损（主角色）
  data: '#5B8DEF', // 数据/图表
  amber: '#D3923C', // 「透视商业」系列标识
} as const;

export const FONT = {
  mono: 'ui-monospace, SFMono-Regular, Menlo, monospace',
  sans: 'system-ui, -apple-system, "SF Pro Display", sans-serif',
} as const;

export const SERIES = '透视商业';

// 帧率与画幅
export const FPS = 30;
export const W = 1920;
export const H = 1080;
