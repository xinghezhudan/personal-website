import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useLayoutEffect, useState, type ReactNode } from 'react'
import { PageShell } from '../components/Layout'
import { profile } from '../data/content'
import { useLocale } from '../context/LocaleContext'

const portfolioSections = [
  { id: 'portfolio-intro', zh: '简介 / 关于', en: 'Intro / About' },
  { id: 'graphic-design', zh: '01 平面设计', en: '01 Graphic Design' },
  { id: 'spatial-design', zh: '02 空间设计', en: '02 Spatial Design' },
  { id: 'product-design', zh: '03 产品设计', en: '03 Product Design' },
  { id: 'packaging-design', zh: '04 包装设计', en: '04 Packaging Design' },
] as const

const asset = (name: string) => `/images/portfolio/${name}`

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.06 },
  transition: { duration: 0.6 },
}

function ProjectHeader({ number, category, title, tagline, description, meta }: {
  number: string
  category: string
  title: string
  tagline: string
  description: string
  meta: { label: string; value: string }[]
}) {
  return (
    <motion.header {...reveal} className="case-header">
      <div className="case-kicker"><span>{number}</span><span>{category}</span></div>
      <div className="case-title-block"><h2>{title}</h2><h3>{tagline}</h3><p>{description}</p></div>
      <dl className="case-meta">{meta.map(({ label, value }) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
    </motion.header>
  )
}

function StorySection({ eyebrow, title, copy, children, className = '' }: {
  eyebrow: string
  title: string
  copy?: string
  children?: ReactNode
  className?: string
}) {
  return (
    <div className={`case-story ${className}`}>
      <motion.div {...reveal} className="case-story-heading"><p className="portfolio-meta-label">{eyebrow}</p><h3>{title}</h3>{copy && <p>{copy}</p>}</motion.div>
      {children}
    </div>
  )
}

function CaptionedImage({ src, alt, caption, className = '', eager = false }: {
  src: string
  alt: string
  caption: string
  className?: string
  eager?: boolean
}) {
  return <motion.figure {...reveal} className={className}><img src={asset(src)} alt={alt} loading={eager ? 'eager' : 'lazy'} /><figcaption>{caption}</figcaption></motion.figure>
}

export function Portfolio() {
  const { locale, text } = useLocale()
  const reduceMotion = useReducedMotion()
  const [activeSection, setActiveSection] = useState<(typeof portfolioSections)[number]['id']>('portfolio-intro')
  const [heroVisible, setHeroVisible] = useState(true)
  const [heroAnimationReady, setHeroAnimationReady] = useState(false)

  useLayoutEffect(() => {
    if (window.location.hash !== '#portfolio-hero') {
      setHeroAnimationReady(true)
      return
    }

    const root = document.documentElement
    const previousScrollBehavior = root.style.scrollBehavior
    root.style.setProperty('scroll-behavior', 'auto', 'important')
    window.scrollTo({ top: 0, left: 0 })

    let frame = 0
    const startAnimationAtTop = () => {
      if (window.scrollY > 1) {
        window.scrollTo({ top: 0, left: 0 })
        frame = requestAnimationFrame(startAnimationAtTop)
        return
      }

      if (previousScrollBehavior) root.style.scrollBehavior = previousScrollBehavior
      else root.style.removeProperty('scroll-behavior')
      setHeroAnimationReady(true)
    }
    frame = requestAnimationFrame(startAnimationAtTop)

    return () => {
      cancelAnimationFrame(frame)
      if (previousScrollBehavior) root.style.scrollBehavior = previousScrollBehavior
      else root.style.removeProperty('scroll-behavior')
    }
  }, [])

  const playHeroAnimation = reduceMotion || heroAnimationReady

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries.find((entry) => entry.isIntersecting)
        if (visibleSection) setActiveSection(visibleSection.target.id as (typeof portfolioSections)[number]['id'])
      },
      { rootMargin: '-22% 0px -68% 0px' },
    )

    portfolioSections.forEach(({ id }) => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })

    const hashTarget = window.location.hash !== '#portfolio-hero' && window.location.hash
      ? document.querySelector(window.location.hash)
      : null
    if (hashTarget) requestAnimationFrame(() => hashTarget.scrollIntoView({ behavior: 'smooth', block: 'start' }))

    const hero = document.getElementById('portfolio-hero')
    const heroObserver = new IntersectionObserver(([entry]) => setHeroVisible(entry.isIntersecting), { threshold: 0.3 })
    if (hero) heroObserver.observe(hero)

    return () => {
      observer.disconnect()
      heroObserver.disconnect()
    }
  }, [])

  const experience = [
    { practice: { zh: '平面设计', en: 'Graphic Design' }, place: { zh: '舞蹈工作室', en: 'Dance Studio' }, years: '2024–2026' },
    { practice: { zh: '产品设计', en: 'Product Design' }, place: { zh: '西安文旅公司', en: 'Xi’an Cultural & Tourism Company' }, years: '2025' },
    { practice: { zh: '空间设计', en: 'Spatial Design' }, place: { zh: '西北农林科技大学后勤处', en: 'Department of Campus Logistics, NWAFU' }, years: '2025' },
    { practice: { zh: '包装设计', en: 'Packaging Design' }, place: { zh: '中天元公司', en: 'Zhong Tianyuan Company' }, years: '2025' },
    { practice: { zh: 'AI 辅助网页设计', en: 'AI-assisted Web Design' }, place: { zh: '个人作品集网站', en: 'Personal Portfolio Website' }, years: '2026–Present' },
  ]

  return (
    <PageShell label="Portfolio">
      <div className="portfolio-longform">
        <aside className={`portfolio-index${heroVisible ? ' is-hidden' : ''}`} aria-label="Portfolio sections">
          {portfolioSections.map((section) => <a key={section.id} href={`#${section.id}`} className={activeSection === section.id ? 'active' : ''} aria-current={activeSection === section.id ? 'location' : undefined}>{section[locale]}</a>)}
        </aside>

        <section id="portfolio-hero" className="portfolio-hero" aria-labelledby="portfolio-hero-title">
          <div className="portfolio-hero-copy">
            <motion.div
              className="portfolio-welcome"
              aria-label="Welcome to my"
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={playHeroAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: reduceMotion ? 0 : 0.82, delay: reduceMotion ? 0 : 0.34, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="portfolio-welcome-word" aria-hidden="true" />
            </motion.div>
            <motion.div
              className="portfolio-hero-title-group"
              initial={reduceMotion ? false : { opacity: 0.14, y: 12 }}
              animate={playHeroAnimation ? { opacity: 1, y: 0 } : { opacity: 0.14, y: 12 }}
              transition={{ duration: reduceMotion ? 0 : 0.9, delay: reduceMotion ? 0 : 0.42, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="portfolio-yellow-block" aria-hidden="true" />
              <h1 id="portfolio-hero-title"><img src={asset('portfolio-word.svg')} alt="portfolio." /></h1>
              <time>2024–2026</time>
            </motion.div>
          </div>
          <div className="portfolio-hands" aria-hidden="true">
            <motion.img
              className="portfolio-hand portfolio-hand-left"
              src={asset('portfolio-hand.svg')}
              alt=""
              style={{ scaleX: -1 }}
              initial={reduceMotion ? { x: 'var(--portfolio-hand-end-x)' } : { x: 0 }}
              animate={playHeroAnimation ? { x: 'var(--portfolio-hand-end-x)' } : { x: 0 }}
              transition={{ duration: reduceMotion ? 0 : 1.2, delay: reduceMotion ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.img
              className="portfolio-hand portfolio-hand-right"
              src={asset('portfolio-hand.svg')}
              alt=""
              initial={reduceMotion ? { x: 'var(--portfolio-hand-end-x)' } : { x: 0 }}
              animate={playHeroAnimation ? { x: 'var(--portfolio-hand-end-x)' } : { x: 0 }}
              transition={{ duration: reduceMotion ? 0 : 1.2, delay: reduceMotion ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </section>

        <section id="portfolio-intro" className="portfolio-section portfolio-intro-section">
          <motion.div {...reveal} className="portfolio-profile-grid">
            <figure className="portfolio-profile-image"><img src="/assets/leo-clay-avatar.png?v=20260730-2" alt="Leo's clay avatar" /></figure>
            <div className="portfolio-about-copy">
              <span className="portfolio-meta-label">ABOUT / PROFILE</span>
              <h2>{text({ zh: '关于我', en: 'About me' })}</h2>
              <div>{text(profile.bio).split('\n\n').map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
            </div>
          </motion.div>

          <motion.div {...reveal} className="portfolio-practice-section">
            <div className="practice-heading"><span className="portfolio-meta-label">{text({ zh: '设计实践', en: 'Design Practice' })}</span><p>{text({ zh: '跨越视觉、产品、空间与 AI 辅助创作的实践记录。', en: 'A concise record of practice across visual, product, spatial, and AI-assisted design.' })}</p></div>
            <div className="practice-grid">{experience.map((item) => <article key={item.practice.en}><span>{text(item.practice)}</span><p>{text(item.place)}</p><time>{item.years}</time></article>)}</div>
          </motion.div>

          <motion.div {...reveal} className="portfolio-profile-bottom">
            <div><span className="portfolio-meta-label">{text({ zh: '教育经历', en: 'Education' })}</span><p>{text(profile.education)}</p></div>
            <div><span className="portfolio-meta-label">{text({ zh: '工具与技能', en: 'Tools & Skills' })}</span><div className="portfolio-skill-tags">{profile.skills.map((skill) => <span key={skill}>{skill}</span>)}</div></div>
          </motion.div>
        </section>

        <section id="graphic-design" className="portfolio-section portfolio-chapter graphic-chapter">
          <ProjectHeader
            number="01"
            category={text({ zh: '平面设计', en: 'Graphic Design' })}
            title="Dance Studio Visual Communication"
            tagline={text({ zh: '让舞蹈的节奏成为持续可识别的视觉语言', en: 'Turning the rhythm of dance into a recognizable visual language' })}
            description={text({ zh: '为舞蹈工作室的课程、活动、演出与周年庆建立一组适用于线上传播和线下场景的视觉物料。', en: 'A set of visual materials for classes, events, performances, and anniversary celebrations across digital and physical touchpoints.' })}
            meta={[
              { label: 'Year', value: '2024–2026' },
              { label: 'Type', value: text({ zh: '品牌视觉与平面传播', en: 'Brand Visuals & Graphic Communication' }) },
              { label: 'Context', value: 'Dance Studio' },
              { label: 'Keywords', value: 'Rhythm / Campaign / Social Media / Stage' },
            ]}
          />

          <CaptionedImage src="graphic-anniversary-main.webp" alt="Dance studio anniversary stage backdrop" caption={text({ zh: '周年庆主视觉 / Final Campaign Visual', en: 'Final Campaign Visual / Anniversary' })} className="case-hero-image" eager />

          <StorySection eyebrow="Concept / Design Background" title={text({ zh: '一个需要在不同场景中保持能量的传播系统', en: 'A communication system that keeps its energy across formats' })} copy={text({ zh: '项目来自 2024—2026 年间的舞蹈机构宣传实践。设计需要在课程信息、社交媒体海报、商业演出与舞台展板之间保持清晰识别，同时适应快速更新的内容节奏。', en: 'Developed through ongoing studio communication work from 2024 to 2026, the system balances clear information with a high-energy identity across class schedules, social posts, events, and stage graphics.' })}>
            <motion.div {...reveal} className="concept-card-grid">
              <article><span>01</span><h4>{text({ zh: '节奏感', en: 'Rhythm' })}</h4><p>{text({ zh: '用强对比、倾斜构图与密集文字建立舞蹈的速度感。', en: 'Contrast, diagonal compositions, and dense typography create a sense of movement.' })}</p></article>
              <article><span>02</span><h4>{text({ zh: '信息层级', en: 'Information' })}</h4><p>{text({ zh: '让日期、课程与报名信息在复杂画面中保持快速可读。', en: 'Dates, classes, and calls to action remain easy to scan within expressive layouts.' })}</p></article>
              <article><span>03</span><h4>{text({ zh: '场景延展', en: 'Adaptability' })}</h4><p>{text({ zh: '同一视觉语气覆盖手机屏幕、宣传海报与舞台背景。', en: 'One visual voice extends from mobile screens to posters and stage backdrops.' })}</p></article>
            </motion.div>
          </StorySection>

          <StorySection eyebrow="Design Translation / Process" title={text({ zh: '从日常信息到主题活动', en: 'From everyday information to themed campaigns' })}>
            <div className="graphic-poster-grid">
              {[
                ['graphic-schedule.webp', 'Dance studio schedule', text({ zh: '课程信息系统', en: 'Schedule Information System' })],
                ['graphic-private-class.webp', 'Private class poster', text({ zh: '私教课程传播', en: 'Private Class Promotion' })],
                ['graphic-price-list.webp', 'Dance studio price list', text({ zh: '价格信息设计', en: 'Pricing Information Design' })],
                ['graphic-styling-class.webp', 'Styling class poster', text({ zh: '主题课程海报', en: 'Themed Class Poster' })],
                ['graphic-anniversary-left.webp', 'Anniversary side panel', text({ zh: '周年庆侧翼视觉 A', en: 'Anniversary Side Panel A' })],
                ['graphic-anniversary-right.webp', 'Anniversary side panel', text({ zh: '周年庆侧翼视觉 B', en: 'Anniversary Side Panel B' })],
              ].map(([src, alt, caption]) => <CaptionedImage key={src} src={src} alt={alt} caption={caption} />)}
            </div>
          </StorySection>

          <StorySection eyebrow="Final Outcome" title={text({ zh: '完整活动视觉与宣传输出', en: 'Campaign and event-ready outcomes' })}>
            <div className="final-outcome-stack">
              <CaptionedImage src="graphic-dance-night.webp" alt="Dance carnival night banner" caption={text({ zh: '商业演出主视觉', en: 'Performance Campaign Visual' })} />
              <CaptionedImage src="graphic-year-end.webp" alt="Year-end dance studio campaign" caption={text({ zh: '年终活动传播', en: 'Year-end Campaign Visual' })} />
            </div>
          </StorySection>
        </section>

        <section id="spatial-design" className="portfolio-section portfolio-chapter spatial-chapter">
          <ProjectHeader
            number="02"
            category={text({ zh: '空间设计', en: 'Spatial Design' })}
            title="Eco-Link: Campus Bus Station Design"
            tagline={text({ zh: '让校园通勤成为自然与文化的连接点', en: 'Connecting campus mobility with nature and culture' })}
            description={text({ zh: '以西北农林科技大学的银杏景观、DNA 结构与农业文化为线索，将候车、信息展示与公共休憩整合为轻量化校园站亭。', en: 'A lightweight campus shelter shaped by the university’s ginkgo landscape, DNA structures, and agricultural culture, integrating waiting, information display, and public rest.' })}
            meta={[
              { label: 'Year', value: '2025' },
              { label: 'Type', value: 'Campus Public Transit Space' },
              { label: 'Site', value: 'Northwest A&F University' },
              { label: 'Keywords', value: 'Ginkgo / DNA / Wheat / Transit / Campus Culture' },
            ]}
          />

          <StorySection eyebrow="Core Design Concept" title={text({ zh: '自然符号、文化转译与公共功能', en: 'Nature, culture, and public function' })}>
            <motion.div {...reveal} className="spatial-concept-strip">
              <article><span>01</span><h4>Nature Symbols</h4><p>{text({ zh: '以校园银杏景观作为站亭融入场地的自然线索。', en: 'The campus ginkgo landscape provides the shelter’s natural connection to the site.' })}</p></article>
              <article><span>02</span><h4>Cultural Translation</h4><p>{text({ zh: '将 DNA 与麦穗形态转译为结构框架和视觉细节。', en: 'DNA and wheat forms are translated into structural frames and visual details.' })}</p></article>
              <article><span>03</span><h4>Public Function</h4><p>{text({ zh: '整合候车、信息展示、公共休憩与校园导视。', en: 'Waiting, information display, public seating, and wayfinding are integrated in one shelter.' })}</p></article>
            </motion.div>
          </StorySection>

          <StorySection eyebrow="Element Translation" title="From Cultural Symbols to Structural Language">
            <motion.div {...reveal} className="spatial-translation-stage">
              <article className="spatial-symbol-module spatial-symbol-dna">
                <div><span>01 / FORM STUDY</span><h4>DNA Motif</h4><p>{text({ zh: '将 DNA 双螺旋抽象为连续曲线框架，使生物符号转化为站亭的结构语言。', en: 'The DNA helix is abstracted into a continuous curved frame, translating a biological symbol into the shelter’s structural language.' })}</p></div>
                <figure><img src={asset('spatial-concept.svg')} alt="DNA motif transformed into the shelter frame" loading="lazy" /><figcaption>DNA Form Study</figcaption></figure>
              </article>
              <figure className="spatial-concept-sketch"><img src={asset('spatial-concept-model-2.jpg')} alt="Eco-Link front model from the original Model Image 2 file" loading="lazy" /><figcaption>Concept Sketch</figcaption></figure>
              <article className="spatial-symbol-module spatial-symbol-wheat">
                <div><span>02 / FORM STUDY</span><h4>Wheat Motif</h4><p>{text({ zh: '将麦穗形态简化为模块化图形，回应学校农业语境，并用于站亭的视觉细节。', en: 'The wheat form is simplified into a modular pattern, referencing the university’s agricultural context and informing the shelter’s visual details.' })}</p></div>
                <figure><img src={asset('spatial-culture.svg')} alt="Wheat motif simplified into a modular shelter detail" loading="lazy" /><figcaption>Wheat Form Study</figcaption></figure>
              </article>
              <img className="spatial-guide spatial-guide-one" src={asset('spatial-guide-1.svg')} alt="" aria-hidden="true" />
              <img className="spatial-guide spatial-guide-three" src={asset('spatial-guide-3.svg')} alt="" aria-hidden="true" />
            </motion.div>
          </StorySection>

          <StorySection eyebrow="Site Selection" title={text({ zh: '银杏景观中的校园通勤节点', en: 'A campus transit point within the ginkgo landscape' })}>
            <div className="spatial-site-grid">
              <motion.aside {...reveal} className="spatial-site-notes">
                <div><span className="portfolio-meta-label">Selection Rationale</span><ul>
                  <li>{text({ zh: '位于校园主要通行路线', en: 'Located on a primary campus route' })}</li>
                  <li>{text({ zh: '靠近银杏景观区域', en: 'Adjacent to the ginkgo landscape' })}</li>
                  <li>{text({ zh: '服务高频通勤人群', en: 'Serves frequent campus commuters' })}</li>
                </ul></div>
                <div className="spatial-palette"><span className="portfolio-meta-label">Color Palette</span><div aria-label="Green, yellow, lime, and blue palette"><i /><i /><i /><i /></div></div>
              </motion.aside>
              <div className="spatial-site-media">
                <CaptionedImage src="spatial-location-map.png" alt="Original campus map with the Eco-Link site marked" caption="Site Analysis Diagram" className="spatial-site-map" />
                <CaptionedImage src="spatial-location-photo.jpg" alt="Original ginkgo-lined site photo at Northwest A&F University" caption="Site Photo" className="spatial-site-photo" />
              </div>
            </div>
          </StorySection>

          <StorySection eyebrow="Final Outcome" title={text({ zh: '日景与夜间照明效果', en: 'Daytime presence and nighttime lighting' })}>
            <div className="spatial-final-renders">
              <CaptionedImage src="spatial-day.webp" alt="Eco-Link daytime rendering in a ginkgo campus landscape" caption="Daytime Rendering" className="spatial-day-hero" eager />
              <CaptionedImage src="spatial-night.webp" alt="Eco-Link nighttime rendering" caption="Nighttime Rendering" className="spatial-night-render" />
            </div>
          </StorySection>

          <StorySection eyebrow="Structure & Drawings" title={text({ zh: '从立面结构到场地总平面', en: 'From elevation and structure to the site plan' })}>
            <div className="spatial-technical-grid">
              <CaptionedImage src="spatial-elevation.webp" alt="Eco-Link front elevation" caption="Elevation" className="spatial-elevation" />
              <CaptionedImage src="spatial-exploded.svg" alt="Eco-Link exploded structural development drawing" caption="Exploded View / Structural Development" className="spatial-exploded" />
              <CaptionedImage src="spatial-plan.svg" alt="Eco-Link site plan" caption="Site Plan" className="spatial-plan" />
            </div>
          </StorySection>

          <StorySection eyebrow="Model Validation" title={text({ zh: '实体模型与方案验证', en: 'Physical model and design validation' })}>
            <div className="spatial-model-grid">
              <CaptionedImage src="spatial-model-1.webp" alt="Eco-Link physical model" caption="Model Validation" />
              <CaptionedImage src="spatial-model-2.webp" alt="Eco-Link physical model detail" caption="Model Detail" />
            </div>
          </StorySection>
        </section>

        <section id="product-design" className="portfolio-section portfolio-chapter product-chapter">
          <ProjectHeader
            number="03"
            category={text({ zh: '产品设计', en: 'Product Design' })}
            title="Tang Sancai Camel Plush Collection"
            tagline={text({ zh: '从唐三彩文物到可以拥抱的陪伴', en: 'From a Tang artifact to a companion you can hold' })}
            description={text({ zh: '以“唐三彩骆驼载乐俑”为原型，提取骆驼轮廓、颈部曲线与釉色色彩，将文物形态转译为兼具装饰性与陪伴感的柔软产品。', en: 'Based on the Tang Sancai camel figurine, the product translates its silhouette, neck curve, humps, and glaze palette into a soft object with decorative and comforting qualities.' })}
            meta={[
              { label: 'Year', value: '2025' },
              { label: 'Type', value: 'Cultural Creative Product' },
              { label: 'Origin', value: 'Tang Sancai Camel Figurine' },
              { label: 'Keywords', value: 'Heritage / Plush / Ergonomics / Companionship' },
            ]}
          />

          <CaptionedImage src="product-camel.webp" alt="Tang Sancai camel plush final product" caption={text({ zh: '骆驼毛绒产品 / Final Product', en: 'Final Product / Camel Plush' })} className="case-hero-image product-final-hero" eager />

          <StorySection eyebrow="Inspiration / Reference" title={text({ zh: '以文物为起点，而不是复刻文物', en: 'Starting from the artifact without reproducing it literally' })} copy={text({ zh: '灵感来自唐三彩骆驼载乐俑。设计保留骆驼高颈、双峰与鬃毛的识别特征，并用更柔和的比例和触感回应靠枕与陪伴产品的使用方式。', en: 'The Tang Sancai camel figurine provides the cultural reference. Its long neck, twin humps, and mane are retained, then softened to suit a cushion-like companion product.' })}>
            <motion.div {...reveal} className="product-inspiration-row">
              <figure className="reference-card"><img src={asset('product-reference.webp')} alt="Tang Sancai camel figurine reference" loading="lazy" /><figcaption>{text({ zh: '灵感参考：唐三彩骆驼载乐俑', en: 'Inspiration / Tang Sancai Camel Figurine' })}</figcaption></figure>
              <div className="translation-list">
                <article><span>Form</span><p>{text({ zh: '骆驼轮廓、颈部曲线、驼峰与鬃毛', en: 'Camel silhouette, neck curve, humps, and mane' })}</p></article>
                <article><span>Colour</span><p>{text({ zh: '橙、绿、紫与米白的唐三彩釉色关系', en: 'Orange, green, purple, and warm ivory glaze tones' })}</p></article>
                <article><span>Function</span><p>{text({ zh: '柔软、可拥抱，并可作为靠枕使用', en: 'Soft, huggable, and suitable for use as a cushion' })}</p></article>
              </div>
            </motion.div>
          </StorySection>

          <StorySection eyebrow="Design Translation / Process" title={text({ zh: '轮廓、人体工学与色彩的逐步转译', en: 'A step-by-step translation of form, ergonomics, and colour' })}>
            <div className="product-process-grid">
              <CaptionedImage src="product-concept.webp" alt="Camel plush sketches and orthographic views" caption={text({ zh: '设计草图与三视图', en: 'Design Sketches & Orthographic Views' })} className="process-sketch" />
              <CaptionedImage src="product-form.svg" alt="Camel plush form and ergonomic analysis" caption={text({ zh: '形态与结构分析', en: 'Form & Structure Analysis' })} className="process-form" />
              <CaptionedImage src="product-palette.svg" alt="Tang Sancai camel plush colour palette" caption={text({ zh: '唐三彩色彩转译', en: 'Colour Translation' })} className="process-palette" />
            </div>
          </StorySection>
        </section>

        <section id="packaging-design" className="portfolio-section portfolio-chapter packaging-chapter">
          <ProjectHeader
            number="04"
            category={text({ zh: '包装设计', en: 'Packaging Design' })}
            title="Herbal Wellness Tea Packaging System"
            tagline={text({ zh: '草木、山水与现代养生包装系统', en: 'A modern wellness system shaped by botanicals and landscape' })}
            description={text({ zh: '围绕杜仲精粉与杜仲叶抹茶粉两款健康饮品，建立一套自然、清晰且可延展的包装视觉系统。设计以植物形态、山水层次和自然绿色为主要视觉语言，并通过不同图形与色彩识别两款产品，同时保持统一的品牌气质。', en: 'A natural, clear, and extendable packaging system for Eucommia Powder and Eucommia Leaf Matcha Powder. Botanical forms, layered landscapes, and differentiated greens distinguish the products while preserving one coherent brand character.' })}
            meta={[
              { label: 'Year', value: '2025' },
              { label: 'Type', value: 'Health Food Packaging' },
              { label: 'Deliverables', value: 'Outer Box / Inner Box / Sachet' },
              { label: 'Keywords', value: 'Botanical / Wellness / Landscape / Green System' },
            ]}
          />

          <StorySection eyebrow="Product Overview / 产品总览" title={text({ zh: '两个相关但独立的产品线', en: 'Two related but distinct product lines' })} copy={text({ zh: '两款产品共享植物、山水与绿色系统，并以不同色彩强度和图形语言建立各自识别。每条产品线均覆盖大盒、中盒与单次使用小袋。', en: 'Both lines share botanical, landscape, and green-system cues while using distinct colour intensity and graphic language. Each extends across an outer box, inner box, and single-use sachet.' })}>
            <motion.div {...reveal} className="packaging-overview-grid">
              <article>
                <div className="product-line-label"><span>Product Line 01</span><h4>{text({ zh: '杜仲精粉', en: 'Eucommia Powder' })}</h4><p>{text({ zh: 'Eucommia Powder', en: 'Outer Box / Inner Box / Sachet' })}</p></div>
                <figure><img src={asset('packaging-system-a.svg')} alt="Eucommia Powder packaging overview" loading="lazy" /><figcaption>{text({ zh: '杜仲精粉包装总览', en: 'Eucommia Powder Overview' })}</figcaption></figure>
                <p>{text({ zh: '沉稳绿色与植物线稿突出自然、传统与健康属性。', en: 'Deep greens and botanical linework express natural, traditional wellness.' })}</p>
              </article>
              <article>
                <div className="product-line-label"><span>Product Line 02</span><h4>{text({ zh: '杜仲叶抹茶粉', en: 'Eucommia Leaf Matcha Powder' })}</h4><p>{text({ zh: 'Eucommia Leaf Matcha Powder', en: 'Outer Box / Inner Box / Sachet' })}</p></div>
                <figure><img src={asset('packaging-elements-a.svg')} alt="Eucommia Leaf Matcha Powder packaging overview" loading="lazy" /><figcaption>{text({ zh: '杜仲叶抹茶粉包装总览', en: 'Eucommia Leaf Matcha Powder Overview' })}</figcaption></figure>
                <p>{text({ zh: '明亮绿色与抹茶元素呈现年轻、清新和轻饮用感。', en: 'Brighter greens and matcha cues create a fresher, lighter drinking character.' })}</p>
              </article>
            </motion.div>
          </StorySection>

          <StorySection eyebrow="Product Line 01" title={text({ zh: '杜仲精粉', en: 'Eucommia Powder' })} copy={text({ zh: '以杜仲植物线稿、山水层次和沉稳绿色为主要视觉元素，突出自然、传统与健康养生的产品属性。', en: 'Botanical linework, layered landscapes, and a grounded green palette express the product’s natural, traditional, and wellness qualities.' })} className="packaging-product-line line-one">
            <div className="packaging-line-gallery">
              <CaptionedImage src="packaging-system-a.svg" alt="Eucommia Powder outer box surface design" caption="Outer Box Design" className="package-outer" />
              <CaptionedImage src="packaging-system-b.svg" alt="Eucommia Powder inner box design" caption="Inner Box Design" className="package-inner" />
              <CaptionedImage src="packaging-box-a.svg" alt="Eucommia Powder single sachet flat design" caption="Single Sachet Design" className="package-sachet" />
              <CaptionedImage src="packaging-sachet-mockup.png" alt="Eucommia Powder single sachet mockup" caption="Graphic Detail / Sachet Mockup" className="package-detail" />
            </div>
          </StorySection>

          <StorySection eyebrow="Product Line 02" title={text({ zh: '杜仲叶抹茶粉', en: 'Eucommia Leaf Matcha Powder' })} copy={text({ zh: '以更轻盈、明亮的绿色系统和抹茶粉视觉元素建立产品识别，在保持品牌统一的同时，突出年轻、清新和饮用感。', en: 'A lighter, brighter green system and matcha-inspired elements create a youthful, fresh drinking identity while retaining the shared brand language.' })} className="packaging-product-line line-two">
            <div className="packaging-line-gallery">
              <CaptionedImage src="packaging-elements-a.svg" alt="Eucommia Leaf Matcha Powder outer box surface design" caption="Outer Box Design" className="package-outer" />
              <CaptionedImage src="packaging-elements-b.svg" alt="Eucommia Leaf Matcha Powder inner box design" caption="Inner Box Design" className="package-inner" />
              <CaptionedImage src="packaging-box-b.svg" alt="Eucommia Leaf Matcha Powder single sachet flat design" caption="Single Sachet Design" className="package-sachet" />
            </div>
          </StorySection>

          <StorySection eyebrow="Visual System / 视觉系统总结" title={text({ zh: '统一品牌气质下的产品区分与包装延展', en: 'Product distinction and packaging extension within one brand system' })}>
            <motion.div {...reveal} className="visual-system-grid">
              <article><span>01</span><h4>Botanical Illustration</h4><p>{text({ zh: '植物线稿与杜仲形态构成品牌的自然识别。', en: 'Botanical linework and Eucommia forms create a natural brand signature.' })}</p></article>
              <article><span>02</span><h4>Landscape Layer</h4><p>{text({ zh: '山水层次营造传统、温和且具有养生感的视觉气质。', en: 'Layered landscapes create a traditional, gentle wellness character.' })}</p></article>
              <article><span>03</span><h4>Color System</h4><p>{text({ zh: '杜仲精粉使用沉稳绿色，杜仲叶抹茶粉使用更明亮轻盈的绿色。', en: 'Grounded greens identify Eucommia Powder; brighter greens distinguish Leaf Matcha Powder.' })}</p></article>
              <article><span>04</span><h4>Packaging Extension</h4><p>{text({ zh: '视觉系统从大盒延展至中盒和小袋，保持统一的信息结构。', en: 'The system extends from outer box to inner box and sachet with a consistent information structure.' })}</p></article>
            </motion.div>
          </StorySection>
        </section>
      </div>
    </PageShell>
  )
}
