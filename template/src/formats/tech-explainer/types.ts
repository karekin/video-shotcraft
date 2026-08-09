export type TechExplainerStep = {
  label: string;
  english: string;
  detail: string;
  command?: string;
};

export type TechExplainerContent = {
  kicker: string;
  headline: string;
  accent: string;
  boardLabel: string;
  steps: TechExplainerStep[];
  takeaway: string;
};
