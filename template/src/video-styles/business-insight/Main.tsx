import { durationFromNarration } from '../../core/contracts';
import { musinsaStandardEpisode } from '../../episodes/musinsa-standard';
import { getBusinessInsightShots } from '../../formats/business-insight/BusinessInsightFormat';
export { BusinessInsightFormat as BusinessInsightMain, getBusinessInsightShots } from '../../formats/business-insight/BusinessInsightFormat';

/** Compatibility exports for existing render scripts and downstream imports. */
export const BUSINESS_INSIGHT_SHOTS = getBusinessInsightShots(musinsaStandardEpisode);
export const BUSINESS_INSIGHT_TOTAL = durationFromNarration(musinsaStandardEpisode.narration);
