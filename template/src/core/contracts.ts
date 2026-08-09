/**
 * Stable, serialisable inputs for an episode. These values are deliberately
 * data-only so an agent can create and validate them without editing a render
 * timeline.
 */
export type RenderTargetId = 'landscape' | 'portrait';

export type RenderTarget = {
  id: RenderTargetId;
  width: number;
  height: number;
  fps: number;
  safeArea: { top: number; right: number; bottom: number; left: number };
};

export const RENDER_TARGETS: Record<RenderTargetId, RenderTarget> = {
  landscape: {
    id: 'landscape',
    width: 1920,
    height: 1080,
    fps: 30,
    safeArea: { top: 72, right: 96, bottom: 86, left: 96 },
  },
  portrait: {
    id: 'portrait',
    width: 1080,
    height: 1920,
    fps: 30,
    safeArea: { top: 118, right: 66, bottom: 184, left: 66 },
  },
};

export type SourceCitation = {
  label: string;
  url?: string;
  caveat?: string;
};

export type AssetManifestEntry = {
  id: string;
  kind: 'image' | 'video' | 'audio' | 'font' | 'logo';
  src: string;
  source?: string;
  license?: string;
  checksum?: string;
};

/** A cue is the single timing source for narration, subtitles, and shots. */
export type NarrationSegment = {
  id?: string;
  from: number;
  duration: number;
  text: string;
  source: string;
  audio?: string;
  audioDurationInFrames?: number;
};

export type Episode<TFormat extends string, TContent> = {
  schemaVersion: 1;
  id: string;
  format: TFormat;
  stylePack: string;
  subject: string;
  title: string;
  narration: readonly NarrationSegment[];
  sources: readonly SourceCitation[];
  assets?: readonly AssetManifestEntry[];
  content: TContent;
};

export const durationFromNarration = (segments: readonly NarrationSegment[]) => {
  if (segments.length === 0) throw new Error('An episode needs at least one narration segment.');
  return segments.reduce((latest, segment) => Math.max(latest, segment.from + segment.duration), 0);
};

export const assertNarrationTimeline = (segments: readonly NarrationSegment[]) => {
  for (const segment of segments) {
    if (!Number.isInteger(segment.from) || segment.from < 0) {
      throw new Error(`Narration segment "${segment.text}" has an invalid start frame.`);
    }
    if (!Number.isInteger(segment.duration) || segment.duration <= 0) {
      throw new Error(`Narration segment "${segment.text}" has an invalid duration.`);
    }
  }
};

export const defineEpisode = <TFormat extends string, TContent>(episode: Episode<TFormat, TContent>) => {
  assertNarrationTimeline(episode.narration);
  return episode;
};
