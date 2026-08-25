import { getDurationBreakdown } from '../utils/duration'

const YOUNG_GRADES = new Set(['Nursery', 'Grade 1', 'Grade 2', 'Grade 3'])

const MATERIALS_EN = [
  'Blackboard/Whiteboard',
  'Chalk or marker',
  'Textbook',
  'Flashcards',
  'Pictures/charts related to the topic',
  'Real objects (if available)',
  'Worksheets',
  'Classroom objects',
]

const MATERIALS_UR = [
  'بلیک بورڈ / وائٹ بورڈ',
  'چاک یا مارکر',
  'نصابی کتاب',
  'فلیش کارڈز',
  'موضوع سے متعلق تصاویر/چارٹ',
  'حقیقی اشیاء (اگر دستیاب ہوں)',
  'ورک شیٹس',
  'کمرہ جماعت کی اشیاء',
]

const ACTIVITY_BANK_EN = [
  'Question and Answer',
  'Pair Work',
  'Group Work',
  'Matching',
  'Reading Aloud',
  'Drawing',
  'Role Play',
  'Demonstration',
  'Think-Pair-Share',
  'Educational Game',
]

const ACTIVITY_BANK_UR = [
  'سوال و جواب',
  'جوڑوں میں کام',
  'گروپ ورک',
  'ملاپ کی سرگرمی',
  'بلند آواز سے پڑھنا',
  'ڈرائنگ',
  'رول پلے',
  'مظاہرہ',
  'سوچیں-جوڑ بنائیں-شیئر کریں',
  'تعلیمی کھیل',
]

function pick(arr, n, seed = 0) {
  const out = []
  for (let i = 0; i < n; i++) out.push(arr[(seed + i) % arr.length])
  return out
}

function isYoung(className) {
  return YOUNG_GRADES.has(className)
}

function buildEnglish({ teacherName, schoolName, className, subject, topic, duration }) {
  const young = isYoung(className)
  const time = getDurationBreakdown(duration)
  const simple = young ? 'very simple, friendly' : 'clear, age-appropriate'

  const objectives = [
    `Students will be able to identify the key ideas of "${topic}".`,
    `Students will be able to explain "${topic}" in their own words.`,
    young
      ? `Students will be able to name at least two things they learned about "${topic}".`
      : `Students will be able to describe how "${topic}" relates to ${subject.toLowerCase()}.`,
    `Students will be able to use new vocabulary related to "${topic}" correctly.`,
  ]
  if (!young) {
    objectives.push(`Students will be able to apply what they learned about "${topic}" to a real-life example.`)
  }

  return {
    objectives,
    previousKnowledge: `Students already have some ${simple} understanding of ${subject} from earlier lessons and daily life experience. They may already recognise everyday examples related to "${topic}", even if they do not know the correct terms yet.`,
    introduction: {
      time: time.introduction,
      text: young
        ? `Greet the students warmly. Show a picture, object, or ask a simple question about "${topic}" to get their attention (e.g. "Have you ever seen ...?"). Let a few students answer.`
        : `Begin with a short question or a real-life example related to "${topic}" to spark curiosity. Ask 2-3 students to share what they already know, and write key words on the board.`,
    },
    materials: pick(MATERIALS_EN, 5),
    teacherActivity: [
      `Introduce the topic "${topic}" using simple words and examples.`,
      `Explain the main points step by step, using the blackboard and pictures/objects.`,
      `Ask guiding questions to check understanding as you go.`,
      `Demonstrate an example or activity related to "${topic}".`,
      `Give clear instructions for the student activity.`,
    ],
    studentActivity: [
      `Listen carefully and observe the teacher's explanation/demonstration.`,
      `Answer questions asked by the teacher.`,
      `Participate in the activity related to "${topic}" (individually, in pairs, or in groups).`,
      `Share their answers or work with the class.`,
    ],
    classroomActivities: pick(ACTIVITY_BANK_EN, 3, subject.length).map((title) => ({
      title,
      description: `Use "${title}" to help students practise and understand "${topic}" in a fun, interactive way.`,
    })),
    assessment: {
      oral: [`What is "${topic}" about?`, `Can you give one example of "${topic}"?`],
      short: [`Write two sentences about "${topic}".`, `Explain "${topic}" in your own words.`],
      mcqs: young
        ? []
        : [
            `Which of the following best describes "${topic}"? (a) ... (b) ... (c) ...`,
            `"${topic}" is mostly related to: (a) ... (b) ... (c) ...`,
          ],
      practical: [`Complete a short worksheet or activity sheet about "${topic}".`],
      exitTicket: `Before leaving, each student tells or writes one new thing they learned about "${topic}".`,
    },
    differentiation: {
      slow: `Give extra visual support, simpler examples, and one-to-one guidance. Allow more time and repeat key points.`,
      average: `Follow the standard activity with normal pacing and regular teacher support.`,
      advanced: `Ask deeper "why" and "how" questions, and give an extra challenge task related to "${topic}".`,
    },
    homework: young
      ? `Ask a family member one question about "${topic}" and tell the class tomorrow.`
      : `Write 3-4 sentences (or draw a labeled picture) about "${topic}" and bring it to the next class.`,
    recap: [
      `What did we learn today about "${topic}"?`,
      `Can someone give one example we discussed?`,
      `Why is "${topic}" important?`,
    ],
    durationBreakdown: time,
    footer: `Prepared by ${teacherName || 'Teacher'}, ${schoolName || 'School'}.`,
  }
}

