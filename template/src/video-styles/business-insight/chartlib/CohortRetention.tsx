import { useCurrentFrame } from 'remotion';
import { reveal } from './chart-utils';
import { INSIGHT_FONT, INSIGHT_TOKENS } from '../tokens';

export type CohortRetentionProps = { title: string; cohorts: string[]; periods: string[]; values: number[][]; durationInFrames: number; unit?: string };

/** Cohort matrix for separating acquisition timing from repeated behavior. */
export const CohortRetention: React.FC<CohortRetentionProps> = ({ title, cohorts, periods, values, durationInFrames: _durationInFrames, unit = '%' }) => {
  const frame = useCurrentFrame(); const all = values.flat(); const max = Math.max(...all, 1);
  return <div style={{ width: 1460 }}><h2 style={{ color: INSIGHT_TOKENS.text, fontFamily: INSIGHT_FONT.serif, fontSize: 52, fontWeight: 500, margin: '0 0 40px' }}>{title}</h2><div style={{ display: 'grid', gridTemplateColumns: `190px repeat(${periods.length}, 1fr)`, gap: 6 }}><div />{periods.map((period) => <span key={period} style={{ color: INSIGHT_TOKENS.muted, fontFamily: INSIGHT_FONT.mono, fontSize: 19 }}>{period}</span>)}{cohorts.flatMap((cohort, cohortIndex) => [<span key={`${cohort}-label`} style={{ color: INSIGHT_TOKENS.text, fontFamily: INSIGHT_FONT.sans, fontSize: 24, display: 'flex', alignItems: 'center' }}>{cohort}</span>, ...periods.map((period, periodIndex) => { const value = values[cohortIndex]?.[periodIndex]; const progress = reveal(frame, 8 + (cohortIndex * periods.length + periodIndex) * 5, 14); const isMissing = value === undefined || Number.isNaN(value); return <span key={`${cohort}-${period}`} style={{ minHeight: 66, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: progress, background: isMissing ? INSIGHT_TOKENS.surface : `rgba(78, 211, 161, ${.12 + value / max * .78})`, color: value / max > .55 ? INSIGHT_TOKENS.bg : INSIGHT_TOKENS.text, fontFamily: INSIGHT_FONT.mono, fontSize: 20 }}>{isMissing ? '—' : `${value}${unit}`}</span>; })])}</div></div>;
};
