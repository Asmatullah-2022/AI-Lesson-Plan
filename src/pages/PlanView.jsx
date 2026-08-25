import { Check, Copy, Download, Pencil, Printer, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../components/Button'
import Header from '../components/Header'
import LessonPlanDisplay from '../components/LessonPlanDisplay'
import { useLessonPlans } from '../context/LessonPlansContext'
import { downloadPlanAsPdf } from '../utils/pdf'
import { planToText } from '../utils/planText'

export default function PlanView() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getPlan, deletePlan } = useLessonPlans()
  const [copied, setCopied] = useState(false)
  const plan = getPlan(id)

  if (!plan) {
    return (
      <div className="pb-10">
        <Header title="Lesson Plan" back />
        <p className="px-4 pt-8 text-center text-slate-400">This lesson plan could not be found.</p>
      </div>
    )
  }

  function handleCopy() {
    navigator.clipboard?.writeText(planToText(plan)).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }

  function handleDelete() {
    if (window.confirm('Delete this lesson plan? This cannot be undone.')) {
      deletePlan(plan.id)
      navigate('/plans', { replace: true })
    }
  }

  return (
    <div className="pb-10">
      <Header title="Lesson Plan" subtitle={plan.meta.topic} back />
      <div className="px-4 pt-6 space-y-4">
        <LessonPlanDisplay plan={plan} />

        <div className="grid grid-cols-2 gap-3 pt-2">
          <Button
            variant="secondary"
            icon={Pencil}
            onClick={() => navigate('/create', { state: { defaultValues: plan.meta } })}
          >
            Edit
          </Button>
          <Button variant="secondary" icon={copied ? Check : Copy} onClick={handleCopy}>
            {copied ? 'Copied' : 'Copy'}
          </Button>
          <Button variant="secondary" icon={Printer} onClick={() => window.print()}>
            Print
          </Button>
          <Button variant="secondary" icon={Download} onClick={() => downloadPlanAsPdf(plan)}>
            Download PDF
          </Button>
        </div>

        <Button full variant="danger" icon={Trash2} onClick={handleDelete}>
          Delete Lesson Plan
        </Button>
      </div>
    </div>
  )
}
