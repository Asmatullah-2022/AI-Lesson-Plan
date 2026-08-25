import jsPDF from 'jspdf'
import { planToText } from './planText'

export function downloadPlanAsPdf(plan) {
  const isUrdu = plan.meta.language === 'Urdu'

  // For Urdu, guide user to use browser print for better font support
  if (isUrdu) {
    const printWindow = window.open('', '_blank')
    const htmlContent = generatePrintableHtml(plan)
    printWindow.document.write(htmlContent)
    printWindow.document.close()
    printWindow.focus()
    setTimeout(() => printWindow.print(), 250)
    return
  }

  // For English, use jsPDF
  const doc = new jsPDF({ unit: 'pt', format: 'a4' })
  const text = planToText(plan)
  const margin = 40
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const lines = doc.splitTextToSize(text, pageWidth - margin * 2)

  doc.setFont('courier', 'normal')
  doc.setFontSize(10)

  let y = margin
  const lineHeight = 14

  lines.forEach((line) => {
    if (y > pageHeight - margin) {
      doc.addPage()
      y = margin
    }
    doc.text(line, margin, y)
    y += lineHeight
  })

  const fileName = `lesson-plan-${(plan.meta.topic || 'plan').toLowerCase().replace(/[^a-z0-9]+/g, '-')}.pdf`
  doc.save(fileName)
}

