import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

// Counts visits in localStorage and shows a paper-card toast with a greeting
// that gets progressively more familiar / funnier the more you come back.
// New greeting every visit — index walks down the list as the counter climbs.
const GREETINGS = [
  // 1 — first time
  "Welcome. First time here — make yourself at home.",
  // 2–5 — friendly
  "Back already? Good taste.",
  "Third visit. This is becoming a habit.",
  "Well, well. Look who wandered back.",
  "Five visits in. You're basically a regular now.",
  // 6–10 — familiar
  "Oh, it's you again. Hey.",
  "Back for round seven. Respect.",
  "You know you could just bookmark this, right?",
  "Ninth time. I'd offer you coffee if I could.",
  "Ten visits. We should probably know each other's names by now.",
  // 11–16 — playful
  "Funny seeing you here. Again.",
  "You really like it here, huh.",
  "Thirteen. Lucky number. For me, apparently.",
  "At this point you've seen everything. But welcome back anyway.",
  "I'm starting to think you have a crush on this website.",
  "Sixteen visits. My analytics are blushing.",
  // 17–24 — cheeky
  "Don't you have other tabs to open?",
  "Back so soon? The pixels haven't even cooled down.",
  "You again! I was JUST thinking about you. (I'm a website. I think about everyone.)",
  "Twenty. This is a two-decade relationship now.",
  "I'd roll out a red carpet but the palette's more of a cream situation.",
  "You've now spent more time here than most of my exes. Metaphorically.",
  "Are you okay? Blink twice if you need me to add more content.",
  "Twenty-four. I'm updating your title to 'Site Historian.'",
  // 25–34 — deadpan absurd
  "Oh good, you're back. I kept your seat warm. It's the same seat. It's a website.",
  "We've made it to visit 26. Neither of us saw this coming.",
  "You know the intro animation by heart now. Sing it with me.",
  "I'm legally obligated to say 'welcome back,' but we both know it's more than that.",
  "At this rate you'll have visited more than I've deployed.",
  "Thirty. A milestone. There is no prize. There has never been a prize.",
  "You could recreate this site from memory. Please don't.",
  "I've started leaving the light on for you.",
  "Visit 33. I ran out of clever things at like visit 19.",
  "Thirty-four. Honestly, thank you. Sincerely, the HTML.",
  // 35–44 — unhinged-but-gentle
  "You've achieved a bond with a static site most people reserve for pets.",
  "I dreamt about you. I don't sleep. Figure that one out.",
  "Marcellous is going to see these numbers and get concerned. Or flattered. Probably both.",
  "We should get matching tabs.",
  "Visit 39. I'm putting your name on the lease.",
  "Forty. Four-zero. You absolute legend of persistence.",
  "I've seen browsers come and go. But you? You stay.",
  "If loyalty were a currency you'd have bought the domain by now.",
  "Forty-three visits. I've told the other components. They're proud of you.",
  "You and me, kid. Against the whole internet.",
  // 45–50 — grand finale
  "Visit 45. We're basically writing a book together at this point.",
  "The counter's getting nervous. It's never had to hold a number this big for one person.",
  "Forty-seven. I'd frame this moment but I'm made of divs.",
  "You've officially visited more than Marcellous has tested. Don't tell him.",
  "Forty-nine. One more and I throw a (very quiet, very local) party.",
  "FIFTY. You did it. There is confetti in my heart, which is a JSON file. Welcome home. ⚡",
]

export default function VisitGreeting({ delay = 0 }) {
  const [state, setState] = useState(null) // { count, text }
  const [open, setOpen] = useState(false)

  useEffect(() => {
    let count = parseInt(localStorage.getItem('mcj_visits') || '0', 10)
    if (Number.isNaN(count)) count = 0
    count += 1
    localStorage.setItem('mcj_visits', String(count))

    const idx = Math.min(count - 1, GREETINGS.length - 1)
    setState({ count, text: GREETINGS[idx] })

    const show = setTimeout(() => setOpen(true), delay)
    return () => clearTimeout(show)
  }, [delay])

  useEffect(() => {
    if (!open) return
    const hide = setTimeout(() => setOpen(false), 8000)
    return () => clearTimeout(hide)
  }, [open])

  if (!state) return null

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="greeting"
          className="fixed bottom-5 left-5 z-[9000] max-w-[19rem]"
          initial={{ opacity: 0, y: 24, x: -8 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        >
          <div className="relative bg-surface border border-ink rounded-atelier-card shadow-[4px_4px_0_0_#1A1612] px-4 py-3">
            <button
              onClick={() => setOpen(false)}
              aria-label="Dismiss"
              className="absolute top-2 right-2 text-muted hover:text-ink transition-colors"
            >
              <X size={14} strokeWidth={2.5} />
            </button>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-accent-warm" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                visit&nbsp;#{state.count}
              </span>
            </div>
            <p className="font-mono text-sm leading-snug text-ink pr-3">
              {state.text}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
