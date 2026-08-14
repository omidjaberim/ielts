import React from 'react';
import { ShieldCheck, MessageSquare, Bell, Award, UserCheck, Calendar, ListChecks } from 'lucide-react';
import { TrainerFeedback } from '../../types';
import { FieldLabel } from '../FieldLabel';

interface SectionPage5FeedbackProps {
  feedback: TrainerFeedback;
  onChangeFeedback: (feedback: TrainerFeedback) => void;
}

export const SectionPage5Feedback: React.FC<SectionPage5FeedbackProps> = ({
  feedback,
  onChangeFeedback,
}) => {
  const handleChange = (field: keyof TrainerFeedback, value: string) => {
    onChangeFeedback({ ...feedback, [field]: value });
  };

  return (
    <div className="space-y-6">
      {/* Trainee Reminders Block */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-200 px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-emerald-700" />
            <h3 className="font-semibold text-slate-800 text-sm">Trainee Pre-Lesson Reminders</h3>
          </div>
          <span className="text-xs font-medium text-slate-500">Page 5 • Reminders & Assessment</span>
        </div>

        <div className="p-5">
          <FieldLabel
            label="Reminders & Checklist"
            icon={ListChecks}
            explanation="Personal administrative and classroom setup reminders before teaching the session."
            examples={['Print 15 copies of Worksheet A', 'Ensure projector & board markers ready']}
          />
          <textarea
            rows={3}
            value={feedback.reminders}
            onChange={(e) => handleChange('reminders', e.target.value)}
            placeholder="Personal check-list (e.g. check projector, print 14 copies of Handout 2, write timeline on board before start)..."
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-hidden font-serif"
          />
        </div>
      </div>

      {/* Trainer's Comments & Evaluation */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
        <div className="bg-emerald-950 text-white px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="font-semibold text-sm text-emerald-50">Trainer's Assessment & Comments</h3>
              <p className="text-xs text-amber-200/80">Official feedback completed by Tutor / Assessor</p>
            </div>
          </div>
          <Award className="w-5 h-5 text-amber-400 opacity-90" />
        </div>

        <div className="p-5 space-y-5">
          {/* Aims Feedback */}
          <div>
            <FieldLabel
              label="Evaluation of Aims"
              icon={MessageSquare}
              explanation="Assessor feedback on lesson aims precision and achievement."
              examples={['Main aim was clear and measurable. Learner outcomes were met effectively.']}
            />
            <textarea
              rows={3}
              value={feedback.aimsComments}
              onChange={(e) => handleChange('aimsComments', e.target.value)}
              placeholder="Trainer remarks regarding main and subsidiary aims clarity..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-hidden font-serif"
            />
          </div>

          {/* Stages Feedback */}
          <div>
            <FieldLabel
              label="Evaluation of Stages & Timing"
              icon={MessageSquare}
              explanation="Assessor feedback on lesson pacing, stage transitions, and ICQs."
              examples={['Good time management; lead-in set context well, though controlled practice needed 2 extra mins.']}
            />
            <textarea
              rows={3}
              value={feedback.stagesComments}
              onChange={(e) => handleChange('stagesComments', e.target.value)}
              placeholder="Trainer remarks regarding lesson procedure, pacing, ICQs, and stage aims..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-hidden font-serif"
            />
          </div>

          {/* Language Analysis Feedback */}
          <div>
            <FieldLabel
              label="Evaluation of Language Analysis"
              icon={MessageSquare}
              explanation="Assessor feedback on accuracy of form, meaning, and phonology breakdown."
              examples={['Thorough phonetic breakdown and well-formulated CCQs.']}
            />
            <textarea
              rows={3}
              value={feedback.languageAnalysisComments}
              onChange={(e) => handleChange('languageAnalysisComments', e.target.value)}
              placeholder="Trainer remarks regarding MFP, phonology, and target vocabulary accuracy..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-hidden font-serif"
            />
          </div>

          {/* Trainer Sign-off & Grade */}
          <div className="pt-4 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <FieldLabel
                label="Trainer Name & Signature"
                icon={UserCheck}
                explanation="Name of the CELTA/DELTA tutor or observer."
                examples={['Dr. Sarah Jenkins']}
              />
              <input
                type="text"
                value={feedback.trainerName}
                onChange={(e) => handleChange('trainerName', e.target.value)}
                placeholder="e.g. Dr. Sarah Jenkins"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-hidden font-serif"
              />
            </div>

            <div>
              <FieldLabel
                label="Lesson Plan Rating / Grade"
                icon={Award}
                explanation="Official evaluation grade for the lesson plan."
                examples={['Pass', 'Pass with Distinction']}
              />
              <select
                value={feedback.grade}
                onChange={(e) => handleChange('grade', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-hidden font-serif"
              >
                <option value="">Select Grade Status...</option>
                <option value="Pass with Distinction">Pass with Distinction</option>
                <option value="Pass">Pass</option>
                <option value="Pass Pending Amendments">Pass Pending Amendments</option>
                <option value="Resubmit Required">Resubmit Required</option>
              </select>
            </div>

            <div>
              <FieldLabel
                label="Evaluation Date"
                icon={Calendar}
                explanation="Date of observation and evaluation."
                examples={['2026-08-01']}
              />
              <input
                type="date"
                value={feedback.dateEvaluated}
                onChange={(e) => handleChange('dateEvaluated', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-hidden font-serif"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

