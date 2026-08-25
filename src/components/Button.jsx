const VARIANTS = {
  primary: 'bg-teal-700 text-white hover:bg-teal-800 active:bg-teal-900 shadow-sm',
  secondary: 'bg-white text-teal-700 border border-teal-200 hover:bg-teal-50',
  ghost: 'bg-transparent text-slate-600 hover:bg-slate-100',
  danger: 'bg-white text-rose-600 border border-rose-200 hover:bg-rose-50',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  full = false,
  ...props
}) {
  const sizes = {
    sm: 'text-sm px-3 py-2',
    md: 'text-base px-4 py-3',
    lg: 'text-lg px-6 py-4',
  }

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-2xl font-semibold transition-colors disabled:opacity-50 disabled:pointer-events-none ${VARIANTS[variant]} ${sizes[size]} ${full ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {Icon ? <Icon size={size === 'lg' ? 22 : 18} strokeWidth={2.25} /> : null}
      {children}
    </button>
  )
}
