import React from 'react';
import {
  FileDown,
  Printer,
  Sparkles,
  RotateCcw,
  Building2,
  FileText,
  Edit3,
  Eye,
  Download,
  Upload,
} from 'lucide-react';
import { LessonPlanData } from '../types';

interface HeaderProps {
  viewMode: 'editor' | 'preview' | 'split';
  setViewMode: (mode: 'editor' | 'preview' | 'split') => void;
  onExportPdf: () => void;
  onPrint: () => void;
  onOpenBrandingModal: () => void;
  onLoadSample: () => void;
  onReset: () => void;
  onExportJson: () => void;
  onImportJson: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isExporting: boolean;
  lessonData: LessonPlanData;
}

export const Header: React.FC<HeaderProps> = ({
  viewMode,
  setViewMode,
  onExportPdf,
  onPrint,
  onOpenBrandingModal,
  onLoadSample,
  onReset,
  onExportJson,
  onImportJson,
  isExporting,
  lessonData,
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  return (
    <header className="sticky top-0 z-30 bg-slate-950/95 border-b border-blue-900/50 text-white shadow-xl backdrop-blur-md no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand & Document Name */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-blue-600/25 border border-amber-400/40 flex items-center justify-center text-amber-400 shrink-0 shadow-inner">
              <FileText className="w-5 h-5" />
            </div>
            <div className="truncate">
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold text-white truncate font-sans tracking-tight">
                  Teaching Practice Lesson Plan
                </h1>
                <span className="px-2 py-0.5 text-xs font-bold bg-amber-400/20 border border-amber-400/40 text-amber-300 rounded-full shrink-0">
                  Interactive Canvas
                </span>
              </div>
              <p className="text-xs text-blue-200/80 truncate">
                {lessonData.branding.instituteName} • {lessonData.metadata.traineeName || 'Trainee Draft'}
              </p>
            </div>
          </div>

          {/* Center Mode Switcher */}
          <div className="hidden md:flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setViewMode('editor')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'editor'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              Interactive Editor
            </button>
            <button
              onClick={() => setViewMode('preview')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'preview'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              Document View
            </button>
            <button
              onClick={() => setViewMode('split')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'split'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Split View
            </button>
          </div>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2">
            {/* Branding Config Button */}
            <button
              onClick={onOpenBrandingModal}
              title="Customize Institute Name & Logo"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-200 hover:text-white bg-slate-900 border border-slate-800 hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <Building2 className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Branding</span>
            </button>

            {/* Presets & Reset Dropdown / Buttons */}
            <button
              onClick={onReset}
              title="Clear all fields to start with an empty plan"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-200 hover:text-red-300 bg-slate-900 border border-slate-800 hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-red-400" />
              <span>Empty Form</span>
            </button>

            <button
              onClick={onLoadSample}
              title="Load Sample Pre-filled Lesson Plan for Reference"
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-200 hover:text-white bg-slate-900 border border-slate-800 hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Load Sample</span>
            </button>

            {/* Import / Export JSON */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={onImportJson}
              accept=".json"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              title="Import JSON Draft"
              className="p-2 rounded-lg text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onExportJson}
              title="Export Draft Data (JSON)"
              className="p-2 rounded-lg text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
            </button>

            {/* Print Button */}
            <button
              onClick={onPrint}
              title="Print Document"
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>

            {/* Primary One-Click Export PDF Button */}
            <button
              onClick={onExportPdf}
              disabled={isExporting}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-black text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-md shadow-amber-950/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isExporting ? (
                <div className="w-3.5 h-3.5 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
              ) : (
                <FileDown className="w-4 h-4" />
              )}
              <span>{isExporting ? 'Generating PDF...' : 'Export PDF'}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