function buildUrdu({ teacherName, schoolName, className, subject, topic, duration }) {
  const young = isYoung(className)
  const time = getDurationBreakdown(duration)

  const objectives = [
    `طلبہ "${topic}" کے بنیادی نکات کی نشاندہی کر سکیں گے۔`,
    `طلبہ "${topic}" کو اپنے الفاظ میں بیان کر سکیں گے۔`,
    young
      ? `طلبہ "${topic}" کے بارے میں کم از کم دو باتیں بتا سکیں گے۔`
      : `طلبہ یہ بتا سکیں گے کہ "${topic}" کا تعلق ${subject} سے کیسے ہے۔`,
    `طلبہ "${topic}" سے متعلق نئے الفاظ کا درست استعمال کر سکیں گے۔`,
  ]
  if (!young) {
    objectives.push(`طلبہ "${topic}" کے بارے میں سیکھی گئی باتوں کو روزمرہ زندگی کی مثال پر لاگو کر سکیں گے۔`)
  }

  return {
    objectives,
    previousKnowledge: `طلبہ کو پہلے سے ${subject} کے حوالے سے روزمرہ زندگی اور گزشتہ اسباق سے کچھ بنیادی معلومات حاصل ہیں۔ ممکن ہے وہ "${topic}" سے متعلق مثالیں پہچانتے ہوں، اگرچہ درست اصطلاحات سے واقف نہ ہوں۔`,
    introduction: {
      time: time.introduction,
      text: young
        ? `طلبہ کو خوش آمدید کہیں۔ "${topic}" سے متعلق کوئی تصویر یا چیز دکھائیں یا سادہ سوال پوچھیں تاکہ ان کی توجہ حاصل ہو۔ چند طلبہ سے جواب لیں۔`
        : `"${topic}" سے متعلق ایک سادہ سوال یا روزمرہ مثال سے سبق کا آغاز کریں۔ 2-3 طلبہ سے پوچھیں کہ وہ پہلے سے کیا جانتے ہیں اور اہم الفاظ بورڈ پر لکھیں۔`,
    },
    materials: pick(MATERIALS_UR, 5),
    teacherActivity: [
      `"${topic}" کا تعارف سادہ الفاظ اور مثالوں کے ذریعے کروائیں۔`,
      `بلیک بورڈ اور تصاویر/اشیاء کی مدد سے نکات کو مرحلہ وار سمجھائیں۔`,
      `سمجھ کی جانچ کے لیے رہنما سوالات پوچھیں۔`,
      `"${topic}" سے متعلق ایک مثال یا سرگرمی کا مظاہرہ کریں۔`,
      `طلبہ کی سرگرمی کے لیے واضح ہدایات دیں۔`,
    ],
    studentActivity: [
      `استاد کی وضاحت/مظاہرہ غور سے سنیں اور دیکھیں۔`,
      `استاد کے سوالات کے جواب دیں۔`,
      `"${topic}" سے متعلق سرگرمی میں حصہ لیں (انفرادی، جوڑوں یا گروپ میں)۔`,
      `اپنے جوابات یا کام جماعت کے سامنے پیش کریں۔`,
    ],
    classroomActivities: pick(ACTIVITY_BANK_UR, 3, subject.length).map((title) => ({
      title,
      description: `"${title}" کے ذریعے طلبہ کو "${topic}" سمجھنے اور مشق کرنے میں مدد دیں۔`,
    })),
    assessment: {
      oral: [`"${topic}" کے بارے میں کیا ہے؟`, `"${topic}" کی ایک مثال دیں۔`],
      short: [`"${topic}" کے بارے میں دو جملے لکھیں۔`, `"${topic}" کو اپنے الفاظ میں بیان کریں۔`],
      mcqs: young
        ? []
        : [
            `درج ذیل میں سے کون سا "${topic}" کی بہترین وضاحت کرتا ہے؟ (الف) ... (ب) ... (ج) ...`,
            `"${topic}" کا زیادہ تر تعلق ہے: (الف) ... (ب) ... (ج) ...`,
          ],
      practical: [`"${topic}" سے متعلق ایک مختصر ورک شیٹ مکمل کریں۔`],
      exitTicket: `جانے سے پہلے، ہر طالب علم "${topic}" کے بارے میں سیکھی گئی ایک نئی بات بتائے یا لکھے۔`,
    },
    differentiation: {
      slow: `اضافی بصری مدد، آسان مثالیں اور انفرادی رہنمائی دیں۔ زیادہ وقت دیں اور اہم نکات دہرائیں۔`,
      average: `معمول کی رفتار اور استاد کی باقاعدہ مدد کے ساتھ عام سرگرمی کروائیں۔`,
      advanced: `گہرے "کیوں" اور "کیسے" کے سوالات پوچھیں اور "${topic}" سے متعلق اضافی چیلنج ٹاسک دیں۔`,
    },
    homework: young
      ? `گھر میں کسی بڑے سے "${topic}" کے بارے میں ایک سوال پوچھیں اور کل جماعت میں بتائیں۔`
      : `"${topic}" کے بارے میں 3-4 جملے لکھیں (یا ایک لیبل شدہ تصویر بنائیں) اور اگلی جماعت میں لائیں۔`,
    recap: [
      `آج ہم نے "${topic}" کے بارے میں کیا سیکھا؟`,
      `کوئی ایک مثال بتائیں جس پر ہم نے بات کی۔`,
      `"${topic}" کیوں اہم ہے؟`,
    ],
    durationBreakdown: time,
    footer: `تیار کردہ: ${teacherName || 'استاد'}، ${schoolName || 'اسکول'}۔`,
  }
}

// Rule-based, fully offline lesson plan generator.
// Used as the fallback when no AI backend is configured or reachable.
export function generateLocalLessonPlan(input) {
  const { className, subject, topic, duration, language } = input
  const body = language === 'ur' ? buildUrdu(input) : buildEnglish(input)

  return {
    meta: {
      teacherName: input.teacherName,
      schoolName: input.schoolName,
      className,
      subject,
      topic,
      duration,
      language,
    },
    ...body,
  }
}
