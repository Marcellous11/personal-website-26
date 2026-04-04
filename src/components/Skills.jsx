import { motion } from 'framer-motion'

const skills = [
  {
    category: 'AI / LLM Systems',
    items: [
      { name: 'Prompt Engineering', icon: '🧠', level: 95 },
      { name: 'RAG Pipelines', icon: '🔗', level: 90 },
      { name: 'Agentic Workflows', icon: '🤖', level: 90 },
      { name: 'LLM Integration', icon: '⚡', level: 88 },
      { name: 'OpenAI API', icon: '🟢', level: 90 },
    ],
  },
  {
    category: 'Automation & RPA',
    items: [
      { name: 'UiPath', icon: '🔵', level: 95 },
      { name: 'Python', icon: '🐍', level: 88 },
      { name: 'PowerShell', icon: '💠', level: 82 },
      { name: 'C#', icon: '🔷', level: 78 },
      { name: 'RPA Design', icon: '⚙️', level: 92 },
    ],
  },
  {
    category: 'Full Stack & Data',
    items: [
      { name: 'React', icon: '⚛️', level: 85 },
      { name: 'Next.js', icon: '▲', level: 80 },
      { name: 'JavaScript', icon: '🟨', level: 85 },
      { name: 'Database Management', icon: '🗄️', level: 75 },
      { name: 'Git / GitHub', icon: '🐙', level: 90 },
    ],
  },
]

function SkillBar({ name, icon, level, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
    >
      <div className="flex items-center justify-between mb-1.5">
        <span className="flex items-center gap-2 text-sm text-light">
          <span>{icon}</span>
          {name}
        </span>
        <span className="text-xs text-muted">{level}%</span>
      </div>
      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: delay + 0.2, ease: 'easeOut' }}
          className="h-full bg-accent rounded-full"
        />
      </div>
    </motion.div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <p className="text-xs font-medium text-accent uppercase tracking-wider mb-3">What I work with</p>
          <h2 className="text-4xl md:text-5xl font-bold text-light">Skills & Tech Stack</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {skills.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: gi * 0.1, ease: 'easeOut' }}
              className="bg-card border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors duration-300"
            >
              <h3 className="text-xs font-semibold text-muted uppercase tracking-wider mb-6">
                {group.category}
              </h3>
              <div className="space-y-5">
                {group.items.map((skill, si) => (
                  <SkillBar
                    key={skill.name}
                    {...skill}
                    delay={gi * 0.15 + si * 0.07}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
