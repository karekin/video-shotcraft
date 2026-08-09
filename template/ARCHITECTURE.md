# 内容引擎架构

这个模板把可变的内容与稳定的渲染逻辑分开：

```text
Episode（选题、脚本、旁白、来源、素材）
  + Format（镜头语法与信息结构）
  + Style pack（颜色、字体、动效 token、组件）
  + Render target（画幅、帧率、安全区）
  -> Composition -> MP4 / PNG
```

## 新建一条视频

1. 在 `src/episodes/` 新建一个数据文件，使用 `defineEpisode()`；旁白 `from` 与 `duration` 是字幕、音频与镜头的唯一时间来源。
2. 选择已有 `format` 与 `stylePack`。同一格式可以换不同主体，换风格包无需复制选题数据。
3. 在 `src/video-styles/registry.ts` 注册一个 composition；只在这里选画幅与默认 episode。
4. 使用下面的命令先渲染关键帧，再渲染成片。发布前逐项审核来源、免责声明、商标和素材许可。

```bash
npm run check
npx remotion still src/index.ts TechExplainerCodexAmazonAPlus /tmp/preview.png --frame=330
npm run render:tech-explainer
```

## 增加新能力的边界

- 新**主体/选题**：只增加 episode 数据；不要复制或修改现有时间线。
- 新**表达结构**（例如数据复盘、四步教程、产品拆解）：增加一个 format。
- 新**视觉语言**：增加一个 style pack，封装 tokens、卡片、动效与使用边界。
- 新**画幅**：为 format 增加明确的 portrait 布局；`RenderTarget` 仅定义尺寸与安全区，不应把横版画面硬裁成竖版。

`BusinessInsightsMusinsa` 是迁移后的兼容入口；它仍输出原来的商业洞察成片。`TechExplainerCodexAmazonAPlus` 是无真人的 2.5D 信息动效参考入口。
