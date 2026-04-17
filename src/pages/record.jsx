import { ArrowRight, CheckCircle2, NotebookPen } from 'lucide-react'
import { SectionCard, SoftButton, TrendChart, DonutTags, Tag } from '../components/ui'
import { moodOptions } from '../data/appData'

export function RecordHomePage({ setActivePage }) {
  return (
    <div className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
      <div className="space-y-5">
        <SectionCard title="今日情绪打卡" subtitle="先选一种最接近你的感受，再决定要不要展开。"><div className="grid gap-4 lg:grid-cols-[1fr_260px] lg:items-center"><div><div className="flex flex-wrap gap-2">{moodOptions.map((mood, index) => <button key={mood.label} className={`rounded-full px-4 py-2.5 text-sm text-slate-700 transition hover:-translate-y-0.5 ${index === 1 ? 'bg-amber-100 ring-2 ring-white' : mood.color}`}>{mood.icon} {mood.label}</button>)}</div><div className="mt-5"><div className="flex items-center justify-between text-sm text-slate-500"><span>情绪强度</span><span>64 / 100</span></div><div className="mt-3 h-3 rounded-full bg-slate-100"><div className="h-3 w-[64%] rounded-full bg-gradient-to-r from-amber-200 to-rose-200" /></div></div></div><div className="rounded-[24px] bg-gradient-to-br from-amber-50 to-white p-4"><div className="text-sm text-slate-400">触发事件</div><div className="mt-2 rounded-[20px] bg-white p-4 text-sm text-slate-500">例如：临近 deadline，有人一句话让我突然很在意，今天什么都不想做……</div></div></div><div className="mt-5 flex flex-wrap gap-3"><SoftButton onClick={() => setActivePage('cbt')} className="bg-emerald-200 text-emerald-900" icon={NotebookPen}>填写 CBT 记录</SoftButton><SoftButton onClick={() => setActivePage('checkin')} icon={CheckCircle2}>日常打卡</SoftButton></div></SectionCard>
        <SectionCard title="最近记录摘要" subtitle="这些内容不需要写得很完整，留下线索就已经很好。"><div className="space-y-3">{[{ title: '昨天 22:14 · 晚间记录', text: '感觉自己整天都在赶，晚上终于停下来时才发现其实很累。' }, { title: '前天 08:22 · 晨间打卡', text: '起床后有点空，什么都不想开始。' }, { title: '04-13 · 事件记录', text: '和别人比较后，心里突然很沉。' }].map((record) => <div key={record.title} className="rounded-[22px] bg-slate-50 p-4"><div className="text-sm text-slate-400">{record.title}</div><div className="mt-2 text-sm leading-7 text-slate-600">{record.text}</div></div>)}</div></SectionCard>
      </div>
      <div className="space-y-5"><SectionCard title="今日建议卡片" subtitle="你最近更适合先稳住节奏，而不是一下子解决很多问题。"><div className="space-y-3">{['给自己留一个 10 分钟的不被打断时段', '把脑海里反复出现的一件担心写下来，再放到明天处理', '今晚睡前只做一件让身体慢下来的事'].map((item) => <div key={item} className="rounded-[22px] bg-gradient-to-r from-emerald-50 to-white p-4 text-sm text-slate-600">{item}</div>)}</div></SectionCard><SectionCard title="后续查看"><div className="grid gap-3"><button onClick={() => setActivePage('trend')} className="rounded-[22px] bg-sky-50 p-4 text-left transition hover:-translate-y-0.5"><div className="text-sm font-medium text-slate-700">查看趋势分析</div><div className="mt-1 text-sm text-slate-500">近 7 天与近 30 天的情绪变化</div></button><button onClick={() => setActivePage('advice')} className="rounded-[22px] bg-rose-50 p-4 text-left transition hover:-translate-y-0.5"><div className="text-sm font-medium text-slate-700">查看个性化建议</div><div className="mt-1 text-sm text-slate-500">呼吸放松、正念、行为激活等</div></button></div></SectionCard></div>
    </div>
  )
}

