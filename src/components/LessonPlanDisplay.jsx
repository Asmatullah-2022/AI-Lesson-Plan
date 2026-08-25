const LABELS = {
  en: {
    lessonInfo: 'Lesson Information',
    class: 'Class',
    subject: 'Subject',
    topic: 'Topic',
    duration: 'Duration',
    minutes: 'minutes',
    objectives: 'Learning Objectives',
    previousKnowledge: 'Previous Knowledge',
    introduction: 'Introduction / Warm-up',
    materials: 'Teaching Materials',
    teacherActivity: 'Teacher Activity',
    studentActivity: 'Student Activity',
    classroomActivities: 'Classroom Activities',
    assessment: 'Assessment',
    oral: 'Oral Questions',
    short: 'Short Questions',
    mcqs: 'MCQs',
    practical: 'Practical / Activity-based',
    exitTicket: 'Exit Ticket',
    differentiation: 'Differentiated Learning',
    slow: 'Slow Learners',
    average: 'Average Learners',
    advanced: 'Advanced Learners',
    homework: 'Homework',
    recap: 'Recap / Closure',
    min: 'min',
  },
  ur: {
    lessonInfo: 'سبق کی معلومات',
    class: 'جماعت',
    subject: 'مضمون',
    topic: 'موضوع',
    duration: 'دورانیہ',
    minutes: 'منٹ',
    objectives: 'تعلیمی مقاصد',
    previousKnowledge: 'سابقہ معلومات',
    introduction: 'تعارف / وارم اپ',
    materials: 'تدریسی مواد',
    teacherActivity: 'استاد کی سرگرمی',
    studentActivity: 'طلبہ کی سرگرمی',
    classroomActivities: 'جماعتی سرگرمیاں',
    assessment: 'تشخیص',
    oral: 'زبانی سوالات',
    short: 'مختصر سوالات',
    mcqs: 'معروضی سوالات',
    practical: 'عملی سرگرمی',
    exitTicket: 'ایگزٹ ٹکٹ',
    differentiation: 'تفریقی تعلیم',
    slow: 'کمزور طلبہ',
    average: 'اوسط طلبہ',
    advanced: 'ذہین طلبہ',
    homework: 'گھر کا کام',
    recap: 'خلاصہ',
    min: 'منٹ',
  },
}

function Section({ title, children }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="font-bold text-teal-800 mb-2">{title}</h3>
      {children}
    </section>
  )
}

function List({ items }) {
  return (
    <ul className="list-disc ps-5 space-y-1 text-slate-700 text-sm">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  )
}

export default function LessonPlanDisplay({ plan }) {
  const lang = plan.meta.language === 'ur' ? 'ur' : 'en'
  const t = LABELS[lang]
  const dir = lang === 'ur' ? 'rtl' : 'ltr'
  const { meta, objectives, previousKnowledge, introduction, materials, teacherActivity, studentActivity, classroomActivities, assessment, differentiation, homework, recap, footer } = plan

  return (
    <div dir={dir} className="space-y-4 text-start">
      <Section title={t.lessonInfo}>
        <dl className="grid grid-cols-2 gap-y-2 text-sm text-slate-700">
          <div>
            <dt className="text-slate-400">{t.class}</dt>
            <dd className="font-semibold">{meta.className}</dd>
          </div>
          <div>
            <dt className="text-slate-400">{t.subject}</dt>
            <dd className="font-semibold">{meta.subject}</dd>
          </div>
          <div>
            <dt className="text-slate-400">{t.topic}</dt>
            <dd className="font-semibold">{meta.topic}</dd>
          </div>
          <div>
            <dt className="text-slate-400">{t.duration}</dt>
            <dd className="font-semibold">
              {meta.duration} {t.minutes}
            </dd>
          </div>
        </dl>
      </Section>

      <Section title={t.objectives}>
        <List items={objectives} />
      </Section>

      <Section title={t.previousKnowledge}>
        <p className="text-sm text-slate-700">{previousKnowledge}</p>
      </Section>

      <Section title={`${t.introduction} (${introduction.time} ${t.min})`}>
        <p className="text-sm text-slate-700">{introduction.text}</p>
      </Section>

      <Section title={t.materials}>
        <List items={materials} />
      </Section>

      <Section title={t.teacherActivity}>
        <ol className="list-decimal ps-5 space-y-1 text-slate-700 text-sm">
          {teacherActivity.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ol>
      </Section>

      <Section title={t.studentActivity}>
        <List items={studentActivity} />
      </Section>

      <Section title={t.classroomActivities}>
        <div className="space-y-3">
          {classroomActivities.map((a, i) => (
            <div key={i} className="rounded-xl bg-teal-50/60 p-3">
              <p className="font-semibold text-teal-800 text-sm">{a.title}</p>
              <p className="text-sm text-slate-600 mt-0.5">{a.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title={t.assessment}>
        <div className="space-y-3 text-sm">
          <div>
            <p className="font-semibold text-slate-700">{t.oral}</p>
            <List items={assessment.oral} />
          </div>
          <div>
            <p className="font-semibold text-slate-700">{t.short}</p>
            <List items={assessment.short} />
          </div>
          {assessment.mcqs.length > 0 && (
            <div>
              <p className="font-semibold text-slate-700">{t.mcqs}</p>
              <List items={assessment.mcqs} />
            </div>
          )}
          <div>
            <p className="font-semibold text-slate-700">{t.practical}</p>
            <List items={assessment.practical} />
          </div>
          <div>
            <p className="font-semibold text-slate-700">{t.exitTicket}</p>
            <p className="text-slate-700">{assessment.exitTicket}</p>
          </div>
        </div>
      </Section>

      <Section title={t.differentiation}>
        <div className="space-y-2 text-sm">
          <p>
            <span className="font-semibold text-slate-700">{t.slow}: </span>
            {differentiation.slow}
          </p>
          <p>
            <span className="font-semibold text-slate-700">{t.average}: </span>
            {differentiation.average}
          </p>
          <p>
            <span className="font-semibold text-slate-700">{t.advanced}: </span>
            {differentiation.advanced}
          </p>
        </div>
      </Section>

      <Section title={t.homework}>
        <p className="text-sm text-slate-700">{homework}</p>
      </Section>

      <Section title={t.recap}>
        <List items={recap} />
      </Section>

      {footer ? <p className="text-xs text-slate-400 text-center pt-2">{footer}</p> : null}
    </div>
  )
}
