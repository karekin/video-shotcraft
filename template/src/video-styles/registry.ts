import { AiflMain, AIFL_TOTAL } from '../aifl/Main';
import { ToushiMain, TOUSHI_TOTAL } from '../toushi/Main';
import { BusinessInsightMain, BUSINESS_INSIGHT_TOTAL } from './business-insight/Main';
import { BusinessInsightAtlas, BUSINESS_INSIGHT_ATLAS_TOTAL } from './business-insight/Atlas';
import type { VideoCompositionRoute, VideoStyleDefinition, VideoStyleId } from './types';

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
};

/**
 * The only place that maps a renderable composition to its semantic video style.
 * Add a new style or episode here; do not branch existing timelines by topic.
 */
export const VIDEO_COMPOSITIONS: readonly VideoCompositionRoute[] = [
  {
    id: 'AiflPromo',
    style: 'software-intro',
    title: 'AIFL 产品宣传片',
    description: '既有的软件介绍片：真实页面、功能叙事与电影式 SFX。',
    component: AiflMain,
    durationInFrames: AIFL_TOTAL,
    fps: 30,
    width: 1920,
    height: 1080,
  },
  {
    id: 'ToushiEp01',
    style: 'business-insight',
    title: '透视商业 EP.01',
    description: '保留的商业分析样片，作为已有旁白驱动时间线的兼容入口。',
    component: ToushiMain,
    durationInFrames: TOUSHI_TOTAL,
    fps: 30,
    width: 1920,
    height: 1080,
    defaultProps: { bgm: false, sfx: false },
  },
  {
    id: 'BusinessInsightsMusinsa',
    style: 'business-insight',
    title: 'MUSINSA 商业洞察样片',
    description: '数据、旁白和来源标注同源的商业洞察基座演示。',
    component: BusinessInsightMain,
    durationInFrames: BUSINESS_INSIGHT_TOTAL,
    fps: 30,
    width: 1920,
    height: 1080,
    defaultProps: { narration: true, bgm: false },
  },
  {
    id: 'BusinessInsightAtlas',
    style: 'business-insight',
    title: '商业洞察信息图谱',
    description: '50 个高复用数据新闻组件的选型、预览与渲染验收入口。',
    component: BusinessInsightAtlas,
    durationInFrames: BUSINESS_INSIGHT_ATLAS_TOTAL,
    fps: 30,
    width: 1920,
    height: 1080,
  },
];

export const getVideoStyle = (styleId: VideoStyleId) => VIDEO_STYLES[styleId];