export function CbtPage({ setActivePage }) {
  const fields = [
    ['发生了什么', '例如：下午开会时被点名提问后，我一直很在意自己的表现。'],
    ['我当时怎么想', '例如：我是不是又显得很差劲，别人会不会觉得我不行。'],
    ['我感受到什么情绪', '例如：紧张、羞愧、委屈。'],
    ['情绪强度', '例如：70 / 100。'],
    ['支持这个想法的证据', '例如：我回答得不够流畅，停顿了很久。'],
    ['不支持这个想法的证据', '例如：其实没有人责怪我，同事会后也正常和我沟通。'],
    ['我可以怎样更平衡地理解它', '例如：我那一刻确实紧张了，但这不等于我很差，只是状态受影响。'],
    ['下一步准备做什么', '例如：今晚不再反复回想这件事，先散步 10 分钟。'],
  ]
  return (
    <div className="space-y-5"><SectionCard title="CBT 记录表" subtitle="把事情写下来，不是为了证明自己错了，而是帮你把纠缠在一起的部分慢慢分开。" right={<Tag className="bg-rose-50 text-rose-600">疗愈感表单</Tag>}><div className="grid gap-4 lg:grid-cols-2">{fields.map(([label, placeholder]) => <div key={label} className="rounded-[24px] bg-gradient-to-br from-white to-slate-50 p-4"><div className="text-sm font-medium text-slate-700">{label}</div><div className="mt-3 min-h-[108px] rounded-[20px] border border-white bg-white px-4 py-3 text-sm leading-7 text-slate-400">{placeholder}</div></div>)}</div></SectionCard><div className="flex justify-between"><SoftButton onClick={() => setActivePage('record')}>返回记录首页</SoftButton><div className="flex gap-3"><SoftButton onClick={() => setActivePage('trend')}>保存后查看趋势</SoftButton><SoftButton onClick={() => setActivePage('trend')} className="bg-emerald-200 text-emerald-900" icon={ArrowRight}>保存记录</SoftButton></div></div></div>
  )
}

export function CheckInPage() {
  const items = [['睡眠', '昨晚 6.5 小时', '🌙', 'bg-sky-50'], ['饮食', '规律 2 餐', '🍲', 'bg-amber-50'], ['社交', '和朋友聊了 20 分钟', '🫧', 'bg-rose-50'], ['学习 / 工作', '完成了 1 个待办', '📘', 'bg-violet-50'], ['运动', '散步 15 分钟', '🏃', 'bg-emerald-50'], ['放松', '听歌 10 分钟', '🎧', 'bg-blue-50']]
  return (
    <div className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]"><SectionCard title="今日打卡" subtitle="不是为了完美完成，而是帮你看见生活有没有留下一点照顾自己的空间。"><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{items.map(([title, desc, emoji, color]) => <div key={title} className={`rounded-[24px] ${color} p-4`}><div className="text-2xl">{emoji}</div><div className="mt-3 text-sm font-medium text-slate-700">{title}</div><div className="mt-2 text-sm text-slate-500">{desc}</div><div className="mt-4 flex gap-2"><button className="rounded-full bg-white px-3 py-1.5 text-xs text-slate-600">完成</button><button className="rounded-full bg-white/70 px-3 py-1.5 text-xs text-slate-500">稍后补充</button></div></div>)}</div></SectionCard><div className="space-y-5"><SectionCard title="连续打卡天数"><div className="rounded-[28px] bg-gradient-to-br from-emerald-50 via-white to-amber-50 p-6 text-center"><div className="text-sm text-slate-400">你已经连续照看自己</div><div className="mt-3 text-5xl font-semibold text-slate-700">8 天</div><div className="mt-3 text-sm leading-7 text-slate-500">不是每一天都很完整，但你没有完全放下自己。</div></div></SectionCard><SectionCard title="温和鼓励反馈"><div className="rounded-[24px] bg-slate-50 p-5 text-sm leading-8 text-slate-600">今天你为自己留下了一些很小但真实的动作：吃了点东西、和人说了话、让身体动了起来。很多稳定，都是这样慢慢回来的。</div></SectionCard></div></div>
  )
}

