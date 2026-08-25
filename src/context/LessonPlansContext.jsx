import { createContext, useContext, useEffect, useState } from 'react'

const STORAGE_KEY = 'ai-lesson-plan.saved-plans'
const LessonPlansContext = createContext(null)

function loadPlans() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function LessonPlansProvider({ children }) {
  const [plans, setPlans] = useState(loadPlans)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(plans))
    } catch {
      // Storage full or unavailable — ignore, plans still live in memory.
    }
  }, [plans])

  function savePlan(plan) {
    const record = {
      ...plan,
      id: plan.id ?? `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      createdAt: plan.createdAt ?? new Date().toISOString(),
    }
    setPlans((prev) => {
      const exists = prev.some((p) => p.id === record.id)
      return exists ? prev.map((p) => (p.id === record.id ? record : p)) : [record, ...prev]
    })
    return record
  }

  function deletePlan(id) {
    setPlans((prev) => prev.filter((p) => p.id !== id))
  }

  function getPlan(id) {
    return plans.find((p) => p.id === id) ?? null
  }

  function duplicatePlan(id) {
    const original = getPlan(id)
    if (!original) return null
    return savePlan({
      ...original,
      id: undefined,
      createdAt: undefined,
      meta: { ...original.meta, topic: `${original.meta.topic} (Copy)` },
    })
  }

  return (
    <LessonPlansContext.Provider value={{ plans, savePlan, deletePlan, getPlan, duplicatePlan }}>
      {children}
    </LessonPlansContext.Provider>
  )
}

export function useLessonPlans() {
  const ctx = useContext(LessonPlansContext)
  if (!ctx) throw new Error('useLessonPlans must be used within LessonPlansProvider')
  return ctx
}
