import { AbsoluteFill, Audio, Sequence, staticFile } from 'remotion';
import { musinsaStandardEpisode } from '../../episodes/musinsa-standard';
import { CompareMatrix } from '../../video-styles/business-insight/chartlib/CompareMatrix';
import { BarRank } from '../../video-styles/business-insight/chartlib/BarRank';
import { Flywheel } from '../../video-styles/business-insight/chartlib/Flywheel';
import { FlowDiagram } from '../../video-styles/business-insight/chartlib/FlowDiagram';
import { FormulaReveal } from '../../video-styles/business-insight/chartlib/FormulaReveal';
import { KPIStat } from '../../video-styles/business-insight/chartlib/KPIStat';
import { LineChart } from '../../video-styles/business-insight/chartlib/LineChart';
import { ShareStack } from '../../video-styles/business-insight/chartlib/ShareStack';
import { SourceNote } from '../../video-styles/business-insight/chartlib/SourceNote';
import { NarrationTrack } from '../../video-styles/business-insight/narration/NarrationTrack';
import { INSIGHT_FONT, INSIGHT_TOKENS } from '../../video-styles/business-insight/tokens';
import type { Episode } from '../../core/contracts';
import type { BusinessInsightContent } from './types';

export type BusinessInsightProps = {
  episode?: Episode<'business-insight', BusinessInsightContent>;
  narration?: boolean;
  bgm?: boolean;
};

const shotAt = (episode: Episode<'business-insight', BusinessInsightContent>, index: number) => {
  const segment = episode.narration[index];
  if (!segment) throw new Error(`Business insight episode "${episode.id}" is missing segment ${index}.`);
  return { from: segment.from, duration: segment.duration };
};

export const getBusinessInsightShots = (episode: Episode<'business-insight', BusinessInsightContent>) => ({
  thesis: shotAt(episode, 0), scale: shotAt(episode, 1), flywheel: shotAt(episode, 2), formula: shotAt(episode, 3),
  flow: shotAt(episode, 4), inventory: shotAt(episode, 5), stores: shotAt(episode, 6), revenueMix: shotAt(episode, 7),
  comparison: shotAt(episode, 8), conclusion: shotAt(episode, 9),
});

/** A reusable evidence-led format. Topic-specific facts live only in `episode`. */
export const BusinessInsightFormat: React.FC<BusinessInsightProps> = ({
  episode = musinsaStandardEpisode,
  narration = true,
  bgm = true,
}) => {
  const shots = getBusinessInsightShots(episode);
  const data = episode.content;

  return (
    <AbsoluteFill style={{ background: `radial-gradient(circle at 55% 10%, #1A2230 0%, ${INSIGHT_TOKENS.bg} 48%)`, overflow: 'hidden' }}>
      {bgm && <Audio src={staticFile('audio/bgm-tech-house.mp3')} volume={0.055} />}
      <Sequence from={shots.thesis.from} durationInFrames={shots.thesis.duration}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 170px' }}>
          <div style={{ color: INSIGHT_TOKENS.amber, fontFamily: INSIGHT_FONT.mono, letterSpacing: '0.22em', fontSize: 22, marginBottom: 28 }}>BUSINESS INSIGHT / EP.01</div>
          <h1 style={{ color: INSIGHT_TOKENS.text, fontFamily: INSIGHT_FONT.serif, fontSize: 104, fontWeight: 500, lineHeight: 1.08, maxWidth: 1500, margin: 0 }}>{data.title}</h1>
          <p style={{ color: INSIGHT_TOKENS.muted, fontFamily: INSIGHT_FONT.sans, fontSize: 31, marginTop: 36 }}>{data.subtitle}</p>
        </div>
      </Sequence>
      <Sequence from={shots.scale.from} durationInFrames={shots.scale.duration}><div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><KPIStat value={data.scale.value} suffix={data.scale.suffix} label={data.scale.label} delta={{ value: data.scale.delta, direction: 'up' }} durationInFrames={shots.scale.duration} /></div><SourceNote source={data.sceneNotes.scale.label} caveat={data.sceneNotes.scale.caveat} /></Sequence>
      <Sequence from={shots.flywheel.from} durationInFrames={shots.flywheel.duration}><div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'translateY(-96px)' }}><Flywheel nodes={data.flywheel.nodes} durationInFrames={shots.flywheel.duration} /></div><SourceNote source={data.sceneNotes.flywheel.label} caveat={data.sceneNotes.flywheel.caveat} /></Sequence>
      <Sequence from={shots.formula.from} durationInFrames={shots.formula.duration}><div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FormulaReveal tokens={data.formula.tokens.map((text, index) => ({ text, type: text === '×' || text === '=' ? 'operator' : index === data.formula.tokens.length - 1 ? 'result' : 'term', accent: index === data.formula.tokens.length - 1 }))} durationInFrames={shots.formula.duration} caption={data.sceneCopy.formulaCaption} /></div><SourceNote source={data.sceneNotes.formula.label} caveat={data.sceneNotes.formula.caveat} /></Sequence>
      <Sequence from={shots.flow.from} durationInFrames={shots.flow.duration}><div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'translateY(-50px)' }}><FlowDiagram steps={data.flow.steps} durationInFrames={shots.flow.duration} title={data.sceneCopy.flowTitle} /></div><SourceNote source={data.sceneNotes.flow.label} caveat={data.sceneNotes.flow.caveat} /></Sequence>
      <Sequence from={shots.inventory.from} durationInFrames={shots.inventory.duration}><div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'translateY(-170px)' }}><LineChart data={data.turnover.series} xLabels={data.turnover.xLabels} label={data.turnover.label} durationInFrames={shots.inventory.duration} /></div><SourceNote source={data.sceneNotes.inventory.label} caveat={data.sceneNotes.inventory.caveat} /></Sequence>
      <Sequence from={shots.stores.from} durationInFrames={shots.stores.duration}><div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'translateY(-50px)' }}><BarRank title={data.ranking.title} items={data.ranking.items} durationInFrames={shots.stores.duration} valueSuffix="家" /></div><SourceNote source={data.sceneNotes.stores.label} caveat={data.sceneNotes.stores.caveat} /></Sequence>
      <Sequence from={shots.revenueMix.from} durationInFrames={shots.revenueMix.duration}><div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'translateY(-60px)' }}><ShareStack title={data.share.title} segments={data.share.segments} durationInFrames={shots.revenueMix.duration} /></div><SourceNote source={data.sceneNotes.revenueMix.label} caveat={data.sceneNotes.revenueMix.caveat} /></Sequence>
      <Sequence from={shots.comparison.from} durationInFrames={shots.comparison.duration}><div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'translateY(-130px)' }}><CompareMatrix columns={data.comparison.columns} rows={data.comparison.rows} cells={data.comparison.cells} durationInFrames={shots.comparison.duration} /></div><SourceNote source={data.sceneNotes.comparison.label} caveat={data.sceneNotes.comparison.caveat} /></Sequence>
      <Sequence from={shots.conclusion.from} durationInFrames={shots.conclusion.duration}><div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 240px', textAlign: 'center' }}><div style={{ color: INSIGHT_TOKENS.amber, fontFamily: INSIGHT_FONT.mono, fontSize: 20, letterSpacing: '0.2em', marginBottom: 34 }}>THE TAKEAWAY</div><div style={{ color: INSIGHT_TOKENS.text, fontFamily: INSIGHT_FONT.serif, fontSize: 78, lineHeight: 1.22 }}>{data.conclusion}</div></div></Sequence>
      <NarrationTrack segments={episode.narration} enabled={narration} />
    </AbsoluteFill>
  );
};
