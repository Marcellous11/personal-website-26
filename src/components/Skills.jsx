import { motion } from 'framer-motion'
import SectionHeader from '@/components/ui/SectionHeader'

const groups = [
  {
    label: 'AI & LLMs',
    skills: ['Prompt Engineering', 'RAG Pipelines', 'Agentic Workflows', 'LLM Integration', 'OpenAI API', 'Vector Databases', 'Fine-tuning'],
  },
  {
    label: 'Automation & RPA',
    skills: ['UiPath', 'Python', 'PowerShell', 'C#', 'RPA Architecture', 'Process Design', 'UiPath Orchestrator'],
  },
  {
    label: 'Full Stack & Tooling',
    skills: ['React', 'Next.js', 'JavaScript', 'TypeScript', 'Node.js', 'SQL', 'Git', 'Vite', 'REST APIs'],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="px-6 md:px-10 py-24">
      <div className="max-w-7xl mx-auto">
        <SectionHeader number="01" title="Skills & Tools" className="mb-16" />

        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          {groups.map((group, gi) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: gi * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className="text-ink font-semibold mb-5 text-sm">{group.label}</h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs text-muted bg-surface border border-ink rounded-atelier-md px-3 py-1 hover:text-accent transition-colors duration-200 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
