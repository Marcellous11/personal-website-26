import ExperienceCard from '@/components/experience/ExperienceCard'
import SectionHeader from '@/components/ui/SectionHeader'

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
      { name: 'PRD Generator (AcqDemo)',        short: 'PRD Generator',      value: 280 / 60, display: '280 PRDs/hr · 100+ hrs/yr saved', color: '#1E4CA8' },
      { name: 'Cyber Controls (MRO)',           short: 'Cyber Controls',     value: 20,       display: '20 controls / min',               color: '#8FB5C7' },
      { name: 'Code Modernization (ADIS)',      short: 'Code Modernization', value: 3.5,      display: 'COBOL → React via AI agents',     color: '#D9A42A' },
      { name: 'Transcript Upload (Air Univ.)',  short: 'Transcript Upload',  value: 2.5,      display: 'LLM + PowerShell → SAP (DoD)',    color: '#C84536' },
    ],
    techMix: [
      { label: 'RAG / LLM',   value: 40, color: '#1E4CA8' },
      { label: 'Python',      value: 30, color: '#8FB5C7' },
      { label: 'PowerShell',  value: 20, color: '#D9A42A' },
      { label: 'React/Next',  value: 10, color: '#C84536' },
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
      { name: 'Patrick Space Force Base', short: 'Patrick SFB',     value: 1478, display: '1,478 hrs/yr · 18 automations', color: '#1E4CA8' },
      { name: 'DCII — Security Forces Quantico', short: 'DCII (Quantico)', value: 1000, display: '1,000 hrs/yr · AFJIS navigation', color: '#8FB5C7' },
      { name: 'Road Show Trainings', short: 'Road Shows',     value: 522,  display: '11 events · 100+ personnel trained', color: '#D9A42A' },
    ],
    techMix: [
      { label: 'UiPath',     value: 55, color: '#1E4CA8' },
      { label: 'Python',     value: 20, color: '#8FB5C7' },
      { label: 'C#',         value: 15, color: '#D9A42A' },
      { label: 'PowerShell', value: 10, color: '#C84536' },
    ],
  },
]

export default function Experience() {
  return (
    <section className="px-6 md:px-10 py-24" id="experience">
      <div className="max-w-7xl mx-auto">
        <SectionHeader number="03" title="Experience" className="mb-10" />

        <div className="flex flex-col gap-5">
          {roles.map((role, i) => (
            <ExperienceCard key={role.title} role={role} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
