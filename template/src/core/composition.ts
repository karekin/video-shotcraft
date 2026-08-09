import type React from 'react';
import type { RenderTargetId } from './contracts';

export type VideoStyleId = 'software-intro' | 'business-insight' | 'tech-explainer';

export type VideoFormatId = 'product-demo' | 'business-insight' | 'tech-explainer' | 'visual-atlas';

export type VideoCompositionRoute = {
  id: string;
  style: VideoStyleId;
  format: VideoFormatId;
  target: RenderTargetId;
  title: string;
  description: string;
  // `never` prevents a heterogeneous registry from becoming an `any` escape
  // hatch. Composition-specific props are validated where it is registered.
  component: React.ComponentType<never>;
  durationInFrames: number;
  defaultProps?: unknown;
};

export type VideoStyleDefinition = {
  id: VideoStyleId;
  title: string;
  narrativeDriver: 'product-demo' | 'voiceover-and-evidence' | 'script-and-kinetic-graphics';
  dataContract: 'screenshots-optional' | 'source-and-caveat-required' | 'script-and-asset-manifest-required';
  audioMix: 'sfx-led' | 'narration-led' | 'narration-or-tts';
};

export const defineComposition = <Props extends object>(route: Omit<VideoCompositionRoute, 'component' | 'defaultProps'> & {
  component: React.ComponentType<Props>;
  defaultProps?: Props;
}): VideoCompositionRoute => ({
  ...route,
  component: route.component as React.ComponentType<never>,
  defaultProps: route.defaultProps,
});
