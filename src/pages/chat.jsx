import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Camera, Image as ImageIcon, MessageSquareText, PlayCircle, Wand2 } from 'lucide-react'
import { SectionCard, SoftButton } from '../components/ui'
import { getCardImageUrl } from '../utils/ohCardUtils'

export function ChatPage({ setActivePage, onOpenOh, onOpenRisk, messages, setMessages }) {
  const [input, setInput] = useState('')

  const sendMessage = () => {
    if (!input.trim()) return
    const nextMessages = [...messages, { role: 'user', text: input.trim() }]
    let reply = '谢谢你把这句话放到这里。我们先不急着判断对错，只试着看看，这种感觉最常在什么情境里冒出来。'

    if (input.includes('撑不住') || input.includes('消失') || input.includes('不想活')) {
      reply = '我看到你现在承受得很重。先别独自扛着，我们先把安全放在前面。我已经为你准备了一份支持提醒和资源入口。'
      onOpenRisk()
    }

    setMessages([...nextMessages, { role: 'ai', text: reply }])
    setInput('')
  }

  return (
    <div className="grid h-[calc(100vh-12.5rem)] gap-5 xl:grid-cols-[290px_minmax(0,1fr)]">
      <SectionCard title="历史会话" subtitle="最近 7 天" className="overflow-hidden">
        <div className="space-y-2">
          {[['今晚有点绷着', '刚刚'], ['为什么总觉得自己做不好', '昨天'], ['睡前停不下来的脑子', '4 月 15 日'], ['想被理解，但又不想打扰别人', '4 月 12 日']].map(([title, time], index) => (
            <button key={title} className={`w-full rounded-[20px] p-4 text-left ${index === 0 ? 'bg-emerald-50' : 'bg-slate-50 hover:bg-slate-100'}`}><div className="text-sm font-medium text-slate-700">{title}</div><div className="mt-1 text-xs text-slate-400">{time}</div></button>
          ))}
        </div>
      </SectionCard>

      <div className="grid min-h-0 grid-rows-[auto_minmax(0,1fr)_auto] gap-5">
        <div className="grid gap-5 lg:grid-cols-[1fr_auto]">
          <SectionCard title="心语对话" subtitle="你愿意慢慢说，我会在这里陪你梳理。"><div className="flex flex-wrap gap-2">{['我有点累', '我想躲起来', '我在担心未来', '今天想被安静陪着'].map((text) => <button key={text} onClick={() => setInput(text)} className="rounded-full bg-slate-50 px-4 py-2 text-sm text-slate-600 transition hover:bg-slate-100">{text}</button>)}</div></SectionCard>
          <div className="grid gap-3"><SoftButton onClick={onOpenOh} className="bg-amber-50 text-slate-700" icon={Wand2}>OH 卡表达</SoftButton><SoftButton onClick={() => setActivePage('imageExpress')} className="bg-sky-50 text-slate-700" icon={ImageIcon}>图片 / 绘画表达</SoftButton></div>
        </div>

        <SectionCard className="min-h-0 overflow-hidden p-0">
          <div className="flex h-full flex-col">
            <div className="border-b border-slate-100 px-5 py-4 text-sm text-slate-400">今天 20:46 · 对话正在进行中</div>
            <div className="min-h-0 flex-1 space-y-4 overflow-auto px-5 py-5">
              {messages.map((message, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {message.type === 'oh_card' ? (
                    <div className="max-w-[80%] rounded-[24px] bg-emerald-50 p-4 text-slate-700">
                      <div className="grid gap-3 md:grid-cols-[130px_1fr] md:items-start">
                        <img src={getCardImageUrl(message.card.image)} alt={message.card.title} className="aspect-[5/7] w-full rounded-[18px] object-cover" />
                        <div>
                          <div className="text-sm font-medium">{message.card.title} · {message.direction}</div>
                          <div className="mt-2 text-sm leading-7">{message.association}</div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className={`max-w-[78%] rounded-[24px] px-4 py-3 text-sm leading-7 ${message.role === 'user' ? 'bg-emerald-100 text-slate-700' : 'bg-slate-50 text-slate-600'}`}>{message.text}</div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </SectionCard>

        <SectionCard className="py-4"><div className="flex flex-wrap gap-3"><div className="flex min-w-[260px] flex-1 items-center gap-3 rounded-[24px] bg-slate-50 px-4 py-3"><MessageSquareText size={18} className="text-slate-400" /><input value={input} onChange={(event) => setInput(event.target.value)} placeholder="你可以说一句感受，或描述刚刚发生了什么……" className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400" /></div><SoftButton className="bg-slate-50 text-slate-700" icon={Camera}>上传图片</SoftButton><SoftButton onClick={sendMessage} className="bg-emerald-200 text-emerald-900" icon={ArrowRight}>发送</SoftButton></div></SectionCard>
      </div>
    </div>
  )
}

export function ImageExpressionPage({ setActivePage }) {
  return (
    <div className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
      <SectionCard title="图片 / 绘画表达" subtitle="有些情绪暂时说不清，也可以先用画面来靠近。"><div className="rounded-[28px] border-2 border-dashed border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-sky-50 p-8 text-center"><div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-white text-3xl shadow-sm">🎨</div><div className="mt-4 text-lg font-medium text-slate-700">拖拽或上传一张图片</div><div className="mt-2 text-sm leading-7 text-slate-500">可以是随手画、拍下的角落，或一张让你有感觉的图。系统会从情绪氛围、画面主题与表达线索给出温和反馈。</div><div className="mt-5 flex justify-center gap-3"><SoftButton className="bg-white" icon={ImageIcon}>上传图片</SoftButton><SoftButton className="bg-sky-50" icon={PlayCircle}>查看示例</SoftButton></div></div></SectionCard>
      <div className="space-y-5"><SectionCard title="示例反馈"><div className="grid gap-4 lg:grid-cols-[220px_1fr]"><div className="rounded-[24px] bg-gradient-to-br from-sky-100 via-white to-emerald-50 p-4"><div className="flex h-full min-h-[220px] items-center justify-center rounded-[20px] border border-white/80 bg-white/60 text-6xl">🌫️</div></div><div className="space-y-3"><div className="rounded-[22px] bg-slate-50 p-4"><div className="text-sm font-medium text-slate-700">情绪氛围</div><div className="mt-2 text-sm leading-7 text-slate-600">这张画面给人一种安静但略带压抑的感觉，像是在用很轻的方式表达“我有点累了，但还在撑着”。</div></div><div className="rounded-[22px] bg-slate-50 p-4"><div className="text-sm font-medium text-slate-700">表达线索</div><div className="mt-2 text-sm leading-7 text-slate-600">色彩偏淡、留白较多，可能意味着你希望情绪不要被打扰，也在给自己留一点安全距离。</div></div><div className="rounded-[22px] bg-slate-50 p-4"><div className="text-sm font-medium text-slate-700">继续聊聊</div><div className="mt-2 text-sm leading-7 text-slate-600">如果你愿意，我们可以从“画面里最想停留的那个位置”开始聊。</div></div></div></div></SectionCard><div className="flex justify-end gap-3"><SoftButton onClick={() => setActivePage('chat')}>返回聊天</SoftButton><SoftButton onClick={() => setActivePage('chat')} className="bg-emerald-200 text-emerald-900" icon={ArrowRight}>带着这张图继续对话</SoftButton></div></div>
    </div>
  )
}
