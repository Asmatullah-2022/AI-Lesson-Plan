import jsPDF from 'jspdf'
import { planToText } from './planText'

export function downloadPlanAsPdf(plan) {
  const isUrdu = plan.meta.language === 'Urdu'

  // For Urdu, use browser print for better font support
  if (isUrdu) {
    const htmlContent = generatePrintableHtml(plan)
    const utf8Bytes = new TextEncoder().encode(htmlContent)
    const blob = new Blob([utf8Bytes], { type: 'text/html;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const printWindow = window.open(url, '_blank')
    printWindow.focus()
    setTimeout(() => {
      printWindow.print()
      URL.revokeObjectURL(url)
    }, 250)
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

  let html = `<!DOCTYPE html>
<html dir="${dir}" lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lesson Plan</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { width: 100%; }
    body {
      font-family: 'Segoe UI', 'Arial Unicode MS', Arial, sans-serif;
      padding: 20px;
      line-height: 1.8;
      direction: ${dir};
      color: #333;
      background: white;
    }
    h1 {
      font-size: 20px;
      margin-top: 20px;
      margin-bottom: 15px;
      font-weight: bold;
    }
    h2 {
      font-size: 15px;
      margin-top: 18px;
      margin-bottom: 10px;
      font-weight: bold;
      border-bottom: 1px solid #ddd;
      padding-bottom: 5px;
    }
    p {
      margin: 8px 0;
      white-space: pre-wrap;
      word-wrap: break-word;
    }
    ul, ol {
      margin: 10px 0;
      padding-${dir === 'ltr' ? 'left' : 'right'}: 35px;
    }
    li {
      margin: 6px 0;
      line-height: 1.6;
    }
    strong {
      font-weight: bold;
    }
    @media print {
      body { padding: 15px; }
      h1 { page-break-after: avoid; }
      h2 { page-break-after: avoid; }
    }
  </style>
</head>
<body>
`

  html += `<h1>${isUrdu ? 'درس کا منصوبہ' : 'LESSON PLAN'}</h1>\n`
  html += `<p><strong>${isUrdu ? 'استاد' : 'Teacher'}:</strong> ${escapeHtml(meta.teacherName || '-')}</p>\n`
  html += `<p><strong>${isUrdu ? 'سکول' : 'School'}:</strong> ${escapeHtml(meta.schoolName || '-')}</p>\n`
  html += `<p><strong>${isUrdu ? 'کلاس' : 'Class'}:</strong> ${escapeHtml(meta.className)}</p>\n`
  html += `<p><strong>${isUrdu ? 'موضوع' : 'Subject'}:</strong> ${escapeHtml(meta.subject)}</p>\n`
  html += `<p><strong>${isUrdu ? 'عنوان' : 'Topic'}:</strong> ${escapeHtml(meta.topic)}</p>\n`
  html += `<p><strong>${isUrdu ? 'دورانیہ' : 'Duration'}:</strong> ${meta.duration} ${isUrdu ? 'منٹ' : 'minutes'}</p>\n\n`

  html += `<h2>${isUrdu ? 'سیکھنے کے مقاصد' : 'LEARNING OBJECTIVES'}</h2>\n<ul>\n`
  objectives.forEach((o) => {
    html += `<li>${escapeHtml(o)}</li>\n`
  })
  html += `</ul>\n\n`

  html += `<h2>${isUrdu ? 'پہلے سے موجود علم' : 'PREVIOUS KNOWLEDGE'}</h2>\n`
  html += `<p>${escapeHtml(previousKnowledge)}</p>\n\n`

  html += `<h2>${isUrdu ? 'تعارف / گرم کرنا' : 'INTRODUCTION / WARM-UP'} (${introduction.time} ${isUrdu ? 'منٹ' : 'min'})</h2>\n`
  html += `<p>${escapeHtml(introduction.text)}</p>\n\n`

  html += `<h2>${isUrdu ? 'تدریسی مواد' : 'TEACHING MATERIALS'}</h2>\n<ul>\n`
  materials.forEach((m) => {
    html += `<li>${escapeHtml(m)}</li>\n`
  })
  html += `</ul>\n\n`

  html += `<h2>${isUrdu ? 'استاد کی سرگرمی' : 'TEACHER ACTIVITY'}</h2>\n<ol>\n`
  teacherActivity.forEach((a) => {
    html += `<li>${escapeHtml(a)}</li>\n`
  })
  html += `</ol>\n\n`

  html += `<h2>${isUrdu ? 'طالب علم کی سرگرمی' : 'STUDENT ACTIVITY'}</h2>\n<ul>\n`
  studentActivity.forEach((a) => {
    html += `<li>${escapeHtml(a)}</li>\n`
  })
  html += `</ul>\n\n`

  html += `<h2>${isUrdu ? 'کلاس روم کی سرگرمیاں' : 'CLASSROOM ACTIVITIES'}</h2>\n<ul>\n`
  classroomActivities.forEach((a) => {
    html += `<li><strong>${escapeHtml(a.title)}:</strong> ${escapeHtml(a.description)}</li>\n`
  })
  html += `</ul>\n\n`

  html += `<h2>${isUrdu ? 'تشخیص' : 'ASSESSMENT'}</h2>\n`
  html += `<p><strong>${isUrdu ? 'منہ کے سوالات' : 'Oral Questions'}:</strong></p>\n<ul>\n`
  assessment.oral.forEach((q) => {
    html += `<li>${escapeHtml(q)}</li>\n`
  })
  html += `</ul>\n\n`

  html += `<p><strong>${isUrdu ? 'مختصر سوالات' : 'Short Questions'}:</strong></p>\n<ul>\n`
  assessment.short.forEach((q) => {
    html += `<li>${escapeHtml(q)}</li>\n`
  })
  html += `</ul>\n\n`

  if (assessment.mcqs.length) {
    html += `<p><strong>${isUrdu ? 'متعدد الخیار سوالات' : 'MCQs'}:</strong></p>\n<ul>\n`
    assessment.mcqs.forEach((q) => {
      html += `<li>${escapeHtml(q)}</li>\n`
    })
    html += `</ul>\n\n`
  }

  html += `<p><strong>${isUrdu ? 'عملی/سرگرمی پر مبنی' : 'Practical/Activity-based'}:</strong></p>\n<ul>\n`
  assessment.practical.forEach((q) => {
    html += `<li>${escapeHtml(q)}</li>\n`
  })
  html += `</ul>\n`
  html += `<p><strong>${isUrdu ? 'باہر نکلنے کی ٹکٹ' : 'Exit Ticket'}:</strong> ${escapeHtml(assessment.exitTicket)}</p>\n\n`

  html += `<h2>${isUrdu ? 'مختلف شدہ سیکھنا' : 'DIFFERENTIATED LEARNING'}</h2>\n`
  html += `<p><strong>${isUrdu ? 'سست سیکھنے والے' : 'Slow learners'}:</strong> ${escapeHtml(differentiation.slow)}</p>\n`
  html += `<p><strong>${isUrdu ? 'اوسط سیکھنے والے' : 'Average learners'}:</strong> ${escapeHtml(differentiation.average)}</p>\n`
  html += `<p><strong>${isUrdu ? 'اعلیٰ سیکھنے والے' : 'Advanced learners'}:</strong> ${escapeHtml(differentiation.advanced)}</p>\n\n`

  html += `<h2>${isUrdu ? 'گھر کا کام' : 'HOMEWORK'}</h2>\n`
  html += `<p>${escapeHtml(homework)}</p>\n\n`

  html += `<h2>${isUrdu ? 'دوبارہ بیان / اختتام' : 'RECAP / CLOSURE'}</h2>\n<ul>\n`
  recap.forEach((r) => {
    html += `<li>${escapeHtml(r)}</li>\n`
  })
  html += `</ul>\n`

  html += `</body>\n</html>`

  return html
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}
