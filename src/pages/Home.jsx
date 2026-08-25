import { Clock, FolderOpen, Plus, Settings as SettingsIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import LessonPlanCard from '../components/LessonPlanCard'
import { useLessonPlans } from '../context/LessonPlansContext'

export default function Home() {
  const { plans, deletePlan, duplicatePlan } = useLessonPlans()
  const recent = plans.slice(0, 3)

  return (
    <div className="pb-10">
      <Header title="AI Lesson Plan" subtitle="Create a complete lesson plan in seconds" />
      <div className="px-4 pt-6 space-y-6">
      <Link
        to="/create"
        className="flex items-center justify-center gap-2 rounded-2xl bg-teal-700 py-5 text-lg font-bold text-white shadow-md hover:bg-teal-800 active:bg-teal-900"
      >
        <Plus size={24} /> Create New Lesson Plan
      </Link>

      <div className="grid grid-cols-2 gap-3">
        <Link
          to="/plans"
          className="flex flex-col items-center gap-2 rounded-2xl border border-slate-200 bg-white py-5 shadow-sm hover:border-teal-200"
        >
          <FolderOpen className="text-teal-700" size={26} />
          <span className="text-sm font-semibold text-slate-700">My Lesson Plans</span>
        </Link>
        <Link
          to="/settings"
          className="flex flex-col items-center gap-2 rounded-2xl border border-slate-200 bg-white py-5 shadow-sm hover:border-teal-200"
        >
          <SettingsIcon className="text-teal-700" size={26} />
          <span className="text-sm font-semibold text-slate-700">Settings</span>
        </Link>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <Clock size={18} className="text-slate-400" />
          <h2 className="font-bold text-slate-700">Recent Plans</h2>
        </div>

        {recent.length === 0 ? (
          <p className="text-sm text-slate-400 bg-white border border-dashed border-slate-200 rounded-2xl p-5 text-center">
            No lesson plans yet. Create your first one!
          </p>
        ) : (
          <div className="space-y-3">
            {recent.map((plan) => (
              <LessonPlanCard key={plan.id} plan={plan} onDelete={deletePlan} onDuplicate={duplicatePlan} />
            ))}
          </div>
        )}
      </div>
      </div>
    </div>
  )
}
