export interface InstituteBranding {
  instituteName: string;
  department: string;
  address: string;
  phone: string;
  website: string;
  logoUrl?: string;
}

export interface LessonMetadata {
  traineeName: string;
  level: string;
  tutor: string;
  date: string;
  studentCount: string; // STS#
  lengthMins: string; // LENGTH
  tpNumber: string; // TP#
  lessonPlanNumber: string; // Lesson plan#
}

export interface LessonAims {
  mainAims: string; // By the end of the lesson students will be able to...
  subsidiaryAims: string;
  materials: string;
  assumptions: string; // Timetable fit and presumed student knowledge
  anticipatedProblems: string;
  possibleSolutions: string;
  personalAims: string;
}

export interface LanguageAnalysis {
  focusMode?: 'A' | 'B' | 'C' | 'ALL';
  tenseItem: string;
  form: string;
  meaningUse: string;
  phonology: string;
  vocabulary: string;
}

export interface SkillsFocus {
  reading: boolean;
  listening: boolean;
  writing: boolean;
  speaking: boolean;
  specificSkills: string;
  preTeachVocab: string;
}

export interface LessonStage {
  id: string;
  stageName?: string; // Dropdown option (e.g. Lead-in, Presentation, Practice, etc.)
  stageAndAim: string;
  procedureAndInstructions: string;
  timeMins: number | string;
  interactionMode: string; // e.g. T-S, S-S, Pair work, Group work
}

export interface TrainerFeedback {
  reminders: string;
  aimsComments: string;
  stagesComments: string;
  languageAnalysisComments: string;
  trainerName: string;
  grade: string;
  dateEvaluated: string;
}

export interface LessonPlanData {
  branding: InstituteBranding;
  metadata: LessonMetadata;
  aims: LessonAims;
  languageAnalysis: LanguageAnalysis;
  skillsFocus: SkillsFocus;
  overallAim: string;
  stages: LessonStage[];
  feedback: TrainerFeedback;
}
