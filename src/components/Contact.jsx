import { motion } from 'framer-motion'

const socials = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/m-curtis-jr',
    label: 'linkedin.com/in/m-curtis-jr',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: 'GitHub',
    href: 'https://github.com/Marcellous11',
    label: 'github.com/Marcellous11',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    name: 'Email',
    href: 'mailto:1mcj001@gmail.com',
    label: '1mcj001@gmail.com',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
]

export default function Contact() {
  return (
    <section id="contact" className="px-6 md:px-10 py-24">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-5 mb-16"
        >
          <span className="font-mono text-[11px] text-muted">05</span>
          <span className="flex-1 h-px bg-border" />
          <h2 className="text-xs font-medium text-muted uppercase tracking-widest">Contact</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
          {/* Left: headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 className="text-4xl md:text-5xl font-black text-light leading-tight tracking-tight mb-6">
              Let&apos;s<br />
              <span className="text-accent">build</span><br />
              something.
            </h3>
            <p className="text-muted text-sm leading-relaxed max-w-xs">
              Open to new opportunities, collaborations, or just a good tech conversation.
            </p>
          </motion.div>

          {/* Right: links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-0 border-t border-border"
          >
            {socials.map((social, i) => (
              <a
                key={social.name}
                href={social.href}
                target={social.name !== 'Email' ? '_blank' : undefined}
                rel={social.name !== 'Email' ? 'noopener noreferrer' : undefined}
                className="flex items-center justify-between py-5 border-b border-border group hover:bg-white/[0.02] -mx-2 px-2 rounded transition-colors duration-150"
              >
                <div className="flex items-center gap-3">
                  <span className="text-muted group-hover:text-accent transition-colors duration-200">
                    {social.icon}
                  </span>
                  <div>
                    <p className="text-xs font-medium text-muted uppercase tracking-wider">{social.name}</p>
                    <p className="text-sm text-light mt-0.5">{social.label}</p>
                  </div>
                </div>
                <svg
                  width="12" height="12" viewBox="0 0 12 12" fill="none"
                  className="text-muted group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                >
                  <path d="M1 11L11 1M11 1H4M11 1V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-20 flex flex-col sm:flex-row items-center justify-between gap-3"
        >
          <p className="text-[11px] text-muted/40 font-mono">
            © {new Date().getFullYear()} Marcellous Curtis Jr · React + Vite + Tailwind · Cloudflare
          </p>
          <a
            href="https://claude.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[11px] text-muted/40 hover:text-muted transition-colors duration-200 font-mono group"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-accent/40 group-hover:text-accent transition-colors duration-200">
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 2c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8zm-.5 3v5.5l4.5 2.5-.75-1.3-3.25-1.9V7h-1z" />
            </svg>
            Powered by Claude AI
          </a>
        </motion.div>
      </div>
    </section>
  )
}
