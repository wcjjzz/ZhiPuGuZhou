import { BarChart3, ClipboardList, MessageCircleHeart, NotebookPen } from 'lucide-react'
import { SectionCard, SoftButton, Tag, TrendChart } from '../components/ui'
import { moodOptions } from '../data/appData'

export default function DashboardPage({ setActivePage }) {
  return (
    <div className="grid gap-5 xl:grid-cols-[1.25fr_0.85fr]">
      <div className="space-y-5">
        <SectionCard className="overflow-hidden bg-[radial-gradient(circle_at_top_left,#eefaf5,transparent_40%),linear-gradient(135deg,#ffffff,#f7fbfa)]">
          <div className="grid gap-6 lg:grid-cols-[1.12fr_0.88fr] lg:items-center">
            <div>
              <Tag className="bg-emerald-50 text-emerald-700">今日问候</Tag>
              <div className="mt-4 text-3xl font-semibold leading-[1.3] text-slate-700">欢迎回来。今天也可以先从一句话，或一个表情开始。</div>
              <div className="mt-4 max-w-2xl text-base leading-8 text-slate-500">你的感受不需要被整理得很漂亮才值得被看见。你可以先聊聊、写点记录，或者做一次轻量测评。</div>
              <div className="mt-6 flex flex-wrap gap-3"><SoftButton onClick={() => setActivePage('chat')} className="bg-emerald-200 text-emerald-900" icon={MessageCircleHeart}>开始聊聊</SoftButton><SoftButton onClick={() => setActivePage('record')} icon={NotebookPen}>继续记录</SoftButton><SoftButton onClick={() => setActivePage('assessment')} icon={ClipboardList}>开始测评</SoftButton></div>
            </div>
            <div className="rounded-[28px] bg-gradient-to-br from-emerald-50 via-white to-sky-50 p-5"><div className="flex items-center justify-between"><div><div className="text-sm text-slate-400">关怀提醒</div><div className="mt-1 text-xl font-semibold text-slate-700">今晚先把“应该”放轻一点。</div></div><div className="rounded-2xl bg-white p-3">🪴</div></div><div className="mt-4 rounded-[22px] bg-white/90 p-4 text-sm leading-7 text-slate-600">你最近的记录里，“疲惫”和“想安静一下”出现得比较频繁。也许今晚更适合做一点放松，而不是要求自己恢复得很快。</div></div>
          </div>
        </SectionCard>
        <div className="grid gap-5 lg:grid-cols-3">
          <SectionCard title="当前情绪快捷打卡" subtitle="选一个更接近你的状态，先不必解释原因。"><div className="flex flex-wrap gap-2">{moodOptions.map((mood) => <button key={mood.label} className={`rounded-full px-4 py-2 text-sm text-slate-700 transition hover:-translate-y-0.5 ${mood.color}`}>{mood.icon} {mood.label}</button>)}</div></SectionCard>
          <SectionCard title="最近一次记录摘要" subtitle="昨天 22:14 · 晚间记录"><div className="text-sm leading-7 text-slate-600">“明明今天没有出什么事，但还是一直紧着。后来写下来才发现，我其实是在担心自己做得不够好。”</div><button onClick={() => setActivePage('record')} className="mt-3 text-sm text-emerald-700">查看完整记录</button></SectionCard>
          <SectionCard title="收藏建议" subtitle="适合今晚的轻量内容"><div className="space-y-2">{['3 分钟呼吸落地练习', '睡前把担心放到纸上的方法', '当你很想责怪自己时，可以先试试这句话'].map((item) => <div key={item} className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">{item}</div>)}</div></SectionCard>
        </div>
        <SectionCard title="情绪趋势简图" subtitle="近 7 天你的波动并不算小，但也能看到状态回稳的时刻。" right={<SoftButton onClick={() => setActivePage('trend')} icon={BarChart3}>查看趋势</SoftButton>}><TrendChart /></SectionCard>
      </div>
      <div className="space-y-5">
        <SectionCard title="快捷入口"><div className="grid gap-3">{[{ title: '开始聊聊', desc: '用文字、图片或 OH 卡表达', icon: '💬', to: 'chat', color: 'bg-emerald-50' }, { title: '继续记录', desc: '整理今日情绪与触发事件', icon: '📝', to: 'record', color: 'bg-rose-50' }, { title: '开始测评', desc: '做一次心理状态参考测评', icon: '🫶', to: 'assessment', color: 'bg-sky-50' }].map((item) => <button key={item.title} onClick={() => setActivePage(item.to)} className={`flex items-center justify-between rounded-[24px] ${item.color} p-4 text-left transition hover:-translate-y-0.5`}><div className="flex items-center gap-4"><div className="text-2xl">{item.icon}</div><div><div className="font-medium text-slate-700">{item.title}</div><div className="mt-1 text-sm text-slate-500">{item.desc}</div></div></div><span className="text-slate-300">›</span></button>)}</div></SectionCard>
        <SectionCard title="今日陪伴卡" subtitle="一句适合留给自己的话"><div className="rounded-[24px] bg-gradient-to-br from-amber-50 via-white to-rose-50 p-5 text-sm leading-8 text-slate-600">你不是一定要在今天就变得有力量。能感觉到疲惫，并愿意停下来照顾自己，这本身就很重要。</div></SectionCard>
        <SectionCard title="推荐内容" subtitle="根据最近记录整理"><div className="space-y-3">{[{ title: '当压力让你变得很想回避时', meta: '行为激活 · 5 分钟' }, { title: '睡前脑子停不下来，可以怎么缓一缓', meta: '减压建议 · 晚间' }, { title: '写给总觉得自己不够好的你', meta: '自我对话 · 收藏较多' }].map((item) => <div key={item.title} className="rounded-[22px] bg-slate-50 p-4"><div className="text-sm font-medium text-slate-700">{item.title}</div><div className="mt-1 text-xs text-slate-400">{item.meta}</div></div>)}</div></SectionCard>
      </div>
    </div>
  )
}
