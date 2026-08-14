import React from 'react';
import {
  ListPlus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Clock,
  Sparkles,
  Layers,
  HelpCircle,
  AlertTriangle,
  FileText,
  Users,
} from 'lucide-react';
import { LessonStage } from '../../types';
import { STAGE_OPTIONS, getStageName } from '../../utils/stageUtils';
import { FieldLabel } from '../FieldLabel';

interface SectionPage3StagesProps {
  overallAim: string;
  onChangeOverallAim: (aim: string) => void;
  stages: LessonStage[];
  onChangeStages: (stages: LessonStage[]) => void;
  targetLengthMins: string;
}

export const SectionPage3Stages: React.FC<SectionPage3StagesProps> = ({
  overallAim,
  onChangeOverallAim,
  stages,
  onChangeStages,
  targetLengthMins,
}) => {
  // Calculate total estimated time
  const totalMins = stages.reduce((acc, stage) => {
    const val = parseInt(String(stage.timeMins), 10);
    return acc + (isNaN(val) ? 0 : val);
  }, 0);

  const targetMinsNum = parseInt(targetLengthMins, 10) || 45;

  const handleStageChange = (id: string, field: keyof LessonStage, value: any) => {
    const updated = stages.map((s) => (s.id === id ? { ...s, [field]: value } : s));
    onChangeStages(updated);
  };

  const handleAddStage = (preset?: { stageName?: string; stageAndAim: string; procedure: string; time: number; mode: string }) => {
    const newStage: LessonStage = {
      id: `stage-${Date.now()}`,
      stageName: preset?.stageName || '',
      stageAndAim: preset ? preset.stageAndAim : 'Aim: Describe learning objective...',
      procedureAndInstructions: preset ? preset.procedure : '1. Teacher instructions...\n2. Student activity...',
      timeMins: preset ? preset.time : 5,
      interactionMode: preset ? preset.mode : 'T-S, Pair work',
    };
    onChangeStages([...stages, newStage]);
  };

  const handleAddThreeStages = () => {
    const timestamp = Date.now();
    const newStages: LessonStage[] = [1, 2, 3].map((i) => ({
      id: `stage-${timestamp}-${i}`,
      stageName: '',
      stageAndAim: 'Aim: Describe learning objective...',
      procedureAndInstructions: '1. Teacher instructions...\n2. Student activity...',
      timeMins: 5,
      interactionMode: 'T-S, Pair work',
    }));
    onChangeStages([...stages, ...newStages]);
  };

  const handleRemoveStage = (id: string) => {
    if (stages.length <= 1) return;
    onChangeStages(stages.filter((s) => s.id !== id));
  };

  const handleMoveStage = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= stages.length) return;
    const newStages = [...stages];
    const temp = newStages[index];
    newStages[index] = newStages[targetIndex];
    newStages[targetIndex] = temp;
    onChangeStages(newStages);
  };

  return (
    <div className="space-y-6">
      {/* Stage Grid Header */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-200 px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-600" />
            <h3 className="font-semibold text-slate-800 text-sm">Pages 3 & 4 • Lesson Plan Stage Grid</h3>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold">
            <span className="text-slate-500">Total Planned Time:</span>
            <span
              className={`px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                totalMins === targetMinsNum
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-amber-100 text-amber-800 border border-amber-300'
              }`}
            >
              <Clock className="w-3 h-3" />
              {totalMins} / {targetMinsNum} mins
            </span>
          </div>
        </div>
      </div>

      {/* Quick Stage Preset Insertion */}
      <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
          <div>
            <span className="text-xs font-semibold text-blue-900">Insert Quick CELTA Stage Template:</span>
            <p className="text-xs text-blue-700">Click to instantly add structured lesson stages to your procedure</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {[
            {
              label: '+ Lead-in',
              stageName: 'Lead-in',
              stageAndAim: 'Aim: Contextualize & engage schema',
              procedure: '1. Show photo/headline to arouse interest.\n2. Ask lead-in questions in pairs.\n3. Brief open-class feedback.',
              time: 5,
              mode: 'T-S, Pair work',
            },
            {
              label: '+ Presentation (MFP)',
              stageName: 'Presentation',
              stageAndAim: 'Aim: Clarify Meaning, Form & Pronunciation',
              procedure: '1. Highlight target sentence on board.\n2. Ask CCQs for meaning.\n3. Elicit grammatical form.\n4. Drill pronunciation & mark stress.',
              time: 10,
              mode: 'T-S, Choral Drill',
            },
            {
              label: '+ Practice',
              stageName: 'Practice',
              stageAndAim: 'Aim: Practice target language accuracy',
              procedure: '1. Set gap-fill or matching exercise.\n2. ICQs to check understanding.\n3. Ss complete individually -> pair check -> answer key.',
              time: 10,
              mode: 'Individual, Pairs',
            },
            {
              label: '+ Production',
              stageName: 'Production',
              stageAndAim: 'Aim: Communicative fluency',
              procedure: '1. Set roleplay or interview task.\n2. Monitor silently for error collection.\n3. Student pair presentations.',
              time: 12,
              mode: 'Mingle / Group work',
            },
            {
              label: '+ Closure',
              stageName: 'Closure',
              stageAndAim: 'Aim: Highlight accuracy & praise',
              procedure: '1. Write student errors anonymously on board.\n2. Pairs identify corrections.\n3. Whole class feedback.',
              time: 5,
              mode: 'T-S, Open Class',
            },
          ].map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleAddStage(preset)}
              className="px-2.5 py-1 bg-white hover:bg-blue-600 hover:text-white text-blue-700 border border-blue-300 rounded-md text-xs font-medium transition-all shadow-2xs cursor-pointer"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stage Table Cards */}
      <div className="space-y-4">
        {stages.map((stage, index) => {
          const currentStageName = stage.stageName || getStageName(stage);
          const isMissingStageName = !currentStageName;

          return (
            <div
              key={stage.id}
              className={`bg-white rounded-xl shadow-xs border overflow-hidden transition-all ${
                isMissingStageName ? 'border-red-400 ring-2 ring-red-200' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Stage Row Header */}
              <div className="bg-slate-100/80 border-b border-slate-200 px-4 py-2.5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-800 text-white text-xs font-bold flex items-center justify-center shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-xs font-semibold text-slate-700">Stage #{index + 1}</span>
                  {currentStageName ? (
                    <span className="px-2 py-0.5 text-[11px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-full">
                      {currentStageName}
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 text-[11px] font-bold bg-red-100 text-red-700 border border-red-300 rounded-full flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      Select Stage Required
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleMoveStage(index, 'up')}
                    disabled={index === 0}
                    className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded-md hover:bg-slate-200/60 cursor-pointer"
                    title="Move Up"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMoveStage(index, 'down')}
                    disabled={index === stages.length - 1}
                    className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded-md hover:bg-slate-200/60 cursor-pointer"
                    title="Move Down"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <div className="h-4 w-px bg-slate-300 mx-1" />
                  <button
                    type="button"
                    onClick={() => handleRemoveStage(stage.id)}
                    disabled={stages.length <= 1}
                    className="p-1 text-slate-400 hover:text-red-600 disabled:opacity-30 rounded-md hover:bg-red-50 cursor-pointer"
                    title="Remove Stage"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Stage Content Grid */}
              <div className="p-4 grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Column 1: Stage Selection (ONLY Dropdown List, NO freeform text) */}
                <div className="md:col-span-3 space-y-2">
                  <FieldLabel
                    label="Stage Selection"
                    required
                    explanation="Select the formal stage type from the standard CELTA/DELTA dropdown list."
                    examples={['Warm-up', 'Lead-in', 'Presentation', 'Practice', 'Production', 'Closure']}
                  />
                  <select
                    value={currentStageName}
                    onChange={(e) => handleStageChange(stage.id, 'stageName', e.target.value)}
                    className={`w-full px-2.5 py-2 border rounded-lg text-xs font-bold transition-all outline-hidden cursor-pointer ${
                      isMissingStageName
                        ? 'border-red-500 bg-red-50 text-red-900 focus:ring-2 focus:ring-red-500 shadow-xs'
                        : 'border-slate-300 bg-slate-50 text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500'
                    }`}
                  >
                    <option value="">-- Select Stage (Required) --</option>
                    {STAGE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  {currentStageName && (
                    <div className="mt-1 px-2.5 py-1 text-[11px] font-bold text-emerald-950 bg-emerald-100/90 border border-emerald-300 rounded-md leading-snug whitespace-normal break-words flex items-start gap-1">
                      <span className="text-emerald-800 font-extrabold shrink-0">Selected:</span>
                      <span className="font-semibold text-slate-900">{currentStageName}</span>
                    </div>
                  )}
                  {isMissingStageName && (
                    <p className="text-[10px] text-red-600 font-bold mt-1 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-red-500 shrink-0" />
                      Must select a stage option to save/download
                    </p>
                  )}
                </div>

                {/* Procedure and Instructions */}
                <div className="md:col-span-6">
                  <FieldLabel
                    label="Procedure & Instructions"
                    icon={FileText}
                    explanation="Step-by-step teacher instructions, CCQs, ICQs, board layout, and activity sequence."
                    examples={[
                      '1. Hand out worksheet 1.\n2. Ask ICQs: "Do you write alone or in pairs?"\n3. Monitor silently.',
                    ]}
                  />
                  <textarea
                    rows={4}
                    value={stage.procedureAndInstructions}
                    onChange={(e) =>
                      handleStageChange(stage.id, 'procedureAndInstructions', e.target.value)
                    }
                    placeholder="Step-by-step teacher instructions, CCQs, board plan, rationale..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-hidden"
                  />
                </div>

                {/* Time */}
                <div className="md:col-span-1">
                  <FieldLabel
                    label="Time (Mins)"
                    icon={Clock}
                    explanation="Allocated duration in minutes for this stage."
                    examples={['5 mins', '10 mins', '15 mins']}
                  />
                  <div className="relative">
                    <input
                      type="number"
                      min={1}
                      max={120}
                      value={stage.timeMins}
                      onChange={(e) => handleStageChange(stage.id, 'timeMins', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 font-semibold focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-hidden"
                    />
                    <span className="absolute right-2.5 top-2 text-xs text-slate-400 pointer-events-none">
                      m
                    </span>
                  </div>
                </div>

                {/* Interaction Modes & Reminders with Clickable Options */}
                <div className="md:col-span-2 space-y-1.5">
                  <FieldLabel
                    label="Interaction Mode"
                    icon={Users}
                    explanation="Participation format between teacher and students during this stage."
                    examples={['T-S', 'Pair work (S-S)', 'Group work', 'Mingle']}
                  />

                  {/* Dropdown Mode Options */}
                  <div className="space-y-1">
                    <select
                      value=""
                      onChange={(e) => {
                        const val = e.target.value;
                        if (!val) return;
                        const current = stage.interactionMode || '';
                        if (!current.trim()) {
                          handleStageChange(stage.id, 'interactionMode', val);
                        } else if (!current.toLowerCase().includes(val.toLowerCase())) {
                          handleStageChange(stage.id, 'interactionMode', `${current}, ${val}`);
                        } else {
                          handleStageChange(stage.id, 'interactionMode', val);
                        }
                      }}
                      className="w-full px-2.5 py-1.5 bg-white border border-emerald-400 rounded-md text-xs font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-hidden cursor-pointer shadow-2xs"
                    >
                      <option value="">-- Select Interaction Mode --</option>
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
                  rows={2}
                  value={stage.interactionMode}
                  onChange={(e) => handleStageChange(stage.id, 'interactionMode', e.target.value)}
                  placeholder="e.g. T-Ss, Pair work"
                  className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-hidden font-medium"
                />
              </div>
            </div>
          </div>
        );
      })}
      </div>

      {/* Add Stage Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => handleAddStage()}
          className="py-3 border-2 border-dashed border-slate-300 hover:border-blue-500 bg-white hover:bg-blue-50/50 rounded-xl text-xs font-semibold text-slate-700 hover:text-blue-700 flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs"
        >
          <ListPlus className="w-4 h-4" />
          <span>+ Add Single Stage Row</span>
        </button>
        <button
          type="button"
          onClick={() => handleAddThreeStages()}
          className="py-3 border-2 border-emerald-300 hover:border-emerald-500 bg-emerald-50/60 hover:bg-emerald-100/80 rounded-xl text-xs font-semibold text-emerald-900 flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs"
        >
          <ListPlus className="w-4 h-4 text-emerald-700" />
          <span>+ Add 3 Stage Rows</span>
        </button>
      </div>

      {/* Reminder Callout box */}
      <div className="p-4 bg-slate-100 rounded-xl text-xs text-slate-600 flex items-start gap-2.5">
        <HelpCircle className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-slate-700">Guide Note for Stages:</span> Standard interaction symbols include <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-800">T-S</code> (Teacher to Students), <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-800">S-T</code> (Student to Teacher), <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-800">S-S</code> (Peer pairs), <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-800">Mingle</code>, or <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-800">Group work</code>.
        </div>
      </div>
    </div>
  );
};
