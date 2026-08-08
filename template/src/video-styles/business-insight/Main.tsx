import { AbsoluteFill, Sequence } from 'remotion';
import musinsa from './data/musinsa.json';
import { CompareMatrix } from './chartlib/CompareMatrix';
import { BarRank } from './chartlib/BarRank';
import { Flywheel } from './chartlib/Flywheel';
import { FlowDiagram } from './chartlib/FlowDiagram';
import { FormulaReveal } from './chartlib/FormulaReveal';
import { KPIStat } from './chartlib/KPIStat';
import { LineChart } from './chartlib/LineChart';
import { ShareStack } from './chartlib/ShareStack';
import { SourceNote } from './chartlib/SourceNote';
import { NarrationTrack, type NarrationSegment } from './narration/NarrationTrack';
import { INSIGHT_FONT, INSIGHT_TOKENS } from './tokens';
import narration from './narration/segments.json';

export const BUSINESS_INSIGHT_SHOTS = {
  thesis: { from: 0, duration: 150 },
  scale: { from: 150, duration: 150 },
  flywheel: { from: 300, duration: 240 },
  formula: { from: 540, duration: 150 },
  flow: { from: 690, duration: 210 },
  evidence: { from: 900, duration: 240 },
  ranking: { from: 1140, duration: 210 },
  share: { from: 1350, duration: 180 },
  comparison: { from: 1530, duration: 240 },
  conclusion: { from: 1770, duration: 150 },
} as const;

export const BUSINESS_INSIGHT_TOTAL = 1920;

const NARRATION: readonly NarrationSegment[] = narration;

export const BusinessInsightMain: React.FC<{ narration?: boolean; bgm?: boolean }> = ({ narration = true }) => (
  <AbsoluteFill style={{ background: `radial-gradient(circle at 55% 10%, #1A2230 0%, ${INSIGHT_TOKENS.bg} 48%)`, overflow: 'hidden' }}>
    <Sequence from={BUSINESS_INSIGHT_SHOTS.thesis.from} durationInFrames={BUSINESS_INSIGHT_SHOTS.thesis.duration}>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 170px' }}>
        <div style={{ color: INSIGHT_TOKENS.amber, fontFamily: INSIGHT_FONT.mono, letterSpacing: '0.22em', fontSize: 22, marginBottom: 28 }}>BUSINESS INSIGHT / EP.00</div>
        <h1 style={{ color: INSIGHT_TOKENS.text, fontFamily: INSIGHT_FONT.serif, fontSize: 104, fontWeight: 500, lineHeight: 1.08, maxWidth: 1500, margin: 0 }}>{musinsa.title}</h1>
        <p style={{ color: INSIGHT_TOKENS.muted, fontFamily: INSIGHT_FONT.sans, fontSize: 31, marginTop: 36 }}>{musinsa.subtitle}</p>
      </div>
    </Sequence>
    <Sequence from={BUSINESS_INSIGHT_SHOTS.scale.from} durationInFrames={BUSINESS_INSIGHT_SHOTS.scale.duration}>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><KPIStat value={musinsa.scale.value} suffix={musinsa.scale.suffix} label={musinsa.scale.label} delta={{ value: musinsa.scale.delta, direction: 'up' }} durationInFrames={BUSINESS_INSIGHT_SHOTS.scale.duration} /></div>
      <SourceNote source="样片占位数据；需以经核验的公开财报或研究资料替换" caveat="非真实披露值" />
    </Sequence>
    <Sequence from={BUSINESS_INSIGHT_SHOTS.flywheel.from} durationInFrames={BUSINESS_INSIGHT_SHOTS.flywheel.duration}>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'translateY(-96px)' }}><Flywheel nodes={musinsa.flywheel.nodes} durationInFrames={BUSINESS_INSIGHT_SHOTS.flywheel.duration} /></div>
    </Sequence>
    <Sequence from={BUSINESS_INSIGHT_SHOTS.formula.from} durationInFrames={BUSINESS_INSIGHT_SHOTS.formula.duration}>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FormulaReveal tokens={musinsa.formula.tokens.map((text, index) => ({ text, type: text === '×' || text === '=' ? 'operator' : index === musinsa.formula.tokens.length - 1 ? 'result' : 'term', accent: index === musinsa.formula.tokens.length - 1 }))} durationInFrames={BUSINESS_INSIGHT_SHOTS.formula.duration} caption="把结论拆回可验证的变量" /></div>
    </Sequence>
    <Sequence from={BUSINESS_INSIGHT_SHOTS.flow.from} durationInFrames={BUSINESS_INSIGHT_SHOTS.flow.duration}>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'translateY(-50px)' }}><FlowDiagram steps={musinsa.flow.steps} durationInFrames={BUSINESS_INSIGHT_SHOTS.flow.duration} title="从信号到可复用的决策" /></div>
    </Sequence>
    <Sequence from={BUSINESS_INSIGHT_SHOTS.evidence.from} durationInFrames={BUSINESS_INSIGHT_SHOTS.evidence.duration}>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><LineChart data={musinsa.turnover.series} xLabels={musinsa.turnover.xLabels} label={musinsa.turnover.label} durationInFrames={BUSINESS_INSIGHT_SHOTS.evidence.duration} /></div>
      <SourceNote source={musinsa.turnover.source} caveat={musinsa.turnover.caveat} />
    </Sequence>
    <Sequence from={BUSINESS_INSIGHT_SHOTS.ranking.from} durationInFrames={BUSINESS_INSIGHT_SHOTS.ranking.duration}>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'translateY(-50px)' }}><BarRank title={musinsa.ranking.title} items={musinsa.ranking.items} durationInFrames={BUSINESS_INSIGHT_SHOTS.ranking.duration} valueSuffix="" /></div>
      <SourceNote source="样片占位结构；排名与权重应替换为可复核分析结果" />
    </Sequence>
    <Sequence from={BUSINESS_INSIGHT_SHOTS.share.from} durationInFrames={BUSINESS_INSIGHT_SHOTS.share.duration}>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'translateY(-60px)' }}><ShareStack title={musinsa.share.title} segments={musinsa.share.segments} durationInFrames={BUSINESS_INSIGHT_SHOTS.share.duration} /></div>
      <SourceNote source="样片占位结构；构成须以同一分母、同一期间的数据计算" />
    </Sequence>
    <Sequence from={BUSINESS_INSIGHT_SHOTS.comparison.from} durationInFrames={BUSINESS_INSIGHT_SHOTS.comparison.duration}>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'translateY(-130px)' }}><CompareMatrix columns={musinsa.comparison.columns} rows={musinsa.comparison.rows} cells={musinsa.comparison.cells} durationInFrames={BUSINESS_INSIGHT_SHOTS.comparison.duration} /></div>
    </Sequence>
    <Sequence from={BUSINESS_INSIGHT_SHOTS.conclusion.from} durationInFrames={BUSINESS_INSIGHT_SHOTS.conclusion.duration}>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 240px', textAlign: 'center' }}>
        <div style={{ color: INSIGHT_TOKENS.amber, fontFamily: INSIGHT_FONT.mono, fontSize: 20, letterSpacing: '0.2em', marginBottom: 34 }}>THE TAKEAWAY</div>
        <div style={{ color: INSIGHT_TOKENS.text, fontFamily: INSIGHT_FONT.serif, fontSize: 78, lineHeight: 1.22 }}>{musinsa.conclusion}</div>
      </div>
    </Sequence>
    <NarrationTrack segments={NARRATION} enabled={narration} />
  </AbsoluteFill>
);
