import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

// Atelier section header (spec §Section headers):
// 3pt × 16pt colored bar on the left + title in SemiBold ink.
// The bar is the entire hierarchy signal — no underlines, rules, or all-caps.
export default function SectionHeader({ number, title, barColor = '#1E4CA8', className }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className={cn('flex items-center gap-4', className)}
    >
      <span
        aria-hidden
        className="block"
        style={{ width: '3px', height: '16px', backgroundColor: barColor }}
      />
      {number && (
        <span className="font-mono text-[11px] text-muted">{number}</span>
      )}
      <h2 className="text-sm font-semibold text-ink tracking-tight">{title}</h2>
    </motion.div>
  )
}
