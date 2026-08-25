import { FolderX, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import LessonPlanCard from '../components/LessonPlanCard'
import { useLessonPlans } from '../context/LessonPlansContext'

export default function MyPlans() {
  const { plans, deletePlan, duplicatePlan } = useLessonPlans()

  return (
    <div className="pb-10">
      <Header title="My Lesson Plans" subtitle={`${plans.length} saved plan${plans.length === 1 ? '' : 's'}`} back />
      <div className="px-4 pt-6 space-y-3">
        {plans.length === 0 ? (
          <div className="text-center py-16 space-y-3">
            <FolderX size={40} className="mx-auto text-slate-300" />
            <p className="text-slate-400">You haven't saved any lesson plans yet.</p>
            <Link
              to="/create"
              className="inline-flex items-center gap-2 rounded-2xl bg-teal-700 px-5 py-3 font-semibold text-white"
            >
              <Plus size={18} /> Create New Lesson Plan
            </Link>
          </div>
        ) : (
          plans.map((plan) => (
            <LessonPlanCard key={plan.id} plan={plan} onDelete={deletePlan} onDuplicate={duplicatePlan} />
          ))
        )}
      </div>
    </div>
  )
}
