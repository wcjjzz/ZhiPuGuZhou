import { useState } from 'react'
import { CheckCircle2, ChevronLeft, ChevronRight, Compass, LogIn, Sparkles, UserPlus } from 'lucide-react'
import { AppLogo, SoftButton, Tag, TrendChart } from '../components/ui'

export function WelcomeScreen({ onEnter, onGuest, onGuide }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#effaf4,transparent_35%),radial-gradient(circle_at_top_right,#fef6e7,transparent_30%),linear-gradient(180deg,#f8fcfb,white)] p-8 text-slate-700">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl grid-cols-1 overflow-hidden rounded-[36px] border border-white/80 bg-white/70 shadow-[0_30px_80px_rgba(164,189,179,0.18)] backdrop-blur-sm lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative flex flex-col justify-between p-10 lg:p-14">
          <div className="absolute left-10 top-10 h-28 w-28 rounded-full bg-emerald-100/60 blur-2xl" />
          <div className="absolute right-16 top-24 h-24 w-24 rounded-full bg-rose-100/60 blur-2xl" />
          <div className="relative z-10">
            <AppLogo />
            <div className="mt-16 max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm text-emerald-700">
                <Sparkles size={16} /> 低压力心理支持与情绪陪伴平台
              </div>
              <h1 className="mt-6 text-5xl font-semibold leading-[1.18] text-slate-700">
                你不必立刻把一切说清楚，
                <br />
                先从被安静接住开始。
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-8 text-slate-500">通过陪伴式对话、情绪记录与心理状态参考，帮助你更温柔地看见自己正在经历什么。</p>
              <div className="mt-10 flex flex-wrap gap-3">
                <SoftButton className="bg-emerald-200 text-emerald-900 hover:bg-emerald-200" onClick={onEnter} icon={LogIn}>登录进入</SoftButton>
                <SoftButton onClick={onGuide} icon={UserPlus}>注册并了解功能</SoftButton>
                <SoftButton onClick={onGuest} icon={Compass}>游客体验</SoftButton>
              </div>
            </div>
          </div>
          <div className="relative z-10 mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { title: '陪伴式对话', desc: '支持文字、图片与 OH 卡表达，回应克制而有温度。', emoji: '💬', color: 'bg-emerald-50' },
              { title: '记录与疏导', desc: '把情绪、事件与思维慢慢整理出来，看见变化轨迹。', emoji: '📝', color: 'bg-rose-50' },
              { title: '测评与预警', desc: '提供状态参考与支持建议，不替代临床诊断。', emoji: '🫶', color: 'bg-sky-50' },
            ].map((item) => (
              <div key={item.title} className={`rounded-[24px] border border-white bg-white/80 p-4 ${item.color}`}>
                <div className="text-2xl">{item.emoji}</div>
                <div className="mt-3 text-base font-medium text-slate-700">{item.title}</div>
                <div className="mt-2 text-sm leading-6 text-slate-500">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative overflow-hidden bg-[linear-gradient(180deg,#eef9f5,#ffffff)] p-8 lg:p-10">
          <div className="absolute -right-10 top-10 h-48 w-48 rounded-full bg-sky-100/60 blur-3xl" />
          <div className="absolute bottom-12 left-8 h-40 w-40 rounded-full bg-emerald-100/70 blur-3xl" />
          <div className="relative mx-auto mt-6 max-w-[560px] rounded-[32px] border border-white/80 bg-white/88 p-6 shadow-[0_30px_70px_rgba(173,194,185,0.2)]">
            <div className="flex items-center justify-between"><Tag className="bg-emerald-50 text-emerald-700">今日轻陪伴</Tag><div className="text-sm text-slate-400">演示预览</div></div>
            <div className="mt-6 rounded-[28px] bg-gradient-to-br from-emerald-50 via-white to-amber-50 p-5">
              <div className="flex items-start justify-between"><div><div className="text-sm text-slate-400">今日问候</div><div className="mt-1 text-2xl font-semibold text-slate-700">晚上好，欢迎靠岸一下。</div></div><div className="rounded-2xl bg-white p-3 shadow-sm">🌙</div></div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-[22px] bg-white/90 p-4"><div className="text-sm text-slate-400">最近状态</div><div className="mt-2 text-base font-medium text-slate-700">疲惫感反复出现，但表达意愿在增加</div></div>
                <div className="rounded-[22px] bg-white/90 p-4"><div className="text-sm text-slate-400">建议入口</div><div className="mt-2 text-base font-medium text-slate-700">今晚适合做 3 分钟呼吸放松</div></div>
              </div>
              <div className="mt-5 rounded-[24px] bg-white/90 p-4"><div className="flex items-center justify-between text-sm text-slate-500"><span>情绪趋势</span><span>近 7 天</span></div><div className="mt-3"><TrendChart compact /></div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function OnboardingScreen({ onFinish }) {
  const [step, setStep] = useState(0)
  const steps = [
    { icon: '💬', title: '陪伴式对话', desc: '用文字、图片或 OH 卡表达情绪。AI 会以温和、共情、不过度替你下结论的方式回应。', detail: ['文字对话', '图片表达', 'OH 卡引导'], color: 'from-emerald-100 to-emerald-50' },
    { icon: '📝', title: '情绪记录与疏导', desc: '用日记、打卡、CBT 记录表整理感受，系统会帮助你看见反复出现的模式与状态变化。', detail: ['情绪打卡', 'CBT 记录', '趋势分析'], color: 'from-rose-100 to-orange-50' },
    { icon: '🫶', title: '测评与预警支持', desc: '完成心理状态参考测评，获得结构化报告、维度解释与支持建议；当波动较大时会进行克制的风险提醒。', detail: ['量表测评', '报告解读', '风险提示'], color: 'from-sky-100 to-violet-50' },
  ]
  const current = steps[step]
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fcfb,#ffffff)] p-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col rounded-[36px] border border-white bg-white/75 p-8 shadow-[0_30px_70px_rgba(160,188,180,0.18)] backdrop-blur-sm lg:p-10">
        <div className="flex items-center justify-between"><AppLogo /><div className="flex items-center gap-2 text-sm text-slate-400">{steps.map((_, index) => <div key={index} className={`h-2.5 w-10 rounded-full ${index <= step ? 'bg-emerald-300' : 'bg-slate-200'}`} />)}</div></div>
        <div className="mt-10 grid flex-1 grid-cols-1 gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className={`rounded-[32px] bg-gradient-to-br ${current.color} p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]`}><div className="text-5xl">{current.icon}</div><div className="mt-8 text-sm text-slate-500">第 {step + 1} 步</div><div className="mt-2 text-3xl font-semibold text-slate-700">{current.title}</div><div className="mt-4 max-w-lg text-base leading-8 text-slate-600">{current.desc}</div><div className="mt-6 flex flex-wrap gap-2">{current.detail.map((detail) => <Tag key={detail} className="bg-white/90 text-slate-600">{detail}</Tag>)}</div></div>
          <div className="grid gap-4">
            {steps.map((item, index) => (
              <button key={item.title} onClick={() => setStep(index)} className={`rounded-[26px] border p-5 text-left transition-all ${index === step ? 'border-emerald-200 bg-emerald-50/70 shadow-[0_12px_30px_rgba(145,189,176,0.14)]' : 'border-white bg-white hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(182,199,191,0.12)]'}`}>
                <div className="flex items-start gap-4"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-2xl">{item.icon}</div><div className="flex-1"><div className="flex items-center justify-between gap-3"><div className="text-lg font-medium text-slate-700">{item.title}</div>{index === step ? <CheckCircle2 className="text-emerald-500" size={18} /> : <ChevronRight className="text-slate-300" size={18} />}</div><div className="mt-2 text-sm leading-7 text-slate-500">{item.desc}</div></div></div>
              </button>
            ))}
            <div className="mt-2 flex items-center justify-between"><SoftButton onClick={() => setStep(Math.max(step - 1, 0))} icon={ChevronLeft}>上一步</SoftButton><SoftButton onClick={() => (step === steps.length - 1 ? onFinish() : setStep(step + 1))} className="bg-emerald-200 text-emerald-900" icon={ChevronRight}>{step === steps.length - 1 ? '开始体验' : '下一步'}</SoftButton></div>
          </div>
        </div>
      </div>
    </div>
  )
}
