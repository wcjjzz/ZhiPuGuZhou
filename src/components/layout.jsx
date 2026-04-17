import { BellRing, BookHeart, ClipboardList, FileHeart, Heart, Home, MessageCircleHeart, Search, ShieldCheck, UserRound } from 'lucide-react'
import { AppLogo, SoftButton } from './ui'
import { navItems } from '../data/appData'

const iconMap = {
  dashboard: Home,
  chat: MessageCircleHeart,
  record: BookHeart,
  assessment: ClipboardList,
  report: FileHeart,
  space: UserRound,
}

const pageTitleMap = {
  dashboard: '首页总览',
  chat: '心语对话',
  imageExpress: '图片表达',
  record: '情绪记录',
  cbt: 'CBT 记录',
  checkin: '日常打卡',
  trend: '趋势分析',
  advice: '个性化建议',
  assessment: '测评中心',
  quiz: '测评答题',
  result: '测评结果',
  report: '报告中心',
  space: '我的空间',
  privacy: '隐私与安全',
}

export function SideNav({ activePage, setActivePage }) {
  return (
    <div className="flex h-full flex-col rounded-[30px] border border-white/80 bg-white/82 p-4 shadow-[0_18px_50px_rgba(160,188,180,0.14)] backdrop-blur-sm">
      <AppLogo />
      <div className="mt-6 space-y-1.5">
        {navItems.map((item) => {
          const Icon = iconMap[item.key]
          const active =
            activePage === item.key ||
            (item.key === 'record' && ['record', 'cbt', 'checkin', 'trend', 'advice'].includes(activePage)) ||
            (item.key === 'assessment' && ['assessment', 'quiz', 'result'].includes(activePage)) ||
            (item.key === 'report' && ['report'].includes(activePage)) ||
            (item.key === 'space' && ['space', 'privacy'].includes(activePage))

          return (
            <button
              key={item.key}
              onClick={() => setActivePage(item.key)}
              className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition-all ${active ? 'bg-emerald-100 text-emerald-900 shadow-sm' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <Icon size={18} />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          )
        })}
      </div>
      <div className="mt-6 rounded-[24px] bg-gradient-to-br from-amber-50 to-rose-50 p-4">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-700"><Heart size={16} /> 今日提醒</div>
        <div className="mt-2 text-sm leading-7 text-slate-500">你可以不急着分析全部，只先记录下今天最明显的一种感受。</div>
      </div>
      <div className="mt-auto rounded-[24px] bg-slate-50 p-4">
        <div className="text-sm font-medium text-slate-700">支持资源</div>
        <div className="mt-2 text-sm leading-7 text-slate-500">当你需要更多帮助时，可以在“风险提醒”与“隐私安全”中查看专业资源入口。</div>
      </div>
    </div>
  )
}

export function TopBar({ onTriggerRisk, activePage, setActivePage }) {
  return (
    <div className="flex items-center justify-between rounded-[28px] border border-white/80 bg-white/82 px-5 py-4 shadow-[0_10px_36px_rgba(160,188,180,0.13)] backdrop-blur-sm">
      <div>
        <div className="text-sm text-slate-400">智愈孤舟 / {pageTitleMap[activePage]}</div>
        <div className="mt-1 text-xl font-semibold text-slate-700">晚上好，愿你今晚对自己轻一点。</div>
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-2 rounded-full bg-slate-50 px-4 py-2 text-sm text-slate-500 lg:flex">
          <Search size={14} /> 搜索记录、会话与报告
        </div>
        <SoftButton onClick={() => setActivePage('space')} icon={BellRing}>通知</SoftButton>
        <SoftButton onClick={onTriggerRisk} className="bg-amber-100 text-amber-800" icon={ShieldCheck}>查看支持提醒</SoftButton>
      </div>
    </div>
  )
}
