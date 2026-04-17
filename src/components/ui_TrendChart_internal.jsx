export default function TrendChart({ compact = false }) {
  const points = compact ? [18, 32, 28, 42, 38, 54, 49] : [16, 28, 25, 33, 30, 44, 40, 49, 38, 52, 47, 59]
  const width = compact ? 260 : 520
  const height = compact ? 110 : 180

  const path = points
    .map((point, index) => {
      const x = (index / (points.length - 1)) * width
      const y = height - (point / 65) * (height - 20) - 10
      return `${index === 0 ? 'M' : 'L'}${x},${y}`
    })
    .join(' ')

  return (
    <div className="rounded-[24px] bg-gradient-to-br from-emerald-50 via-white to-sky-50 p-4">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full overflow-visible">
        {[0, 1, 2, 3].map((index) => (
          <line key={index} x1="0" y1={20 + index * ((height - 20) / 4)} x2={width} y2={20 + index * ((height - 20) / 4)} stroke="#e7efec" strokeDasharray="4 6" />
        ))}
        <path d={path} fill="none" stroke="#92c8b7" strokeWidth="4" strokeLinecap="round" />
        {points.map((point, index) => {
          const x = (index / (points.length - 1)) * width
          const y = height - (point / 65) * (height - 20) - 10
          return <circle key={index} cx={x} cy={y} r="5" fill="#fff" stroke="#92c8b7" strokeWidth="3" />
        })}
      </svg>
      <div className={`mt-3 grid ${compact ? 'grid-cols-7' : 'grid-cols-12'} text-center text-xs text-slate-400`}>
        {(compact ? ['一', '二', '三', '四', '五', '六', '日'] : ['4/6', '4/7', '4/8', '4/9', '4/10', '4/11', '4/12', '4/13', '4/14', '4/15', '4/16', '今日']).map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </div>
  )
}
