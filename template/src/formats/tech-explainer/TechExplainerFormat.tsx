import { AbsoluteFill, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import type { Episode } from '../../core/contracts';
import { codexAmazonAPlusEpisode } from '../../episodes/codex-amazon-a-plus';
import { TECH_GRID, techGridBackground } from '../../style-packs/tech-grid';
import type { TechExplainerContent, TechExplainerStep } from './types';

type TechExplainerProps = {
  episode?: Episode<'tech-explainer', TechExplainerContent>;
  narration?: boolean;
};

const entering = (delay = 0) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame: frame - delay, fps, config: { damping: 16, stiffness: 150, mass: 0.75 } });
  return {
    opacity: interpolate(progress, [0, 0.18, 1], [0, 1, 1]),
    translateY: interpolate(progress, [0, 1], [42, 0]),
    rotate: interpolate(progress, [0, 0.7, 1], [-6, 1.4, 0]),
    scale: interpolate(progress, [0, 0.7, 1], [0.83, 1.035, 1]),
  };
};

const StepCard: React.FC<{ step: TechExplainerStep; index: number }> = ({ step, index }) => {
  const enter = entering(index * 7);
  return (
    <div style={{ width: 305, minHeight: 312, padding: '34px 30px', borderRadius: 18, background: `linear-gradient(148deg, ${TECH_GRID.tokens.violet} 0%, #7774D3 60%, ${TECH_GRID.tokens.pink} 135%)`, boxShadow: '0 26px 46px rgba(0,0,0,.26)', transform: `translateY(${enter.translateY}px) rotate(${enter.rotate}deg) scale(${enter.scale})`, opacity: enter.opacity }}>
      <div style={{ fontFamily: TECH_GRID.font, color: TECH_GRID.tokens.white, fontWeight: 800, fontSize: 47, letterSpacing: '-.06em', lineHeight: 1.08 }}>{step.label}</div>
      <div style={{ fontFamily: TECH_GRID.font, color: '#F2E8EB', fontSize: 21, fontStyle: 'italic', marginTop: 16 }}>{step.english}</div>
      <div style={{ height: 1, background: 'rgba(255,255,255,.34)', margin: '26px 0 20px' }} />
      <div style={{ fontFamily: TECH_GRID.font, color: '#F8F6F3', fontSize: 21, lineHeight: 1.45 }}>{step.detail}</div>
      {step.command ? <div style={{ marginTop: 24, borderRadius: 10, padding: '12px 14px', fontFamily: 'ui-monospace, Menlo, monospace', color: '#E7EB95', fontSize: 16, background: 'rgba(20,20,30,.38)' }}>{step.command}</div> : null}
    </div>
  );
};

const Watermark: React.FC = () => (
  <div style={{ position: 'absolute', right: -60, bottom: 25, color: 'rgba(255,255,255,.09)', fontFamily: TECH_GRID.font, fontSize: 184, fontWeight: 900, letterSpacing: '-.09em', transform: 'rotate(-17deg)' }}>FLOW / SYSTEM</div>
);

