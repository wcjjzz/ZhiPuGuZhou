export default function DonutTags() {
  const items = [
    { name: '疲惫', value: 30, className: 'bg-amber-200' },
    { name: '焦虑', value: 24, className: 'bg-violet-200' },
    { name: '平静', value: 18, className: 'bg-emerald-200' },
    { name: '委屈', value: 16, className: 'bg-rose-200' },
    { name: '有力量', value: 12, className: 'bg-sky-200' },
  ]

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.name} className="flex items-center gap-3">
          <div className={`h-3.5 w-3.5 rounded-full ${item.className}`} />
          <div className="w-16 text-sm text-slate-600">{item.name}</div>
          <div className="h-2 flex-1 rounded-full bg-slate-100">
            <div className={`h-2 rounded-full ${item.className}`} style={{ width: `${item.value}%` }} />
          </div>
          <div className="w-8 text-right text-sm text-slate-500">{item.value}%</div>
        </div>
      ))}
    </div>
  )
}
