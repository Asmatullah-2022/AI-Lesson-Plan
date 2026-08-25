# AI Lesson Plan

A simple, mobile-first web app that helps primary and middle school teachers
in Pakistan (Nursery – Grade 8) generate a complete, classroom-ready lesson
plan in seconds.

## Features

- Simple form: teacher name, school, class/grade, subject, topic, duration, language (اردو / English)
- Generates a structured lesson plan: objectives, previous knowledge, warm-up,
  materials, teacher/student activity, classroom activities, assessment,
  differentiated learning, homework, and recap — with phase timing that adapts
  to the chosen duration
- Save, view, edit, duplicate and delete lesson plans (stored on-device via `localStorage`)
- Copy, print, and download lesson plans as PDF
- Full RTL layout for Urdu content, LTR for English
- Works fully offline out of the box; can be connected to a real AI backend

## Getting started

```bash
npm install
npm run dev
```

```bash
npm run build    # production build
npm run lint      # lint
```

## Connecting a real AI service

The frontend never calls an AI provider directly and never holds an API key.
`src/services/aiService.js` posts the structured prompt from `buildPrompt()`
to `VITE_AI_API_URL` — a backend/serverless endpoint you control that owns the
real provider credentials (read from its own server-side environment
variables), calls the AI provider, and returns lesson plan JSON in the shape
produced by `src/services/localGenerator.js`.

Copy `.env.example` to `.env` and set `VITE_AI_API_URL` to enable it. If it's
unset, or a request fails, the app automatically falls back to the built-in
offline generator so teachers always get a usable lesson plan.

## Project structure

```
src/
  components/   Header, Button, LanguageSelector, LessonPlanForm,
                LessonPlanCard, LessonPlanDisplay
  pages/        Home, CreatePlan, PlanResult, MyPlans, PlanView, Settings
  context/      LessonPlansContext (localStorage-backed CRUD)
  services/     aiService (API + fallback), localGenerator (offline rules)
  utils/        duration breakdown, plan-to-text, PDF export
  data/         grades, subjects, languages, durations
```
