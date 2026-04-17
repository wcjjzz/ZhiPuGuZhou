import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, BellRing, MessageCircleHeart, Phone, ShieldCheck, Sparkles, Wand2 } from 'lucide-react'
import { SoftButton, Tag } from './ui'
import { ohCards } from '../data/appData'
import { ohQuestionBank } from '../data/ohQuestionBank'
import { getCardImageUrl, samplePromptSet } from '../utils/ohCardUtils'

export function OhCardModal({ open, onClose, onConfirm }) {
  const [flipped, setFlipped] = useState(false)
  const [picked, setPicked] = useState(ohCards[0])
  const [selectedDirection, setSelectedDirection] = useState(ohCards[0].category)
  const [displayQuestions, setDisplayQuestions] = useState(samplePromptSet(ohCards[0].category, 2))
  const [association, setAssociation] = useState('这张画面让我先想到的是……')
  const questionDirections = Object.keys(ohQuestionBank)

  const updatePickedCard = (card) => {
    setPicked(card)
    setSelectedDirection(card.category)
    setDisplayQuestions(samplePromptSet(card.category, 2))
    setFlipped(true)
  }

  const drawRandomCard = () => {
    const nextCard = ohCards[Math.floor(Math.random() * ohCards.length)]
    updatePickedCard(nextCard)
  }

  const changeDirection = (direction) => {
    setSelectedDirection(direction)
    setDisplayQuestions(samplePromptSet(direction, 2))
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/18 p-6 backdrop-blur-sm">
      <motion.div initial={{ opacity: 0, scale: 0.96, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="w-full max-w-6xl rounded-[34px] border border-white/80 bg-white/95 p-6 shadow-[0_40px_100px_rgba(94,124,116,0.22)]">
        <div className="flex items-center justify-between"><div><div className="text-2xl font-semibold text-slate-700">OH 卡表达</div><div className="mt-1 text-sm text-slate-500">现在展示真实图片卡，不再使用杜撰的文字卡。你可以抽取图片卡，再沿着对应提问方向继续表达。</div></div><button onClick={onClose} className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">关闭</button></div>
        <div className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-4"><div className="rounded-[28px] bg-gradient-to-br from-amber-50 via-white to-rose-50 p-5"><div className="text-sm text-slate-400">抽卡前引导</div><div className="mt-3 text-sm leading-8 text-slate-600">请先想一想：此刻你最想被理解的，是哪一种还没完全说清的感觉。然后慢慢抽一张卡，先看画面带来的第一反应。</div><div className="mt-4 flex flex-wrap gap-3"><SoftButton onClick={drawRandomCard} className="bg-amber-100 text-slate-700" icon={Wand2}>随机抽一张</SoftButton><Tag className="bg-white text-slate-500">当前共 10 张图片卡</Tag></div></div><div className="grid grid-cols-5 gap-3">{ohCards.map((card) => <button key={card.id} onClick={() => updatePickedCard(card)} className={`rounded-[22px] p-2 text-left transition hover:-translate-y-0.5 ${picked.id === card.id ? 'bg-emerald-50 ring-2 ring-emerald-100' : 'bg-slate-50'}`}><div className="overflow-hidden rounded-[18px] bg-white"><img src={getCardImageUrl(card.image)} alt={card.title} className="aspect-[5/7] w-full object-cover" /></div><div className="mt-2 px-1 text-xs text-slate-500">OH 卡 {card.id}</div></button>)}</div></div>
          <div className="grid gap-4 lg:grid-rows-[1fr_auto]">
            <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
              <motion.div animate={{ rotateY: flipped ? 180 : 0 }} transition={{ duration: 0.6 }} className="min-h-[420px] rounded-[30px] [transform-style:preserve-3d]"><div className="relative h-full w-full"><div className={`absolute inset-0 rounded-[30px] bg-gradient-to-br ${picked.accent} p-6 ${flipped ? 'opacity-0' : 'opacity-100'}`} style={{ backfaceVisibility: 'hidden' }}><div className="flex h-full items-center justify-center rounded-[24px] border border-white/70 bg-white/45 text-center"><div><div className="text-7xl">🃏</div><div className="mt-4 text-base font-medium text-slate-600">点击“随机抽一张”或下方缩略图</div></div></div></div><div className={`absolute inset-0 rounded-[30px] bg-white p-4 ${flipped ? 'opacity-100' : 'opacity-0'}`} style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}><div className="relative h-full overflow-hidden rounded-[24px] bg-slate-50"><img src={getCardImageUrl(picked.image)} alt={picked.title} className="h-full w-full object-cover" /><div className="absolute left-4 top-4 rounded-full bg-white/88 px-3 py-1 text-xs text-slate-600 shadow-sm">OH 卡 {picked.id}</div></div></div></div></motion.div>
              <div className="rounded-[30px] bg-slate-50 p-5"><div className="flex items-center justify-between gap-3"><div><div className="text-sm text-slate-400">对应问题</div><div className="mt-2 text-xl font-semibold text-slate-700">从图片进入表达</div></div><SoftButton onClick={() => setDisplayQuestions(samplePromptSet(selectedDirection, 2))} className="bg-white text-slate-700">换一组问题</SoftButton></div><div className="mt-4 flex max-h-[140px] flex-wrap gap-2 overflow-auto pr-1">{questionDirections.map((direction) => <button key={direction} onClick={() => changeDirection(direction)} className={`rounded-full px-3 py-1.5 text-xs transition ${selectedDirection === direction ? 'bg-emerald-100 text-emerald-900' : 'bg-white text-slate-500 hover:bg-slate-100'}`}>{direction}</button>)}</div><div className="mt-5 rounded-[22px] bg-white p-4"><div className="text-sm font-medium text-slate-700">{selectedDirection}</div><div className="mt-3 space-y-3">{displayQuestions.map((question, index) => <div key={question} className="rounded-[18px] bg-slate-50 p-4 text-sm leading-7 text-slate-600"><span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-xs font-medium text-emerald-800">{index + 1}</span>{question}</div>)}</div></div><div className="mt-4 rounded-[22px] bg-white p-4 text-sm leading-7 text-slate-500">提示：先说第一直觉，不必急着解释“为什么会想到这个”。图片带来的联想，本身就很重要。</div></div>
            </div>
            <div className="rounded-[28px] bg-slate-50 p-5"><div className="text-sm font-medium text-slate-700">这张卡让我想到……</div><textarea value={association} onChange={(event) => setAssociation(event.target.value)} className="mt-3 min-h-[120px] w-full rounded-[22px] border-0 bg-white p-4 text-sm leading-7 text-slate-600 outline-none" /><div className="mt-4 flex justify-end gap-3"><SoftButton onClick={onClose}>稍后再说</SoftButton><SoftButton onClick={() => onConfirm(picked, association, selectedDirection, displayQuestions)} className="bg-emerald-200 text-emerald-900" icon={ArrowRight}>带着这个想法继续聊聊</SoftButton></div></div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export function RiskModal({ open, onClose, setActivePage }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/18 p-6 backdrop-blur-sm"><motion.div initial={{ opacity: 0, scale: 0.96, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="w-full max-w-3xl rounded-[34px] border border-white/80 bg-white/96 p-6 shadow-[0_40px_100px_rgba(99,120,116,0.22)]"><div className="flex items-start justify-between gap-4"><div className="flex gap-4"><div className="flex h-14 w-14 items-center justify-center rounded-[22px] bg-amber-100 text-amber-700"><ShieldCheck /></div><div><div className="text-2xl font-semibold text-slate-700">支持提醒</div><div className="mt-2 max-w-2xl text-sm leading-8 text-slate-600">我们注意到你最近可能承受了较高压力，或表达了较强的痛苦感受。先别独自扛着。你可以先看看支持建议，也可以联系专业资源或继续和 AI 对话。</div></div></div><button onClick={onClose} className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">关闭</button></div><div className="mt-6 grid gap-4 md:grid-cols-2"><div className="rounded-[24px] bg-amber-50 p-5"><div className="text-sm font-medium text-slate-700">查看支持建议</div><div className="mt-2 text-sm leading-7 text-slate-600">先做 3 次缓慢呼气，离开让你更紧绷的环境，把此刻最重要的一件事缩小到“先保证安全”。</div></div><div className="rounded-[24px] bg-sky-50 p-5"><div className="text-sm font-medium text-slate-700">联系专业资源</div><div className="mt-2 text-sm leading-7 text-slate-600">可以联系心理咨询师、校内支持中心、医院心理科，或当地紧急援助热线。</div></div></div><div className="mt-6 flex flex-wrap justify-end gap-3"><SoftButton onClick={() => { setActivePage('advice'); onClose() }} icon={Sparkles}>查看支持建议</SoftButton><SoftButton onClick={() => { setActivePage('report'); onClose() }} icon={BellRing}>设置提醒继续关注</SoftButton><SoftButton onClick={() => { setActivePage('chat'); onClose() }} icon={MessageCircleHeart}>继续与 AI 对话</SoftButton><SoftButton onClick={() => { setActivePage('privacy'); onClose() }} className="bg-amber-100 text-amber-800" icon={Phone}>查看专业资源</SoftButton></div></motion.div></div>
  )
}
