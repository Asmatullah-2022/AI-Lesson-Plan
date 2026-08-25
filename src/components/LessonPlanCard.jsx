import { Calendar, Copy, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
  } catch {
    return ''
  }
}

export default function LessonPlanCard({ plan, onDelete, onDuplicate }) {
  const navigate = useNavigate()

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <button className="w-full text-left" onClick={() => navigate(`/plans/${plan.id}`)}>
        <p className="font-bold text-slate-800 leading-snug">{plan.meta.topic}</p>
        <p className="text-sm text-slate-500 mt-0.5">
          {plan.meta.className} • {plan.meta.subject}
        </p>
        <p className="flex items-center gap-1 text-xs text-slate-400 mt-2">
          <Calendar size={13} /> {formatDate(plan.createdAt)}
        </p>
      </button>
      <div className="flex gap-2 mt-3 pt-3 border-t border-slate-100">
        <button
          onClick={() => onDuplicate(plan.id)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-slate-50 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
        >
          <Copy size={15} /> Copy
        </button>
        <button
          onClick={() => onDelete(plan.id)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-rose-50 py-2 text-sm font-medium text-rose-600 hover:bg-rose-100"
        >
          <Trash2 size={15} /> Delete
        </button>
      </div>
    </div>
  )
}
