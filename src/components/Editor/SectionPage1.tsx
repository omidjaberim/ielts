import React from 'react';
import {
  User,
  Calendar,
  Clock,
  Target,
  AlertTriangle,
  Lightbulb,
  Package,
  BookOpen,
  Award,
  GraduationCap,
  Users,
  CheckCircle2,
  Hash,
} from 'lucide-react';
import { LessonMetadata, LessonAims } from '../../types';
import { FieldLabel } from '../FieldLabel';

interface SectionPage1Props {
  metadata: LessonMetadata;
  onChangeMetadata: (metadata: LessonMetadata) => void;
  aims: LessonAims;
  onChangeAims: (aims: LessonAims) => void;
}

export const SectionPage1: React.FC<SectionPage1Props> = ({
  metadata,
  onChangeMetadata,
  aims,
  onChangeAims,
}) => {
  const handleMetaChange = (field: keyof LessonMetadata, value: string) => {
    onChangeMetadata({ ...metadata, [field]: value });
  };

  const handleAimsChange = (field: keyof LessonAims, value: string) => {
    onChangeAims({ ...aims, [field]: value });
  };

  return (
    <div className="space-y-6">
      {/* Overview & Metadata Grid */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-200 px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-blue-600" />
            <h3 className="font-semibold text-slate-800 text-sm">Document Overview & Trainee Information</h3>
          </div>
          <span className="text-xs font-medium text-slate-500">Page 1 • Cover Details</span>
        </div>

        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <FieldLabel
              label="Trainee Name (NAME)"
              icon={User}
              explanation="Full legal or professional name of the student teacher / candidate delivering the teaching practice session."
              examples={['Alex Morgan', 'Maria Santos', 'John Smith']}
            />
            <input
              type="text"
              value={metadata.traineeName}
              onChange={(e) => handleMetaChange('traineeName', e.target.value)}
              placeholder="e.g. Alex Morgan"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-hidden font-serif"
            />
          </div>

          <div>
            <FieldLabel
              label="CEFR Level (LEVEL)"
              icon={Award}
              explanation="The standard Common European Framework of Reference level of the student group being taught."
              examples={['Pre-Intermediate (A2)', 'Intermediate (B1)', 'Upper-Intermediate (B2)']}
            />
            <input
              type="text"
              value={metadata.level}
              onChange={(e) => handleMetaChange('level', e.target.value)}
              placeholder="e.g. Upper-Intermediate (B2)"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-hidden font-serif"
            />
          </div>

          <div>
            <FieldLabel
              label="Tutor / Trainer (TUTOR)"
              icon={GraduationCap}
              explanation="Name of the course supervisor, CELTA tutor, or senior observer evaluating this lesson."
              examples={['Dr. Sarah Jenkins', 'Prof. David Miller', 'Ms. Emma Watson']}
            />
            <input
              type="text"
              value={metadata.tutor}
              onChange={(e) => handleMetaChange('tutor', e.target.value)}
              placeholder="e.g. Dr. Sarah Jenkins"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-hidden font-serif"
            />
          </div>

          <div>
            <FieldLabel
              label="Date (DATE)"
              icon={Calendar}
              explanation="The scheduled date on which this teaching practice session is delivered."
              examples={['2026-08-05', '12 October 2026']}
            />
            <div className="relative">
              <input
                type="date"
                value={metadata.date}
                onChange={(e) => handleMetaChange('date', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-hidden font-serif"
              />
              <Calendar className="w-4 h-4 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
            </div>
          </div>

          <div>
            <FieldLabel
              label="Students Count (STS#)"
              icon={Users}
              explanation="Expected or actual number of learners present in the classroom."
              examples={['12 students', '14 (7 male, 7 female)']}
            />
            <input
              type="text"
              value={metadata.studentCount}
              onChange={(e) => handleMetaChange('studentCount', e.target.value)}
              placeholder="e.g. 14"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-hidden font-serif"
            />
          </div>

          <div>
            <FieldLabel
              label="Duration (LENGTH)"
              icon={Clock}
              explanation="Total planned time allocation for the lesson in minutes."
              examples={['45 mins', '60 mins', '90 mins']}
            />
            <div className="relative">
              <input
                type="text"
                value={metadata.lengthMins}
                onChange={(e) => handleMetaChange('lengthMins', e.target.value)}
                placeholder="45"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-hidden font-serif"
              />
              <Clock className="w-4 h-4 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
            </div>
          </div>

          <div>
            <FieldLabel
              label="Teaching Practice # (TP#)"
              icon={CheckCircle2}
              explanation="The specific teaching practice number within your course sequence."
              examples={['TP 1 (Unobserved)', 'TP 3 (Evaluated)', 'TP 6 (Final)']}
            />
            <input
              type="text"
              value={metadata.tpNumber}
              onChange={(e) => handleMetaChange('tpNumber', e.target.value)}
              placeholder="e.g. TP 1"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-hidden font-serif"
            />
          </div>

          <div>
            <FieldLabel
              label="Lesson Plan Code"
              icon={Hash}
              explanation="Internal course reference or lesson identifier code."
              examples={['LP-01-B2', 'CELTA-TP3-2026']}
            />
            <input
              type="text"
              value={metadata.lessonPlanNumber}
              onChange={(e) => handleMetaChange('lessonPlanNumber', e.target.value)}
              placeholder="e.g. LP-01-B2"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-hidden font-serif"
            />
          </div>
        </div>
      </div>

      {/* Main & Subsidiary Aims */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-200 px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-emerald-700" />
            <h3 className="font-semibold text-slate-800 text-sm">Lesson Aims & Objectives</h3>
          </div>
        </div>

        <div className="p-5 space-y-4">
          <div>
            <FieldLabel
              label="Main Lesson Aim"
              required
              explanation="The primary learning outcome of the lesson expressed in student-centered, measurable terms ('By the end of the lesson, students will be able to...')."
              examples={[
                'By the end of the lesson, Ss will be able to talk about ongoing past actions using Present Perfect Continuous in a 5-minute pair interview.',
                'By the end of the lesson, Ss will be able to read an authentic news article for main ideas and specific details.',
              ]}
            />
            <textarea
              rows={3}
              value={aims.mainAims}
              onChange={(e) => handleAimsChange('mainAims', e.target.value)}
              placeholder="By the end of the lesson students will be able to..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-hidden font-serif"
            />
          </div>

          <div>
            <FieldLabel
              label="Subsidiary Aim(s)"
              explanation="Secondary language skills, sub-skills, or grammatical structures practiced as stepping stones toward achieving the main aim."
              examples={[
                '1. Practice listening for specific information in an audio dialogue.',
                '2. Distinguish prepositions "for" vs "since" in duration sentences.',
              ]}
            />
            <textarea
              rows={2}
              value={aims.subsidiaryAims}
              onChange={(e) => handleAimsChange('subsidiaryAims', e.target.value)}
              placeholder="Secondary aims (e.g. practice listening for detail, review temporal prepositions...)"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-hidden font-serif"
            />
          </div>
        </div>
      </div>

      {/* Materials & Assumptions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
          <div className="bg-slate-50 border-b border-slate-200 px-5 py-3 flex items-center gap-2">
            <Package className="w-4 h-4 text-emerald-700" />
            <h3 className="font-semibold text-slate-800 text-sm">Materials & Flashcards</h3>
          </div>
          <div className="p-5">
            <FieldLabel
              label="Required Lesson Materials"
              icon={Package}
              explanation="Full inventory of physical coursebooks, audio/video tracks, worksheets, realia, slides, or board markers needed."
              examples={[
                'Coursebook English File B2 (pp. 42-43)',
                'Audio track 2.14 & projector',
                'Handout 1: Gap-fill exercise (15 copies)',
              ]}
            />
            <textarea
              rows={4}
              value={aims.materials}
              onChange={(e) => handleAimsChange('materials', e.target.value)}
              placeholder="List all coursebooks, handouts, slides, audio tracks, or props needed..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-hidden font-serif"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
          <div className="bg-slate-50 border-b border-slate-200 px-5 py-3 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-700" />
            <h3 className="font-semibold text-slate-800 text-sm">Assumptions (Timetable Fit & Student Knowledge)</h3>
          </div>
          <div className="p-5">
            <FieldLabel
              label="Student Background & Timetable Fit"
              icon={BookOpen}
              explanation="What vocabulary, grammar concepts, or skills students are already assumed to know prior to this lesson."
              examples={[
                'Students are already familiar with simple past tense and basic temporal adverbs.',
                'Students have studied Unit 3 travel vocabulary in yesterday’s session.',
              ]}
            />
            <textarea
              rows={4}
              value={aims.assumptions}
              onChange={(e) => handleAimsChange('assumptions', e.target.value)}
              placeholder="Presumed student prior knowledge and timetable sequence fit..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all outline-hidden font-serif"
            />
          </div>
        </div>
      </div>

      {/* Anticipated Problems & Possible Solutions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-xs border border-amber-200 overflow-hidden">
          <div className="bg-amber-50/80 border-b border-amber-200 px-5 py-3 flex items-center gap-2 text-amber-900">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <h3 className="font-semibold text-sm">Anticipated Problems</h3>
          </div>
          <div className="p-5">
            <FieldLabel
              label="Anticipated Difficulties"
              icon={AlertTriangle}
              explanation="Potential grammatical, pronunciation, vocabulary, or classroom management obstacles students may encounter."
              examples={[
                '1. Pronunciation: Weak sound of "been" pronounced /biːn/ instead of /bɪn/.',
                '2. Meaning: Confusing "since" (point in time) with "for" (duration).',
              ]}
            />
            <textarea
              rows={5}
              value={aims.anticipatedProblems}
              onChange={(e) => handleAimsChange('anticipatedProblems', e.target.value)}
              placeholder="Potential grammatical, phonological, or management difficulties students might face..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all outline-hidden font-serif"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-xs border border-emerald-200 overflow-hidden">
          <div className="bg-emerald-50/80 border-b border-emerald-200 px-5 py-3 flex items-center gap-2 text-emerald-900">
            <Lightbulb className="w-4 h-4 text-emerald-600" />
            <h3 className="font-semibold text-sm">Possible Solutions</h3>
          </div>
          <div className="p-5">
            <FieldLabel
              label="Planned Teacher Solutions"
              icon={Lightbulb}
              explanation="Concrete instructional techniques or board work the teacher will use to pre-empt or resolve each anticipated problem."
              examples={[
                '1. Drill weak schwa form /bɪn/ during choral repetition.',
                '2. Draw clear timeline diagrams on board contrasting point-in-time vs duration.',
              ]}
            />
            <textarea
              rows={5}
              value={aims.possibleSolutions}
              onChange={(e) => handleAimsChange('possibleSolutions', e.target.value)}
              placeholder="How the teacher will address and remediate each anticipated problem..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-hidden font-serif"
            />
          </div>
        </div>
      </div>

      {/* Personal Aims */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-200 px-5 py-3 flex items-center gap-2">
          <Target className="w-4 h-4 text-emerald-800" />
          <h3 className="font-semibold text-slate-800 text-sm">My Personal Aim(s)</h3>
        </div>
        <div className="p-5">
          <FieldLabel
            label="Personal Development Focus"
            icon={Target}
            explanation="Personal teaching targets set by the candidate for professional growth during this TP."
            examples={[
              'Reduce Teacher Talking Time (TTT) during instructions to under 20%.',
              'Use clear Instruction Checking Questions (ICQs) before handing out materials.',
              'Improve board layout with color-coded grammar markers.',
            ]}
          />
          <textarea
            rows={3}
            value={aims.personalAims}
            onChange={(e) => handleAimsChange('personalAims', e.target.value)}
            placeholder="e.g. Reduce TTT during instructions, use CCQs effectively, improve board layout..."
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-hidden font-serif"
          />
        </div>
      </div>
    </div>
  );
};