function generatePrintableHtml(plan) {
  const { meta, objectives, previousKnowledge, introduction, materials, teacherActivity, studentActivity, classroomActivities, assessment, differentiation, homework, recap } = plan
  const isUrdu = meta.language === 'Urdu'
  const dir = isUrdu ? 'rtl' : 'ltr'
  const lang = isUrdu ? 'ur' : 'en'

  const htmlLines = []
  htmlLines.push(`<!DOCTYPE html>`)
  htmlLines.push(`<html dir="${dir}" lang="${lang}">`)
  htmlLines.push(`<head>`)
  htmlLines.push(`<meta charset="UTF-8">`)
  htmlLines.push(`<title>Lesson Plan</title>`)
  htmlLines.push(`<style>`)
  htmlLines.push(`body { font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; direction: ${dir}; }`)
  htmlLines.push(`h1 { font-size: 18px; margin-top: 20px; margin-bottom: 10px; }`)
  htmlLines.push(`h2 { font-size: 14px; margin-top: 15px; margin-bottom: 8px; font-weight: bold; }`)
  htmlLines.push(`p { margin: 5px 0; }`)
  htmlLines.push(`ul { margin: 10px 0; padding-${dir === 'ltr' ? 'left' : 'right'}: 30px; }`)
  htmlLines.push(`li { margin: 4px 0; }`)
  htmlLines.push(`@media print { body { padding: 10px; } }`)
  htmlLines.push(`</style>`)
  htmlLines.push(`</head>`)
  htmlLines.push(`<body>`)

  htmlLines.push(`<h1>${isUrdu ? 'درس کا منصوبہ' : 'LESSON PLAN'}</h1>`)
  htmlLines.push(`<p><strong>${isUrdu ? 'استاد' : 'Teacher'}:</strong> ${meta.teacherName || '-'}</p>`)
  htmlLines.push(`<p><strong>${isUrdu ? 'سکول' : 'School'}:</strong> ${meta.schoolName || '-'}</p>`)
  htmlLines.push(`<p><strong>${isUrdu ? 'کلاس' : 'Class'}:</strong> ${meta.className}</p>`)
  htmlLines.push(`<p><strong>${isUrdu ? 'موضوع' : 'Subject'}:</strong> ${meta.subject}</p>`)
  htmlLines.push(`<p><strong>${isUrdu ? 'عنوان' : 'Topic'}:</strong> ${meta.topic}</p>`)
  htmlLines.push(`<p><strong>${isUrdu ? 'دورانیہ' : 'Duration'}:</strong> ${meta.duration} ${isUrdu ? 'منٹ' : 'minutes'}</p>`)

  htmlLines.push(`<h2>${isUrdu ? 'سیکھنے کے مقاصد' : 'LEARNING OBJECTIVES'}</h2>`)
  htmlLines.push(`<ul>`)
  objectives.forEach((o) => htmlLines.push(`<li>${o}</li>`))
  htmlLines.push(`</ul>`)

  htmlLines.push(`<h2>${isUrdu ? 'پہلے سے موجود علم' : 'PREVIOUS KNOWLEDGE'}</h2>`)
  htmlLines.push(`<p>${previousKnowledge}</p>`)

  htmlLines.push(`<h2>${isUrdu ? 'تعارف / گرم کرنا' : 'INTRODUCTION / WARM-UP'} (${introduction.time} ${isUrdu ? 'منٹ' : 'min'})</h2>`)
  htmlLines.push(`<p>${introduction.text}</p>`)

  htmlLines.push(`<h2>${isUrdu ? 'تدریسی مواد' : 'TEACHING MATERIALS'}</h2>`)
  htmlLines.push(`<ul>`)
  materials.forEach((m) => htmlLines.push(`<li>${m}</li>`))
  htmlLines.push(`</ul>`)

  htmlLines.push(`<h2>${isUrdu ? 'استاد کی سرگرمی' : 'TEACHER ACTIVITY'}</h2>`)
  htmlLines.push(`<ol>`)
  teacherActivity.forEach((a) => htmlLines.push(`<li>${a}</li>`))
  htmlLines.push(`</ol>`)

  htmlLines.push(`<h2>${isUrdu ? 'طالب علم کی سرگرمی' : 'STUDENT ACTIVITY'}</h2>`)
  htmlLines.push(`<ul>`)
  studentActivity.forEach((a) => htmlLines.push(`<li>${a}</li>`))
  htmlLines.push(`</ul>`)

  htmlLines.push(`<h2>${isUrdu ? 'کلاس روم کی سرگرمیاں' : 'CLASSROOM ACTIVITIES'}</h2>`)
  htmlLines.push(`<ul>`)
  classroomActivities.forEach((a) => htmlLines.push(`<li><strong>${a.title}:</strong> ${a.description}</li>`))
  htmlLines.push(`</ul>`)

  htmlLines.push(`<h2>${isUrdu ? 'تشخیص' : 'ASSESSMENT'}</h2>`)
  htmlLines.push(`<p><strong>${isUrdu ? 'منہ کے سوالات' : 'Oral Questions'}:</strong></p>`)
  htmlLines.push(`<ul>`)
  assessment.oral.forEach((q) => htmlLines.push(`<li>${q}</li>`))
  htmlLines.push(`</ul>`)

  htmlLines.push(`<p><strong>${isUrdu ? 'مختصر سوالات' : 'Short Questions'}:</strong></p>`)
  htmlLines.push(`<ul>`)
  assessment.short.forEach((q) => htmlLines.push(`<li>${q}</li>`))
  htmlLines.push(`</ul>`)

  if (assessment.mcqs.length) {
    htmlLines.push(`<p><strong>${isUrdu ? 'متعدد الخیار سوالات' : 'MCQs'}:</strong></p>`)
    htmlLines.push(`<ul>`)
    assessment.mcqs.forEach((q) => htmlLines.push(`<li>${q}</li>`))
    htmlLines.push(`</ul>`)
  }

  htmlLines.push(`<p><strong>${isUrdu ? 'عملی/سرگرمی پر مبنی' : 'Practical/Activity-based'}:</strong></p>`)
  htmlLines.push(`<ul>`)
  assessment.practical.forEach((q) => htmlLines.push(`<li>${q}</li>`))
  htmlLines.push(`</ul>`)
  htmlLines.push(`<p><strong>${isUrdu ? 'باہر نکلنے کی ٹکٹ' : 'Exit Ticket'}:</strong> ${assessment.exitTicket}</p>`)

  htmlLines.push(`<h2>${isUrdu ? 'مختلف شدہ سیکھنا' : 'DIFFERENTIATED LEARNING'}</h2>`)
  htmlLines.push(`<p><strong>${isUrdu ? 'سست سیکھنے والے' : 'Slow learners'}:</strong> ${differentiation.slow}</p>`)
  htmlLines.push(`<p><strong>${isUrdu ? 'اوسط سیکھنے والے' : 'Average learners'}:</strong> ${differentiation.average}</p>`)
  htmlLines.push(`<p><strong>${isUrdu ? 'اعلیٰ سیکھنے والے' : 'Advanced learners'}:</strong> ${differentiation.advanced}</p>`)

  htmlLines.push(`<h2>${isUrdu ? 'گھر کا کام' : 'HOMEWORK'}</h2>`)
  htmlLines.push(`<p>${homework}</p>`)

  htmlLines.push(`<h2>${isUrdu ? 'دوبارہ بیان / اختتام' : 'RECAP / CLOSURE'}</h2>`)
  htmlLines.push(`<ul>`)
  recap.forEach((r) => htmlLines.push(`<li>${r}</li>`))
  htmlLines.push(`</ul>`)

  htmlLines.push(`</body>`)
  htmlLines.push(`</html>`)

  return htmlLines.join('\n')
}
