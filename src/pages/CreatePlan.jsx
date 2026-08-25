import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import LessonPlanForm from '../components/LessonPlanForm'
import { generateLessonPlan } from '../services/aiService'

export default function CreatePlan() {
  const navigate = useNavigate()
  const location = useLocation()
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(form) {
    setSubmitting(true)
    const { plan, source } = await generateLessonPlan(form)
    setSubmitting(false)
    navigate('/result', { state: { plan, source, form } })
  }

  return (
    <div className="pb-10">
      <Header title="New Lesson Plan" subtitle="Fill in the details below" back />
      <div className="px-4 pt-6">
        <LessonPlanForm
          onSubmit={handleSubmit}
          submitting={submitting}
          defaultValues={location.state?.defaultValues}
        />
      </div>
    </div>
  )
}
