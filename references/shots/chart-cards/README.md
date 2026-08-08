# 商业洞察信息图谱

该库现有 **50 个核心信息图组件**。每个组件只服务一种主判断；数据、期间、分母与来源由使用方通过 `SourceNote` 同屏标注。

| 判断类型 | 组件 |
| --- | --- |
| 焦点、趋势、排序 | KPIStat、LineChart、BarRank、DotPlot |
| 结构、目标、变化 | ShareStack、BulletChart、Waterfall、Dumbbell |
| 比较与分布 | SlopeGraph、RangeBand、Distribution、PopulationPyramid、CompareMatrix |
| 路径与机制 | Funnel、Timeline、FlowDiagram、SankeyFlow、Flywheel、FormulaReveal |
| 二维模式 | Heatmap |
| 金融与经营 | Candlestick、IndexedLine、BumpChart、ScatterPlot、WaffleChart、Marimekko、CohortRetention、SmallMultiples、ScenarioFan、SparkTable |
| 规模、排序与对比 | AreaTrend、GroupedBars、DivergingBars、LollipopChart、ParetoChart |
| 分布与密度 | BoxWhisker、Histogram、BeeswarmStrip、HexbinDensity、DensityContour |
| 波动、敏感性与拆解 | BollingerBand、TornadoSensitivity、DecompositionTree |
| 层级与关系 | Treemap、Sunburst、RadialTree、NetworkGraph、ChordDiagram |
| 项目与日级节奏 | GanttSchedule、CalendarHeatmap |

选型原则：连续时间使用 LineChart 或 AreaTrend；仅比较两个时点使用 SlopeGraph 或 Dumbbell；需要解释增减使用 Waterfall；需要展示从哪来、流向哪去时使用 SankeyFlow 或 ChordDiagram；需要识别少数关键问题时使用 ParetoChart；需要展示不确定性时使用 ScenarioFan 或 BollingerBand；不可用装饰性的图形替代没有数据定义的判断。

约束：Radar、地图、词云等高误读风险样式不作为默认组件。地理问题应由真实行政区边界、口径校验和绝对量/比率校验共同驱动，而不是用示意数据填充。

渲染预览：`npm run render:business-insight-atlas`。入口编排为 `BusinessInsightAtlas`，每张卡片保留 4 秒阅读窗口，50 张卡片共 200 秒，不依赖任何特定品牌数据。
