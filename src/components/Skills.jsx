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
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="group"
    >
      <div className="flex items-center justify-between mb-1.5">
        <span className="flex items-center gap-2 text-sm font-mono text-light">
          <span>{icon}</span>
          {name}
        </span>
        <span className="text-xs font-mono text-muted">{level}%</span>
      </div>
      <div className="h-1.5 bg-surface rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: delay + 0.2, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-accent to-accent-dim rounded-full"
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
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-accent text-sm tracking-widest uppercase mb-3">What I work with</p>
          <h2 className="text-4xl md:text-5xl font-bold text-light">Skills & Tech Stack</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {skills.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: gi * 0.15 }}
              className="bg-card rounded-xl p-6 gradient-border hover:glow transition-all duration-300"
            >
              <h3 className="font-mono text-accent text-sm font-medium tracking-widest uppercase mb-6">
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
