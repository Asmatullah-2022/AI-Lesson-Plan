import { generateLocalLessonPlan } from './localGenerator'

// AI service layer.
//
// The frontend never talks to an AI provider directly and never holds an
// API key. VITE_AI_API_URL should point to a backend endpoint (e.g. a small
// server or serverless function) that owns the real API credentials, reads
// them from its own environment variables, calls the AI provider, and
// returns a lesson plan JSON matching buildPrompt()'s expected shape.
//
// If VITE_AI_API_URL is not set, or the request fails, the app falls back
// to a fully offline, rule-based generator so teachers can still get a
// usable lesson plan without an internet connection or backend.

const AI_API_URL = import.meta.env.VITE_AI_API_URL

export function buildPrompt(input) {
  const { teacherName, schoolName, className, subject, topic, duration, language } = input

  return {
    task: 'generate_primary_school_lesson_plan',
    teacher: { name: teacherName, school: schoolName },
    lesson: { grade: className, subject, topic, durationMinutes: Number(duration) },
    language,
    country: 'Pakistan',
    rules: [
      'Use age-appropriate, simple language for the selected grade.',
      'Generate 3-5 clear, measurable learning objectives.',
      'Keep materials and activities realistic for a Pakistani government primary school (no expensive equipment).',
      'Match assessment questions to the learning objectives.',
      'Fit all phases within the given lesson duration.',
      'Respond in the requested language (Urdu script for Urdu, simple English for English).',
      'Return structured JSON only, matching the lesson plan schema.',
    ],
  }
}

export async function generateLessonPlan(input) {
  if (AI_API_URL) {
    try {
      const response = await fetch(AI_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buildPrompt(input)),
      })

      if (!response.ok) throw new Error(`AI service responded with ${response.status}`)

      const data = await response.json()
      return { plan: data, source: 'ai' }
    } catch {
      return { plan: generateLocalLessonPlan(input), source: 'offline' }
    }
  }

  return { plan: generateLocalLessonPlan(input), source: 'offline' }
}
