import React, { useState, useEffect } from 'react'
import {
     User,
     Languages,
     Layers,
     ShieldCheck,
     CheckCircle2,
     FileText,
     Edit3,
     Eye,
     Columns,
     Sparkles,
     Info,
} from 'lucide-react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { LessonPlanData } from './types'
import { sampleLessonPlan, emptyLessonPlan } from './data/defaultData'
import { validateLessonPlanStages } from './utils/stageUtils'
import { Header } from './components/Header'
import { BrandingSettingsModal } from './components/BrandingSettingsModal'
import { SectionPage1 } from './components/Editor/SectionPage1'
import { SectionPage2 } from './components/Editor/SectionPage2'
import { SectionPage3Stages } from './components/Editor/SectionPage3Stages'
import { SectionPage5Feedback } from './components/Editor/SectionPage5Feedback'
import { DocumentPageLayout } from './components/Preview/DocumentPageLayout'
import { exportLessonPlanToPdf, printLessonPlan } from './utils/pdfExport'

const STORAGE_KEY = 'interactive_lesson_plan_draft_v1'

export default function App() {
     // Load saved draft or default empty lesson plan
     const [lessonData, setLessonData] = useState<LessonPlanData>(() => {
          try {
               const saved = localStorage.getItem(STORAGE_KEY)
               if (saved) {
                    return JSON.parse(saved)
               }
          } catch (e) {
               console.error('Failed to parse saved lesson plan draft', e)
          }
          return emptyLessonPlan
     })

     const [viewMode, setViewMode] = useState<'editor' | 'preview' | 'split'>(
          'preview',
     )
     const [activeTab, setActiveTab] = useState<
          'section1' | 'section2' | 'section3' | 'section5'
     >('section1')
     const [isBrandingModalOpen, setIsBrandingModalOpen] = useState(false)
     const [isExporting, setIsExporting] = useState(false)

     // Auto-save to LocalStorage
     useEffect(() => {
          try {
               localStorage.setItem(STORAGE_KEY, JSON.stringify(lessonData))
          } catch (e) {
               console.error('Failed to save draft to LocalStorage', e)
          }
     }, [lessonData])

     const showToast = (
          message: string,
          type: 'success' | 'error' | 'info' = 'success',
     ) => {
          toast[type](message)
     }

     const showConfirmation = (message: string, onConfirm: () => void) => {
          toast.warn(
               ({ closeToast }) => (
                    <div className='space-y-3'>
                         <p className='pr-2 text-sm font-medium leading-relaxed'>
                              {message}
                         </p>
                         <div className='flex justify-end gap-2'>
                              <button
                                   type='button'
                                   onClick={() => closeToast?.()}
                                   className='rounded-md border border-slate-600 px-3 py-1.5 text-xs font-bold text-slate-200 transition-colors hover:bg-slate-700'
                              >
                                   Cancel
                              </button>
                              <button
                                   type='button'
                                   onClick={() => {
                                        onConfirm()
                                        closeToast?.()
                                   }}
                                   className='rounded-md bg-amber-400 px-3 py-1.5 text-xs font-black text-slate-950 transition-colors hover:bg-amber-300'
                              >
                                   Confirm
                              </button>
                         </div>
                    </div>
               ),
               {
                    autoClose: false,
                    closeOnClick: false,
                    closeButton: false,
                    draggable: false,
               },
          )
     }

     const checkStageValidation = (): boolean => {
          const { isValid, invalidIndices } = validateLessonPlanStages(
               lessonData.stages,
          )
          if (!isValid) {
               const stageListText = invalidIndices
                    .map((i) => `Stage #${i + 1}`)
                    .join(', ')
               toast.error(
                    `⚠️ CANNOT SAVE OR DOWNLOAD\n\nEvery stage in your procedure MUST have a Stage selected from the dropdown menu (Warm-up, Lead-in, Presentation, Practice, Production, Pre-Reading, Pre-Listening, During-Reading, During-Listening, Post-Reading, Post-Listening, Closure, or Plan B).\n\nThe following stage row(s) do not have a Stage selected:\n👉 ${stageListText}\n\nPlease select a stage from the dropdown for all rows before saving or downloading.`,
               )
               setViewMode('editor')
               setActiveTab('section3')
               return false
          }
          return true
     }

     const handleExportPdf = async () => {
          if (!checkStageValidation()) return
          setIsExporting(true)
          showToast('Generating PDF document...', 'info')
          try {
               const trainee = lessonData.metadata.traineeName || 'Trainee'
               const filename = `Teaching_Practice_Lesson_Plan_${trainee.replace(/\s+/g, '_')}.pdf`
               await exportLessonPlanToPdf(filename)
               showToast('PDF exported successfully!')
          } catch (err) {
               const message =
                    err instanceof Error
                         ? err.message
                         : 'PDF export failed in this browser. The print dialog will open instead.'
               console.error('Export PDF error:', err)
               showToast(
                    'PDF export failed in this browser. Opening print dialog instead...',
                    'error',
               )
               try {
                    printLessonPlan()
               } catch (printErr) {
                    console.error('Print fallback failed:', printErr)
                    showToast(
                         'PDF export and print fallback are unavailable in this browser. Please try again in a moment.',
                         'error',
                    )
               }
               console.warn(message)
          } finally {
               setIsExporting(false)
          }
     }

     const handlePrint = () => {
          if (!checkStageValidation()) return
          printLessonPlan()
     }

     const handleLoadSample = () => {
          showConfirmation(
               'Replace the current document with the completed sample lesson plan?',
               () => {
                    setLessonData(sampleLessonPlan)
                    showToast('Loaded sample lesson plan template.')
               },
          )
     }

     const handleReset = () => {
          showConfirmation(
               'Clear all fields and start with a blank lesson plan?',
               () => {
                    setLessonData(emptyLessonPlan)
                    showToast('Reset to blank template.')
               },
          )
     }

     const handleExportJson = () => {
          if (!checkStageValidation()) return
          const dataStr =
               'data:text/json;charset=utf-8,' +
               encodeURIComponent(JSON.stringify(lessonData, null, 2))
          const downloadAnchor = document.createElement('a')
          downloadAnchor.setAttribute('href', dataStr)
          downloadAnchor.setAttribute(
               'download',
               `LessonPlan_${lessonData.metadata.traineeName || 'Draft'}.json`,
          )
          document.body.appendChild(downloadAnchor)
          downloadAnchor.click()
          downloadAnchor.remove()
          showToast('JSON draft exported.')
     }

     const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files?.[0]
          if (!file) return

          const reader = new FileReader()
          reader.onload = (event) => {
               try {
                    const parsed = JSON.parse(event.target?.result as string)
                    if (parsed.metadata && parsed.aims) {
                         setLessonData(parsed)
                         showToast('JSON draft imported successfully!')
                    } else {
                         toast.error('Invalid lesson plan JSON format.')
                    }
               } catch (err) {
                    toast.error('Could not parse JSON file.')
               }
          }
          reader.readAsText(file)
          e.target.value = ''
     }

     return (
          <div className='min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-slate-100 flex flex-col font-sans relative selection:bg-amber-400 selection:text-slate-950'>
               <ToastContainer
                    position='bottom-right'
                    autoClose={3000}
                    theme='dark'
                    closeOnClick
                    pauseOnFocusLoss
               />
               {/* Offscreen dedicated container for high-resolution PDF rendering across all view modes */}
               <div
                    id='pdf-export-container'
                    className='fixed top-0 -left-[9999px] w-[210mm] pointer-events-none opacity-100 z-[-9999] bg-white overflow-hidden'
                    aria-hidden='true'
               >
                    <DocumentPageLayout
                         data={lessonData}
                         isInteractiveCanvas={false}
                    />
               </div>

               {/* Top Header */}
               <Header
                    viewMode={viewMode}
                    setViewMode={setViewMode}
                    onExportPdf={handleExportPdf}
                    onPrint={handlePrint}
                    onOpenBrandingModal={() => setIsBrandingModalOpen(true)}
                    onLoadSample={handleLoadSample}
                    onReset={handleReset}
                    onExportJson={handleExportJson}
                    onImportJson={handleImportJson}
                    isExporting={isExporting}
                    lessonData={lessonData}
               />

               {/* Main Workspace Area */}
               <main className='flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8'>
                    {/* View mode switcher for smaller screens */}
                    <div className='md:hidden flex items-center justify-center bg-emerald-950 p-1.5 rounded-xl text-white mb-4 no-print shadow-xs'>
                         <button
                              onClick={() => setViewMode('editor')}
                              className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-lg ${
                                   viewMode === 'editor'
                                        ? 'bg-amber-600 text-slate-950 font-bold'
                                        : 'text-slate-300'
                              }`}
                         >
                              <Edit3 className='w-3.5 h-3.5' />
                              Editor
                         </button>
                         <button
                              onClick={() => setViewMode('preview')}
                              className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-lg ${
                                   viewMode === 'preview'
                                        ? 'bg-amber-600 text-slate-950 font-bold'
                                        : 'text-slate-300'
                              }`}
                         >
                              <Eye className='w-3.5 h-3.5' />
                              Document View
                         </button>
                    </div>

                    {/* ================= MODE: EDITOR VIEW ================= */}
                    {viewMode === 'editor' && (
                         <div className='space-y-6 no-print'>
                              {/* Editor Navigation Tabs */}
                              <div className='bg-slate-900/90 rounded-xl shadow-md border border-slate-800 p-1.5 flex flex-wrap gap-1'>
                                   {[
                                        {
                                             id: 'section1',
                                             label: '1. Overview & Aims',
                                             icon: User,
                                             badge: 'Page 1',
                                        },
                                        {
                                             id: 'section2',
                                             label: '2. Language Analysis & Skills',
                                             icon: Languages,
                                             badge: 'Page 2',
                                        },
                                        {
                                             id: 'section3',
                                             label: '3. Lesson Stages & Procedure',
                                             icon: Layers,
                                             badge: `${lessonData.stages.length} Stages`,
                                        },
                                        {
                                             id: 'section5',
                                             label: '4. Reminders & Assessment',
                                             icon: ShieldCheck,
                                             badge: 'Page 5',
                                        },
                                   ].map((tab) => {
                                        const Icon = tab.icon
                                        const isActive = activeTab === tab.id
                                        return (
                                             <button
                                                  key={tab.id}
                                                  onClick={() =>
                                                       setActiveTab(
                                                            tab.id as any,
                                                       )
                                                  }
                                                  className={`flex-1 min-w-[160px] flex items-center justify-between px-4 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                                                       isActive
                                                            ? 'bg-emerald-900 text-amber-300 border border-emerald-700/80 shadow-xs'
                                                            : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                                                  }`}
                                             >
                                                  <div className='flex items-center gap-2'>
                                                       <Icon
                                                            className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-emerald-400'}`}
                                                       />
                                                       <span>{tab.label}</span>
                                                  </div>
                                                  <span
                                                       className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                                                            isActive
                                                                 ? 'bg-amber-400 text-slate-950'
                                                                 : 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/60'
                                                       }`}
                                                  >
                                                       {tab.badge}
                                                  </span>
                                             </button>
                                        )
                                   })}
                              </div>

                              {/* Active Tab Form Content */}
                              {activeTab === 'section1' && (
                                   <SectionPage1
                                        metadata={lessonData.metadata}
                                        onChangeMetadata={(metadata) =>
                                             setLessonData({
                                                  ...lessonData,
                                                  metadata,
                                             })
                                        }
                                        aims={lessonData.aims}
                                        onChangeAims={(aims) =>
                                             setLessonData({
                                                  ...lessonData,
                                                  aims,
                                             })
                                        }
                                   />
                              )}

                              {activeTab === 'section2' && (
                                   <SectionPage2
                                        languageAnalysis={
                                             lessonData.languageAnalysis
                                        }
                                        onChangeLanguageAnalysis={(
                                             languageAnalysis,
                                        ) =>
                                             setLessonData({
                                                  ...lessonData,
                                                  languageAnalysis,
                                             })
                                        }
                                        skillsFocus={lessonData.skillsFocus}
                                        onChangeSkillsFocus={(skillsFocus) =>
                                             setLessonData({
                                                  ...lessonData,
                                                  skillsFocus,
                                             })
                                        }
                                   />
                              )}

                              {activeTab === 'section3' && (
                                   <SectionPage3Stages
                                        overallAim={lessonData.overallAim}
                                        onChangeOverallAim={(overallAim) =>
                                             setLessonData({
                                                  ...lessonData,
                                                  overallAim,
                                             })
                                        }
                                        stages={lessonData.stages}
                                        onChangeStages={(stages) =>
                                             setLessonData({
                                                  ...lessonData,
                                                  stages,
                                             })
                                        }
                                        targetLengthMins={
                                             lessonData.metadata.lengthMins
                                        }
                                   />
                              )}

                              {activeTab === 'section5' && (
                                   <SectionPage5Feedback
                                        feedback={lessonData.feedback}
                                        onChangeFeedback={(feedback) =>
                                             setLessonData({
                                                  ...lessonData,
                                                  feedback,
                                             })
                                        }
                                   />
                              )}
                         </div>
                    )}

                    {/* ================= MODE: PREVIEW / DOCUMENT CANVAS VIEW ================= */}
                    {viewMode === 'preview' && (
                         <div className='py-4'>
                              <div className='mb-4 bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-950 flex items-center justify-between no-print'>
                                   <div className='flex items-center gap-2'>
                                        <Info className='w-4 h-4 text-emerald-700 shrink-0' />
                                        <span>
                                             <strong>
                                                  Interactive Document Canvas:
                                             </strong>{' '}
                                             You can edit text directly inside
                                             any field on the document sheets
                                             below or click{' '}
                                             <strong>Export PDF</strong> above
                                             for a 1-click clean export.
                                        </span>
                                   </div>
                              </div>

                              <DocumentPageLayout
                                   data={lessonData}
                                   onChangeData={setLessonData}
                              />
                         </div>
                    )}

                    {/* ================= MODE: SPLIT VIEW ================= */}
                    {viewMode === 'split' && (
                         <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 py-2'>
                              {/* Left Column: Form Editor */}
                              <div className='lg:col-span-6 space-y-6 no-print'>
                                   <div className='bg-slate-900/90 rounded-xl shadow-md border border-slate-800 p-1.5 flex flex-wrap gap-1'>
                                        {[
                                             {
                                                  id: 'section1',
                                                  label: '1. Overview',
                                                  icon: User,
                                             },
                                             {
                                                  id: 'section2',
                                                  label: '2. Language',
                                                  icon: Languages,
                                             },
                                             {
                                                  id: 'section3',
                                                  label: '3. Stages',
                                                  icon: Layers,
                                             },
                                             {
                                                  id: 'section5',
                                                  label: '4. Feedback',
                                                  icon: ShieldCheck,
                                             },
                                        ].map((tab) => {
                                             const Icon = tab.icon
                                             const isActive =
                                                  activeTab === tab.id
                                             return (
                                                  <button
                                                       key={tab.id}
                                                       onClick={() =>
                                                            setActiveTab(
                                                                 tab.id as any,
                                                            )
                                                       }
                                                       className={`flex-1 min-w-[100px] flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-semibold cursor-pointer ${
                                                            isActive
                                                                 ? 'bg-emerald-900 text-amber-300 border border-emerald-700/80 shadow-xs'
                                                                 : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                                                       }`}
                                                  >
                                                       <Icon className='w-3.5 h-3.5' />
                                                       <span>{tab.label}</span>
                                                  </button>
                                             )
                                        })}
                                   </div>

                                   {activeTab === 'section1' && (
                                        <SectionPage1
                                             metadata={lessonData.metadata}
                                             onChangeMetadata={(metadata) =>
                                                  setLessonData({
                                                       ...lessonData,
                                                       metadata,
                                                  })
                                             }
                                             aims={lessonData.aims}
                                             onChangeAims={(aims) =>
                                                  setLessonData({
                                                       ...lessonData,
                                                       aims,
                                                  })
                                             }
                                        />
                                   )}

                                   {activeTab === 'section2' && (
                                        <SectionPage2
                                             languageAnalysis={
                                                  lessonData.languageAnalysis
                                             }
                                             onChangeLanguageAnalysis={(
                                                  languageAnalysis,
                                             ) =>
                                                  setLessonData({
                                                       ...lessonData,
                                                       languageAnalysis,
                                                  })
                                             }
                                             skillsFocus={
                                                  lessonData.skillsFocus
                                             }
                                             onChangeSkillsFocus={(
                                                  skillsFocus,
                                             ) =>
                                                  setLessonData({
                                                       ...lessonData,
                                                       skillsFocus,
                                                  })
                                             }
                                        />
                                   )}

                                   {activeTab === 'section3' && (
                                        <SectionPage3Stages
                                             overallAim={lessonData.overallAim}
                                             onChangeOverallAim={(overallAim) =>
                                                  setLessonData({
                                                       ...lessonData,
                                                       overallAim,
                                                  })
                                             }
                                             stages={lessonData.stages}
                                             onChangeStages={(stages) =>
                                                  setLessonData({
                                                       ...lessonData,
                                                       stages,
                                                  })
                                             }
                                             targetLengthMins={
                                                  lessonData.metadata.lengthMins
                                             }
                                        />
                                   )}

                                   {activeTab === 'section5' && (
                                        <SectionPage5Feedback
                                             feedback={lessonData.feedback}
                                             onChangeFeedback={(feedback) =>
                                                  setLessonData({
                                                       ...lessonData,
                                                       feedback,
                                                  })
                                             }
                                        />
                                   )}
                              </div>

                              {/* Right Column: Live Document Preview */}
                              <div className='lg:col-span-6 border-l border-slate-200 pl-0 lg:pl-6 overflow-x-auto'>
                                   <div className='sticky top-20'>
                                        <div className='mb-3 flex items-center justify-between no-print'>
                                             <span className='text-xs font-semibold text-slate-600 uppercase tracking-wider flex items-center gap-1.5'>
                                                  <Eye className='w-3.5 h-3.5 text-blue-600' />
                                                  Live Document Canvas
                                             </span>
                                             <span className='text-[10px] text-slate-500 bg-slate-200 px-2 py-0.5 rounded-full'>
                                                  Auto-Synchronized
                                             </span>
                                        </div>
                                        <div className='scale-90 transform-gpu origin-top'>
                                             <DocumentPageLayout
                                                  data={lessonData}
                                                  onChangeData={setLessonData}
                                             />
                                        </div>
                                   </div>
                              </div>
                         </div>
                    )}
               </main>

               {/* Institute Branding Modal */}
               <BrandingSettingsModal
                    isOpen={isBrandingModalOpen}
                    onClose={() => setIsBrandingModalOpen(false)}
                    branding={lessonData.branding}
                    onUpdateBranding={(branding) =>
                         setLessonData({ ...lessonData, branding })
                    }
               />
          </div>
     )
}
