import posthog from 'posthog-js'
import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { LessonPlansProvider } from './context/LessonPlansContext'
import CreatePlan from './pages/CreatePlan'
import Home from './pages/Home'
import MyPlans from './pages/MyPlans'
import PlanResult from './pages/PlanResult'
import PlanView from './pages/PlanView'
import Settings from './pages/Settings'

if (import.meta.env.VITE_POSTHOG_API_KEY) {
  posthog.init(import.meta.env.VITE_POSTHOG_API_KEY, {
    api_host: import.meta.env.VITE_POSTHOG_API_HOST,
  })
}

export default function App() {
  useEffect(() => {
    function handleInstalled() {
      posthog.capture('pwa_install')
    }
    window.addEventListener('appinstalled', handleInstalled)
    return () => window.removeEventListener('appinstalled', handleInstalled)
  }, [])

  return (
    <LessonPlansProvider>
      <div className="min-h-screen bg-slate-50 max-w-md mx-auto shadow-xl">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreatePlan />} />
          <Route path="/result" element={<PlanResult />} />
          <Route path="/plans" element={<MyPlans />} />
          <Route path="/plans/:id" element={<PlanView />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </LessonPlansProvider>
  )
}
