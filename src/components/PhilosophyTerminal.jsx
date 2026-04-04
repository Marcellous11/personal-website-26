import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const SEQUENCE = [
  { type: 'cmd', text: 'whoami' },
  { type: 'out', text: 'Automation + AI Engineer. Builder of systems.' },
  { type: 'out', text: 'Student of everything worth knowing.' },
  { type: 'blank' },
  { type: 'cmd', text: 'cat philosophy.md' },
  { type: 'out', text: '"Memento mori — you will die. Build like it matters."' },
  { type: 'out', text: '  — Marcus Aurelius', dim: true },
  { type: 'blank' },
  { type: 'out', text: '"Learn how to see. Realize that everything connects."' },
  { type: 'out', text: '  — Leonardo da Vinci', dim: true },
  { type: 'blank' },
  { type: 'cmd', text: 'echo $APPROACH' },
  { type: 'out', text: 'Curiosity is the engine. Discipline is the fuel.' },
  { type: 'out', text: 'Ask questions. Go deep. Connect everything.' },
  { type: 'blank' },
  { type: 'cmd', text: 'ls currently/' },
  { type: 'out', text: 'building_AI_systems_for_public_sector/' },
  { type: 'out', text: 'studying_software_development/' },
  { type: 'out', text: 'reading_stoic_philosophy.txt' },
  { type: 'out', text: 'asking_questions_about_everything.md' },
]

function delay(ms) {
  return new Promise(res => setTimeout(res, ms))
}

export default function PhilosophyTerminal() {
  const [lines, setLines] = useState([])
  const [done, setDone] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function run() {
      await delay(800)
      let current = []

      for (let i = 0; i < SEQUENCE.length; i++) {
        if (cancelled) return
        const item = SEQUENCE[i]

        if (item.type === 'blank') {
          current = [...current, { type: 'blank', key: i }]
          setLines([...current])
          await delay(100)
        } else if (item.type === 'out') {
          current = [...current, { ...item, key: i }]
          setLines([...current])
          await delay(330)
        } else if (item.type === 'cmd') {
          const cmdLine = { type: 'cmd', text: '', key: i }
          current = [...current, cmdLine]
          setLines([...current])
          await delay(180)

          for (let c = 1; c <= item.text.length; c++) {
            if (cancelled) return
            const updated = [...current]
            updated[updated.length - 1] = { ...cmdLine, text: item.text.slice(0, c) }
            current = updated
            setLines([...current])
            await delay(58)
          }
          await delay(220)
        }
      }

      if (!cancelled) setDone(true)
    }

    run()
    return () => { cancelled = true }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="bg-card border border-border rounded-2xl overflow-hidden flex flex-col"
    >
      {/* macOS-style title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-surface shrink-0">
        <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
        <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
        <span className="w-3 h-3 rounded-full bg-[#28C840]" />
        <span className="ml-3 font-mono text-[11px] text-muted">~/philosophy — zsh</span>
      </div>

      {/* Terminal body */}
      <div className="flex-1 p-5 font-mono text-xs leading-relaxed overflow-auto min-h-[320px]">
        {lines.map((line, idx) => {
          const isLast = idx === lines.length - 1

          if (line.type === 'blank') {
            return <div key={line.key} className="h-3" />
          }

          if (line.type === 'cmd') {
            return (
              <div key={line.key} className="flex items-center gap-1.5 mb-1">
                <span className="text-accent select-none">❯</span>
                <span className="text-light">{line.text}</span>
                {isLast && !done && (
                  <span className="inline-block w-[5px] h-[13px] bg-accent animate-pulse ml-0.5" />
                )}
              </div>
            )
          }

          return (
            <div
              key={line.key}
              className={`pl-4 mb-0.5 ${line.dim ? 'text-muted' : 'text-muted-light'}`}
            >
              {line.text}
            </div>
          )
        })}

        {done && (
          <div className="flex items-center gap-1.5 mt-2">
            <span className="text-accent select-none">❯</span>
            <span className="inline-block w-[5px] h-[13px] bg-accent animate-pulse" />
          </div>
        )}
      </div>
    </motion.div>
  )
}
