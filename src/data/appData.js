export const navItems = [
  { key: 'dashboard', label: '首页' },
  { key: 'chat', label: '心语对话' },
  { key: 'record', label: '情绪记录' },
  { key: 'assessment', label: '心理测评' },
  { key: 'report', label: '报告中心' },
  { key: 'space', label: '我的空间' },
]

export const moodOptions = [
  { label: '平静', color: 'bg-emerald-100', icon: '🌿' },
  { label: '疲惫', color: 'bg-amber-100', icon: '🌙' },
  { label: '委屈', color: 'bg-rose-100', icon: '🫧' },
  { label: '焦虑', color: 'bg-violet-100', icon: '☁️' },
  { label: '有力量', color: 'bg-sky-100', icon: '✨' },
]

export const assessmentQuestions = [
  '过去两周里，你是否常常觉得心里很累，很难真正放松下来？',
  '即使没有明确原因，你也会反复担心一些事情吗？',
  '最近你是否感觉对原本习惯的事情提不起兴趣？',
  '遇到压力时，你是否更容易责怪自己或否定自己？',
  '最近是否出现睡不好、醒得早，或很难进入稳定休息状态的情况？',
  '当情绪低落时，你是否愿意向身边人表达或求助？',
]

export const reportHistory = [
  { date: '04-16', title: '状态参考报告', tag: '轻度波动', color: 'bg-amber-100 text-amber-700' },
  { date: '04-09', title: '阶段情绪评估', tag: '较稳定', color: 'bg-emerald-100 text-emerald-700' },
  { date: '03-28', title: '睡眠与压力检查', tag: '需关注', color: 'bg-rose-100 text-rose-700' },
]

export const ohCards = [
  { id: 1, title: 'OH 卡 1', image: 'oh-cards/1.jpeg', category: '金钱与财富类问题', accent: 'from-emerald-100 to-white' },
  { id: 2, title: 'OH 卡 2', image: 'oh-cards/2.jpeg', category: '潜意识探索类问题', accent: 'from-sky-100 to-white' },
  { id: 3, title: 'OH 卡 3', image: 'oh-cards/3.jpeg', category: '情绪与压力管理类问题', accent: 'from-violet-100 to-white' },
  { id: 4, title: 'OH 卡 4', image: 'oh-cards/4.jpeg', category: '家庭与亲子关系类问题', accent: 'from-rose-100 to-white' },
  { id: 5, title: 'OH 卡 5', image: 'oh-cards/5.jpeg', category: '关系探索类问题', accent: 'from-lime-100 to-white' },
  { id: 6, title: 'OH 卡 6', image: 'oh-cards/6.jpeg', category: '目标与未来规划类问题', accent: 'from-orange-100 to-white' },
  { id: 7, title: 'OH 卡 7', image: 'oh-cards/7.jpeg', category: '职业与事业发展类问题', accent: 'from-amber-100 to-white' },
  { id: 8, title: 'OH 卡 8', image: 'oh-cards/8.jpeg', category: '生活与日常反思类问题', accent: 'from-cyan-100 to-white' },
  { id: 9, title: 'OH 卡 9', image: 'oh-cards/9.jpeg', category: '健康与生活方式类问题', accent: 'from-teal-100 to-white' },
  { id: 10, title: 'OH 卡 10', image: 'oh-cards/10.jpeg', category: '文化与价值观类问题', accent: 'from-blue-100 to-white' },
]

export const initialChatMessages = [
  { role: 'ai', text: '晚上好。你可以不着急把事情说完整。先从今天最明显的一种感受开始，也可以只说一句。' },
  { role: 'user', text: '今天没有发生什么特别的事，但我一直觉得心里绷着，很难松下来。' },
  { role: 'ai', text: '听起来像是身体和心都在悄悄用力，即使外面看起来没什么波澜。你更接近“累”“紧”“担心”，还是别的词？' },
]
