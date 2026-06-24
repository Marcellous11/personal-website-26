import { motion } from 'framer-motion'

// Hand-picked highlights — the work I want to point people to first.
// Add a new entry here to feature it; drop a screenshot in /public/work and
// reference it via `image`. Leave `image: null` for a styled placeholder.
const featured = [
  {
    title: "SAW Women's Conference",
    category: 'Full-Stack · Event Platform',
    blurb:
      'Registration + check-in platform for the U.S. Southwest Area Women’s Conference. Next.js 16 on Vercel, Neon Postgres, QR-coded confirmation emails via Resend, and a full accessibility flow — built to scale for a ~3,000-person event.',
    tags: ['Next.js 16', 'Postgres', 'Resend', 'Tailwind'],
    image: '/work/womens-conference.jpg',
    live: 'https://www.usswawomensconference.com/en',
    github: null,
  },
  {
    title: 'Invoke CRM',
    category: 'Full-Stack · Internal Tooling',
    blurb:
      'Customer relationship platform for Invoke — pipeline, contacts, and deal tracking with a Supabase backend. Private codebase; preview available on request.',
    tags: ['Next.js', 'Supabase', 'TypeScript'],
    image: null,
    monogram: 'CRM',
    live: null,
    github: null,
    private: true,
  },
]

function CardMedia({ image, title, monogram }) {
  if (image) {
    return (
      <div className="aspect-[16/10] overflow-hidden border-b border-ink bg-paper-deep">
        <img
          src={image}
          alt={`${title} preview`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
      </div>
    )
  }

  // Intentional placeholder for private / image-less projects.
  return (
    <div className="relative aspect-[16/10] overflow-hidden border-b border-ink bg-paper-deep">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(30,76,168,0.18),transparent_60%)]" />
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, transparent, transparent 11px, rgba(26,22,18,0.05) 11px, rgba(26,22,18,0.05) 12px)',
        }}
      />
      <div className="relative flex h-full items-center justify-center">
        <span className="font-mono text-4xl md:text-5xl tracking-tight text-ink/70 transition-transform duration-500 group-hover:scale-105">
          {monogram}
        </span>
      </div>
    </div>
  )
}

function FeaturedCard({ project, index }) {
  const { title, category, blurb, tags, image, monogram, live, github } = project

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col overflow-hidden rounded-atelier-card border border-ink bg-surface transition-shadow duration-300 hover:shadow-[4px_4px_0_0_rgba(26,22,18,1)]"
    >
      <CardMedia image={image} title={title} monogram={monogram} />

      <div className="flex flex-1 flex-col gap-3 p-5 md:p-6">
        <span className="font-mono text-[10px] uppercase tracking-widest text-accent">
          {category}
        </span>
        <h3 className="text-lg md:text-xl font-medium text-ink">{title}</h3>
        <p className="text-sm leading-relaxed text-muted">{blurb}</p>

        <div className="mt-1 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-atelier-md border border-ink bg-paper-deep px-2.5 py-1 text-xs text-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center gap-4 pt-3">
          {live && (
            <a
              href={live}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-accent transition-colors duration-200 hover:text-accent-dim"
            >
              Live &rarr;
            </a>
          )}
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-accent transition-colors duration-200 hover:text-accent-dim"
            >
              GitHub &rarr;
            </a>
          )}
          {project.private && (
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-light">
              Private repo
            </span>
          )}
        </div>
      </div>
    </motion.article>
  )
}

export default function FeaturedWork() {
  return (
    <div className="mb-16">
      <p className="mb-6 font-mono text-[10px] uppercase tracking-widest text-muted">
        Featured
      </p>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {featured.map((project, i) => (
          <FeaturedCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </div>
  )
}
