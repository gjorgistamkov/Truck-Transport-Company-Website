export function Card({ className = '', children }) {
  return (
    <div
      className={[
        'rounded-2xl border border-slate-200 bg-white p-6 shadow-md shadow-slate-900/5',
        className
      ].join(' ')}
    >
      {children}
    </div>
  )
}

