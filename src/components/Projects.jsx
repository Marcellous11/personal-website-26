import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionHeader from '@/components/ui/SectionHeader'

const projects = [
  {
    title: 'Code Modernization — ADIS',
    category: 'AI Agents',
    description: 'Takes requirements from legacy COBOL systems and generates equivalent applications in React/Next.js using an array of AI Agents. Led the frontend agent architecture to produce modern, maintainable code from decades-old systems.',
    tags: ['AI Agents', 'React', 'Next.js', 'LLM'],
    github: 'https://github.com/Marcellous11',
    live: null,
  },
  {
    title: 'PRD Generator — AcqDemo',
    category: 'LLM Automation',
    description: 'Generates new AcqDemo Position Requirements Documents from legacy GS Position Descriptions using LLMs. Produces 280 new PRDs per hour — saving 100+ hours of manual documentation work annually.',
    tags: ['Python', 'LLM', 'OpenAI', 'Automation'],
    github: 'https://github.com/Marcellous11',
    live: null,
  },
  {
    title: 'Cyber Controls — MRO Team',
    category: 'RAG / Classification',
    description: 'LLM-powered classification model paired with a RAG pipeline to categorize security controls using semantic context from a Control Catalog. Processes 20 controls per minute.',
    tags: ['RAG', 'LLM', 'Python', 'Classification'],
    github: 'https://github.com/Marcellous11',
    live: null,
  },
  {
    title: 'Transcript Upload — Air University',
    category: 'RPA',
    description: 'Automation leveraging UiPath, LLMs, and custom PowerShell scripts to extract and format transcript data, then upload it into SAP within a DOD environment.',
    tags: ['UiPath', 'PowerShell', 'LLM', 'SAP'],
    github: 'https://github.com/Marcellous11',
    live: null,
  },
  {
    title: 'DCII Automation — Security Forces Quantico',
    category: 'RPA',
    description: 'Processes incoming personnel requests by navigating AFJIS and downloading corresponding documents automatically. Saves 1,000+ hours of manual processing annually.',
    tags: ['UiPath', 'RPA', 'C#', 'Automation'],
    github: 'https://github.com/Marcellous11',
    live: null,
  },
  {
    title: 'Marcellous.work',
    category: 'Personal',
    description: 'This site. Personal portfolio built with React + Vite + Tailwind CSS. Features a live Spotify Now Playing widget (Cloudflare Worker), GitHub contribution grid, and Hacker News feed. Designed and built with Claude AI.',
    tags: ['React', 'Vite', 'Tailwind', 'Cloudflare Workers', 'Spotify API', 'Claude AI'],
    github: 'https://github.com/Marcellous11',
    live: 'https://Marcellous.work',
  },
]

function ProjectRow({ title, category, description, tags, github, live, index }) {
  const [open, setOpen] = useState(false)
  const num = String(index + 1).padStart(2, '0')

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="border-b border-ink"
    >
      <button
        className="w-full grid grid-cols-[2rem_1fr_auto] md:grid-cols-[2rem_1fr_10rem_auto] items-center gap-4 py-5 text-left group hover:bg-surface transition-colors duration-200 px-2 -mx-2"
        onClick={() => setOpen(!open)}
      >
        {/* Number */}
        <span className="font-mono text-[11px] text-muted group-hover:text-accent transition-colors duration-200">
          {num}
        </span>

        {/* Title */}
        <span className="text-sm md:text-base font-medium text-ink group-hover:text-ink transition-colors">
          {title}
        </span>

        {/* Category - desktop only */}
        <span className="hidden md:block text-xs text-muted text-right">
          {category}
        </span>

        {/* Expand indicator */}
        <span className={`text-muted transition-transform duration-300 ${open ? 'rotate-45' : ''}`}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-6 pl-10 flex flex-col md:flex-row gap-6 md:gap-10">
              <p className="text-muted text-sm leading-relaxed flex-1 max-w-xl">
                {description}
              </p>
              <div className="flex flex-col gap-4 shrink-0">
                <div className="flex flex-wrap gap-1.5">
                  {tags.map((tag) => (
                    <span key={tag} className="text-xs text-muted bg-surface border border-ink rounded-atelier-md px-2.5 py-1">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  {github && (
                    <a
                      href={github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-accent hover:text-accent-dim transition-colors duration-200"
                    >
                      GitHub →
                    </a>
                  )}
                  {live && (
                    <a
                      href={live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-accent hover:text-accent-dim transition-colors duration-200"
                    >
                      Live →
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="px-6 md:px-10 py-24 bg-surface">
      <div className="max-w-7xl mx-auto">
        <SectionHeader number="02" title="Work" className="mb-16" />

        {/* Column headers */}
        <div className="grid grid-cols-[2rem_1fr_auto] md:grid-cols-[2rem_1fr_10rem_auto] gap-4 px-2 mb-2">
          <span />
          <span className="text-[10px] text-muted uppercase tracking-widest">Project</span>
          <span className="hidden md:block text-[10px] text-muted uppercase tracking-widest text-right">Category</span>
          <span />
        </div>

        <div className="border-t border-ink">
          {projects.map((p, i) => (
            <ProjectRow key={p.title} {...p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
