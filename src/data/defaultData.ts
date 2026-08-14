import { LessonPlanData } from '../types';

export const defaultBranding = {
  instituteName: 'Tehran Institute of Technology',
  department: 'English Department',
  address: 'No.12, Behzad boulevard, Abghari St., Kaj Sq. Tehran, Iran',
  phone: '+98 21 2729 , +98 21 22369163',
  website: 'www.mftplus.com',
};

export const sampleLessonPlan: LessonPlanData = {
  branding: { ...defaultBranding },
  metadata: {
    traineeName: 'Alex Morgan',
    level: 'Upper-Intermediate (B2)',
    tutor: 'Dr. Sarah Jenkins',
    date: '2026-08-05',
    studentCount: '14',
    lengthMins: '45',
    tpNumber: 'TP 3',
    lessonPlanNumber: 'LP-03-B2',
  },
  aims: {
    mainAims:
      'By the end of the lesson, students will be able to talk about personal past experiences and uncompleted actions using the Present Perfect Continuous tense with "for" and "since" in a 5-minute communicative pair interview.',
    subsidiaryAims:
      '1. Practice listening for specific details in an audio dialogue between two colleagues.\n2. Distinguish between static durations ("for 3 years") and point-in-time references ("since 2021").',
    materials:
      '• Coursebook Units 4B (pp. 42-43)\n• Audio track 2.14\n• Handout 1: Gap-fill listening worksheet\n• Handout 2: "Find Someone Who" interview grid\n• Whiteboard markers (Red, Blue, Black)',
    assumptions:
      '• Students are already familiar with Present Perfect Simple (have + past participle).\n• Students know temporal prepositions such as "for", "since", "ago", and "in".',
    anticipatedProblems:
      '1. Confusion between Present Perfect Simple and Present Perfect Continuous form ("have been living" vs "have lived").\n2. Pronunciation weak form of "been" /bɪn/ vs /biːn/.\n3. Overuse of "since" with durations (e.g., "since 5 years").',
    possibleSolutions:
      '1. Use timeline diagrams on the board to visually display ongoing duration versus completed action.\n2. Drill the weak schwa sound /bɪn/ during the phonology stage.\n3. Write concept checking rule clearly on the board: "FOR + duration of time", "SINCE + starting point".',
    personalAims:
      '• Reduce Teacher Talking Time (TTT) during the freer practice stage to under 20%.\n• Use clear Instruction Checking Questions (ICQs) before handing out worksheets.',
  },
  languageAnalysis: {
    focusMode: 'A',
    tenseItem: 'Present Perfect Continuous (Affirmative & Interrogative)',
    form: 'Subject + have/has + been + Verb-ing (e.g., "I have been studying English for three years.")\nQuestion: Have + subject + been + Verb-ing? ("How long have you been living here?")',
    meaningUse:
      'To describe an action that started in the past and continues into the present moment, emphasizing duration or continuous activity.',
    phonology:
      '/aɪ v bɪn ˈstʌdiɪŋ/\n• Weak form of "have" -> /v/ or /həv/\n• Weak form of "been" -> /bɪn/\n• Sentence stress on "stúdying" and "thrée yéars"',
    vocabulary:
      '• Duration (n.) /djʊəˈreɪʃn/ - length of time something lasts\n• Continuous (adj.) /kənˈtɪnjuəs/ - without interruption\n• Milestone (n.) /ˈmaɪlstəʊn/ - significant stage or event',
  },
  skillsFocus: {
    reading: false,
    listening: false,
    writing: false,
    speaking: true,
    specificSkills:
      'Listening for specific information (audio dialogue) and controlled/freer speaking in pair work interviews.',
    preTeachVocab:
      'pre-teach: "promotion" /prəˈməʊʃn/ (n), "commute" /kəˈmjuːt/ (v), "workload" /ˈwɜːkləʊd/ (n)',
  },
  overallAim:
    'By the end of the lesson students will be able to express ongoing past-to-present activities using Present Perfect Continuous with fluency.',
  stages: [
    {
      id: 'stage-1',
      stageName: 'Warm-up',
      stageAndAim: 'Aim: Engage interest & activate schema',
      procedureAndInstructions:
        'Show 3 photo slides of personal life events (living abroad, playing guitar, learning English).\nAsk Ss: "How long do you think I\'ve been doing these?"\nPairs guess durations. Conduct brief open-class feedback.',
      timeMins: 5,
      interactionMode: 'T-S, Pair work (S-S)',
    },
    {
      id: 'stage-2',
      stageName: 'Pre-Listening',
      stageAndAim: 'Aim: Expose target language in context',
      procedureAndInstructions:
        'Hand out Handout 1. Play Audio 2.14.\nFirst listen: Ss answer gist question ("What are Mark and Sarah discussing?").\nSecond listen: Ss complete target sentences with missing verb forms.\nPeer check answers.',
      timeMins: 8,
      interactionMode: 'Individual, Pair check',
    },
    {
      id: 'stage-3',
      stageName: 'Presentation',
      stageAndAim: 'Aim: Clarify Meaning, Form & Pronunciation',
      procedureAndInstructions:
        'Highlight target sentence on board: "I have been working here for 6 months."\nAsk CCQs:\n1. Did I start working in the past? (Yes)\n2. Am I still working here now? (Yes)\n3. Is it about duration or completed result? (Duration)\nElicit form formula and drill pronunciation weak form /bɪn/.',
      timeMins: 10,
      interactionMode: 'T-S, Choral drilling',
    },
    {
      id: 'stage-4',
      stageName: 'Practice',
      stageAndAim: 'Aim: Check accuracy of target structure',
      procedureAndInstructions:
        'Distribute gap-fill exercise (Ex 3, p. 43).\nSs complete 6 sentences individually choosing "for" or "since" and correct verb form.\nTeacher monitors for errors.\nEarly finishers check in pairs.',
      timeMins: 10,
      interactionMode: 'Individual -> Pair check',
    },
    {
      id: 'stage-5',
      stageName: 'Production',
      stageAndAim: 'Aim: Develop fluency in communicative task',
      procedureAndInstructions:
        'Distribute "Find Someone Who..." interview grid.\nSs mingle around class asking classmate questions e.g. "How long have you been learning guitar / living in this city?"\nSs take notes of peer responses.',
      timeMins: 10,
      interactionMode: 'Mingle (S-S)',
    },
    {
      id: 'stage-6',
      stageName: 'Closure',
      stageAndAim: 'Aim: Error correction & praise',
      procedureAndInstructions:
        'Write 4 student sentences collected during monitoring on board (2 correct, 2 with errors).\nIn pairs, Ss identify and correct errors.\nSummarize lesson achievements.',
      timeMins: 2,
      interactionMode: 'T-S, Open Class',
    },
  ],
  feedback: {
    reminders:
      '• Remember to bring whiteboard markers and printed worksheets.\n• Monitor silently during freer practice without interrupting fluency.',
    aimsComments:
      'Main aim is clear and measurable. Good inclusion of both linguistic and communicative targets.',
    stagesComments:
      'Pacing is well distributed. Ensure Lead-in does not exceed 5 minutes.',
    languageAnalysisComments:
      'Thorough phonological breakdown. Strong focus on weak forms.',
    trainerName: 'Dr. Sarah Jenkins',
    grade: 'Pass with Distinction',
    dateEvaluated: '2026-08-05',
  },
};

