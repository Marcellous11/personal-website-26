import { motion } from 'framer-motion'

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
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-5 mb-16"
        >
          <span className="font-mono text-[11px] text-muted">01</span>
          <span className="flex-1 h-px bg-border" />
          <h2 className="text-xs font-medium text-muted uppercase tracking-widest">Skills & Tools</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          {groups.map((group, gi) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: gi * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className="text-light font-semibold mb-5 text-sm">{group.label}</h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs text-muted border border-border rounded-full px-3 py-1.5 hover:border-accent/40 hover:text-accent transition-all duration-200 cursor-default"
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
