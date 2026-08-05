import { motion, useMotionValue, useSpring } from 'framer-motion'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

export function MagneticLink({ to, children, className = '' }: { to: string; children: ReactNode; className?: string }) {
  const x = useSpring(useMotionValue(0), { stiffness: 240, damping: 18 }); const y = useSpring(useMotionValue(0), { stiffness: 240, damping: 18 })
  const onMove = (event: React.MouseEvent<HTMLAnchorElement>) => { const rect = event.currentTarget.getBoundingClientRect(); x.set((event.clientX - rect.left - rect.width / 2) * 0.09); y.set((event.clientY - rect.top - rect.height / 2) * 0.09) }
  return <motion.div style={{ x, y }}><Link className={className} to={to} onMouseMove={onMove} onMouseLeave={() => { x.set(0); y.set(0) }}>{children}</Link></motion.div>
}
