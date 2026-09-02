import React from 'react'
import {
     FileDown,
     Printer,
     Sparkles,
     RotateCcw,
     FileText,
     ChevronDown,
     Edit3,
     Eye,
     Columns,
} from 'lucide-react'
import { LessonPlanData } from '../types'

type ViewMode = 'editor' | 'preview' | 'split'

interface HeaderProps {
     viewMode: ViewMode
     setViewMode: (mode: ViewMode) => void
     onExportPdf: () => void
     onPrint: () => void
     onOpenBrandingModal: () => void
     onLoadSample: () => void
     onReset: () => void
     onExportJson: () => void
     onImportJson: (e: React.ChangeEvent<HTMLInputElement>) => void
     isExporting: boolean
     lessonData: LessonPlanData
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
     const [isViewMenuOpen, setIsViewMenuOpen] = React.useState(false)
     const viewOptions: Array<{
          value: ViewMode
          label: string
          icon: React.ComponentType<{ className?: string }>
     }> = [
          { value: 'preview', label: 'Document', icon: Eye },
          { value: 'editor', label: 'Interactive', icon: Edit3 },
          { value: 'split', label: 'Split', icon: Columns },
     ]
     const selectedView = viewOptions.find(
          (option) => option.value === viewMode,
     )!
     const SelectedViewIcon = selectedView.icon

     return (
          <header className='sticky top-0 z-30 bg-slate-950/95 border-b border-blue-900/50 text-white shadow-xl backdrop-blur-md no-print'>
               <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <div className='flex items-center justify-between h-16 gap-4'>
                         {/* Brand & Document Name */}
                         <div className='flex items-center gap-3 min-w-0'>
                              <div className='w-10 h-10 rounded-xl bg-blue-600/25 border border-amber-400/40 flex items-center justify-center text-amber-400 shrink-0 shadow-inner'>
                                   <FileText className='w-5 h-5' />
                              </div>
                              <div className='truncate'>
                                   <div className='flex items-center gap-2'>
                                        <h1 className='text-base font-bold text-white truncate font-sans tracking-tight'>
                                             Teaching Practice Lesson Plan
                                        </h1>
                                        <span className='px-2 py-0.5 text-xs font-bold bg-amber-400/20 border border-amber-400/40 text-amber-300 rounded-full shrink-0'>
                                             Interactive Canvas
                                        </span>
                                   </div>
                                   <p className='text-xs text-blue-200/80 truncate'>
                                        {lessonData.branding.instituteName} •{' '}
                                        {lessonData.metadata.traineeName ||
                                             'Trainee Draft'}
                                   </p>
                              </div>
                         </div>

                         {/* Workspace View Selector */}
                         <div className='hidden md:flex items-center gap-2 rounded-xl bg-slate-900/90 px-1.5 py-1 shadow-inner'>
                              <div className='relative'>
                                   <button
                                        type='button'
                                        onClick={() =>
                                             setIsViewMenuOpen(
                                                  (isOpen) => !isOpen,
                                             )
                                        }
                                        className='flex min-w-38 items-center gap-2 rounded-lg border border-amber-400/35 bg-slate-800 py-1.5 pl-3 pr-2 text-xs font-bold text-amber-200 outline-hidden transition-colors hover:border-amber-400/70 hover:bg-slate-700 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 cursor-pointer'
                                        aria-haspopup='menu'
                                        aria-expanded={isViewMenuOpen}
                                   >
                                        <SelectedViewIcon className='h-3.5 w-3.5 text-amber-400' />
                                        <span className='flex-1 text-left'>
                                             {selectedView.label}
                                        </span>
                                        <ChevronDown
                                             className={`h-3.5 w-3.5 text-amber-400 transition-transform duration-150 ${
                                                  isViewMenuOpen
                                                       ? 'rotate-180'
                                                       : ''
                                             }`}
                                        />
                                   </button>

                                   {isViewMenuOpen && (
                                        <div
                                             role='menu'
                                             className='absolute right-0 top-full z-50 mt-2 w-48 origin-top-right rounded-xl border border-slate-700 bg-slate-900 p-1.5 shadow-2xl animate-in fade-in zoom-in-95 duration-150'
                                        >
                                             {viewOptions.map(
                                                  ({
                                                       value,
                                                       label,
                                                       icon: Icon,
                                                  }) => {
                                                       const isSelected =
                                                            value === viewMode

                                                       return (
                                                            <button
                                                                 key={value}
                                                                 type='button'
                                                                 role='menuitem'
                                                                 onClick={() => {
                                                                      setViewMode(
                                                                           value,
                                                                      )
                                                                      setIsViewMenuOpen(
                                                                           false,
                                                                      )
                                                                 }}
                                                                 className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-bold transition-colors cursor-pointer ${
                                                                      isSelected
                                                                           ? 'bg-amber-400 text-slate-950'
                                                                           : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                                                                 }`}
                                                            >
                                                                 <Icon className='h-3.5 w-3.5' />
                                                                 {label}
                                                            </button>
                                                       )
                                                  },
                                             )}
                                        </div>
                                   )}
                              </div>
                         </div>

                         {/* Right Action Tools */}
                         <div className='flex items-center gap-2'>
                              {/* Presets & Reset Dropdown / Buttons */}
                              <button
                                   onClick={onReset}
                                   title='Clear all fields to start with an empty plan'
                                   className='flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-200 hover:text-red-300 bg-slate-900 border border-slate-800 hover:bg-slate-800 transition-colors cursor-pointer'
                              >
                                   <RotateCcw className='w-3.5 h-3.5 text-red-400' />
                                   <span>Empty Form</span>
                              </button>

                              <button
                                   onClick={onLoadSample}
                                   title='Load Sample Pre-filled Lesson Plan for Reference'
                                   className='hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-200 hover:text-white bg-slate-900 border border-slate-800 hover:bg-slate-800 transition-colors cursor-pointer'
                              >
                                   <Sparkles className='w-3.5 h-3.5 text-amber-400' />
                                   <span>Load Sample</span>
                              </button>


                              {/* Print Button */}
                              <button
                                   onClick={onPrint}
                                   title='Print Document'
                                   className='hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:bg-slate-800 transition-colors cursor-pointer'
                              >
                                   <Printer className='w-3.5 h-3.5' />
                                   <span>Print</span>
                              </button>

                              {/* Primary One-Click Export PDF Button */}
                              <button
                                   onClick={onExportPdf}
                                   disabled={isExporting}
                                   className='flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-black text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-md shadow-amber-950/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'
                              >
                                   {isExporting ? (
                                        <div className='w-3.5 h-3.5 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin' />
                                   ) : (
                                        <FileDown className='w-4 h-4' />
                                   )}
                                   <span>
                                        {isExporting
                                             ? 'Generating PDF...'
                                             : 'Export PDF'}
                                   </span>
                              </button>
                         </div>
                    </div>
               </div>
          </header>
     )
}
