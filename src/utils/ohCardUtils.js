import { ohCards } from '../data/appData'
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
  if (!relativePath) return ''

  // 已经是完整地址或 base64 时，直接返回
  if (
    relativePath.startsWith('http://') ||
    relativePath.startsWith('https://') ||
    relativePath.startsWith('data:')
  ) {
    return relativePath
  }

  return `${import.meta.env.BASE_URL}${relativePath}`
}

// 检查某张图片是否真实存在
function canLoadImage(src) {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve(true)
    img.onerror = () => resolve(false)
    img.src = src
  })
}

// 自动扫描 public/oh-cards 下的图片
// 支持 1.jpeg / 2.jpg / 3.png / 4.webp 这类命名
export async function discoverOhCards(maxCount = 80, maxConsecutiveMisses = 5) {
  const extensions = ['jpeg', 'jpg', 'png', 'webp']
  const foundCards = []
  let consecutiveMisses = 0

  for (let id = 1; id <= maxCount; id += 1) {
    let foundForThisId = null

    for (const ext of extensions) {
      const relativePath = `oh-cards/${id}.${ext}`
      const fullPath = getCardImageUrl(relativePath)
      const exists = await canLoadImage(fullPath)

      if (exists) {
        foundForThisId = { id, image: relativePath }
        break
      }
    }

    if (foundForThisId) {
      foundCards.push(foundForThisId)
      consecutiveMisses = 0
    } else {
      consecutiveMisses += 1

      // 连续若干个编号都不存在，就提前停止扫描
      if (consecutiveMisses >= maxConsecutiveMisses) {
        break
      }
    }
  }

  // 如果没有扫描到，就回退到 appData.js 中的默认 10 张
  if (foundCards.length === 0) {
    return ohCards
  }

  // 复用 appData.js 里已有的分类与配色，超过 10 张时循环使用
  return foundCards.map((item, index) => {
    const template = ohCards[index % ohCards.length]

    return {
      ...template,
      id: item.id,
      title: `OH 卡 ${item.id}`,
      image: item.image,
    }
  })
}