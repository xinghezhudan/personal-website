import { motion } from 'framer-motion'
import { Arrow, PageShell } from '../components/Layout'
import { contactLinks, profile, ui } from '../data/content'
import { useLocale } from '../context/LocaleContext'

const reveal = { initial: { opacity: 0, y: 22 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.2 }, transition: { duration: 0.55 } }

export function About() {
  const { text } = useLocale()
  const approachTitle = text({ zh: '从感受出发，\n把故事做成系统。', en: 'Start with feeling.\nShape stories into systems.' })
  return <PageShell label="About"><section className="interior-intro"><motion.p {...reveal} className="eyebrow">{text(ui.about.eyebrow)}</motion.p><motion.h1 {...reveal}>{text(ui.about.title)}</motion.h1><motion.div {...reveal} className="intro-grid"><p>{text(profile.bio)}</p><div><span className="label">EDUCATION</span><p>{text(profile.education)}</p></div></motion.div></section><section className="about-detail"><motion.div {...reveal} className="portrait-card"><img src="/assets/leo-clay-avatar.png?v=20260730-2" alt="Leo's clay avatar" /><div><span>LEO / DESIGNER</span><span>BASED IN CHINA</span></div></motion.div><div className="about-content"><motion.div {...reveal}><p className="eyebrow">{text(ui.about.approach)}</p><h2>{approachTitle.split('\n').map((line, index) => <span key={line}>{index > 0 && <br />}{line}</span>)}</h2><p>{text({ zh: '我用研究厘清问题，用视觉建立情绪，用工具把想法推向更完整的交付。从一个画面，到一个产品或空间，我在意每个细节是否能让人产生连接。', en: 'I use research to clarify the question, visuals to shape feeling, and tools to carry an idea into a complete outcome. From an image to a product or place, I care about details that create connection.' })}</p></motion.div><motion.div {...reveal} className="skills"><span className="label">TOOLS & SKILLS</span><div>{profile.skills.map((skill) => <span key={skill}>{skill}</span>)}</div></motion.div><motion.div {...reveal} className="contact-panel"><span className="label">CONTACT</span><a href={`mailto:${contactLinks.primaryEmail}`}>{contactLinks.primaryEmail}<Arrow /></a><a href={contactLinks.linkedin} target="_blank" rel="noreferrer">LinkedIn / xinghezhudan<Arrow /></a></motion.div></div></section></PageShell>
}
