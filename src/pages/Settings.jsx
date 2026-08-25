import { Info, Trash2, Wifi, WifiOff } from 'lucide-react'
import Button from '../components/Button'
import Header from '../components/Header'
import { useLessonPlans } from '../context/LessonPlansContext'

const AI_API_URL = import.meta.env.VITE_AI_API_URL

export default function Settings() {
  const { plans, deletePlan } = useLessonPlans()

  function handleClearAll() {
    if (window.confirm(`Delete all ${plans.length} saved lesson plans? This cannot be undone.`)) {
      plans.forEach((p) => deletePlan(p.id))
    }
  }

  return (
    <div className="pb-10">
      <Header title="Settings" back />
      <div className="px-4 pt-6 space-y-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm space-y-2">
          <div className="flex items-center gap-2 font-semibold text-slate-700">
            {AI_API_URL ? <Wifi size={18} className="text-teal-700" /> : <WifiOff size={18} className="text-amber-600" />}
            AI Connection
          </div>
          <p className="text-sm text-slate-500">
            {AI_API_URL
              ? 'Connected to an AI service for lesson plan generation.'
              : 'No AI service configured. Lesson plans are generated offline using built-in templates.'}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm space-y-3">
          <div className="flex items-center gap-2 font-semibold text-slate-700">
            <Trash2 size={18} className="text-rose-600" />
            Storage
          </div>
          <p className="text-sm text-slate-500">
            You have {plans.length} saved lesson plan{plans.length === 1 ? '' : 's'} stored on this device.
          </p>
          <Button variant="danger" size="sm" onClick={handleClearAll} disabled={plans.length === 0}>
            Clear All Saved Plans
          </Button>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm space-y-2">
          <div className="flex items-center gap-2 font-semibold text-slate-700">
            <Info size={18} className="text-teal-700" />
            About
          </div>
          <p className="text-sm text-slate-500">
            AI Lesson Plan helps primary school teachers in Pakistan create classroom-ready lesson plans in
            seconds. Version 1.0.
          </p>
        </div>
      </div>
    </div>
  )
}
