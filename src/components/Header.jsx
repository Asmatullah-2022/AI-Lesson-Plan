import { ChevronLeft, GraduationCap } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Header({ title, subtitle, back = false }) {
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-10 bg-teal-700 text-white px-4 pt-6 pb-5 rounded-b-3xl shadow-md">
      <div className="flex items-center gap-2">
        {back ? (
          <button
            onClick={() => navigate(-1)}
            aria-label="Go back"
            className="rounded-full p-1.5 -ml-1.5 hover:bg-white/10 active:bg-white/20"
          >
            <ChevronLeft size={24} />
          </button>
        ) : (
          <span className="rounded-full bg-white/15 p-2">
            <GraduationCap size={22} />
          </span>
        )}
        <div>
          <h1 className="text-xl font-bold leading-tight">{title}</h1>
          {subtitle ? <p className="text-teal-50/90 text-sm">{subtitle}</p> : null}
        </div>
      </div>
    </header>
  )
}
