import { Check, Copy, Download, Pencil, Printer, RefreshCw, Save } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Header from '../components/Header'
import LessonPlanDisplay from '../components/LessonPlanDisplay'
import { useLessonPlans } from '../context/LessonPlansContext'
import { generateLessonPlan } from '../services/aiService'
import { downloadPlanAsPdf } from '../utils/pdf'
import { planToText } from '../utils/planText'

export default function PlanResult() {
  const location = useLocation()
  const navigate = useNavigate()
  const { savePlan } = useLessonPlans()

  const [plan, setPlan] = useState(location.state?.plan ?? null)
  const [source, setSource] = useState(location.state?.source ?? 'offline')
  const [form] = useState(location.state?.form ?? null)
  const [regenerating, setRegenerating] = useState(false)
  const [copied, setCopied] = useState(false)
  const [savedId, setSavedId] = useState(null)

  useEffect(() => {
    if (!plan) navigate('/create', { replace: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!plan) return null

  async function handleRegenerate() {
    if (!form) return
    setRegenerating(true)
    const { plan: newPlan, source: newSource } = await generateLessonPlan(form)
    setPlan(newPlan)
    setSource(newSource)
    setSavedId(null)
    setRegenerating(false)
  }

  function handleCopy() {
    navigator.clipboard?.writeText(planToText(plan)).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }

  function handleSave() {
    const record = savePlan({ id: savedId, meta: plan.meta, ...plan })
    setSavedId(record.id)
  }

  return (
    <div className="pb-28">
      <Header title="Lesson Plan" subtitle={plan.meta.topic} back />

      <div className="px-4 pt-6 space-y-4">
        {source === 'offline' && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 flex items-center justify-between gap-3">
            <span>Lesson plan could be generated offline.</span>
            {form && (
              <Button variant="secondary" size="sm" icon={RefreshCw} onClick={handleRegenerate} disabled={regenerating}>
                Try Again
              </Button>
            )}
          </div>
        )}

        <LessonPlanDisplay plan={plan} />

        <div className="grid grid-cols-2 gap-3 pt-2">
          <Button
            variant="secondary"
            icon={Pencil}
            onClick={() => navigate('/create', { state: { defaultValues: form } })}
            disabled={!form}
          >
            Edit
          </Button>
          <Button variant="secondary" icon={RefreshCw} onClick={handleRegenerate} disabled={!form || regenerating}>
            {regenerating ? 'Regenerating…' : 'Regenerate'}
          </Button>
          <Button
            variant="secondary"
            icon={copied ? Check : Copy}
            onClick={handleCopy}
          >
            {copied ? 'Copied' : 'Copy'}
          </Button>
          <Button variant="secondary" icon={Printer} onClick={() => window.print()}>
            Print
          </Button>
          <Button variant="secondary" icon={Download} onClick={() => downloadPlanAsPdf(plan)}>
            Download PDF
          </Button>
        </div>
      </div>

      <div className="fixed bottom-0 inset-x-0 bg-white border-t border-slate-200 p-4">
        <Button full size="lg" icon={savedId ? Check : Save} onClick={handleSave}>
          {savedId ? 'Saved' : 'Save Lesson Plan'}
        </Button>
      </div>
    </div>
  )
}
