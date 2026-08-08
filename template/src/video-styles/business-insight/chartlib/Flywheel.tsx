import { Easing, interpolate, useCurrentFrame } from 'remotion';
import { INSIGHT_FONT, INSIGHT_TOKENS } from '../tokens';

export type FlywheelProps = {
  nodes: string[];
  durationInFrames: number;
  radius?: number;
  highlightSeq?: number[];
};

export const Flywheel: React.FC<FlywheelProps> = ({ nodes, durationInFrames, radius = 300, highlightSeq }) => {
  const frame = useCurrentFrame();
  const enter = interpolate(frame, [0, 24], [0.78, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic),
  });
  const spin = interpolate(frame, [0, durationInFrames], [-32, 24], { extrapolateRight: 'clamp' });
  const center = 520;
  const active = highlightSeq?.[Math.min(highlightSeq.length - 1, Math.floor(frame / 28))] ?? Math.floor(frame / 28) % nodes.length;

  return (
    <svg viewBox="0 0 1040 1040" style={{ width: 760, height: 760, transform: `scale(${enter})`, transformOrigin: 'center' }}>
      <defs>
        <linearGradient id="insight-flywheel-line" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor={INSIGHT_TOKENS.amber} /><stop offset="1" stopColor={INSIGHT_TOKENS.blue} />
        </linearGradient>
      </defs>
      <circle cx={center} cy={center} r={radius} fill="none" stroke="url(#insight-flywheel-line)" strokeWidth="4" strokeDasharray="10 14" opacity="0.8" />
      <circle cx={center} cy={center} r={radius - 70} fill="none" stroke={INSIGHT_TOKENS.line} strokeWidth="1" />
      <text x={center} y={center - 18} textAnchor="middle" fill={INSIGHT_TOKENS.text} fontFamily={INSIGHT_FONT.serif} fontSize="48">数据回流</text>
      <text x={center} y={center + 28} textAnchor="middle" fill={INSIGHT_TOKENS.muted} fontFamily={INSIGHT_FONT.sans} fontSize="19" letterSpacing="4">INSIGHT FLYWHEEL</text>
      <g transform={`rotate(${spin} ${center} ${center})`}>
        {nodes.map((node, index) => {
          const angle = (index / nodes.length) * Math.PI * 2 - Math.PI / 2;
          const x = center + Math.cos(angle) * radius;
          const y = center + Math.sin(angle) * radius;
          const isActive = index === active;
          return (
            <g key={node} transform={`translate(${x} ${y}) rotate(${-spin})`}>
              <circle r={isActive ? 74 : 64} fill={isActive ? INSIGHT_TOKENS.amber : INSIGHT_TOKENS.surfaceElevated} stroke={isActive ? INSIGHT_TOKENS.amberSoft : INSIGHT_TOKENS.line} strokeWidth={isActive ? 3 : 1.5} />
              <text textAnchor="middle" dominantBaseline="middle" fill={isActive ? INSIGHT_TOKENS.bg : INSIGHT_TOKENS.text} fontFamily={INSIGHT_FONT.sans} fontWeight="650" fontSize="22">{node}</text>
            </g>
          );
        })}
      </g>
    </svg>
  );
};
