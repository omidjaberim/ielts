import React from 'react';
import {
  Languages,
  Compass,
  CheckCircle2,
  BookMarked,
  Code2,
  Globe,
  Mic,
  BookOpenCheck,
  Headphones,
  BookOpen,
  PenTool,
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import { LanguageAnalysis, SkillsFocus } from '../../types';
import { FieldLabel } from '../FieldLabel';

interface SectionPage2Props {
  languageAnalysis: LanguageAnalysis;
  onChangeLanguageAnalysis: (analysis: LanguageAnalysis) => void;
  skillsFocus: SkillsFocus;
  onChangeSkillsFocus: (skills: SkillsFocus) => void;
}

const SPECIFIC_SKILL_OPTIONS = [
  'Reading for gist (skimming)',
  'Reading for detail (scanning)',
  'Reading for attitude & opinion',
  'Listening for main idea / gist',
  'Listening for specific information',
  'Listening for detailed understanding',
  'Controlled speaking practice (accuracy)',
  'Freer speaking practice (fluency)',
  'Pronunciation, stress & intonation',
  'Guided / structured writing practice',
  'Grammar & MFP clarification',
  'Vocabulary & collocation practice',
  'Interactive pair & group discussion',
];

export const SectionPage2: React.FC<SectionPage2Props> = ({
  languageAnalysis,
  onChangeLanguageAnalysis,
  skillsFocus,
  onChangeSkillsFocus,
}) => {
  const currentFocusMode = languageAnalysis.focusMode || 'A';

  const isGrammarEditable = currentFocusMode === 'A' || currentFocusMode === 'ALL';
  const isPronVocabEditable = currentFocusMode === 'B' || currentFocusMode === 'ALL';
  const isSkillsEditable = currentFocusMode === 'C' || currentFocusMode === 'ALL';

  const handleFocusModeChange = (mode: 'A' | 'B' | 'C' | 'ALL') => {
    onChangeLanguageAnalysis({ ...languageAnalysis, focusMode: mode });
  };

  const handleLangChange = (field: keyof LanguageAnalysis, value: string) => {
    onChangeLanguageAnalysis({ ...languageAnalysis, [field]: value });
  };

  // Allow only ONE primary skill focus area to be selected at a time
  const handleSkillsToggle = (field: 'reading' | 'listening' | 'writing' | 'speaking') => {
    const isCurrentlyActive = skillsFocus[field];
    onChangeSkillsFocus({
      ...skillsFocus,
      reading: field === 'reading' ? !isCurrentlyActive : false,
      listening: field === 'listening' ? !isCurrentlyActive : false,
      writing: field === 'writing' ? !isCurrentlyActive : false,
      speaking: field === 'speaking' ? !isCurrentlyActive : false,
    });
  };

  const handleSkillsTextChange = (field: 'specificSkills' | 'preTeachVocab', value: string) => {
    onChangeSkillsFocus({ ...skillsFocus, [field]: value });
  };

  const toggleSkillOption = (option: string) => {
    const currentText = skillsFocus.specificSkills || '';
    const exists = currentText.includes(option);

    if (exists) {
      const updated = currentText
        .split(',')
        .map((s) => s.trim())
        .filter((s) => s !== option && s.length > 0)
        .join(', ');
      handleSkillsTextChange('specificSkills', updated);
    } else {
      const updated = currentText.trim()
        ? `${currentText.trim()}, ${option}`
        : option;
      handleSkillsTextChange('specificSkills', updated);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page 2 Focus Mode Selection Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm text-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div>
            <h3 className="font-bold text-sm text-amber-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Page 2 Lesson Focus Mode Selection
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              Select your focus mode to enable specific target fields and grey out non-relevant sections on Page 2:
            </p>
          </div>
          <span className="text-[11px] font-mono px-2 py-0.5 bg-slate-800 rounded text-slate-300 border border-slate-700 shrink-0 self-start sm:self-center">
            Active: Mode {currentFocusMode}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <button
            type="button"
            onClick={() => handleFocusModeChange('A')}
            className={`p-3 rounded-lg border text-left transition-all cursor-pointer flex items-start gap-2.5 ${
              currentFocusMode === 'A'
                ? 'bg-emerald-950 border-emerald-500 text-white ring-2 ring-emerald-500/50 shadow-sm'
                : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
            }`}
          >
            <input
              type="radio"
              name="focusMode"
              checked={currentFocusMode === 'A'}
              onChange={() => handleFocusModeChange('A')}
              className="mt-0.5 text-emerald-500 focus:ring-emerald-500"
            />
            <div>
              <div className="text-xs font-bold text-amber-200">Option A: Grammar</div>
              <p className="text-[11px] text-slate-300 leading-tight mt-0.5">
                Editable: Language Tense, Form Breakdown, Meaning / Use. (Other sections greyed out)
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleFocusModeChange('B')}
            className={`p-3 rounded-lg border text-left transition-all cursor-pointer flex items-start gap-2.5 ${
              currentFocusMode === 'B'
                ? 'bg-emerald-950 border-emerald-500 text-white ring-2 ring-emerald-500/50 shadow-sm'
                : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
            }`}
          >
            <input
              type="radio"
              name="focusMode"
              checked={currentFocusMode === 'B'}
              onChange={() => handleFocusModeChange('B')}
              className="mt-0.5 text-emerald-500 focus:ring-emerald-500"
            />
            <div>
              <div className="text-xs font-bold text-amber-200">Option B: Vocabulary</div>
              <p className="text-[11px] text-slate-300 leading-tight mt-0.5">
                Editable: Phonology & Vocabulary. (Other sections greyed out)
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleFocusModeChange('C')}
            className={`p-3 rounded-lg border text-left transition-all cursor-pointer flex items-start gap-2.5 ${
              currentFocusMode === 'C'
                ? 'bg-emerald-950 border-emerald-500 text-white ring-2 ring-emerald-500/50 shadow-sm'
                : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
            }`}
          >
            <input
              type="radio"
              name="focusMode"
              checked={currentFocusMode === 'C'}
              onChange={() => handleFocusModeChange('C')}
              className="mt-0.5 text-emerald-500 focus:ring-emerald-500"
            />
            <div>
              <div className="text-xs font-bold text-amber-200">Option C: Skills Focus</div>
              <p className="text-[11px] text-slate-300 leading-tight mt-0.5">
                Editable: Skills Focus section. (Language Analysis section greyed out)
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* Language Analysis Section */}
      <div
        className={`bg-white rounded-xl shadow-xs border transition-all overflow-hidden ${
          !isGrammarEditable && !isPronVocabEditable
            ? 'border-slate-300 bg-slate-100/90 opacity-60'
            : 'border-slate-200'
        }`}
      >
        <div className="bg-slate-50 border-b border-slate-200 px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Languages className="w-4 h-4 text-blue-600" />
            <h3 className="font-semibold text-slate-800 text-sm">
              Language Analysis{' '}
              <span className="text-xs font-normal text-slate-500">
                ({currentFocusMode === 'A' ? 'Grammar Mode Active' : currentFocusMode === 'B' ? 'Pronunciation/Lexis Mode Active' : 'Disabled in Option C'})
              </span>
            </h3>
          </div>
          <span className="text-xs font-medium text-slate-500">Page 2 • Linguistic Breakdown</span>
        </div>

        <div className="p-5 space-y-4">
          {/* Grammar Fields (Tense, Form, Meaning/Use) */}
          <div className={!isGrammarEditable ? 'opacity-50 pointer-events-none bg-slate-100 p-2 rounded-lg border border-slate-200' : ''}>
            {!isGrammarEditable && (
              <div className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded border border-amber-200 mb-2">
                🔒 Grammar fields (Tense, Form, Meaning) disabled in Focus Option {currentFocusMode}. Select Option A to edit.
              </div>
            )}
            <div className="space-y-4">
              <div>
                <FieldLabel
                  label="Language Tense / Item"
                  icon={BookMarked}
                  explanation="The exact target language structure, tense, modal verb, or lexical set being focused on."
                  examples={['Present Perfect Continuous', 'Third Conditional', 'Modal Verbs of Deduction']}
                />
                <input
                  type="text"
                  disabled={!isGrammarEditable}
                  value={languageAnalysis.tenseItem}
                  onChange={(e) => handleLangChange('tenseItem', e.target.value)}
                  placeholder="e.g. Present Perfect Simple / Third Conditional / Modal Verbs of Deduction"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-hidden font-serif disabled:bg-slate-200 disabled:text-slate-500 disabled:cursor-not-allowed"
                />
              </div>

              <div>
                <FieldLabel
                  label="Form Breakdown"
                  icon={Code2}
                  explanation="Formal structural formula including subject, auxiliary verbs, main verb forms, affirmative, negative, and question patterns."
                  examples={[
                    'Subject + have/has + been + Verb-ing',
                    'Question: Have/Has + Subject + been + Verb-ing?',
                  ]}
                />
                <textarea
                  rows={3}
                  disabled={!isGrammarEditable}
                  value={languageAnalysis.form}
                  onChange={(e) => handleLangChange('form', e.target.value)}
                  placeholder="Explicit grammatical structure breakdown for affirmative, negative, and question forms..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-hidden font-mono text-xs disabled:bg-slate-200 disabled:text-slate-500 disabled:cursor-not-allowed"
                />
              </div>

              <div>
                <FieldLabel
                  label="Meaning / Use"
                  icon={Globe}
                  explanation="The functional concept and contextual situation in which native speakers choose to use this target language."
                  examples={[
                    'To describe an action that started in the past and continues into the present moment.',
                    'To express hypothetical past regret or imaginary consequences.',
                  ]}
                />
                <textarea
                  rows={3}
                  disabled={!isGrammarEditable}
                  value={languageAnalysis.meaningUse}
                  onChange={(e) => handleLangChange('meaningUse', e.target.value)}
                  placeholder="Explain the functional concept and contextual meaning of the target language..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-hidden font-serif disabled:bg-slate-200 disabled:text-slate-500 disabled:cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* Phonology & Vocabulary Fields */}
          <div className={!isPronVocabEditable ? 'opacity-50 pointer-events-none bg-slate-100 p-2 rounded-lg border border-slate-200' : ''}>
            {!isPronVocabEditable && (
              <div className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded border border-amber-200 mb-2">
                🔒 Phonology & Vocabulary fields disabled in Focus Option {currentFocusMode}. Select Option B to edit.
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <FieldLabel
                  label="Phonology & Pronunciation"
                  icon={Mic}
                  explanation="Phonetic transcriptions, weak forms, contraction pronunciation, primary sentence stress, and intonation arrows."
                  examples={[
                    '/aɪ v bɪn ˈstʌdiɪŋ/ (Weak form /bɪn/)',
                    'Falling intonation on wh- questions',
                  ]}
                />
                <textarea
                  rows={4}
                  disabled={!isPronVocabEditable}
                  value={languageAnalysis.phonology}
                  onChange={(e) => handleLangChange('phonology', e.target.value)}
                  placeholder="/aɪ v bɪn ˈstʌdiɪŋ/ - weak forms, primary sentence stress..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-hidden font-mono text-xs disabled:bg-slate-200 disabled:text-slate-500 disabled:cursor-not-allowed"
                />
              </div>

              <div>
                <FieldLabel
                  label="Vocabulary / Lexis"
                  icon={BookOpenCheck}
                  explanation="Target vocabulary words, collocations, parts of speech, word stress, and definition notes."
                  examples={[
                    'Duration (n.) /djʊəˈreɪʃn/ - length of time',
                    'Continuous (adj.) /kənˈtɪnjuəs/',
                  ]}
                />
                <textarea
                  rows={4}
                  disabled={!isPronVocabEditable}
                  value={languageAnalysis.vocabulary}
                  onChange={(e) => handleLangChange('vocabulary', e.target.value)}
                  placeholder="e.g. Duration (n.) /djʊəˈreɪʃn/ - length of time..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-hidden font-mono text-xs disabled:bg-slate-200 disabled:text-slate-500 disabled:cursor-not-allowed"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Focus Section */}
      <div
        className={`bg-white rounded-xl shadow-xs border transition-all overflow-hidden ${
          !isSkillsEditable
            ? 'border-slate-300 bg-slate-100/90 opacity-60'
            : 'border-slate-200'
        }`}
      >
        <div className="bg-slate-50 border-b border-slate-200 px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-emerald-700" />
            <h3 className="font-semibold text-slate-800 text-sm">
              Skills Focus{' '}
              <span className="text-xs font-normal text-slate-500">
                ({isSkillsEditable ? 'Editable' : 'Disabled in Option ' + currentFocusMode})
              </span>
            </h3>
          </div>
          <span className="text-xs font-medium text-slate-500">For Skills-Based Lessons</span>
        </div>

        <div className={`p-5 space-y-5 ${!isSkillsEditable ? 'opacity-50 pointer-events-none' : ''}`}>
          {!isSkillsEditable && (
            <div className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
              🔒 Skills Focus section disabled in Focus Option {currentFocusMode}. Select Option C to edit.
            </div>
          )}

          {/* Skill Selector Pills (Single Selection Only) */}
          <div>
            <FieldLabel
              label="Primary Skill Focus Area (Select ONE skill)"
              icon={Compass}
              explanation="Select the single primary macro skill category developed in this session."
              examples={['Reading', 'Listening', 'Writing', 'Speaking']}
            />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-1">
              {[
                { id: 'reading', label: 'Reading', icon: BookOpen },
                { id: 'listening', label: 'Listening', icon: Headphones },
                { id: 'writing', label: 'Writing', icon: PenTool },
                { id: 'speaking', label: 'Speaking', icon: MessageSquare },
              ].map((skill) => {
                const key = skill.id as 'reading' | 'listening' | 'writing' | 'speaking';
                const isChecked = skillsFocus[key];
                const SkillIcon = skill.icon;
                return (
                  <button
                    key={skill.id}
                    type="button"
                    disabled={!isSkillsEditable}
                    onClick={() => handleSkillsToggle(key)}
                    className={`flex items-center justify-between px-4 py-2.5 rounded-lg border text-sm font-bold transition-all cursor-pointer ${
                      isChecked
                        ? 'bg-emerald-900 text-amber-200 border-emerald-950 shadow-xs ring-2 ring-emerald-600'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <SkillIcon className={`w-4 h-4 ${isChecked ? 'text-amber-300' : 'text-slate-500'}`} />
                      {skill.label}
                    </span>
                    <CheckCircle2
                      className={`w-4 h-4 transition-opacity ${
                        isChecked ? 'text-amber-400 opacity-100' : 'text-slate-300 opacity-40'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <FieldLabel
              label="Which specific skills will students practice?"
              icon={Sparkles}
              explanation="Select specific sub-skills from the dropdown list or click options to populate."
              examples={['Reading for gist (skimming)', 'Listening for specific details', 'Controlled speaking practice']}
            />

            {/* Dropdown list of all specific sub-skills for all main skills */}
            <div className="my-2 space-y-2">
              <label className="block text-xs font-bold text-slate-700">
                Select sub-skill from list:
              </label>
              <select
                disabled={!isSkillsEditable}
                value=""
                onChange={(e) => {
                  if (e.target.value) {
                    toggleSkillOption(e.target.value);
                  }
                }}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition-all outline-hidden cursor-pointer"
              >
                <option value="">-- Dropdown List: Select a specific sub-skill to add/remove --</option>
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

            {/* Interactive Clickable Skill Chips */}
            <div className="my-2.5 bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="flex items-center gap-1.5 mb-2 text-xs font-bold text-emerald-900">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Quick sub-skill selection tags:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {SPECIFIC_SKILL_OPTIONS.map((opt) => {
                  const isSelected = (skillsFocus.specificSkills || '').includes(opt);
                  return (
                    <button
                      key={opt}
                      type="button"
                      disabled={!isSkillsEditable}
                      onClick={() => toggleSkillOption(opt)}
                      className={`text-xs px-2.5 py-1 rounded-full font-medium transition-all cursor-pointer flex items-center gap-1 border ${
                        isSelected
                          ? 'bg-emerald-700 text-white border-emerald-800 shadow-2xs font-semibold'
                          : 'bg-white text-slate-700 border-slate-300 hover:border-emerald-500 hover:text-emerald-800'
                      }`}
                    >
                      <span>{isSelected ? '✓' : '+'}</span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <textarea
              rows={3}
              disabled={!isSkillsEditable}
              value={skillsFocus.specificSkills}
              onChange={(e) => handleSkillsTextChange('specificSkills', e.target.value)}
              placeholder="Selected sub-skills will appear here..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-hidden font-serif disabled:bg-slate-200 disabled:text-slate-500 disabled:cursor-not-allowed"
            />
          </div>

          <div>
            <FieldLabel
              label="Vocabulary / Lexis to pre-teach"
              icon={BookOpenCheck}
              explanation="Blocking or essential vocabulary terms taught prior to listening or reading tasks to facilitate comprehension."
              examples={[
                'Pre-teach: "promotion" /prəˈməʊʃn/ (n), "workload" /ˈwɜːkləʊd/ (n)',
              ]}
            />
            <textarea
              rows={3}
              disabled={!isSkillsEditable}
              value={skillsFocus.preTeachVocab}
              onChange={(e) => handleSkillsTextChange('preTeachVocab', e.target.value)}
              placeholder="List vocabulary items to pre-teach before students engage with the text/audio..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-hidden font-serif disabled:bg-slate-200 disabled:text-slate-500 disabled:cursor-not-allowed"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

