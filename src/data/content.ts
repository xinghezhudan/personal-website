import type { LocalizedText, PortfolioProject } from '../types'

export const profile = {
  name: 'Leo',
  role: { zh: '视觉设计师 / 平面设计师 / AI 设计师', en: 'Visual / Graphic / AI Designer' } satisfies LocalizedText,
  shortBio: {
    zh: '用视觉策略、文化叙事与 AI 工具，把想象变成有温度的设计体验。',
    en: 'I turn visual strategy, cultural stories, and AI tools into design experiences with character.',
  } satisfies LocalizedText,
  bio: {
    zh: '我是一名家具与室内设计方向的本科生，也是一名关注表达与创造的设计者。我的实践涵盖品牌视觉、平面传播、产品包装、文创产品与空间概念设计，习惯在文化语境、商业目标与用户体验之间寻找平衡。\n\n在设计之外，我也在尝试将 AI 工具融入创作流程，例如使用 Codex 搭建个人网站、整理作品集内容，并辅助进行视觉方向探索。我希望以更清晰、更有趣的方式，让每一次设计表达都成为具有识别度的作品。',
    en: 'I’m Leo, an undergraduate student majoring in Furniture and Interior Design. My practice covers brand visuals, graphic communication, product packaging, cultural creative products, and spatial concept design.\n\nBeyond traditional design work, I’m also exploring how AI tools can support the creative process, such as using Codex to build my personal website, organize portfolio content, and develop visual directions. I aim to create work that is clear, expressive, and distinctive.',
  } satisfies LocalizedText,
  education: {
    zh: '西北农林科技大学 · 家具与室内设计 · 工学学士 · 2023 — 至今',
    en: 'Northwest A&F University · Furniture & Interior Design · B.Eng. · 2023 — Present',
  } satisfies LocalizedText,
  skills: ['Photoshop', 'Illustrator', '3ds Max', 'AutoCAD', 'UG NX', 'AI Image & Video'],
}

export const contactLinks = {
  primaryEmail: '2120869523@qq.com',
  secondaryEmail: 'xinghezhudan@gmail.com',
  linkedin: 'https://www.linkedin.com/in/xinghezhudan',
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 'dance', number: '01',
    title: { zh: '舞蹈工作室视觉传播', en: 'Dance Studio Visual Communication' },
    category: { zh: '平面设计', en: 'Graphic Design' },
    description: { zh: '为舞蹈工作室打造面向社交媒体与宣传场景的视觉物料，让节奏、能量与品牌记忆一起发生。', en: 'A lively visual system for a dance studio across social and promotional touchpoints.' },
    tags: ['Visual identity', 'Social media'], image: '/images/portfolio/graphic-anniversary-main.webp', imagePosition: 'center', tint: '#c6ff3d',
  },
  {
    id: 'eco-link', number: '02',
    title: { zh: 'Eco-Link 校园公交站', en: 'Eco-Link Campus Bus Station' },
    category: { zh: '空间设计', en: 'Architectural Design' },
    description: { zh: '以小麦、DNA 与银杏文化为线索，将通勤节点转化为兼具公共服务、展览和生态意识的微型地标。', en: 'A transit node that brings ecological culture, service, and exhibition into one campus landmark.' },
    tags: ['Spatial concept', '3D rendering'], image: '/images/portfolio/spatial-day.webp', imagePosition: 'center', tint: '#9ce7d5',
  },
  {
    id: 'camel', number: '03',
    title: { zh: '唐三彩骆驼毛绒系列', en: 'Tang Sancai Camel Plush' },
    category: { zh: '文创产品', en: 'Cultural Product' },
    description: { zh: '从唐代三彩载乐骆驼汲取灵感，将文化遗产转译为陪伴感与实用性并存的当代软萌产品。', en: 'A contemporary plush collectible that translates Tang heritage into comfort, companionship, and play.' },
    tags: ['Product concept', 'Cultural design'], image: '/images/portfolio/product-camel.webp', imagePosition: 'center', tint: '#ffba72',
  },
  {
    id: 'tea', number: '04',
    title: { zh: '草本养生茶包装系统', en: 'Herbal Wellness Tea Packaging' },
    category: { zh: '包装设计', en: 'Packaging Design' },
    description: { zh: '以山水、植物和茶文化为灵感，为健康饮品建立自然、克制且可延展的包装视觉系统。', en: 'A calm and contemporary packaging system inspired by botanical landscapes and Chinese wellness culture.' },
    tags: ['Packaging', 'AI-assisted'], image: '/images/portfolio/packaging-sachet-mockup.png', imagePosition: 'center', tint: '#e2d4b2',
  },
]

export const ui = {
  nav: { about: { zh: '关于我', en: 'About' }, portfolio: { zh: '作品集', en: 'Portfolio' }, resume: { zh: '简历', en: 'Resume' }, contact: { zh: '联系', en: 'Contact' } },
  home: {
    availability: { zh: '目前开放合作', en: 'Available for collaboration' },
    heroKicker: { zh: '你好，我是', en: 'Hello, I’m' },
    explore: { zh: '向下探索', en: 'Explore' },
    quick: { about: { zh: '关于我', en: 'About me' }, portfolio: { zh: '作品集', en: 'Portfolio' }, talk: { zh: '在线聊天', en: 'Chat' } },
  },
  about: { eyebrow: { zh: 'ABOUT / 01', en: 'ABOUT / 01' }, title: { zh: '让每一次表达，都有自己的形状。', en: 'Giving every expression its own shape.' }, approach: { zh: '我的设计方式', en: 'My approach' } },
  portfolio: { eyebrow: { zh: 'PORTFOLIO / 02', en: 'PORTFOLIO / 02' }, title: { zh: '用设计，让好奇心变得可见。', en: 'Making curiosity visible through design.' }, view: { zh: '查看项目', en: 'View project' } },
}
