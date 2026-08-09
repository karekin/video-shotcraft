import type { SourceCitation } from '../../core/contracts';

export type BusinessInsightScene = 'scale' | 'flywheel' | 'formula' | 'flow' | 'inventory' | 'stores' | 'revenueMix' | 'comparison';

export type BusinessInsightContent = {
  title: string;
  subtitle: string;
  flywheel: { nodes: string[] };
  turnover: { series: number[]; xLabels: string[]; label: string; source: string; caveat: string };
  scale: { value: string; suffix: string; label: string; delta: string };
  formula: { tokens: string[] };
  flow: { steps: { id: string; label: string; detail: string }[] };
  ranking: { title: string; items: { label: string; value: number; accent?: boolean; annotation?: string }[] };
  share: { title: string; segments: { label: string; value: number }[] };
  comparison: { columns: string[]; rows: string[]; cells: string[][] };
  conclusion: string;
  sceneCopy: { formulaCaption: string; flowTitle: string };
  sceneNotes: Record<BusinessInsightScene, SourceCitation>;
};
