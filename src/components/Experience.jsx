import { motion } from 'framer-motion'
import ExperienceCard from '@/components/experience/ExperienceCard'

const roles = [
  {
    title: 'AI Engineer',
    company: 'Invoke Public Sector · Remote',
    period: 'Dec 2024 — Present',
    current: true,
    summary:
      'Building AI-assisted workflows with RAG pipelines and OpenAI agentic strategies for Public Sector clients. Leading project discovery, selecting tooling per environment (Python ↔ PowerShell), and shipping end-to-end LLM systems.',
    hero: { label: 'AI Workflows Shipped', value: 4 },
    stats: [
      { label: 'Client Projects',  value: '4' },
      { label: 'PRDs / Hour',      value: '280' },
      { label: 'Controls / Min',   value: '20' },
      { label: 'Hrs Saved / Yr',   value: '100+' },
    ],
    chartLabel: 'Workflow Throughput',
    metricLabel: 'items/min',
    projects: [
      { name: 'PRD Generator (AcqDemo)',        short: 'PRD Generator',      value: 280 / 60, display: '280 PRDs/hr · 100+ hrs/yr saved', color: '#C8FF00' },
      { name: 'Cyber Controls (MRO)',           short: 'Cyber Controls',     value: 20,       display: '20 controls / min',               color: '#60A5FA' },
      { name: 'Code Modernization (ADIS)',      short: 'Code Modernization', value: 3.5,      display: 'COBOL → React via AI agents',     color: '#A78BFA' },
      { name: 'Transcript Upload (Air Univ.)',  short: 'Transcript Upload',  value: 2.5,      display: 'LLM + PowerShell → SAP (DoD)',    color: '#F472B6' },
    ],
    techMix: [
      { label: 'RAG / LLM',   value: 40, color: '#C8FF00' },
      { label: 'Python',      value: 30, color: '#60A5FA' },
      { label: 'PowerShell',  value: 20, color: '#A78BFA' },
      { label: 'React/Next',  value: 10, color: '#F472B6' },
    ],
  },
  {
    title: 'Automation Developer / Consultant',
    company: 'Invoke Public Sector · Remote',
    period: 'Apr 2023 — Dec 2024',
    summary:
      'Designed and delivered 30+ UiPath automations across 7+ Air Force bases, trained 100+ personnel, and led on-site training at 11 nationwide Road Shows. Optimized workflows with C# scripts for speed and reliability.',
    hero: { label: 'Hours Saved Annually', value: 3000, suffix: '+' },
    stats: [
      { label: 'Automations',  value: '30+' },
      { label: 'Bases Served', value: '7+'  },
      { label: 'Trained',      value: '100+'},
      { label: 'Road Shows',   value: '11'  },
    ],
    chartLabel: 'Hours Saved by Project (Annual)',
    metricLabel: 'hrs/yr',
    projects: [
      { name: 'Patrick Space Force Base', short: 'Patrick SFB',     value: 1478, display: '1,478 hrs/yr · 18 automations', color: '#C8FF00' },
      { name: 'DCII — Security Forces Quantico', short: 'DCII (Quantico)', value: 1000, display: '1,000 hrs/yr · AFJIS navigation', color: '#60A5FA' },
      { name: 'Road Show Trainings', short: 'Road Shows',     value: 522,  display: '11 events · 100+ personnel trained', color: '#A78BFA' },
    ],
    techMix: [
      { label: 'UiPath',     value: 55, color: '#C8FF00' },
      { label: 'Python',     value: 20, color: '#60A5FA' },
      { label: 'C#',         value: 15, color: '#A78BFA' },
      { label: 'PowerShell', value: 10, color: '#F472B6' },
    ],
  },
]

export default function Experience() {
  return (
    <section className="px-6 md:px-10 py-24" id="experience">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-5 mb-10"
        >
          <span className="font-mono text-[11px] text-muted">03</span>
          <span className="flex-1 h-px bg-border" />
          <h2 className="text-xs font-medium text-muted uppercase tracking-widest">Experience</h2>
        </motion.div>

        <div className="flex flex-col gap-5">
          {roles.map((role, i) => (
            <ExperienceCard key={role.title} role={role} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
