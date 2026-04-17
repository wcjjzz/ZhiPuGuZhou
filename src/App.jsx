import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SideNav, TopBar } from './components/layout'
import { OhCardModal, RiskModal } from './components/modals'
import { initialChatMessages } from './data/appData'
import { WelcomeScreen, OnboardingScreen } from './pages/startup'
import DashboardPage from './pages/dashboard'
import { ChatPage, ImageExpressionPage } from './pages/chat'
import { RecordHomePage, CbtPage, CheckInPage, TrendPage, AdvicePage } from './pages/record'
import { AssessmentCenterPage, QuizPage, ResultPage, ReportPage } from './pages/assessment'
import { SpacePage, PrivacyPage } from './pages/space'

export default function App() {
  const [stage, setStage] = useState('welcome')
  const [activePage, setActivePage] = useState('dashboard')
  const [showOh, setShowOh] = useState(false)
  const [showRisk, setShowRisk] = useState(false)
  const [quizIndex, setQuizIndex] = useState(0)
  const [answers, setAnswers] = useState(Array(6).fill(null))
  const [range, setRange] = useState('7')
  const [chatMessages, setChatMessages] = useState(initialChatMessages)

  const pageContent = useMemo(() => {
    switch (activePage) {
      case 'dashboard':
        return <DashboardPage setActivePage={setActivePage} />
      case 'chat':
        return <ChatPage setActivePage={setActivePage} onOpenOh={() => setShowOh(true)} onOpenRisk={() => setShowRisk(true)} messages={chatMessages} setMessages={setChatMessages} />
      case 'imageExpress':
        return <ImageExpressionPage setActivePage={setActivePage} />
      case 'record':
        return <RecordHomePage setActivePage={setActivePage} />
      case 'cbt':
        return <CbtPage setActivePage={setActivePage} />
      case 'checkin':
        return <CheckInPage />
      case 'trend':
        return <TrendPage setActivePage={setActivePage} range={range} setRange={setRange} />
      case 'advice':
        return <AdvicePage />
      case 'assessment':
        return <AssessmentCenterPage setActivePage={setActivePage} />
      case 'quiz':
        return <QuizPage setActivePage={setActivePage} quizIndex={quizIndex} setQuizIndex={setQuizIndex} answers={answers} setAnswers={setAnswers} />
      case 'result':
        return <ResultPage setActivePage={setActivePage} onOpenRisk={() => setShowRisk(true)} />
      case 'report':
        return <ReportPage setActivePage={setActivePage} onOpenRisk={() => setShowRisk(true)} />
      case 'space':
        return <SpacePage setActivePage={setActivePage} />
      case 'privacy':
        return <PrivacyPage />
      default:
        return <DashboardPage setActivePage={setActivePage} />
    }
  }, [activePage, quizIndex, answers, range, chatMessages])

  // 将 OH 卡联动注入聊天流，方便演示真实流程
  const handleOhConfirm = (card, association, direction, questions) => {
    setChatMessages((previous) => [
      ...previous,
      { role: 'user', type: 'oh_card', card, association, direction },
      { role: 'ai', text: `你从这张图片里联想到：“${association}”。如果你愿意，我们可以先从“${questions[0] || '这张卡最先触动你的部分'}”继续聊。` },
    ])
    setShowOh(false)
    setActivePage('chat')
  }

  if (stage === 'welcome') {
    return <WelcomeScreen onEnter={() => setStage('app')} onGuest={() => setStage('app')} onGuide={() => setStage('guide')} />
  }

  if (stage === 'guide') {
    return <OnboardingScreen onFinish={() => setStage('app')} />
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#edf8f4,transparent_28%),radial-gradient(circle_at_top_right,#fff8ea,transparent_25%),linear-gradient(180deg,#f7fbfa,#f4faf7)] p-5 text-slate-700 lg:p-6">
      <div className="mx-auto grid max-w-[1680px] gap-5 xl:grid-cols-[270px_minmax(0,1fr)]">
        <SideNav activePage={activePage} setActivePage={setActivePage} />
        <div className="space-y-5">
          <TopBar onTriggerRisk={() => setShowRisk(true)} activePage={activePage} setActivePage={setActivePage} />
          <AnimatePresence mode="wait">
            <motion.div key={activePage} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.22 }}>
              {pageContent}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <OhCardModal open={showOh} onClose={() => setShowOh(false)} onConfirm={handleOhConfirm} />
      <RiskModal open={showRisk} onClose={() => setShowRisk(false)} setActivePage={setActivePage} />
    </div>
  )
}