export function TrendPage({ setActivePage, range, setRange }) {
  return (
    <div className="space-y-5"><div className="flex items-center justify-between"><div><div className="text-2xl font-semibold text-slate-700">趋势分析</div><div className="mt-1 text-sm text-slate-500">如果你愿意，我们可以一起看看最近有哪些情绪反复出现。</div></div><div className="flex gap-2 rounded-full bg-white/80 p-1 shadow-sm"><button onClick={() => setRange('7')} className={`rounded-full px-4 py-2 text-sm ${range === '7' ? 'bg-emerald-100 text-emerald-900' : 'text-slate-500'}`}>近 7 天</button><button onClick={() => setRange('30')} className={`rounded-full px-4 py-2 text-sm ${range === '30' ? 'bg-emerald-100 text-emerald-900' : 'text-slate-500'}`}>近 30 天</button></div></div><div className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]"><SectionCard title="情绪趋势图" subtitle={range === '7' ? '这一周情绪有波动，但后半段开始出现回稳。' : '近 30 天里，疲惫和焦虑在月中更明显。'}><TrendChart compact={false} /></SectionCard><SectionCard title="高频情绪标签分布" subtitle="这些词在你的记录里更常出现。"><DonutTags /></SectionCard></div><div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]"><SectionCard title="AI 自动总结" subtitle="状态变化描述"><div className="rounded-[24px] bg-gradient-to-br from-white to-emerald-50 p-5 text-sm leading-8 text-slate-600">最近的波动更多与持续消耗、睡眠不稳和对自我要求较高有关。记录中能看到你在疲惫时更容易担心“自己不够好”，但也能看到你开始尝试表达、记录与停下来照看自己。</div></SectionCard><SectionCard title="个性化疏导建议卡片" right={<SoftButton onClick={() => setActivePage('advice')} icon={ArrowRight}>查看全部建议</SoftButton>}><div className="grid gap-3 md:grid-cols-2">{['今晚更适合做减压，而不是补偿式努力', '把担心拆成可以明天处理的一小步', '尽量把睡前 20 分钟从信息流里抽离出来', '遇到自责时，先写下一个更平衡的解释'].map((item) => <div key={item} className="rounded-[22px] bg-slate-50 p-4 text-sm leading-7 text-slate-600">{item}</div>)}</div></SectionCard></div></div>
  )
}

export function AdvicePage() {
  const groups = [['呼吸放松', '先跟着节奏慢慢呼气，不要求立刻平静，只让身体知道现在可以稍微放松一点。', 'bg-emerald-50'], ['正念练习', '留意此刻脚掌落地、手边触感和周围声音，把注意力从脑内拉回当下。', 'bg-sky-50'], ['行为激活建议', '哪怕只做一件 5 分钟以内的小事，也是在帮自己从停滞里挪动一步。', 'bg-amber-50'], ['睡前减压建议', '把还没完成的事写下来，告诉自己：这些事情明天再处理，也来得及。', 'bg-violet-50'], ['给自己说的话', '我现在很累，所以看事情会更严苛一点。这不代表我真的那么糟。', 'bg-rose-50']]
  return <div className="space-y-5"><SectionCard title="个性化建议" subtitle="你可以收藏、标记完成，或先放进“稍后再看”。"><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{groups.map(([title, desc, color]) => <div key={title} className={`rounded-[26px] ${color} p-5`}><div className="text-lg font-medium text-slate-700">{title}</div><div className="mt-3 text-sm leading-7 text-slate-600">{desc}</div><div className="mt-5 flex flex-wrap gap-2"><button className="rounded-full bg-white px-3 py-1.5 text-xs text-slate-600">收藏</button><button className="rounded-full bg-white px-3 py-1.5 text-xs text-slate-600">标记完成</button><button className="rounded-full bg-white/80 px-3 py-1.5 text-xs text-slate-500">稍后再看</button></div></div>)}</div></SectionCard></div>
}
