import { useCurrentFrame } from 'remotion';
import { chartMax, reveal } from './chart-utils';
import { INSIGHT_FONT, INSIGHT_TOKENS } from '../tokens';

export type TornadoDriver = { label: string; downside: number; upside: number; unit?: string };
export type TornadoSensitivityProps = { title: string; drivers: TornadoDriver[]; durationInFrames: number; baselineLabel?: string };

/** Scenario sensitivity chart for ranking which assumptions move valuation, profit, or plan output most. */
export const TornadoSensitivity: React.FC<TornadoSensitivityProps> = ({ title, drivers, durationInFrames: _durationInFrames, baselineLabel = '基准情景' }) => {
  const frame = useCurrentFrame(); const sorted = [...drivers].sort((a, b) => Math.max(Math.abs(b.downside), Math.abs(b.upside)) - Math.max(Math.abs(a.downside), Math.abs(a.upside))); const max = chartMax(sorted.flatMap((driver) => [Math.abs(driver.downside), Math.abs(driver.upside)]));
  return <div style={{ width: 1420 }}><h2 style={{ color: INSIGHT_TOKENS.text, fontFamily: INSIGHT_FONT.serif, fontSize: 52, fontWeight: 500, margin: '0 0 24px' }}>{title}</h2><div style={{ color: INSIGHT_TOKENS.muted, fontFamily: INSIGHT_FONT.mono, fontSize: 18, textAlign: 'center', marginBottom: 16 }}>{baselineLabel}</div><div style={{ position: 'relative' }}><div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, borderLeft: `2px solid ${INSIGHT_TOKENS.text}` }} />{sorted.map((driver, index) => { const progress = reveal(frame, 8 + index * 11, 18); return <div key={driver.label} style={{ display: 'grid', gridTemplateColumns: '1fr 240px 1fr', height: 66, alignItems: 'center' }}><div style={{ display: 'flex', justifyContent: 'flex-end' }}><span style={{ width: `${Math.abs(driver.downside) / max * 46 * progress}%`, height: 34, background: INSIGHT_TOKENS.red }} /></div><span style={{ color: INSIGHT_TOKENS.text, fontFamily: INSIGHT_FONT.sans, fontSize: 24, textAlign: 'center' }}>{driver.label}</span><div><span style={{ display: 'block', width: `${Math.abs(driver.upside) / max * 46 * progress}%`, height: 34, background: INSIGHT_TOKENS.green }} /></div></div>; })}</div></div>;
};