const TiltedBoard: React.FC = () => (
  <div style={{ position: 'absolute', left: 76, right: 104, top: 128, height: 666, borderRadius: 30, background: 'linear-gradient(135deg, rgba(249,247,241,.96), rgba(216,211,205,.90))', boxShadow: '0 38px 76px rgba(0,0,0,.34), inset 0 1px rgba(255,255,255,.8)', transform: 'rotate(-3.2deg)', transformOrigin: 'center', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', inset: 0, opacity: .26, backgroundImage: 'radial-gradient(circle at 20% 10%, #8c8580 0 1px, transparent 1.6px), radial-gradient(circle at 75% 55%, #8c8580 0 1px, transparent 1.7px)', backgroundSize: '17px 17px, 23px 23px' }} />
  </div>
);

const AutomationBadge: React.FC = () => (
  <div style={{ position: 'absolute', right: 92, top: 68, width: 166, height: 166, borderRadius: '50%', border: '3px solid rgba(255,255,255,.82)', background: 'radial-gradient(circle at 35% 25%, #A9AEFF 0%, #555BC5 56%, #252762 100%)', display: 'grid', placeItems: 'center', boxShadow: '0 20px 40px rgba(0,0,0,.30)' }}>
    <div style={{ textAlign: 'center', color: TECH_GRID.tokens.white, fontFamily: 'ui-monospace, Menlo, monospace', fontWeight: 900, letterSpacing: '.08em', lineHeight: 1.2 }}><div style={{ fontSize: 40 }}>AI</div><div style={{ fontSize: 15, marginTop: 7 }}>RUNNING</div></div>
  </div>
);

const Subtitle: React.FC<{ text: string; source: string; enabled: boolean }> = ({ text, source, enabled }) => enabled ? (
  <><div style={{ position: 'absolute', left: 140, right: 140, bottom: 94, color: TECH_GRID.tokens.white, fontFamily: TECH_GRID.font, fontSize: 40, fontWeight: 700, textAlign: 'center', lineHeight: 1.34, textShadow: '0 4px 16px rgba(0,0,0,.6)' }}>{text}</div><div style={{ position: 'absolute', right: 72, bottom: 46, color: 'rgba(255,255,255,.56)', fontFamily: 'ui-monospace, Menlo, monospace', fontSize: 14, letterSpacing: '.08em' }}>{source}</div></>
) : null;

const HookScene: React.FC<{ content: TechExplainerContent }> = ({ content }) => {
  const title = entering(0);
  const visual = entering(14);
  return <>
    <div style={{ position: 'absolute', left: 110, top: 92, color: TECH_GRID.tokens.white, fontFamily: TECH_GRID.font, fontSize: 22, fontWeight: 700, letterSpacing: '.13em', opacity: title.opacity }}>{content.kicker}</div>
    <div style={{ position: 'absolute', left: 110, top: 166, color: TECH_GRID.tokens.white, fontFamily: TECH_GRID.font, fontSize: 93, fontWeight: 900, lineHeight: 1.04, letterSpacing: '-.075em', transform: `translateY(${title.translateY}px) scale(${title.scale})`, transformOrigin: 'left top' }}>{content.headline}<br /><span style={{ color: '#FF7800' }}>{content.accent}</span></div>
    <div style={{ position: 'absolute', left: 112, top: 488, width: 1180, height: 400, borderRadius: 32, background: 'linear-gradient(135deg,#FBF9F4,#E2DDD7)', boxShadow: '0 42px 80px rgba(0,0,0,.36)', transform: `translateY(${visual.translateY}px) rotate(-4.5deg) scale(${visual.scale})`, opacity: visual.opacity }}>
      <div style={{ position: 'absolute', left: 70, top: 64, color: '#4D4D55', fontFamily: TECH_GRID.font, fontSize: 21, fontWeight: 800, letterSpacing: '.12em' }}>{content.boardLabel}</div>
      <div style={{ position: 'absolute', left: 70, top: 116, display: 'flex', gap: 24 }}>{content.steps.slice(0, 3).map((step, index) => <div key={step.label} style={{ width: 280, borderRadius: 18, padding: 24, background: index === 0 ? TECH_GRID.tokens.violet : '#DDD5D1', color: index === 0 ? TECH_GRID.tokens.white : '#3C3A40', fontFamily: TECH_GRID.font }}><div style={{ fontWeight: 800, fontSize: 35 }}>{String(index + 1).padStart(2, '0')}</div><div style={{ fontWeight: 900, fontSize: 32, marginTop: 18 }}>{step.label}</div><div style={{ fontSize: 17, fontStyle: 'italic', marginTop: 8 }}>{step.english}</div></div>)}</div>
    </div>
  </>;
};

export const TechExplainerFormat: React.FC<TechExplainerProps> = ({ episode = codexAmazonAPlusEpisode, narration = true }) => (
  <AbsoluteFill style={{ ...techGridBackground, overflow: 'hidden' }}>
    <Watermark />
    <AutomationBadge />
    {episode.narration.map((segment, index) => <Sequence key={segment.id ?? segment.from} from={segment.from} durationInFrames={segment.duration}>
      {index === 0 ? <HookScene content={episode.content} /> : index <= episode.content.steps.length ? <><TiltedBoard /><div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 42 }}><div style={{ width: 490, transform: 'rotate(-3deg)' }}><div style={{ color: '#34323A', fontFamily: TECH_GRID.font, fontWeight: 800, fontSize: 23, letterSpacing: '.14em' }}>STEP {String(index).padStart(2, '0')}</div><div style={{ color: '#222026', fontFamily: TECH_GRID.font, fontWeight: 900, fontSize: 71, lineHeight: 1.08, marginTop: 24 }}>{episode.content.steps[index - 1]?.detail}</div><div style={{ color: '#625F68', fontFamily: TECH_GRID.font, fontSize: 25, marginTop: 30 }}>结构化内容，而不是一次性 AI 图片。</div></div><StepCard step={episode.content.steps[index - 1] as TechExplainerStep} index={0} /></div></> : <><TiltedBoard /><div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', padding: '0 240px', textAlign: 'center' }}><div style={{ color: '#34323A', fontFamily: TECH_GRID.font, fontSize: 22, fontWeight: 800, letterSpacing: '.14em' }}>RENDER TARGETS / REVIEW LOOP</div><div style={{ color: '#222026', fontFamily: TECH_GRID.font, fontSize: 76, fontWeight: 900, lineHeight: 1.14, marginTop: 34 }}>{episode.content.takeaway}</div></div></>}
      <Subtitle text={segment.text} source={segment.source} enabled={narration} />
    </Sequence>)}
  </AbsoluteFill>
);
