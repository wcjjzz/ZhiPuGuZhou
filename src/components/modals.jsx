import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, BellRing, MessageCircleHeart, Phone, ShieldCheck, Sparkles, Wand2 } from 'lucide-react'
import { SoftButton, Tag } from './ui'
import { ohCards } from '../data/appData'
import { ohQuestionBank } from '../data/ohQuestionBank'
import { discoverOhCards, getCardImageUrl, samplePromptSet } from '../utils/ohCardUtils'

export function OhCardModal({ open, onClose, onConfirm }) {
  const questionDirections = Object.keys(ohQuestionBank)
  const defaultDirection = questionDirections[0] || '自我探索类问题'

  const [cards, setCards] = useState([])
  const [isLoadingCards, setIsLoadingCards] = useState(false)
  const [picked, setPicked] = useState(null)
  const [selectedDirection, setSelectedDirection] = useState(defaultDirection)
  const [displayQuestions, setDisplayQuestions] = useState(samplePromptSet(defaultDirection, 2))
  const [association, setAssociation] = useState('这张画面让我先想到的是……')

  useEffect(() => {
    let cancelled = false

    if (!open) return undefined

    setIsLoadingCards(true)

    discoverOhCards().then((loadedCards) => {
      if (cancelled) return

      setCards(loadedCards)
      setIsLoadingCards(false)

      if (loadedCards.length > 0) {
        const firstCard = loadedCards[0]
        setPicked(firstCard)
        setSelectedDirection(firstCard.category)
        setDisplayQuestions(samplePromptSet(firstCard.category, 2))
      } else {
        setPicked(null)
        setSelectedDirection(defaultDirection)
        setDisplayQuestions(samplePromptSet(defaultDirection, 2))
      }
    })

    return () => {
      cancelled = true
    }
  }, [open, defaultDirection])

  const updatePickedCard = (card) => {
    setPicked(card)
    setSelectedDirection(card.category)
    setDisplayQuestions(samplePromptSet(card.category, 2))
  }

  const drawRandomCard = () => {
    if (cards.length === 0) return

    const nextCard = cards[Math.floor(Math.random() * cards.length)]
    updatePickedCard(nextCard)
  }

  const changeDirection = (direction) => {
    setSelectedDirection(direction)
    setDisplayQuestions(samplePromptSet(direction, 2))
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/18 p-4 backdrop-blur-sm lg:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="flex max-h-[92vh] w-full max-w-[1400px] flex-col overflow-hidden rounded-[34px] border border-white/80 bg-white/95 p-5 shadow-[0_40px_100px_rgba(94,124,116,0.22)] lg:p-6"
      >
        <div className="flex shrink-0 items-start justify-between gap-4">
          <div>
            <div className="text-2xl font-semibold text-slate-700">OH 卡表达</div>
            <div className="mt-1 text-sm text-slate-500">
              抽一张图片卡，从第一直觉开始说起；你也可以切换提问方向，看看哪一组问题更贴近此刻的你。
            </div>
          </div>
          <button onClick={onClose} className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">
            关闭
          </button>
        </div>

        <div className="mt-5 flex min-h-0 flex-1 flex-col gap-5">
          {/* 上半区：三块并列，可滚动 */}
          <div className="min-h-0 flex-1 overflow-y-auto pr-1">
            <div className="grid items-start gap-5 xl:grid-cols-[1.12fr_0.92fr_1.08fr]">
              {/* 左：抽卡前引导 + 可滚动小图列表 */}
              <div className="rounded-[28px] bg-gradient-to-br from-amber-50 via-white to-rose-50 p-5">
                <div className="text-sm text-slate-400">抽卡前引导</div>
                <div className="mt-3 text-sm leading-8 text-slate-600">
                  请先想一想：此刻你最想被理解的，是哪一种还没完全说清的感觉。然后慢慢抽一张卡，先停留在画面带来的第一反应。
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <SoftButton onClick={drawRandomCard} className="bg-amber-100 text-slate-700" icon={Wand2}>
                    随机抽一张
                  </SoftButton>
                  <Tag className="bg-white text-slate-500">
                    {isLoadingCards ? '正在读取图片卡…' : `当前共 ${cards.length} 张图片卡`}
                  </Tag>
                </div>

                <div className="mt-5 rounded-[24px] bg-white/70 p-3">
                  <div className="mb-3 text-sm text-slate-400">图片卡列表</div>

                  <div className="max-h-[420px] overflow-y-auto pr-1">
                    {cards.length > 0 ? (
                      <div className="grid grid-cols-4 gap-3 2xl:grid-cols-5">
                        {cards.map((card) => (
                          <button
                            key={card.id}
                            onClick={() => updatePickedCard(card)}
                            className={`rounded-[22px] p-2 text-left transition hover:-translate-y-0.5 ${
                              picked?.id === card.id ? 'bg-emerald-50 ring-2 ring-emerald-100' : 'bg-white'
                            }`}
                          >
                            <div className="overflow-hidden rounded-[18px] bg-white">
                              <img
                                src={getCardImageUrl(card.image)}
                                alt={card.title}
                                loading="lazy"
                                decoding="async"
                                className="aspect-[5/7] w-full object-cover"
                              />
                            </div>
                            <div className="mt-2 px-1 text-xs text-slate-500">OH 卡 {card.id}</div>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="rounded-[20px] bg-white p-4 text-sm leading-7 text-slate-500">
                        暂未读取到图片卡。请确认图片已放在
                        <code className="mx-1 rounded bg-slate-100 px-1.5 py-0.5">public/oh-cards/</code>
                        中，并按数字编号命名，例如
                        <code className="mx-1 rounded bg-slate-100 px-1.5 py-0.5">1.jpeg</code>
                        、
                        <code className="mx-1 rounded bg-slate-100 px-1.5 py-0.5">2.jpeg</code>
                        、
                        <code className="mx-1 rounded bg-slate-100 px-1.5 py-0.5">11.png</code>
                        。
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* 中：当前图片卡 */}
              <div className={`rounded-[28px] bg-gradient-to-br ${picked ? picked.accent : 'from-emerald-50 to-white'} p-5`}>
                <div className="text-sm text-slate-500">当前图片卡</div>
                <div className="mt-4 flex justify-center">
                  <div className="relative w-full max-w-[320px] overflow-hidden rounded-[24px] bg-white shadow-sm">
                    {picked ? (
                      <>
                        <img
                          src={getCardImageUrl(picked.image)}
                          alt={picked.title}
                          loading="lazy"
                          decoding="async"
                          className="aspect-[5/7] w-full object-cover"
                        />
                        <div className="absolute left-4 top-4 rounded-full bg-white/88 px-3 py-1 text-xs text-slate-600 shadow-sm">
                          OH 卡 {picked.id}
                        </div>
                      </>
                    ) : (
                      <div className="flex aspect-[5/7] items-center justify-center text-sm text-slate-400">
                        等待加载图片卡
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* 右：对应问题 */}
              <div className="rounded-[28px] bg-slate-50 p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="text-sm text-slate-400">对应问题</div>
                    <div className="mt-2 text-xl font-semibold text-slate-700">从图片进入表达</div>
                  </div>

                  <SoftButton
                    onClick={() => setDisplayQuestions(samplePromptSet(selectedDirection, 2))}
                    className="bg-white text-slate-700"
                  >
                    换一组问题
                  </SoftButton>
                </div>

                <div className="mt-4 max-h-[170px] overflow-y-auto pr-1">
                  <div className="flex flex-wrap gap-2">
                    {questionDirections.map((direction) => (
                      <button
                        key={direction}
                        onClick={() => changeDirection(direction)}
                        className={`rounded-full px-3 py-1.5 text-xs transition ${
                          selectedDirection === direction
                            ? 'bg-emerald-100 text-emerald-900'
                            : 'bg-white text-slate-500 hover:bg-slate-100'
                        }`}
                      >
                        {direction}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-5 rounded-[22px] bg-white p-4">
                  <div className="text-sm font-medium text-slate-700">{selectedDirection}</div>
                  <div className="mt-3 space-y-3">
                    {displayQuestions.map((question, index) => (
                      <div key={question} className="rounded-[18px] bg-slate-50 p-4 text-sm leading-7 text-slate-600">
                        <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-xs font-medium text-emerald-800">
                          {index + 1}
                        </span>
                        {question}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 rounded-[22px] bg-white p-4 text-sm leading-7 text-slate-500">
                  提示：先说第一直觉，不必急着解释“为什么会想到这个”。图片带来的联想，本身就很重要。
                </div>
              </div>
            </div>
          </div>

          {/* 下半区：始终固定可见 */}
          <div className="shrink-0 rounded-[28px] bg-slate-50 p-5">
            <div className="text-sm font-medium text-slate-700">这张卡让我想到……</div>
            <textarea
              value={association}
              onChange={(event) => setAssociation(event.target.value)}
              className="mt-3 min-h-[110px] w-full rounded-[22px] border-0 bg-white p-4 text-sm leading-7 text-slate-600 outline-none"
            />

            <div className="mt-4 flex justify-end gap-3">
              <SoftButton onClick={onClose}>稍后再说</SoftButton>
              <SoftButton
                onClick={() => onConfirm(picked, association, selectedDirection, displayQuestions)}
                className="bg-emerald-200 text-emerald-900"
                icon={ArrowRight}
              >
                带着这个想法继续聊聊
              </SoftButton>
            </div>
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
