import { LANGUAGES } from '../data/options'

export default function LanguageSelector({ value, onChange }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          type="button"
          onClick={() => onChange(lang.code)}
          className={`rounded-2xl border-2 px-4 py-3 text-lg font-semibold transition-colors ${
            value === lang.code
              ? 'border-teal-700 bg-teal-50 text-teal-800'
              : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
          }`}
          dir={lang.code === 'ur' ? 'rtl' : 'ltr'}
        >
          {lang.label}
        </button>
      ))}
    </div>
  )
}
