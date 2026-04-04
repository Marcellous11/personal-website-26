import { motion } from 'framer-motion'

const projects = [
  {
    title: 'Code Modernization — ADIS',
    description: 'Takes requirements from legacy COBOL systems and generates equivalent applications in React/Next.js using an array of AI Agents. Led the frontend agent architecture to produce modern, maintainable code from decades-old systems.',
    tags: ['AI Agents', 'React', 'Next.js', 'LLM'],
    github: 'https://github.com/Marcellous11',
    live: null,
  },
  {
    title: 'PRD Generator — AcqDemo',
    description: 'Generates new AcqDemo Position Requirements Documents from legacy GS Position Descriptions using LLMs. Produces 280 new PRDs per hour — saving 100+ hours of manual documentation work annually.',
    tags: ['Python', 'LLM', 'OpenAI', 'Automation'],
    github: 'https://github.com/Marcellous11',
    live: null,
  },
  {
    title: 'Cyber Controls — MRO Team',
    description: 'LLM-powered classification model paired with a RAG pipeline to categorize security controls using semantic context from a Control Catalog. Generates a summary per control — processing 20 controls per minute.',
    tags: ['RAG', 'LLM', 'Python', 'Classification'],
    github: 'https://github.com/Marcellous11',
    live: null,
  },
  {
    title: 'Transcript Upload — Air University',
    description: 'Automation leveraging UiPath, LLMs, and custom PowerShell scripts to extract and format transcript data, then upload it into SAP within a DOD environment.',
    tags: ['UiPath', 'PowerShell', 'LLM', 'SAP'],
    github: 'https://github.com/Marcellous11',
    live: null,
  },
  {
    title: 'DCII Automation — Security Forces Quantico',
    description: 'Processes incoming personnel requests by navigating AFJIS and downloading corresponding documents automatically. Saves 1,000+ hours of manual processing annually.',
    tags: ['UiPath', 'RPA', 'C#', 'Automation'],
    github: 'https://github.com/Marcellous11',
    live: null,
  },
  {
    title: 'Marcellous.work — Personal Website',
    description: 'Personal portfolio website written in React with custom CSS and React modules. Features a terminal theme to reflect a love for computers and technology.',
    tags: ['React', 'CSS', 'JavaScript'],
    github: 'https://github.com/Marcellous11',
    live: 'https://Marcellous.work',
  },
]

function ProjectCard({ title, description, tags, github, live, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: 'easeOut' }}
      whileHover={{ y: -3 }}
      className="bg-card border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all duration-300 flex flex-col"
    >
      <div className="flex items-start justify-between mb-5">
        <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center text-accent text-sm">
          ↗
        </div>
        <div className="flex gap-3">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-light transition-colors duration-200"
              aria-label="GitHub"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
          )}
          {live && live !== '#' && (
            <a
              href={live}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-light transition-colors duration-200"
              aria-label="Live site"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>
      </div>

      <h3 className="text-base font-semibold text-light mb-2">{title}</h3>
      <p className="text-muted text-sm leading-relaxed flex-1 mb-5">{description}</p>

      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-xs text-muted bg-white/5 px-2.5 py-1 rounded-md"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 bg-surface/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <p className="text-xs font-medium text-accent uppercase tracking-wider mb-3">Things I&apos;ve built</p>
          <h2 className="text-4xl md:text-5xl font-bold text-light">Projects</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} {...project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
