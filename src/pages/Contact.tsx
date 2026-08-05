import { motion } from 'framer-motion'
import { Arrow, PageShell } from '../components/Layout'
import { contactLinks } from '../data/content'
import { useLocale } from '../context/LocaleContext'

export function Contact() {
  const { text } = useLocale()

  return (
    <PageShell label="Contact">
      <section className="contact-page">
        <motion.header className="contact-page-header" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
          <p className="eyebrow">CONTACT / 03</p>
          <h1>Contact<span>.</span></h1>
          <p>{text({ zh: '如果你有项目、合作想法，或只是想聊聊设计，欢迎与我联系。', en: 'For projects, collaborations, or a conversation about design, feel free to get in touch.' })}</p>
        </motion.header>

        <motion.div className="contact-list" initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.1 }}>
          <a className="contact-row" href={`mailto:${contactLinks.primaryEmail}`}>
            <span>Email</span><strong>{contactLinks.primaryEmail}</strong><Arrow />
          </a>
          <a className="contact-row" href={contactLinks.linkedin} target="_blank" rel="noreferrer">
            <span>LinkedIn</span><strong>linkedin.com/in/xinghezhudan</strong><Arrow />
          </a>
          <div className="contact-row is-muted">
            <span>Behance</span><strong>Coming soon</strong><span aria-hidden="true">—</span>
          </div>
        </motion.div>
      </section>
    </PageShell>
  )
}
