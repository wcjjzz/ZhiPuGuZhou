import { ohQuestionBank } from '../data/ohQuestionBank'

// 随机抽取一组问题，避免每次都完全一样
export function samplePromptSet(direction, count = 2) {
  const pool = ohQuestionBank[direction] || []
  const shuffled = [...pool]

  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }

  return shuffled.slice(0, Math.min(count, shuffled.length))
}

// 兼容 GitHub Pages base 路径
export function getCardImageUrl(relativePath) {
  return `${import.meta.env.BASE_URL}${relativePath}`
}
