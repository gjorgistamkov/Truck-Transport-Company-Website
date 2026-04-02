export function SectionHeading({ eyebrow, title, description, align = 'left', variant = 'light' }) {
  const alignClass = align === 'center' ? 'text-center' : 'text-left'
  const isDark = variant === 'dark'
  return (
    <div className={`${alignClass} max-w-2xl`}>
      {eyebrow ? (
        <div className={`text-xs font-bold tracking-widest ${isDark ? 'text-accent-600' : 'text-accent-500'}`}>
          {eyebrow}
        </div>
      ) : null}
      <h2
        className={`mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-primary'}`}
      >
        {title}
      </h2>
      {description ? (
        <p className={`mt-3 text-sm sm:text-base leading-relaxed ${isDark ? 'text-slate-200' : 'text-slate-600'}`}>
          {description}
        </p>
      ) : null}
    </div>
  )
}

