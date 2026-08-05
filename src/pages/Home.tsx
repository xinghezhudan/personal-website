import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { HeroModel } from '../components/HeroModel'
import { Nav } from '../components/Layout'
import { contactLinks, profile, ui } from '../data/content'
import { useLocale } from '../context/LocaleContext'

export function Home() {
  const { locale, text } = useLocale()
  const navigate = useNavigate()
  const [isExploreCompact, setIsExploreCompact] = useState(false)
  const { scrollY } = useScroll()
  const heroScale = useTransform(scrollY, (value) => {
    const transitionDistance = typeof window === 'undefined' ? 900 : window.innerHeight * 0.9
    return 1 - Math.min(value / transitionDistance, 1) * 0.018
  })
  const heroOpacity = useTransform(scrollY, (value) => {
    const transitionDistance = typeof window === 'undefined' ? 900 : window.innerHeight * 0.9
    return 1 - Math.min(value / transitionDistance, 1) * 0.3
  })

  useEffect(() => {
    const updateExploreState = () => setIsExploreCompact(window.scrollY > 72)

    updateExploreState()
    window.addEventListener('scroll', updateExploreState, { passive: true })
    return () => window.removeEventListener('scroll', updateExploreState)
  }, [])

  const handleExplore = () => {
    const distanceFromBottom = document.documentElement.scrollHeight - (window.scrollY + window.innerHeight)

    if (distanceFromBottom <= 160) {
      navigate('/portfolio#portfolio-hero')
      return
    }

    const nextSection = [...document.querySelectorAll<HTMLElement>('.home > section')]
      .find((section) => section.getBoundingClientRect().top > 80)

    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }

    window.scrollBy({ top: window.innerHeight * 0.72, behavior: 'smooth' })
  }

  return (
    <motion.main className={`home${isExploreCompact ? ' is-scrolled' : ''}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.45 }}>
      <Nav />

      <section className="hero">
        <motion.div className="hero-stage" style={{ scale: heroScale, opacity: heroOpacity }}>
          <div className="hero-wall"><span className="wall-orb orb-one" /><span className="wall-orb orb-two" /></div>
          <div className="hero-copy">
            <motion.div className="availability" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <span />{text(ui.home.availability)}
            </motion.div>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42 }}>{text(ui.home.heroKicker)}</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>LEO.</motion.h1>
            <motion.h2 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.58 }}>{text(profile.role)}</motion.h2>
          </div>
          <HeroModel textureUrl="/assets/leo-clay-avatar.png" interactionStrength={0.32} />
        </motion.div>
      </section>

      <div className={`explore-dock${isExploreCompact ? ' is-compact' : ''}`}>
        <div className="explore-options">
          <a href="#about">{text(ui.nav.about)}</a>
          <Link to="/portfolio">{text(ui.nav.portfolio)}</Link>
          <a href={`mailto:${contactLinks.primaryEmail}`}>{text(ui.home.quick.talk)}</a>
        </div>
        <button type="button" className="explore-trigger" onClick={handleExplore} aria-label={text(ui.home.explore)}>
          <span className="explore-label">{text(ui.home.explore)}</span><b aria-hidden="true">↓</b>
        </button>
      </div>

      <section id="about" className="home-about-section">
        <motion.div className="home-about-card">
          <div className="home-about-heading">
            <p className="eyebrow">{text(ui.about.eyebrow)}</p>
            <h2>{text({ zh: '关于我', en: 'About me' })}</h2>
          </div>

          <div className="home-about-profile">
            <div className="home-about-portrait">
              <img src="/assets/leo-clay-avatar.png?v=20260730-2" alt="Leo's clay avatar" />
              <div><span>LEO / DESIGNER</span><span>BASED IN CHINA</span></div>
            </div>
            <div className="home-about-intro">
              <span className="label">{text({ zh: '自我介绍', en: 'INTRODUCTION' })}</span>
              <h3>{locale === 'zh' ? <>让每一次表达，<br />都有自己的形状。</> : text(ui.about.title)}</h3>
              <div className="home-about-bio">{text(profile.bio).split('\n\n').map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
            </div>
          </div>

          <div className="home-about-details">
            <div className="home-about-history">
              <span className="label">{text({ zh: '教育经历', en: 'EDUCATION' })}</span>
              <div className="history-row">
                <span>2023 — {text({ zh: '至今', en: 'Present' })}</span>
                <p>{text({ zh: '西北农林科技大学 · 家具与室内设计 · 工学学士', en: 'Northwest A&F University · Furniture & Interior Design · B.Eng.' })}</p>
              </div>
            </div>
            <div className="home-about-skills">
              <span className="label">{text({ zh: '工具与技能', en: 'TOOLS & SKILLS' })}</span>
              <div>{profile.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
            </div>
          </div>
        </motion.div>
      </section>
    </motion.main>
  )
}