export const emptyLessonPlan: LessonPlanData = {
  branding: { ...defaultBranding },
  metadata: {
    traineeName: '',
    level: '',
    tutor: '',
    date: new Date().toISOString().split('T')[0],
    studentCount: '',
    lengthMins: '',
    tpNumber: '',
    lessonPlanNumber: '',
  },
  aims: {
    mainAims: '',
    subsidiaryAims: '',
    materials: '',
    assumptions: '',
    anticipatedProblems: '',
    possibleSolutions: '',
    personalAims: '',
  },
  languageAnalysis: {
    focusMode: 'A',
    tenseItem: '',
    form: '',
    meaningUse: '',
    phonology: '',
    vocabulary: '',
  },
  skillsFocus: {
    reading: false,
    listening: false,
    writing: false,
    speaking: false,
    specificSkills: '',
    preTeachVocab: '',
  },
  overallAim: '',
  stages: [
    {
      id: 'stage-1',
      stageAndAim: '',
      procedureAndInstructions: '',
      timeMins: '',
      interactionMode: '',
    },
    {
      id: 'stage-2',
      stageAndAim: '',
      procedureAndInstructions: '',
      timeMins: '',
      interactionMode: '',
    },
    {
      id: 'stage-3',
      stageAndAim: '',
      procedureAndInstructions: '',
      timeMins: '',
      interactionMode: '',
    },
    {
      id: 'stage-4',
      stageAndAim: '',
      procedureAndInstructions: '',
      timeMins: '',
      interactionMode: '',
    },
    {
      id: 'stage-5',
      stageAndAim: '',
      procedureAndInstructions: '',
      timeMins: '',
      interactionMode: '',
    },
    {
      id: 'stage-6',
      stageAndAim: '',
      procedureAndInstructions: '',
      timeMins: '',
      interactionMode: '',
    },
    {
      id: 'stage-7',
      stageAndAim: '',
      procedureAndInstructions: '',
      timeMins: '',
      interactionMode: '',
    },
    {
      id: 'stage-8',
      stageAndAim: '',
      procedureAndInstructions: '',
      timeMins: '',
      interactionMode: '',
    },
    {
      id: 'stage-9',
      stageAndAim: '',
      procedureAndInstructions: '',
      timeMins: '',
      interactionMode: '',
    },
    {
      id: 'stage-10',
      stageAndAim: '',
      procedureAndInstructions: '',
      timeMins: '',
      interactionMode: '',
    },
  ],
  feedback: {
    reminders: '',
    aimsComments: '',
    stagesComments: '',
    languageAnalysisComments: '',
    trainerName: '',
    grade: '',
    dateEvaluated: '',
  },
};
