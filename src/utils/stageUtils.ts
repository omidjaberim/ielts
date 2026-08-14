import { LessonStage } from '../types';

export const STAGE_OPTIONS = [
  'Warm-up',
  'Lead-in',
  'Presentation',
  'Practice',
  'Production',
  'Pre-Reading',
  'Pre-Listening',
  'During-Reading',
  'During-Listening',
  'Post-Reading',
  'Post-Listening',
  'Closure',
  'Plan B',
] as const;

export type StageOption = (typeof STAGE_OPTIONS)[number];

export function getStageName(stage: LessonStage): string {
  if (stage.stageName && STAGE_OPTIONS.includes(stage.stageName as StageOption)) {
    return stage.stageName;
  }

  if (!stage.stageAndAim) return '';

  const textLower = stage.stageAndAim.toLowerCase().trim();

  for (const opt of STAGE_OPTIONS) {
    const optLower = opt.toLowerCase();
    if (textLower.startsWith(optLower) || textLower.includes(optLower)) {
      return opt;
    }
  }

  if (textLower.includes('clarification') || textLower.includes('contextualization')) return 'Presentation';
  if (textLower.includes('controlled')) return 'Practice';
  if (textLower.includes('freer')) return 'Production';
  if (textLower.includes('feedback') || textLower.includes('wrap-up')) return 'Closure';

  return '';
}

export function validateLessonPlanStages(stages: LessonStage[]): {
  isValid: boolean;
  invalidIndices: number[];
} {
  const invalidIndices: number[] = [];
  stages.forEach((stage, idx) => {
    const sName = getStageName(stage);
    if (!sName || !STAGE_OPTIONS.includes(sName as StageOption)) {
      invalidIndices.push(idx);
    }
  });

  return {
    isValid: invalidIndices.length === 0,
    invalidIndices,
  };
}
