import { Link } from 'react-router-dom'

const base =
  'inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/60 disabled:opacity-60 disabled:cursor-not-allowed'

const variants = {
  primary: 'bg-accent-500 text-primary hover:bg-accent-600 shadow-md hover:shadow-xl',
  secondary:
    'border border-accent-500/70 bg-transparent text-primary hover:border-accent-500 hover:bg-accent-500/10',
  ghost: 'text-primary hover:bg-primary/5'
}

export function Button({ as = 'button', to, variant = 'primary', className = '', ...props }) {
  const cls = `${base} ${variants[variant] || variants.primary} ${className}`.trim()

  if (as === 'link') {
    return <Link to={to} className={cls} {...props} />
  }

  return <button className={cls} {...props} />
}

