import { ChevronLeft, ChevronRight, Check, FileHeart, MessageCircleHeart, Phone, ShieldCheck } from 'lucide-react'
import { assessmentQuestions, reportHistory } from '../data/appData'
import { MetricBar, SectionCard, SoftButton, Tag } from '../components/ui'

export function AssessmentCenterPage({ setActivePage }) {
  return (
    <div className="grid gap-5 xl:grid-cols-[1.08fr_0.92fr]"><SectionCard title="测评中心" subtitle="结果用于心理状态参考，不替代临床诊断。"><div className="grid gap-4 md:grid-cols-2">{[['近期情绪状态参考', '8 题 · 约 2 分钟', '适合快速了解最近波动', 'bg-emerald-50'], ['压力与恢复检查', '12 题 · 约 3 分钟', '看一看压力感与恢复状态', 'bg-sky-50'], ['睡眠与情绪关联评估', '10 题 · 约 3 分钟', '适合近来休息不稳时使用', 'bg-amber-50'], ['自我评价与负担感检查', '9 题 · 约 2 分钟', '看看是否存在持续自我苛责', 'bg-rose-50']].map(([title, meta, desc, color], index) => <button key={title} onClick={() => setActivePage('quiz')} className={`rounded-[26px] ${color} p-5 text-left transition hover:-translate-y-0.5`}><div className="flex items-center justify-between"><div className="text-lg font-medium text-slate-700">{title}</div>{index === 0 ? <Tag className="bg-white text-emerald-700">推荐</Tag> : null}</div><div className="mt-2 text-sm text-slate-400">{meta}</div><div className="mt-3 text-sm leading-7 text-slate-600">{desc}</div></button>)}</div></SectionCard><div className="space-y-5"><SectionCard title="测评说明"><div className="space-y-3 text-sm leading-7 text-slate-600"><p>1. 请根据最近两周的整体感受作答，不需要追求“标准答案”。</p><p>2. 结果更适合作为状态参考，帮助你决定是否继续记录、对话或寻求更多支持。</p><p>3. 若系统识别到较高风险波动，会提供支持建议与专业资源入口。</p></div></SectionCard><SectionCard title="历史报告入口" right={<SoftButton onClick={() => setActivePage('report')} icon={FileHeart}>查看历史报告</SoftButton>}><div className="space-y-3">{reportHistory.slice(0, 2).map((item) => <div key={item.date} className="flex items-center justify-between rounded-[22px] bg-slate-50 p-4"><div><div className="text-sm font-medium text-slate-700">{item.title}</div><div className="mt-1 text-xs text-slate-400">{item.date}</div></div><span className={`rounded-full px-3 py-1 text-xs ${item.color}`}>{item.tag}</span></div>)}</div></SectionCard></div></div>
  )
}

export function QuizPage({ setActivePage, quizIndex, setQuizIndex, answers, setAnswers }) {
  const total = assessmentQuestions.length
  const current = assessmentQuestions[quizIndex]
  const options = ['几乎没有', '偶尔有', '有时明显', '经常如此']
  const percent = Math.round(((quizIndex + 1) / total) * 100)

  const choose = (index) => {
    const next = [...answers]
    next[quizIndex] = index
    setAnswers(next)
  }

  const goNext = () => {
    if (quizIndex < total - 1) setQuizIndex(quizIndex + 1)
    else setActivePage('result')
  }

  return (
    <div className="mx-auto max-w-4xl space-y-5"><SectionCard title="心理状态参考测评" subtitle="请根据最近两周的整体状态作答。"><div className="mb-5 flex items-center justify-between text-sm text-slate-500"><span>题目 {quizIndex + 1} / {total}</span><span>进度 {percent}%</span></div><div className="h-2.5 rounded-full bg-slate-100"><div className="h-2.5 rounded-full bg-gradient-to-r from-emerald-300 to-sky-200" style={{ width: `${percent}%` }} /></div><div className="mt-8 rounded-[28px] bg-gradient-to-br from-white to-emerald-50 p-8"><div className="text-2xl font-semibold leading-[1.45] text-slate-700">{current}</div><div className="mt-8 grid gap-3">{options.map((option, index) => <button key={option} onClick={() => choose(index)} className={`rounded-[22px] border px-5 py-4 text-left text-sm transition ${answers[quizIndex] === index ? 'border-emerald-200 bg-emerald-50 text-slate-700' : 'border-white bg-white text-slate-600 hover:-translate-y-0.5 hover:shadow-sm'}`}>{option}</button>)}</div></div></SectionCard><div className="flex items-center justify-between"><SoftButton onClick={() => setQuizIndex(Math.max(quizIndex - 1, 0))} icon={ChevronLeft}>上一题</SoftButton><div className="flex gap-3"><SoftButton onClick={() => setActivePage('assessment')}>暂时离开</SoftButton><SoftButton onClick={goNext} className="bg-emerald-200 text-emerald-900" icon={quizIndex === total - 1 ? Check : ChevronRight}>{quizIndex === total - 1 ? '提交测评' : '下一题'}</SoftButton></div></div></div>
  )
}

