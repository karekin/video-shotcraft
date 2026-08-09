import { AiflMain, AIFL_TOTAL } from '../aifl/Main';
import { ToushiMain, TOUSHI_TOTAL } from '../toushi/Main';
import { durationFromNarration } from '../core/contracts';
import { defineComposition, type VideoCompositionRoute, type VideoStyleDefinition, type VideoStyleId } from '../core/composition';
import { musinsaStandardEpisode } from '../episodes/musinsa-standard';
import { codexAmazonAPlusEpisode } from '../episodes/codex-amazon-a-plus';
import { BusinessInsightFormat } from '../formats/business-insight/BusinessInsightFormat';
import { TechExplainerFormat } from '../formats/tech-explainer/TechExplainerFormat';
import { BusinessInsightAtlas, BUSINESS_INSIGHT_ATLAS_TOTAL } from './business-insight/Atlas';

export const VIDEO_STYLES: Record<VideoStyleId, VideoStyleDefinition> = {
  'software-intro': {
    id: 'software-intro',
    title: '软件介绍',
    narrativeDriver: 'product-demo',
    dataContract: 'screenshots-optional',
    audioMix: 'sfx-led',
  },
  'business-insight': {
    id: 'business-insight',
    title: '商业洞察',
    narrativeDriver: 'voiceover-and-evidence',
    dataContract: 'source-and-caveat-required',
    audioMix: 'narration-led',
  },
  'tech-explainer': {
    id: 'tech-explainer',
    title: 'AI 原生技术讲解',
    narrativeDriver: 'script-and-kinetic-graphics',
    dataContract: 'script-and-asset-manifest-required',
    audioMix: 'narration-or-tts',
  },
};

/**
 * The only place that maps a renderable composition to its semantic video style.
 * Add a new style or episode here; do not branch existing timelines by topic.
 */
export const VIDEO_COMPOSITIONS: readonly VideoCompositionRoute[] = [
  defineComposition({
    id: 'AiflPromo',
    style: 'software-intro',
    format: 'product-demo',
    target: 'landscape',
    title: 'AIFL 产品宣传片',
    description: '既有的软件介绍片：真实页面、功能叙事与电影式 SFX。',
    component: AiflMain,
    durationInFrames: AIFL_TOTAL,
  }),
  defineComposition({
    id: 'ToushiEp01',
    style: 'business-insight',
    format: 'business-insight',
    target: 'landscape',
    title: '透视商业 EP.01',
    description: '保留的商业分析样片，作为已有旁白驱动时间线的兼容入口。',
    component: ToushiMain,
    durationInFrames: TOUSHI_TOTAL,
    defaultProps: { bgm: false, sfx: false },
  }),
  defineComposition({
    id: 'BusinessInsightsMusinsa',
    style: 'business-insight',
    format: 'business-insight',
    target: 'landscape',
    title: 'MUSINSA STANDARD：商业模式与供应链',
    description: '基于研究稿的数据、旁白与来源标注同源的商业洞察成片。',
    component: BusinessInsightFormat,
    durationInFrames: durationFromNarration(musinsaStandardEpisode.narration),
    defaultProps: { episode: musinsaStandardEpisode, narration: true, bgm: true },
  }),
  defineComposition({
    id: 'BusinessInsightAtlas',
    style: 'business-insight',
    format: 'visual-atlas',
    target: 'landscape',
    title: '商业洞察信息图谱',
    description: '50 个高复用数据新闻组件的选型、预览与渲染验收入口。',
    component: BusinessInsightAtlas,
    durationInFrames: BUSINESS_INSIGHT_ATLAS_TOTAL,
  }),
  defineComposition({
    id: 'TechExplainerCodexAmazonAPlus',
    style: 'tech-explainer',
    format: 'tech-explainer',
    target: 'landscape',
    title: 'Codex 跨境运营工作流',
    description: '无真人、纯程序化 2.5D 信息动效的 AI 原生技术讲解样片。',
    component: TechExplainerFormat,
    durationInFrames: durationFromNarration(codexAmazonAPlusEpisode.narration),
    defaultProps: { episode: codexAmazonAPlusEpisode, narration: true },
  }),
];

export const getVideoStyle = (styleId: VideoStyleId) => VIDEO_STYLES[styleId];
