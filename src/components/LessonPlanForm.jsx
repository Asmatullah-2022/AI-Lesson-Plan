import { Sparkles } from 'lucide-react'
import { useState } from 'react'
import { DURATIONS, GRADES, SUBJECTS } from '../data/options'
import Button from './Button'
import LanguageSelector from './LanguageSelector'

const FIELD_CLASS =
  'w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-800 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-100'

const initialState = {
  teacherName: '',
  schoolName: '',
  className: '',
  subject: '',
  topic: '',
  duration: 40,
  language: 'en',
}

export default function LessonPlanForm({ onSubmit, submitting = false, defaultValues }) {
  const [form, setForm] = useState({ ...initialState, ...defaultValues })
  const [error, setError] = useState('')

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.className || !form.subject || !form.topic.trim()) {
      setError('Please fill in Class, Subject and Lesson Topic to continue.')
      return
    }
    setError('')
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-slate-700">Teacher Name</label>
        <input
          className={FIELD_CLASS}
          placeholder="e.g. Ayesha Khan"
          value={form.teacherName}
          onChange={(e) => update('teacherName', e.target.value)}
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-slate-700">School Name</label>
        <input
          className={FIELD_CLASS}
          placeholder="e.g. Govt. Primary School"
          value={form.schoolName}
          onChange={(e) => update('schoolName', e.target.value)}
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-slate-700">Class / Grade *</label>
        <select
          className={FIELD_CLASS}
          value={form.className}
          onChange={(e) => update('className', e.target.value)}
        >
          <option value="">Select class</option>
          {GRADES.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-slate-700">Subject *</label>
        <select
          className={FIELD_CLASS}
          value={form.subject}
          onChange={(e) => update('subject', e.target.value)}
        >
          <option value="">Select subject</option>
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-slate-700">Lesson Topic *</label>
        <input
          className={FIELD_CLASS}
          placeholder="e.g. Parts of a Plant"
          value={form.topic}
          onChange={(e) => update('topic', e.target.value)}
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-slate-700">Lesson Duration</label>
        <div className="grid grid-cols-4 gap-2">
          {DURATIONS.map((d) => (
            <button
              type="button"
              key={d}
              onClick={() => update('duration', d)}
              className={`rounded-2xl border-2 py-3 text-sm font-semibold transition-colors ${
                form.duration === d
                  ? 'border-teal-700 bg-teal-50 text-teal-800'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
              }`}
            >
              {d} min
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-slate-700">Language</label>
        <LanguageSelector value={form.language} onChange={(v) => update('language', v)} />
      </div>

      {error ? <p className="text-sm font-medium text-rose-600">{error}</p> : null}

      <Button type="submit" size="lg" full icon={Sparkles} disabled={submitting}>
        {submitting ? 'Generating…' : 'Generate Lesson Plan'}
      </Button>
    </form>
  )
}
