import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Full-screen ink-stamp intro. "MCJ" stamps in boom-boom-boom, a ruled
// ultramarine underline draws across, then the whole sheet wipes upward to
// reveal the site. Session-gated (once per browser tab) and respects
// prefers-reduced-motion. Tap anywhere to skip.
const LETTERS = ['M', 'C', 'J']

export default function IntroSplash({ onComplete }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      onComplete?.()
      return
    }
    // Plays on every load / refresh (he likes it).
    setShow(true)
    document.body.style.overflow = 'hidden'
    const t = setTimeout(() => finish(), 2100)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const finish = () => {
    document.body.style.overflow = ''
    setShow(false)
  }

  return (
    <AnimatePresence onExitComplete={() => onComplete?.()}>
      {show && (
        <motion.div
          key="intro"
          onClick={finish}
          className="fixed inset-0 z-[100000] flex flex-col items-center justify-center bg-paper cursor-pointer select-none"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex items-baseline gap-1 md:gap-3">
            {LETTERS.map((ch, i) => (
              <motion.span
                key={ch}
                className="text-ink font-mono font-bold leading-none"
                style={{ fontSize: 'clamp(4rem, 18vw, 12rem)', letterSpacing: '-0.04em' }}
                initial={{ opacity: 0, y: -80, rotate: -8, scale: 1.4 }}
                animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
                transition={{
                  delay: 0.15 + i * 0.22,
                  type: 'spring',
                  stiffness: 700,
                  damping: 22,
                  mass: 0.9,
                }}
              >
                {ch}
              </motion.span>
            ))}
          </div>

          {/* ruled ultramarine underline drawing across */}
          <motion.div
            className="mt-3 h-[3px] bg-accent origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.9, duration: 0.5, ease: 'easeInOut' }}
            style={{ width: 'clamp(9rem, 34vw, 22rem)' }}
          />

          <motion.p
            className="mt-4 text-muted font-mono text-xs md:text-sm tracking-[0.35em] uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.25, duration: 0.4 }}
          >
            Marcellous Curtis
          </motion.p>

          <motion.span
            className="absolute bottom-8 text-muted-light font-mono text-[10px] tracking-widest uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 1.6, duration: 0.4 }}
          >
            tap to skip
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
