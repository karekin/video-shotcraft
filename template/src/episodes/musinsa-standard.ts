import { defineEpisode, type NarrationSegment } from '../core/contracts';
import musinsa from '../video-styles/business-insight/data/musinsa.json';
import narration from '../video-styles/business-insight/narration/segments.json';
import type { BusinessInsightContent } from '../formats/business-insight/types';

export const musinsaStandardEpisode = defineEpisode<'business-insight', BusinessInsightContent>({
  schemaVersion: 1,
  id: 'musinsa-standard-supply-chain',
  format: 'business-insight',
  stylePack: 'business-insight-editorial',
  subject: 'MUSINSA STANDARD',
  title: musinsa.title,
  narration: narration as readonly NarrationSegment[],
  sources: [
    { label: 'MUSINSA 公开财务与公告', caveat: '所有金额和口径必须在最终发布前复核。' },
    { label: 'MUSINSA Careers', caveat: '招聘职责只能证明能力建设方向，不证明实际经营结果。' },
  ],
  content: {
    ...musinsa,
    sceneCopy: {
      formulaCaption: '不是单一品牌，而是一套内部商品化机制',
      flowTitle: '从需求信号到生产与库存配置',
    },
    sceneNotes: {
      scale: { label: '研究稿引用的 MUSINSA 2025 年合并财务数据', caveat: '集团口径，非 STANDARD 单独收入' },
      flywheel: { label: '研究稿：平台数据、商品经营、采购、库存、履约与渠道的机制拆解', caveat: '机制框架，不代表各环节已完全自动化' },
      formula: { label: '研究稿的商业模式定义', caveat: '分析框架，不是公司官方表述' },
      flow: { label: 'MUSINSA Careers：MD、Sourcing、SCM/Data 与商品控制相关职责', caveat: '能力建设证据，不披露模型精度与实际 KPI' },
      inventory: { label: musinsa.turnover.source, caveat: musinsa.turnover.caveat },
      stores: { label: 'MUSINSA 官方公告：2025 年 2 月、2025 年末与 2026 年末计划', caveat: '60 家为公司目标，不是已实现门店数' },
      revenueMix: { label: '研究稿引用的 2026 年 Q1 MUSINSA 集团收入构成', caveat: '产品销售含其他自营/PB业务，不能等同于 STANDARD' },
      comparison: { label: '研究稿基于 MUSINSA、SHEIN Group 与 Fast Retailing 的公开资料', caveat: 'MUSINSA 的固定首单阈值未公开' },
    },
  },
});
