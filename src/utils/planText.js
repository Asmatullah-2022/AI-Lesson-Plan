// Builds a plain-text version of a lesson plan for copy/print/PDF export.
export function planToText(plan) {
  const { meta, objectives, previousKnowledge, introduction, materials, teacherActivity, studentActivity, classroomActivities, assessment, differentiation, homework, recap } = plan

  const lines = []
  lines.push('LESSON PLAN')
  lines.push(`Teacher: ${meta.teacherName || '-'}`)
  lines.push(`School: ${meta.schoolName || '-'}`)
  lines.push(`Class: ${meta.className}`)
  lines.push(`Subject: ${meta.subject}`)
  lines.push(`Topic: ${meta.topic}`)
  lines.push(`Duration: ${meta.duration} minutes`)
  lines.push('')

  lines.push('LEARNING OBJECTIVES')
  objectives.forEach((o) => lines.push(`- ${o}`))
  lines.push('')

  lines.push('PREVIOUS KNOWLEDGE')
  lines.push(previousKnowledge)
  lines.push('')

  lines.push(`INTRODUCTION / WARM-UP (${introduction.time} min)`)
  lines.push(introduction.text)
  lines.push('')

  lines.push('TEACHING MATERIALS')
  materials.forEach((m) => lines.push(`- ${m}`))
  lines.push('')

  lines.push('TEACHER ACTIVITY')
  teacherActivity.forEach((a, i) => lines.push(`${i + 1}. ${a}`))
  lines.push('')

  lines.push('STUDENT ACTIVITY')
  studentActivity.forEach((a) => lines.push(`- ${a}`))
  lines.push('')

  lines.push('CLASSROOM ACTIVITIES')
  classroomActivities.forEach((a) => lines.push(`- ${a.title}: ${a.description}`))
  lines.push('')

  lines.push('ASSESSMENT')
  lines.push('Oral Questions:')
  assessment.oral.forEach((q) => lines.push(`  - ${q}`))
  lines.push('Short Questions:')
  assessment.short.forEach((q) => lines.push(`  - ${q}`))
  if (assessment.mcqs.length) {
    lines.push('MCQs:')
    assessment.mcqs.forEach((q) => lines.push(`  - ${q}`))
  }
  lines.push('Practical/Activity-based:')
  assessment.practical.forEach((q) => lines.push(`  - ${q}`))
  lines.push(`Exit Ticket: ${assessment.exitTicket}`)
  lines.push('')

  lines.push('DIFFERENTIATED LEARNING')
  lines.push(`Slow learners: ${differentiation.slow}`)
  lines.push(`Average learners: ${differentiation.average}`)
  lines.push(`Advanced learners: ${differentiation.advanced}`)
  lines.push('')

  lines.push('HOMEWORK')
  lines.push(homework)
  lines.push('')

  lines.push('RECAP / CLOSURE')
  recap.forEach((r) => lines.push(`- ${r}`))

  return lines.join('\n')
}
