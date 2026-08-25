import jsPDF from 'jspdf'
import { planToText } from './planText'

export function downloadPlanAsPdf(plan) {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' })
  const text = planToText(plan)
  const margin = 40
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const lines = doc.splitTextToSize(text, pageWidth - margin * 2)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(11)

  let y = margin
  const lineHeight = 15

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
