// Builds a plain-text version of a lesson plan for copy/print/PDF export.
const labels = {
  en: {
    lessonPlan: 'LESSON PLAN',
    teacher: 'Teacher',
    school: 'School',
    class: 'Class',
    subject: 'Subject',
    topic: 'Topic',
    duration: 'Duration',
    minutes: 'minutes',
    learningObjectives: 'LEARNING OBJECTIVES',
    previousKnowledge: 'PREVIOUS KNOWLEDGE',
    introduction: 'INTRODUCTION / WARM-UP',
    min: 'min',
    teachingMaterials: 'TEACHING MATERIALS',
    teacherActivity: 'TEACHER ACTIVITY',
    studentActivity: 'STUDENT ACTIVITY',
    classroomActivities: 'CLASSROOM ACTIVITIES',
    assessment: 'ASSESSMENT',
    oralQuestions: 'Oral Questions',
    shortQuestions: 'Short Questions',
    mcqs: 'MCQs',
    practical: 'Practical/Activity-based',
    exitTicket: 'Exit Ticket',
    differentiation: 'DIFFERENTIATED LEARNING',
    slowLearners: 'Slow learners',
    averageLearners: 'Average learners',
    advancedLearners: 'Advanced learners',
    homework: 'HOMEWORK',
    recap: 'RECAP / CLOSURE',
  },
  ur: {
    lessonPlan: 'درس کا منصوبہ',
    teacher: 'استاد',
    school: 'سکول',
    class: 'کلاس',
    subject: 'موضوع',
    topic: 'عنوان',
    duration: 'دورانیہ',
    minutes: 'منٹ',
    learningObjectives: 'سیکھنے کے مقاصد',
    previousKnowledge: 'پہلے سے موجود علم',
    introduction: 'تعارف / گرم کرنا',
    min: 'منٹ',
    teachingMaterials: 'تدریسی مواد',
    teacherActivity: 'استاد کی سرگرمی',
    studentActivity: 'طالب علم کی سرگرمی',
    classroomActivities: 'کلاس روم کی سرگرمیاں',
    assessment: 'تشخیص',
    oralQuestions: 'منہ کے سوالات',
    shortQuestions: 'مختصر سوالات',
    mcqs: 'متعدد الخیار سوالات',
    practical: 'عملی/سرگرمی پر مبنی',
    exitTicket: 'باہر نکلنے کی ٹکٹ',
    differentiation: 'مختلف شدہ سیکھنا',
    slowLearners: 'سست سیکھنے والے',
    averageLearners: 'اوسط سیکھنے والے',
    advancedLearners: 'اعلیٰ سیکھنے والے',
    homework: 'گھر کا کام',
    recap: 'دوبارہ بیان / اختتام',
  },
}

export function planToText(plan) {
  const { meta, objectives, previousKnowledge, introduction, materials, teacherActivity, studentActivity, classroomActivities, assessment, differentiation, homework, recap } = plan
  const lang = meta.language === 'Urdu' ? 'ur' : 'en'
  const t = labels[lang]

  const lines = []
  lines.push(t.lessonPlan)
  lines.push(`${t.teacher}: ${meta.teacherName || '-'}`)
  lines.push(`${t.school}: ${meta.schoolName || '-'}`)
  lines.push(`${t.class}: ${meta.className}`)
  lines.push(`${t.subject}: ${meta.subject}`)
  lines.push(`${t.topic}: ${meta.topic}`)
  lines.push(`${t.duration}: ${meta.duration} ${t.minutes}`)
  lines.push('')

  lines.push(t.learningObjectives)
  objectives.forEach((o) => lines.push(`- ${o}`))
  lines.push('')

  lines.push(t.previousKnowledge)
  lines.push(previousKnowledge)
  lines.push('')

  lines.push(`${t.introduction} (${introduction.time} ${t.min})`)
  lines.push(introduction.text)
  lines.push('')

  lines.push(t.teachingMaterials)
  materials.forEach((m) => lines.push(`- ${m}`))
  lines.push('')

  lines.push(t.teacherActivity)
  teacherActivity.forEach((a, i) => lines.push(`${i + 1}. ${a}`))
  lines.push('')

  lines.push(t.studentActivity)
  studentActivity.forEach((a) => lines.push(`- ${a}`))
  lines.push('')

  lines.push(t.classroomActivities)
  classroomActivities.forEach((a) => lines.push(`- ${a.title}: ${a.description}`))
  lines.push('')

  lines.push(t.assessment)
  lines.push(`${t.oralQuestions}:`)
  assessment.oral.forEach((q) => lines.push(`  - ${q}`))
  lines.push(`${t.shortQuestions}:`)
  assessment.short.forEach((q) => lines.push(`  - ${q}`))
  if (assessment.mcqs.length) {
    lines.push(`${t.mcqs}:`)
    assessment.mcqs.forEach((q) => lines.push(`  - ${q}`))
  }
  lines.push(`${t.practical}:`)
  assessment.practical.forEach((q) => lines.push(`  - ${q}`))
  lines.push(`${t.exitTicket}: ${assessment.exitTicket}`)
  lines.push('')

  lines.push(t.differentiation)
  lines.push(`${t.slowLearners}: ${differentiation.slow}`)
  lines.push(`${t.averageLearners}: ${differentiation.average}`)
  lines.push(`${t.advancedLearners}: ${differentiation.advanced}`)
  lines.push('')

  lines.push(t.homework)
  lines.push(homework)
  lines.push('')

  lines.push(t.recap)
  recap.forEach((r) => lines.push(`- ${r}`))

  return lines.join('\n')
}
