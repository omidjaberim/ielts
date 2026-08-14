import React from 'react';
import { LessonPlanData } from '../../types';
import { CheckSquare, Square, AlertTriangle, Lightbulb, UserCheck, Sparkles, BookOpen } from 'lucide-react';
import { STAGE_OPTIONS, getStageName } from '../../utils/stageUtils';

interface DocumentPageLayoutProps {
  data: LessonPlanData;
  onChangeData?: (data: LessonPlanData) => void;
  isInteractiveCanvas?: boolean;
}

export const DocumentPageLayout: React.FC<DocumentPageLayoutProps> = ({
  data,
  onChangeData,
  isInteractiveCanvas = true,
}) => {
  const { branding, metadata, aims, languageAnalysis, skillsFocus, overallAim, stages, feedback } = data;

  const currentFocusMode = languageAnalysis.focusMode || 'A';
  const isGrammarEditable = currentFocusMode === 'A' || currentFocusMode === 'ALL';
  const isPronVocabEditable = currentFocusMode === 'B' || currentFocusMode === 'ALL';
  const isSkillsEditable = currentFocusMode === 'C' || currentFocusMode === 'ALL';

  // Helper for single skill selection toggle
  const handleSkillSelect = (skillKey: 'reading' | 'listening' | 'writing' | 'speaking') => {
    if (!onChangeData) return;
    const isCurrentlyChecked = skillsFocus[skillKey];
    const newSkillsFocus = {
      ...skillsFocus,
      reading: skillKey === 'reading' ? !isCurrentlyChecked : false,
      listening: skillKey === 'listening' ? !isCurrentlyChecked : false,
      writing: skillKey === 'writing' ? !isCurrentlyChecked : false,
      speaking: skillKey === 'speaking' ? !isCurrentlyChecked : false,
    };
    onChangeData({ ...data, skillsFocus: newSkillsFocus });
  };

  const handleToggleSubSkill = (subSkill: string) => {
    if (!onChangeData) return;
    const currentText = skillsFocus.specificSkills || '';
    const exists = currentText.includes(subSkill);
    let updated = '';
    if (exists) {
      updated = currentText
        .split(',')
        .map((s) => s.trim())
        .filter((s) => s !== subSkill && s.length > 0)
        .join(', ');
    } else {
      updated = currentText.trim()
        ? `${currentText.trim()}, ${subSkill}`
        : subSkill;
    }
    onChangeData({
      ...data,
      skillsFocus: {
        ...skillsFocus,
        specificSkills: updated,
      },
    });
  };

  // Helper to handle inline change if interactive canvas mode is active
  const handleUpdate = (path: string, value: any) => {
    if (!onChangeData) return;
    const newData = JSON.parse(JSON.stringify(data));
    const keys = path.split('.');
    let curr = newData;
    for (let i = 0; i < keys.length - 1; i++) {
      curr = curr[keys[i]];
    }
    curr[keys[keys.length - 1]] = value;
    onChangeData(newData);
  };

  // Common Colorful Header Component for each document page
  const PageHeader = () => (
    <div className="border-b-4 border-emerald-800 pb-3 mb-6 text-center bg-gradient-to-r from-emerald-50/90 via-amber-50/60 to-emerald-50/90 p-4 rounded-t-lg shadow-xs">
      <h1 className="text-xl sm:text-2xl font-black tracking-wide uppercase text-emerald-950 font-sans">
        {branding.instituteName}
      </h1>
      <h2 className="text-sm sm:text-base font-bold text-amber-800 tracking-wider mt-0.5 font-sans">
        {branding.department}
      </h2>
      <p className="text-xs font-medium text-slate-700 mt-1 font-sans">{branding.address}</p>
      <p className="text-xs font-medium text-slate-700 font-sans">
        Tel: {branding.phone} •{' '}
        <span className="text-emerald-800 font-bold underline">{branding.website}</span>
      </p>
    </div>
  );

  return (
    <div className="space-y-8 font-serif text-slate-900 leading-normal select-text">
      {/* ================= PAGE 1 ================= */}
      <div
        data-pdf-page="1"
        className="a4-page bg-white shadow-xl mx-auto p-8 border border-slate-300 rounded-sm max-w-[210mm] min-h-[297mm] flex flex-col justify-between print:shadow-none print:border-none print:p-0 print:m-0"
      >
        <div>
          <PageHeader />

          {/* Title */}
          <div className="text-center my-5">
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-widest text-emerald-950 font-sans underline decoration-amber-500 decoration-4 underline-offset-8">
              Teaching Practice Lesson Plan
            </h2>
          </div>

          {/* Metadata Table */}
          <div className="border-2 border-emerald-900 rounded-md overflow-hidden text-xs font-sans my-5 bg-emerald-50/30 shadow-xs divide-y-2 divide-emerald-900">
            {/* Row 1 */}
            <div className="grid grid-cols-12 divide-x-2 divide-emerald-900">
              <div className="col-span-6 p-2.5">
                <span className="font-extrabold uppercase text-[11px] text-emerald-900 block tracking-wider">
                  TRAINEE NAME:
                </span>
                <input
                  type="text"
                  value={metadata.traineeName}
                  onChange={(e) => handleUpdate('metadata.traineeName', e.target.value)}
                  placeholder="Enter Trainee Name..."
                  className="w-full bg-white/90 font-bold text-slate-900 border border-slate-300 focus:border-amber-600 outline-hidden px-2.5 py-1.5 rounded-xs text-xs mt-1 shadow-2xs"
                />
              </div>
              <div className="col-span-3 p-2.5">
                <span className="font-extrabold uppercase text-[11px] text-emerald-900 block tracking-wider">
                  TUTOR:
                </span>
                <input
                  type="text"
                  value={metadata.tutor}
                  onChange={(e) => handleUpdate('metadata.tutor', e.target.value)}
                  placeholder="Tutor Name"
                  className="w-full bg-white/90 font-bold text-slate-900 border border-slate-300 focus:border-amber-600 outline-hidden px-2.5 py-1.5 rounded-xs text-xs mt-1 shadow-2xs"
                />
              </div>
              <div className="col-span-3 p-2.5">
                <span className="font-extrabold uppercase text-[11px] text-emerald-900 block tracking-wider">
                  LEVEL:
                </span>
                <input
                  type="text"
                  value={metadata.level}
                  onChange={(e) => handleUpdate('metadata.level', e.target.value)}
                  placeholder="e.g. B2 Upper-Int"
                  className="w-full bg-white/90 font-bold text-slate-900 border border-slate-300 focus:border-amber-600 outline-hidden px-2.5 py-1.5 rounded-xs text-xs mt-1 shadow-2xs"
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-12 divide-x-2 divide-emerald-900">
              <div className="col-span-3 p-2.5">
                <span className="font-extrabold uppercase text-[11px] text-emerald-900 block tracking-wider">
                  DATE:
                </span>
                <input
                  type="text"
                  value={metadata.date}
                  onChange={(e) => handleUpdate('metadata.date', e.target.value)}
                  placeholder="YYYY-MM-DD"
                  className="w-full bg-white/90 font-bold text-slate-900 border border-slate-300 focus:border-amber-600 outline-hidden px-2.5 py-1.5 rounded-xs text-xs mt-1 shadow-2xs"
                />
              </div>
              <div className="col-span-3 p-2.5">
                <span className="font-extrabold uppercase text-[11px] text-emerald-900 block tracking-wider">
                  STUDENTS (STS#):
                </span>
                <input
                  type="text"
                  value={metadata.studentCount}
                  onChange={(e) => handleUpdate('metadata.studentCount', e.target.value)}
                  placeholder="Count (e.g. 12)"
                  className="w-full bg-white/90 font-bold text-slate-900 border border-slate-300 focus:border-amber-600 outline-hidden px-2.5 py-1.5 rounded-xs text-xs mt-1 shadow-2xs"
                />
              </div>
              <div className="col-span-3 p-2.5">
                <span className="font-extrabold uppercase text-[11px] text-emerald-900 block tracking-wider">
                  DURATION (LENGTH):
                </span>
                <input
                  type="text"
                  value={metadata.lengthMins}
                  onChange={(e) => handleUpdate('metadata.lengthMins', e.target.value)}
                  placeholder="e.g. 60 mins"
                  className="w-full bg-white/90 font-bold text-slate-900 border border-slate-300 focus:border-amber-600 outline-hidden px-2.5 py-1.5 rounded-xs text-xs mt-1 shadow-2xs"
                />
              </div>
              <div className="col-span-3 p-2.5">
                <span className="font-extrabold uppercase text-[11px] text-emerald-900 block tracking-wider">
                  TP NUMBER (TP#):
                </span>
                <input
                  type="text"
                  value={metadata.tpNumber}
                  onChange={(e) => handleUpdate('metadata.tpNumber', e.target.value)}
                  placeholder="e.g. TP 1"
                  className="w-full bg-white/90 font-bold text-slate-900 border border-slate-300 focus:border-amber-600 outline-hidden px-2.5 py-1.5 rounded-xs text-xs mt-1 shadow-2xs"
                />
              </div>
            </div>
          </div>

          {/* Main Aims & Subsidiary Aims Box */}
          <div className="border-2 border-emerald-800 rounded-md p-4 my-5 space-y-3 font-sans text-xs bg-emerald-50/30 shadow-xs">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-black text-sm text-emerald-950 uppercase tracking-wide">
                  Main Aims:
                </span>
                <span className="text-slate-600 font-medium text-xs">
                  (By the end of the lesson students will be able to...)
                </span>
              </div>
              <textarea
                rows={3}
                value={aims.mainAims}
                onChange={(e) => handleUpdate('aims.mainAims', e.target.value)}
                placeholder="Enter main lesson aims here..."
                className="w-full bg-white p-2.5 border-2 border-emerald-200 rounded-sm text-xs font-serif leading-relaxed text-slate-900 focus:border-amber-600 focus:bg-white outline-hidden resize-y shadow-2xs"
              />
            </div>

            <div className="pt-3 border-t border-emerald-200">
              <span className="font-black text-sm text-emerald-950 uppercase block mb-1 tracking-wide">
                Subsidiary Aim(s):
              </span>
              <textarea
                rows={2}
                value={aims.subsidiaryAims}
                onChange={(e) => handleUpdate('aims.subsidiaryAims', e.target.value)}
                placeholder="Enter subsidiary aims here..."
                className="w-full bg-white p-2.5 border-2 border-emerald-200 rounded-sm text-xs font-serif leading-relaxed text-slate-900 focus:border-amber-600 outline-hidden resize-y shadow-2xs"
              />
            </div>
          </div>

          {/* Materials & Assumptions Box */}
          <div className="border-2 border-amber-800 rounded-md overflow-hidden grid grid-cols-2 divide-x-2 divide-amber-800 my-5 text-xs font-sans bg-amber-50/30 shadow-xs">
            <div className="p-3.5">
              <span className="font-black text-sm uppercase text-amber-950 block mb-1 tracking-wide flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-amber-700" />
                Materials:
              </span>
              <textarea
                rows={4}
                value={aims.materials}
                onChange={(e) => handleUpdate('aims.materials', e.target.value)}
                placeholder="List coursebooks, audio tracks, handouts..."
                className="w-full bg-white border border-amber-300 p-2 text-xs font-serif leading-relaxed text-slate-900 focus:border-amber-600 outline-hidden resize-y rounded-xs"
              />
            </div>
            <div className="p-3.5">
              <span className="font-black text-sm uppercase text-amber-950 block mb-1 tracking-wide">
                Assumptions:
              </span>
              <span className="font-normal text-[11px] text-amber-900 block mb-1">
                (Timetable fit and presumed student knowledge)
              </span>
              <textarea
                rows={4}
                value={aims.assumptions}
                onChange={(e) => handleUpdate('aims.assumptions', e.target.value)}
                placeholder="Enter presumed student background knowledge..."
                className="w-full bg-white border border-amber-300 p-2 text-xs font-serif leading-relaxed text-slate-900 focus:border-amber-600 outline-hidden resize-y rounded-xs"
              />
            </div>
          </div>

          {/* Anticipated Problems & Possible Solutions 2-Column Section */}
          <div className="grid grid-cols-2 gap-4 my-5 text-xs font-sans">
            <div className="border-2 border-rose-700 rounded-md p-3.5 bg-rose-50/40 shadow-xs">
              <span className="font-black text-sm uppercase text-rose-950 block mb-1.5 flex items-center gap-1.5 tracking-wide">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                Anticipated Problems:
              </span>
              <textarea
                rows={4}
                value={aims.anticipatedProblems}
                onChange={(e) => handleUpdate('aims.anticipatedProblems', e.target.value)}
                placeholder="List expected linguistic or task difficulties..."
                className="w-full bg-white border border-rose-200 p-2 text-xs font-serif leading-relaxed text-slate-900 focus:border-rose-600 outline-hidden resize-y rounded-xs"
              />
            </div>
            <div className="border-2 border-teal-700 rounded-md p-3.5 bg-teal-50/40 shadow-xs">
              <span className="font-black text-sm uppercase text-teal-950 block mb-1.5 flex items-center gap-1.5 tracking-wide">
                <Lightbulb className="w-4 h-4 text-teal-600 shrink-0" />
                Possible Solutions:
              </span>
              <textarea
                rows={4}
                value={aims.possibleSolutions}
                onChange={(e) => handleUpdate('aims.possibleSolutions', e.target.value)}
                placeholder="List planned solutions / CCQs / diagrams..."
                className="w-full bg-white border border-teal-200 p-2 text-xs font-serif leading-relaxed text-slate-900 focus:border-teal-600 outline-hidden resize-y rounded-xs"
              />
            </div>
          </div>

          {/* Personal Aim */}
          <div className="mt-5 font-sans text-xs border-2 border-amber-700 bg-amber-50/50 p-3.5 rounded-md shadow-xs">
            <span className="font-black text-sm uppercase text-amber-950 block mb-1 flex items-center gap-1.5 tracking-wide">
              <UserCheck className="w-4 h-4 text-amber-700" />
              My Personal Aim(s):
            </span>
            <textarea
              rows={2}
              value={aims.personalAims}
              onChange={(e) => handleUpdate('aims.personalAims', e.target.value)}
              placeholder="Enter personal teaching development aims (e.g. TTT reduction, ICQs)..."
              className="w-full bg-white p-2 border border-amber-300 rounded-xs text-xs font-serif leading-relaxed text-slate-900 focus:border-amber-600 outline-hidden resize-y"
            />
          </div>
        </div>

        <div className="text-right text-[10px] font-bold text-slate-400 font-sans border-t border-slate-200 pt-2 mt-4">
          Lesson Plan Page 1
        </div>
      </div>

      {/* ================= PAGE 2 ================= */}
      <div
        data-pdf-page="2"
        className="a4-page bg-white shadow-xl mx-auto p-8 border border-slate-300 rounded-sm max-w-[210mm] min-h-[297mm] flex flex-col justify-between print:shadow-none print:border-none print:p-0 print:m-0"
      >
        <div>
          <PageHeader />

          {/* Page 2 Interactive Focus Mode Header Bar */}
          {isInteractiveCanvas && (
            <div className="bg-slate-900 text-slate-100 p-3 rounded-md mb-4 border border-slate-800 font-sans print:hidden shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Page 2 Lesson Focus Mode:
                </span>
                <span className="text-[10px] font-mono text-emerald-300 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                  Active Mode: {currentFocusMode}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 text-[11px]">
                {[
                  { id: 'A', label: 'A: Grammar' },
                  { id: 'B', label: 'B: Vocabulary' },
                  { id: 'C', label: 'C: Skills Focus' },
                ].map((mode) => (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => handleUpdate('languageAnalysis.focusMode', mode.id)}
                    className={`px-2.5 py-1.5 rounded text-left font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
                      currentFocusMode === mode.id
                        ? 'bg-emerald-900 text-amber-200 border-emerald-500 ring-1 ring-emerald-400'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                    }`}
                  >
                    <input
                      type="radio"
                      readOnly
                      checked={currentFocusMode === mode.id}
                      className="accent-emerald-500 shrink-0 cursor-pointer"
                    />
                    <span className="truncate">{mode.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-emerald-900 text-white p-3 rounded-md shadow-sm mb-5 flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-wider font-sans text-amber-300">
              Language Analysis
            </h2>
            <span className="text-xs font-semibold text-emerald-200 font-sans">
              (Required for every lesson)
            </span>
          </div>

          <div className="space-y-4 font-sans text-xs my-4">
            {/* Grammar Section (Editable in Option A & ALL) */}
            <div className={`space-y-4 ${!isGrammarEditable ? 'opacity-40 pointer-events-none bg-slate-100/80 p-2 rounded border border-slate-300' : ''}`}>
              {!isGrammarEditable && (
                <div className="text-[10px] font-bold text-amber-900 bg-amber-100/90 px-2 py-0.5 rounded border border-amber-300 inline-block mb-1">
                  🔒 Grammar section greyed out (Focus Mode {currentFocusMode}). Select Option A or ALL to edit.
                </div>
              )}
              <div className="border-2 border-emerald-300 bg-emerald-50/40 p-3 rounded-md">
                <span className="font-black text-sm uppercase text-emerald-950 block mb-1 tracking-wide">
                  Language Tense / Item:
                </span>
                <input
                  type="text"
                  disabled={!isGrammarEditable}
                  value={languageAnalysis.tenseItem}
                  onChange={(e) => handleUpdate('languageAnalysis.tenseItem', e.target.value)}
                  placeholder="Enter target structure (e.g. Present Perfect Continuous)..."
                  className="w-full bg-white border border-emerald-300 p-2 rounded-xs font-serif text-slate-900 focus:border-amber-600 outline-hidden text-xs disabled:bg-slate-200 disabled:text-slate-500"
                />
              </div>

              <div className="border-2 border-teal-300 bg-teal-50/40 p-3 rounded-md">
                <span className="font-black text-sm uppercase text-teal-950 block mb-1 tracking-wide">
                  Form breakdown:
                </span>
                <p className="text-[11px] text-teal-800 mb-1">
                  (e.g., Sub + have/has + been + Verb-ing)
                </p>
                <textarea
                  rows={3}
                  disabled={!isGrammarEditable}
                  value={languageAnalysis.form}
                  onChange={(e) => handleUpdate('languageAnalysis.form', e.target.value)}
                  placeholder="Enter detailed grammatical form..."
                  className="w-full bg-white border border-teal-300 p-2 rounded-xs font-mono text-slate-900 focus:border-teal-600 outline-hidden text-xs disabled:bg-slate-200 disabled:text-slate-500"
                />
              </div>

              <div className="border-2 border-amber-300 bg-amber-50/40 p-3 rounded-md">
                <span className="font-black text-sm uppercase text-amber-950 block mb-1 tracking-wide">
                  Meaning / Use:
                </span>
                <p className="text-[11px] text-amber-800 mb-1">
                  (e.g., To describe ongoing duration from past up to now)
                </p>
                <textarea
                  rows={3}
                  disabled={!isGrammarEditable}
                  value={languageAnalysis.meaningUse}
                  onChange={(e) => handleUpdate('languageAnalysis.meaningUse', e.target.value)}
                  placeholder="Enter meaning and functional context..."
                  className="w-full bg-white border border-amber-300 p-2 rounded-xs font-serif text-slate-900 focus:border-amber-600 outline-hidden text-xs disabled:bg-slate-200 disabled:text-slate-500"
                />
              </div>
            </div>

            {/* Pronunciation & Lexis Section (Editable in Option B & ALL) */}
            <div className={`space-y-4 ${!isPronVocabEditable ? 'opacity-40 pointer-events-none bg-slate-100/80 p-2 rounded border border-slate-300' : ''}`}>
              {!isPronVocabEditable && (
                <div className="text-[10px] font-bold text-amber-900 bg-amber-100/90 px-2 py-0.5 rounded border border-amber-300 inline-block mb-1">
                  🔒 Phonology & Lexis greyed out (Focus Mode {currentFocusMode}). Select Option B or ALL to edit.
                </div>
              )}
              <div className="border-2 border-stone-300 bg-stone-100/60 p-3 rounded-md">
                <span className="font-black text-sm uppercase text-stone-900 block mb-1 tracking-wide">
                  Phonology:
                </span>
                <p className="text-[11px] text-stone-700 mb-1">
                  (Show phonemes, sentence stress, intonation, weak forms)
                </p>
                <textarea
                  rows={3}
                  disabled={!isPronVocabEditable}
                  value={languageAnalysis.phonology}
                  onChange={(e) => handleUpdate('languageAnalysis.phonology', e.target.value)}
                  placeholder="Enter phonological transcription and stress marks..."
                  className="w-full bg-white border border-stone-300 p-2 rounded-xs font-mono text-slate-900 focus:border-amber-600 outline-hidden text-xs disabled:bg-slate-200 disabled:text-slate-500"
                />
              </div>

              <div className="border-2 border-emerald-300 bg-emerald-50/40 p-3 rounded-md">
                <span className="font-black text-sm uppercase text-emerald-950 block mb-1 tracking-wide">
                  Vocabulary / Lexis:
                </span>
                <textarea
                  rows={3}
                  disabled={!isPronVocabEditable}
                  value={languageAnalysis.vocabulary}
                  onChange={(e) => handleUpdate('languageAnalysis.vocabulary', e.target.value)}
                  placeholder="List key vocabulary with definitions and word class..."
                  className="w-full bg-white border border-emerald-300 p-2 rounded-xs font-serif text-slate-900 focus:border-emerald-600 outline-hidden text-xs disabled:bg-slate-200 disabled:text-slate-500"
                />
              </div>
            </div>
          </div>

          {/* Skills Focus Section (Editable in Option C & ALL) */}
          <div className="border-t-2 border-dashed border-slate-300 my-6 pt-4">
            <div className={`border-2 border-teal-800 bg-teal-50/30 rounded-md p-4 space-y-4 font-sans text-xs shadow-xs ${!isSkillsEditable ? 'opacity-40 pointer-events-none bg-slate-100' : ''}`}>
              {!isSkillsEditable && (
                <div className="text-[10px] font-bold text-amber-900 bg-amber-100/90 px-2 py-0.5 rounded border border-amber-300 inline-block mb-1">
                  🔒 Skills Focus section greyed out (Focus Mode {currentFocusMode}). Select Option C or ALL to edit.
                </div>
              )}
              <div className="text-center">
                <h3 className="text-xl font-extrabold uppercase text-teal-950 tracking-wider">
                  Skills Focus
                </h3>
                <p className="text-xs text-teal-800 font-serif mt-0.5 font-medium">
                  (Select targeted skills for this lesson)
                </p>

                {/* Interactive Checkbox Pill Array */}
                <div className="flex items-center justify-center gap-4 mt-3 flex-wrap">
                  {[
                    { key: 'reading', label: 'Reading' },
                    { key: 'listening', label: 'Listening' },
                    { key: 'writing', label: 'Writing' },
                    { key: 'speaking', label: 'Speaking' },
                  ].map((skill) => {
                    const isChecked = skillsFocus[skill.key as keyof typeof skillsFocus];
                    return (
                      <button
                        type="button"
                        disabled={!isSkillsEditable}
                        key={skill.key}
                        onClick={() =>
                          handleSkillSelect(skill.key as 'reading' | 'listening' | 'writing' | 'speaking')
                        }
                        className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black transition-all cursor-pointer ${
                          isChecked
                            ? 'bg-emerald-800 text-amber-200 shadow-xs border border-emerald-900'
                            : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
                        }`}
                      >
                        {isChecked ? (
                          <CheckSquare className="w-4 h-4 text-amber-300" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-400" />
                        )}
                        <span>{skill.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <span className="font-bold text-teal-950 block mb-1">
                  Which specific skills will students practice?
                </span>

                {/* Sub-Skills Dropdown Selector */}
                <div className="my-2 space-y-1">
                  <label className="block text-[11px] font-bold text-teal-900">
                    Sub-Skills Dropdown Menu:
                  </label>
                  <select
                    disabled={!isSkillsEditable}
                    value=""
                    onChange={(e) => {
                      if (e.target.value) {
                        handleToggleSubSkill(e.target.value);
                      }
                    }}
                    className="w-full bg-white border border-teal-400 p-2 text-xs font-bold text-slate-900 rounded-xs focus:border-amber-600 outline-hidden cursor-pointer shadow-2xs"
                  >
                    <option value="">-- Select a Sub-Skill to Add / Remove --</option>
                    <optgroup label="Reading Sub-skills">
                      <option value="Reading for gist (skimming)">Reading for gist (skimming)</option>
                      <option value="Reading for specific information (scanning)">Reading for specific information (scanning)</option>
                      <option value="Reading for detailed comprehension">Reading for detailed comprehension</option>
                      <option value="Reading for attitude & opinion">Reading for attitude & opinion</option>
                      <option value="Inferring meaning from context">Inferring meaning from context</option>
                    </optgroup>
                    <optgroup label="Listening Sub-skills">
                      <option value="Listening for main idea / gist">Listening for main idea / gist</option>
                      <option value="Listening for specific details">Listening for specific details</option>
                      <option value="Listening for detailed understanding">Listening for detailed understanding</option>
                      <option value="Listening for speaker attitude & tone">Listening for speaker attitude & tone</option>
                      <option value="Intensive listening practice">Intensive listening practice</option>
                    </optgroup>
                    <optgroup label="Speaking Sub-skills">
                      <option value="Controlled speaking practice (accuracy)">Controlled speaking practice (accuracy)</option>
                      <option value="Freer speaking practice (fluency)">Freer speaking practice (fluency)</option>
                      <option value="Pronunciation, stress & intonation">Pronunciation, stress & intonation</option>
                      <option value="Interactive pair & group discussion">Interactive pair & group discussion</option>
                      <option value="Information gap activity">Information gap activity</option>
                      <option value="Role-play & communicative simulation">Role-play & communicative simulation</option>
                    </optgroup>
                    <optgroup label="Writing Sub-skills">
                      <option value="Guided / structured writing practice">Guided / structured writing practice</option>
                      <option value="Writing for text structure & cohesion">Writing for text structure & cohesion</option>
                      <option value="Drafting, proofreading & peer editing">Drafting, proofreading & peer editing</option>
                    </optgroup>
                    <optgroup label="Grammar & Vocabulary Sub-skills">
                      <option value="Grammar & MFP clarification">Grammar & MFP clarification</option>
                      <option value="Vocabulary & collocation practice">Vocabulary & collocation practice</option>
                      <option value="Functional language in situational context">Functional language in situational context</option>
                    </optgroup>
                  </select>
                </div>

                <textarea
                  rows={2}
                  disabled={!isSkillsEditable}
                  value={skillsFocus.specificSkills}
                  onChange={(e) => handleUpdate('skillsFocus.specificSkills', e.target.value)}
                  placeholder="Enter specific sub-skills practiced or select from the dropdown above..."
                  className="w-full bg-white border border-teal-300 p-2 text-xs font-serif leading-relaxed text-slate-900 focus:border-amber-600 outline-hidden rounded-xs disabled:bg-slate-200 disabled:text-slate-500"
                />
              </div>

              <div>
                <span className="font-bold text-teal-950 block mb-1">
                  Vocabulary / Lexis pre-teaching:
                </span>
                <textarea
                  rows={2}
                  disabled={!isSkillsEditable}
                  value={skillsFocus.preTeachVocab}
                  onChange={(e) => handleUpdate('skillsFocus.preTeachVocab', e.target.value)}
                  placeholder="List items to pre-teach..."
                  className="w-full bg-white border border-teal-300 p-2 text-xs font-serif leading-relaxed text-slate-900 focus:border-amber-600 outline-hidden rounded-xs disabled:bg-slate-200 disabled:text-slate-500"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="text-right text-[10px] font-bold text-slate-400 font-sans border-t border-slate-200 pt-2 mt-4">
          Lesson Plan Page 2
        </div>
      </div>

      {/* ================= PAGE 3 ================= */}
      <div
        data-pdf-page="3"
        className="a4-page bg-white shadow-xl mx-auto p-8 border border-slate-300 rounded-sm max-w-[210mm] min-h-[297mm] flex flex-col justify-between print:shadow-none print:border-none print:p-0 print:m-0"
      >
        <div>
          <PageHeader />

          <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-emerald-900 text-white p-3 rounded-md shadow-xs mb-4 flex items-center justify-between font-sans">
            <h2 className="text-xl font-black uppercase tracking-wider text-amber-300">
              Lesson Plan Procedure
            </h2>
            <span className="text-xs font-bold bg-emerald-800 px-3 py-1 rounded-full text-emerald-100">
              Page 3
            </span>
          </div>

          {/* Procedure Table */}
          <div className="border-2 border-emerald-950 rounded-md overflow-hidden my-4 text-xs font-sans shadow-xs">
            <div className="grid grid-cols-12 bg-gradient-to-r from-emerald-950 via-teal-900 to-emerald-950 text-amber-200 font-black text-xs uppercase p-2.5 border-b-2 border-emerald-950 divide-x-2 divide-emerald-800">
              <div className="col-span-3 p-1">Stage Selection</div>
              <div className="col-span-6 p-1">Procedure and Instructions</div>
              <div className="col-span-1 p-1 text-center">Time</div>
              <div className="col-span-2 p-1">Interaction</div>
            </div>

            <div className="divide-y-2 divide-emerald-950">
              {stages.slice(0, 4).map((stage, idx) => (
                <div
                  key={stage.id}
                  className={`grid grid-cols-12 divide-x-2 divide-emerald-950 min-h-[100px] ${
                    idx % 2 === 0 ? 'bg-white' : 'bg-emerald-50/30'
                  }`}
                >
                  {/* Col 1: Stage Selection (ONLY Dropdown List, NO text input) */}
                  <div className="col-span-3 p-2 font-semibold font-serif text-slate-900 flex flex-col justify-start">
                    {!isInteractiveCanvas ? (
                      <div className="w-full text-xs font-black p-1.5 rounded-xs border border-emerald-800 bg-emerald-900 text-amber-300 font-sans leading-snug whitespace-normal break-words shadow-2xs">
                        {stage.stageName || getStageName(stage) || 'Stage'}
                      </div>
                    ) : (
                      <>
                        <div className="print:hidden">
                          <select
                            value={stage.stageName || getStageName(stage)}
                            onChange={(e) => handleUpdate(`stages.${idx}.stageName`, e.target.value)}
                            className={`w-full text-xs font-black p-1 rounded-xs border transition-all cursor-pointer ${
                              !(stage.stageName || getStageName(stage))
                                ? 'border-red-500 bg-red-100 text-red-950 font-sans'
                                : 'border-emerald-800 bg-emerald-900 text-amber-300 font-sans'
                            }`}
                          >
                            <option value="" className="text-slate-800 bg-white">-- Select --</option>
                            {STAGE_OPTIONS.map((opt) => (
                              <option key={opt} value={opt} className="text-slate-900 bg-white">
                                {opt}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="hidden print:block">
                          <span className="font-sans text-xs font-black uppercase tracking-wider text-emerald-950 block whitespace-normal break-words">
                            {stage.stageName || getStageName(stage) || 'Stage'}
                          </span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Col 2: Procedure and Instructions */}
                  <div className="col-span-6 p-2 text-slate-800">
                    <textarea
                      rows={5}
                      value={stage.procedureAndInstructions}
                      onChange={(e) =>
                        handleUpdate(`stages.${idx}.procedureAndInstructions`, e.target.value)
                      }
                      placeholder="Detailed procedure & instructions..."
                      className="w-full bg-transparent border-0 p-0 text-xs font-serif text-slate-900 focus:ring-0 outline-hidden resize-y"
                    />
                  </div>
                  <div className="col-span-1 p-2 text-center font-bold font-mono text-slate-900 bg-amber-50/60">
                    <input
                      type="text"
                      value={stage.timeMins}
                      onChange={(e) =>
                        handleUpdate(`stages.${idx}.timeMins`, e.target.value)
                      }
                      placeholder="Mins"
                      className="w-full bg-transparent border-0 p-0 text-center text-xs font-mono font-bold text-amber-950 focus:ring-0 outline-hidden"
                    />
                  </div>
                  <div className="col-span-2 p-2 text-slate-800 font-serif text-[11px] bg-emerald-50/30 flex flex-col justify-between">
                    {/* Dropdown Mode Selector for Canvas Page 3 */}
                    <div className="mb-1 print:hidden">
                      <select
                        value=""
                        onChange={(e) => {
                          const val = e.target.value;
                          if (!val) return;
                          const curr = stage.interactionMode || '';
                          if (!curr.trim()) {
                            handleUpdate(`stages.${idx}.interactionMode`, val);
                          } else if (!curr.toLowerCase().includes(val.toLowerCase())) {
                            handleUpdate(`stages.${idx}.interactionMode`, `${curr}, ${val}`);
                          } else {
                            handleUpdate(`stages.${idx}.interactionMode`, val);
                          }
                        }}
                        className="w-full bg-white border border-emerald-400 p-1 text-[10px] font-bold text-slate-900 rounded-xs focus:border-amber-600 outline-hidden cursor-pointer shadow-2xs"
                      >
                        <option value="">-- Select Mode --</option>
                        <option value="T-Ss">T-Ss (Teacher to Whole Class)</option>
                        <option value="T-S">T-S (Teacher to Student)</option>
                        <option value="S-S (Pairs)">S-S (Pair Work)</option>
                        <option value="S-Ss (Groups)">S-Ss (Group Work)</option>
                        <option value="Individual">Individual (Solo Work)</option>
                        <option value="Mingle">Mingle (Classroom Mingle)</option>
                        <option value="Open Class">Open Class Discussion</option>
                      </select>
                    </div>
                    <textarea
                      rows={3}
                      value={stage.interactionMode}
                      onChange={(e) =>
                        handleUpdate(`stages.${idx}.interactionMode`, e.target.value)
                      }
                      placeholder="Mode (e.g. Pair work)"
                      className="w-full bg-transparent border-0 p-0 text-xs font-serif font-bold text-emerald-950 focus:ring-0 outline-hidden resize-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-right text-[10px] font-bold text-slate-400 font-sans border-t border-slate-200 pt-2 mt-4">
          Lesson Plan Page 3
        </div>
      </div>

      {/* ================= PAGE 4 (Additional Stages if needed) ================= */}
      {stages.length > 4 && (
        <div
          data-pdf-page="4"
          className="a4-page bg-white shadow-xl mx-auto p-8 border border-slate-300 rounded-sm max-w-[210mm] min-h-[297mm] flex flex-col justify-between print:shadow-none print:border-none print:p-0 print:m-0"
        >
          <div>
            <PageHeader />

            <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-emerald-900 text-white p-3 rounded-md shadow-xs mb-4 flex items-center justify-between font-sans">
              <h2 className="text-xl font-black uppercase tracking-wider text-amber-300">
                Lesson Plan Procedure (Cont.)
              </h2>
              <span className="text-xs font-bold bg-emerald-800 px-3 py-1 rounded-full text-emerald-100">
                Page 4
              </span>
            </div>

            <div className="border-2 border-emerald-950 rounded-md overflow-hidden my-4 text-xs font-sans shadow-xs">
              <div className="grid grid-cols-12 bg-gradient-to-r from-emerald-950 via-teal-900 to-emerald-950 text-amber-200 font-black text-xs uppercase p-2.5 border-b-2 border-emerald-950 divide-x-2 divide-emerald-800">
                <div className="col-span-3 p-1">Stage Selection</div>
                <div className="col-span-6 p-1">Procedure and Instructions</div>
                <div className="col-span-1 p-1 text-center">Time</div>
                <div className="col-span-2 p-1">Interaction</div>
              </div>

              <div className="divide-y-2 divide-emerald-950">
                {stages.slice(4).map((stage, realIdx) => {
                  const idx = realIdx + 4;
                  return (
                    <div
                      key={stage.id}
                      className={`grid grid-cols-12 divide-x-2 divide-emerald-950 min-h-[100px] ${
                        idx % 2 === 0 ? 'bg-white' : 'bg-emerald-50/30'
                      }`}
                    >
                      {/* Col 1: Stage Selection (ONLY Dropdown List, NO text input) */}
                      <div className="col-span-3 p-2 font-semibold font-serif text-slate-900 flex flex-col justify-start">
                        {!isInteractiveCanvas ? (
                          <div className="w-full text-xs font-black p-1.5 rounded-xs border border-emerald-800 bg-emerald-900 text-amber-300 font-sans leading-snug whitespace-normal break-words shadow-2xs">
                            {stage.stageName || getStageName(stage) || 'Stage'}
                          </div>
                        ) : (
                          <>
                            <div className="print:hidden">
                              <select
                                value={stage.stageName || getStageName(stage)}
                                onChange={(e) => handleUpdate(`stages.${idx}.stageName`, e.target.value)}
                                className={`w-full text-xs font-black p-1 rounded-xs border transition-all cursor-pointer ${
                                  !(stage.stageName || getStageName(stage))
                                    ? 'border-red-500 bg-red-100 text-red-950 font-sans'
                                    : 'border-emerald-800 bg-emerald-900 text-amber-300 font-sans'
                                }`}
                              >
                                <option value="" className="text-slate-800 bg-white">-- Select --</option>
                                {STAGE_OPTIONS.map((opt) => (
                                  <option key={opt} value={opt} className="text-slate-900 bg-white">
                                    {opt}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="hidden print:block">
                              <span className="font-sans text-xs font-black uppercase tracking-wider text-emerald-950 block whitespace-normal break-words">
                                {stage.stageName || getStageName(stage) || 'Stage'}
                              </span>
                            </div>
                          </>
                        )}
                      </div>

                      {/* Col 2: Procedure and Instructions */}
                      <div className="col-span-6 p-2 text-slate-800">
                        <textarea
                          rows={5}
                          value={stage.procedureAndInstructions}
                          onChange={(e) =>
                            handleUpdate(`stages.${idx}.procedureAndInstructions`, e.target.value)
                          }
                          placeholder="Procedure..."
                          className="w-full bg-transparent border-0 p-0 text-xs font-serif text-slate-900 focus:ring-0 outline-hidden resize-y"
                        />
                      </div>
                      <div className="col-span-1 p-2 text-center font-bold font-mono text-slate-900 bg-amber-50/60">
                        <input
                          type="text"
                          value={stage.timeMins}
                          onChange={(e) =>
                            handleUpdate(`stages.${idx}.timeMins`, e.target.value)
                          }
                          placeholder="Mins"
                          className="w-full bg-transparent border-0 p-0 text-center text-xs font-mono font-bold text-amber-950 focus:ring-0 outline-hidden"
                        />
                      </div>
                      <div className="col-span-2 p-2 text-slate-800 font-serif text-[11px] bg-emerald-50/30 flex flex-col justify-between">
                        {/* Dropdown Mode Selector for Canvas Page 4 */}
                        <div className="mb-1 print:hidden">
                          <select
                            value=""
                            onChange={(e) => {
                              const val = e.target.value;
                              if (!val) return;
                              const curr = stage.interactionMode || '';
                              if (!curr.trim()) {
                                handleUpdate(`stages.${idx}.interactionMode`, val);
                              } else if (!curr.toLowerCase().includes(val.toLowerCase())) {
                                handleUpdate(`stages.${idx}.interactionMode`, `${curr}, ${val}`);
                              } else {
                                handleUpdate(`stages.${idx}.interactionMode`, val);
                              }
                            }}
                            className="w-full bg-white border border-emerald-400 p-1 text-[10px] font-bold text-slate-900 rounded-xs focus:border-amber-600 outline-hidden cursor-pointer shadow-2xs"
                          >
                            <option value="">-- Select Mode --</option>
                            <option value="T-Ss">T-Ss (Teacher to Whole Class)</option>
                            <option value="T-S">T-S (Teacher to Student)</option>
                            <option value="S-S (Pairs)">S-S (Pair Work)</option>
                            <option value="S-Ss (Groups)">S-Ss (Group Work)</option>
                            <option value="Individual">Individual (Solo Work)</option>
                            <option value="Mingle">Mingle (Classroom Mingle)</option>
                            <option value="Open Class">Open Class Discussion</option>
                          </select>
                        </div>
                        <textarea
                          rows={3}
                          value={stage.interactionMode}
                          onChange={(e) =>
                            handleUpdate(`stages.${idx}.interactionMode`, e.target.value)
                          }
                          placeholder="Interaction..."
                          className="w-full bg-transparent border-0 p-0 text-xs font-serif font-bold text-emerald-950 focus:ring-0 outline-hidden resize-none"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="text-right text-[10px] font-bold text-slate-400 font-sans border-t border-slate-200 pt-2 mt-4">
            Lesson Plan Page 4
          </div>
        </div>
      )}

      {/* ================= PAGE 5 ================= */}
      <div
        data-pdf-page="5"
        className="a4-page bg-white shadow-xl mx-auto p-8 border border-slate-300 rounded-sm max-w-[210mm] min-h-[297mm] flex flex-col justify-between print:shadow-none print:border-none print:p-0 print:m-0"
      >
        <div>
          <PageHeader />

          {/* Reminders Block */}
          <div className="my-5 border-2 border-amber-600 bg-amber-50/70 p-4 rounded-md shadow-xs">
            <h3 className="font-black text-base uppercase text-amber-950 mb-1 font-sans flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              Reminders:
            </h3>
            <textarea
              rows={3}
              value={feedback.reminders}
              onChange={(e) => handleUpdate('feedback.reminders', e.target.value)}
              placeholder="Enter pre-lesson reminders (e.g. bring audio cable, whiteboard markers)..."
              className="w-full bg-white p-2.5 border border-amber-300 rounded-xs text-xs font-serif leading-relaxed text-slate-900 focus:border-amber-600 outline-hidden"
            />
          </div>

          <hr className="my-6 border-emerald-900" />

          {/* Trainer Comments Section */}
          <div className="space-y-4 font-sans text-xs">
            <h3 className="text-xl font-black uppercase tracking-wider text-emerald-950 border-b-2 border-emerald-800 pb-1">
              Trainer’s Comments on Lesson Plan:
            </h3>

            <div className="border-2 border-emerald-200 p-3 rounded-md bg-emerald-50/20">
              <span className="font-extrabold text-sm text-emerald-950 block mb-1 uppercase">
                Aims Feedback:
              </span>
              <textarea
                rows={3}
                value={feedback.aimsComments}
                onChange={(e) => handleUpdate('feedback.aimsComments', e.target.value)}
                placeholder="Trainer feedback on aims..."
                className="w-full bg-white border border-slate-300 p-2 text-xs font-serif leading-relaxed text-slate-900 focus:border-emerald-600 outline-hidden rounded-xs"
              />
            </div>

            <div className="border-2 border-emerald-200 p-3 rounded-md bg-emerald-50/20">
              <span className="font-extrabold text-sm text-emerald-950 block mb-1 uppercase">
                Stages Feedback:
              </span>
              <textarea
                rows={3}
                value={feedback.stagesComments}
                onChange={(e) => handleUpdate('feedback.stagesComments', e.target.value)}
                placeholder="Trainer feedback on stages..."
                className="w-full bg-white border border-slate-300 p-2 text-xs font-serif leading-relaxed text-slate-900 focus:border-emerald-600 outline-hidden rounded-xs"
              />
            </div>

            <div className="border-2 border-emerald-200 p-3 rounded-md bg-emerald-50/20">
              <span className="font-extrabold text-sm text-emerald-950 block mb-1 uppercase">
                Language Analysis Feedback:
              </span>
              <textarea
                rows={3}
                value={feedback.languageAnalysisComments}
                onChange={(e) => handleUpdate('feedback.languageAnalysisComments', e.target.value)}
                placeholder="Trainer feedback on language analysis..."
                className="w-full bg-white border border-slate-300 p-2 text-xs font-serif leading-relaxed text-slate-900 focus:border-emerald-600 outline-hidden rounded-xs"
              />
            </div>

            {/* Signature & Grade stamp */}
            <div className="pt-8 flex items-center justify-between border-t-2 border-slate-300">
              <div>
                <span className="font-bold text-slate-900 text-sm">Trainer Name: </span>
                <input
                  type="text"
                  value={feedback.trainerName}
                  onChange={(e) => handleUpdate('feedback.trainerName', e.target.value)}
                  placeholder="Trainer Name"
                  className="bg-transparent border-b-2 border-slate-400 font-serif text-sm font-bold text-emerald-950 px-2 py-1"
                />
              </div>

              {feedback.grade ? (
                <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 text-slate-950 font-black text-sm px-5 py-2 rounded-lg shadow-md border-2 border-amber-300 tracking-wider">
                  Grade: {feedback.grade}
                </div>
              ) : (
                <div className="border border-dashed border-slate-300 text-slate-400 px-4 py-1.5 rounded-md text-xs italic">
                  Grade: [ Pending Evaluation ]
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="text-right text-[10px] font-bold text-slate-400 font-sans border-t border-slate-200 pt-2 mt-4">
          Lesson Plan Page 5
        </div>
      </div>
    </div>
  );
};
