import type React from 'react';

export type VideoStyleId = 'software-intro' | 'business-insight';

export type VideoCompositionRoute = {
  id: string;
  style: VideoStyleId;
  title: string;
  description: string;
  component: React.ComponentType<any>;
  durationInFrames: number;
  fps: number;
  width: number;
  height: number;
  defaultProps?: Record<string, unknown>;
};

export type VideoStyleDefinition = {
  id: VideoStyleId;
  title: string;
  narrativeDriver: 'product-demo' | 'voiceover-and-evidence';
  dataContract: 'screenshots-optional' | 'source-and-caveat-required';
  audioMix: 'sfx-led' | 'narration-led';
};
