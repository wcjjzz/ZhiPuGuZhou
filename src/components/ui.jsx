import TrendChart from './ui_TrendChart_internal.jsx'
import DonutTags from './ui_DonutTags_internal.jsx'

export function SoftButton({ children, className = '', onClick, active = false, icon: Icon, type = 'button' }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={[
        'inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-200',
        active
          ? 'bg-emerald-200 text-emerald-900 shadow-[0_8px_30px_rgba(140,190,176,0.22)]'
          : 'bg-white/90 text-slate-700 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_8px_30px_rgba(151,182,172,0.18)]',
        className,
      ].join(' ')}
    >
      {Icon ? <Icon size={16} /> : null}
      {children}
    </button>
  )
}

export function SectionCard({ title, subtitle, right, children, className = '' }) {
  return (
    <div
      className={[
        'rounded-[28px] border border-white/80 bg-white/85 p-5 shadow-[0_12px_40px_rgba(160,189,180,0.15)] backdrop-blur-sm',
        className,
      ].join(' ')}
    >
      {(title || subtitle || right) && (
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            {title ? <div className="text-[17px] font-semibold text-slate-700">{title}</div> : null}
            {subtitle ? <div className="mt-1 text-sm leading-6 text-slate-500">{subtitle}</div> : null}
          </div>
          {right}
        </div>
      )}
      {children}
    </div>
  )
}

export function Tag({ children, className = '' }) {
  return <span className={['inline-flex items-center rounded-full px-3 py-1 text-xs font-medium', className].join(' ')}>{children}</span>
}

export function AppLogo() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 via-teal-50 to-sky-50 shadow-[0_10px_28px_rgba(145,194,179,0.18)]">
        <span className="text-xl">🚣</span>
      </div>
      <div>
        <div className="text-lg font-semibold tracking-[0.02em] text-slate-700">智愈孤舟</div>
        <div className="text-xs text-slate-400">在情绪起伏里，给自己一处能靠岸的地方</div>
      </div>
    </div>
  )
}

export function MetricBar({ label, value, color = 'bg-emerald-300' }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-sm text-slate-600">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-2.5 rounded-full bg-slate-100">
        <div className={`h-2.5 rounded-full ${color}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  )
}

export { TrendChart, DonutTags }
