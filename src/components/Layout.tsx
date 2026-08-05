import { motion } from 'framer-motion'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { contactLinks, profile, ui } from '../data/content'
import { useLocale } from '../context/LocaleContext'

export function Nav() {
  const { pathname } = useLocation()
  const { locale, toggleLocale, text } = useLocale()
  const [resumeOpen, setResumeOpen] = useState(false)
  const resumeRef = useRef<HTMLDivElement>(null)

  useEffect(() => setResumeOpen(false), [pathname])

  useEffect(() => {
    if (!resumeOpen) return

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!resumeRef.current?.contains(event.target as Node)) setResumeOpen(false)
    }
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setResumeOpen(false)
    }

    document.addEventListener('pointerdown', closeOnOutsideClick)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [resumeOpen])

  return (
    <header className="nav">
      <Link to="/" className="brand" aria-label="Leo home"><span className="brand-dot" />LEO<span className="brand-mark">®</span></Link>
      <nav className="nav-links" aria-label="Main navigation">
        <a className={pathname === '/about' ? 'active' : ''} href={pathname === '/' ? '#about' : '/#about'}>{text(ui.nav.about)}</a>
        <Link className={pathname === '/portfolio' ? 'active' : ''} to="/portfolio">{text(ui.nav.portfolio)}</Link>
        <div className={`resume-nav${resumeOpen ? ' is-open' : ''}`} ref={resumeRef}>
          <button type="button" className="resume-nav-trigger" onClick={() => setResumeOpen((open) => !open)} aria-expanded={resumeOpen} aria-haspopup="true">{text(ui.nav.resume)}</button>
          <div className="resume-popover" aria-hidden={!resumeOpen}>
            <span className="resume-popover-title">{text(ui.nav.resume)}</span>
            <div className="resume-file-row">
              <a href="/resume/Resume_EN.pdf" target="_blank" rel="noreferrer"><span>{text({ zh: '英文简历', en: 'English Resume' })}</span><small>PDF / EN</small></a>
              <a className="resume-download" href="/resume/Resume_EN.pdf" download="Leo_Resume.pdf" aria-label="Download English Resume">{text({ zh: '下载', en: 'Download' })}</a>
            </div>
            <div className="resume-file-row">
              <a href="/resume/Resume_CN.pdf" target="_blank" rel="noreferrer"><span>{text({ zh: '中文简历', en: 'Chinese Resume' })}</span><small>PDF / CN</small></a>
              <a className="resume-download" href="/resume/Resume_CN.pdf" download="蒋文浩_Resume.pdf" aria-label="下载中文简历">{text({ zh: '下载', en: 'Download' })}</a>
            </div>
          </div>
        </div>
        <Link className={pathname === '/contact' ? 'active' : ''} to="/contact">{text(ui.nav.contact)}</Link>
      </nav>
      <button className="language-switch" onClick={toggleLocale} aria-label="Switch language"><span className={locale === 'zh' ? 'selected' : ''}>中</span><i /> <span className={locale === 'en' ? 'selected' : ''}>EN</span></button>
    </header>
  )
}

export function PageShell({ children, label }: { children: ReactNode; label: string }) {
  return <motion.main className="page-shell" aria-label={label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}><Nav />{children}<footer className="footer"><span>© 2026 LEO</span><span>{profile.role.en}</span><a href={`mailto:${contactLinks.primaryEmail}`}>{contactLinks.primaryEmail}</a></footer></motion.main>
}

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span className={diagonal ? 'arrow diagonal' : 'arrow'} aria-hidden="true">↗</span>
}
