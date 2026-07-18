import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, ChevronDown } from 'lucide-react'

// Dev/preview switcher to flip between the five background animations live.
const OPTIONS = [
  { key: 'off', label: 'Off' },
  { key: 'flow', label: 'Ink flow-field' },
  { key: 'contour', label: 'Contour drift' },
  { key: 'nodes', label: 'Connected nodes' },
  { key: 'motes', label: 'Paper motes' },
  { key: 'plotter', label: 'Ghost plotter' },
]

export default function BackgroundToggle({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const current = OPTIONS.find(o => o.key === value) || OPTIONS[1]

  return (
    <div className="fixed bottom-5 right-5 z-[9000] font-mono">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.16 }}
            className="mb-2 bg-surface border border-ink rounded-atelier-card shadow-[4px_4px_0_0_#1A1612] overflow-hidden"
          >
            {OPTIONS.map(o => (
              <button
                key={o.key}
                onClick={() => { onChange(o.key); setOpen(false) }}
                className={`block w-full text-left px-4 py-2 text-xs whitespace-nowrap transition-colors ${
                  o.key === value ? 'bg-accent text-paper' : 'text-ink hover:bg-card'
                }`}
              >
                {o.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-2 bg-surface border border-ink rounded-atelier-md shadow-[3px_3px_0_0_#1A1612] px-3 py-2 text-xs text-ink hover:bg-card transition-colors"
      >
        <Sparkles size={13} strokeWidth={2} className="text-accent" />
        <span className="uppercase tracking-widest text-[10px] text-muted">bg</span>
        <span className="font-semibold">{current.label}</span>
        <ChevronDown size={13} strokeWidth={2.5} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
    </div>
  )
}