export function ResultPage({ setActivePage, onOpenRisk }) {
  return (
    <div className="space-y-5"><div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]"><SectionCard title="总体状态评估" subtitle="结果用于状态参考，不替代临床诊断。"><div className="rounded-[28px] bg-gradient-to-br from-amber-50 via-white to-rose-50 p-6"><div className="flex items-center justify-between"><div><div className="text-sm text-slate-400">本次结果</div><div className="mt-2 text-3xl font-semibold text-slate-700">近期压力较高，情绪波动偏明显</div></div><Tag className="bg-amber-100 text-amber-800">需持续关注</Tag></div><div className="mt-4 text-sm leading-8 text-slate-600">这更像是在提醒：你最近可能承受了较多消耗，情绪恢复速度变慢了。先别急着给自己下判断，我们更建议结合记录、休息情况和持续观察来看。</div></div></SectionCard><SectionCard title="各维度结果"><div className="space-y-4"><MetricBar label="压力负担" value={78} color="bg-amber-300" /><MetricBar label="情绪耗竭" value={72} color="bg-rose-300" /><MetricBar label="睡眠影响" value={65} color="bg-sky-300" /><MetricBar label="自我苛责倾向" value={69} color="bg-violet-300" /><MetricBar label="支持资源使用" value={36} color="bg-emerald-300" /></div></SectionCard></div><div className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]"><SectionCard title="通俗解释"><div className="space-y-3 text-sm leading-8 text-slate-600"><p>你最近可能一直处在“撑着做事”的状态里，哪怕表面上还能维持日常，内在消耗已经比较明显。</p><p>当疲惫堆起来时，人更容易把事情往自己身上归因，也更难从紧绷中退出来。</p><p>这并不等于你已经被某个结论定义了，而是在提醒你：现在值得多一点照顾、观察与支持。</p></div></SectionCard><SectionCard title="个性化建议"><div className="space-y-3">{['先把近期的主要压力源写下来，避免全部混在一起压着自己', '连续 3 天进行晚间记录，观察情绪与睡眠的关联', '把“必须马上恢复”换成“先稳住节奏”', '如高压状态持续，可考虑联系专业资源进行进一步支持'].map((item) => <div key={item} className="rounded-[22px] bg-slate-50 p-4 text-sm leading-7 text-slate-600">{item}</div>)}</div></SectionCard></div><div className="flex flex-wrap justify-end gap-3"><SoftButton onClick={() => setActivePage('chat')} icon={MessageCircleHeart}>去和 AI 聊聊</SoftButton><SoftButton onClick={() => setActivePage('report')} icon={FileHeart}>查看完整报告</SoftButton><SoftButton onClick={onOpenRisk} className="bg-amber-100 text-amber-800" icon={ShieldCheck}>查看风险提醒</SoftButton></div></div>
  )
}

export function ReportPage({ setActivePage, onOpenRisk }) {
  return (
    <div className="grid gap-5 xl:grid-cols-[310px_minmax(0,1fr)]"><SectionCard title="历史报告列表" subtitle="最近 3 次"><div className="space-y-3">{reportHistory.map((item, index) => <button key={item.date} className={`w-full rounded-[22px] p-4 text-left ${index === 0 ? 'bg-emerald-50' : 'bg-slate-50 hover:bg-slate-100'}`}><div className="flex items-center justify-between"><div className="text-sm font-medium text-slate-700">{item.title}</div><span className={`rounded-full px-3 py-1 text-xs ${item.color}`}>{item.tag}</span></div><div className="mt-1 text-xs text-slate-400">{item.date}</div></button>)}</div></SectionCard><div className="space-y-5"><SectionCard title="当前报告详情" subtitle="2026-04-16 · 近期情绪状态参考报告"><div className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]"><div className="space-y-4"><div className="rounded-[24px] bg-gradient-to-br from-amber-50 to-white p-5"><div className="text-sm text-slate-400">当前状态总结</div><div className="mt-2 text-xl font-semibold text-slate-700">近期压力偏高，恢复感不足，建议持续记录并适度增加支持。</div></div><div className="rounded-[24px] bg-slate-50 p-5"><div className="text-sm font-medium text-slate-700">近期重点关注点</div><div className="mt-3 space-y-2 text-sm leading-7 text-slate-600"><div>• 睡眠质量波动与白天疲惫感之间存在关联</div><div>• 自我评价偏严苛时，焦虑感更容易放大</div><div>• 支持资源使用偏少，倾向独自承受</div></div></div></div><div className="space-y-4"><div className="rounded-[24px] bg-slate-50 p-5"><div className="text-sm font-medium text-slate-700">各维度解释</div><div className="mt-3 space-y-4 text-sm leading-7 text-slate-600"><div><span className="font-medium text-slate-700">压力负担：</span>近期外界要求与内在要求叠加，容易维持高耗能状态。</div><div><span className="font-medium text-slate-700">情绪耗竭：</span>说明你可能很久没有真正恢复过来。</div><div><span className="font-medium text-slate-700">支持资源：</span>更建议你把表达、记录或求助看作稳定状态的一部分。</div></div></div></div></div></SectionCard><div className="flex flex-wrap justify-end gap-3"><SoftButton onClick={() => setActivePage('record')}>继续记录</SoftButton><SoftButton onClick={() => setActivePage('assessment')}>再次评估</SoftButton><SoftButton onClick={onOpenRisk} className="bg-amber-100 text-amber-800" icon={Phone}>联系专业资源</SoftButton></div></div></div>
  )
}
