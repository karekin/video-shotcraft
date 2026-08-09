import { defineEpisode } from '../core/contracts';
import type { TechExplainerContent } from '../formats/tech-explainer/types';

export const codexAmazonAPlusEpisode = defineEpisode<'tech-explainer', TechExplainerContent>({
  schemaVersion: 1,
  id: 'codex-amazon-a-plus-workflow',
  format: 'tech-explainer',
  stylePack: 'tech-grid',
  subject: 'Codex × Amazon A+ 页面',
  title: '用 Codex 自动化生成亚马逊 A+ 页面',
  narration: [
    { id: 'hook', from: 0, duration: 150, text: '不用真人出镜，也能把一个跨境运营工作流讲清楚。关键不是堆 AI 镜头，而是让信息自己动起来。', source: '脚本草案' },
    { id: 'command', from: 150, duration: 150, text: '第一步，把目标、素材和限制写成明确指令。AI 负责展开任务，人只保留关键判断。', source: '工作流示例' },
    { id: 'research', from: 300, duration: 150, text: '第二步，让工作流收集页面证据、竞品结构和产品卖点，并把来源写回每一个结论。', source: '工作流示例' },
    { id: 'compose', from: 450, duration: 150, text: '第三步，用固定风格包把内容编排成图卡、页面、字幕和节奏，而不是让模型直接画带文字的图片。', source: '制作方法' },
    { id: 'render', from: 600, duration: 150, text: '最后，Remotion 根据同一份脚本渲染横版、竖版和封面。你只需要审核事实和品牌表达。', source: '制作方法' },
  ],
  sources: [
    { label: '内部工作流示例', caveat: '示例不构成平台效果或转化率承诺。' },
  ],
  content: {
    kicker: 'AI NATIVE EXPLAINER / NO HUMAN REQUIRED',
    headline: 'Codex 做跨境运营的',
    accent: '含金量',
    boardLabel: 'AUTOMATED CONTENT WORKFLOW',
    steps: [
      { label: '输入指令', english: 'Enter command', detail: '目标、素材、约束、受众', command: '生成 A+ 页面策略和镜头脚本' },
      { label: '采集证据', english: 'Gather evidence', detail: '页面、数据、来源与 caveat' },
      { label: '编排视觉', english: 'Compose visuals', detail: '卡片、图表、字幕、节奏' },
      { label: '一键渲染', english: 'Render variants', detail: '横版、竖版、封面、字幕' },
    ],
    takeaway: '把“讲解视频”变成可审核、可复用、可批量迭代的内容系统。',
  },
});
