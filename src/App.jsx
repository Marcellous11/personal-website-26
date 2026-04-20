import { motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Skills from './components/Skills'
import GitHubStats from './components/GitHubStats'
import StoicQuote from './components/StoicQuote'
import Projects from './components/Projects'
import Experience from './components/Experience'
import HackerNews from './components/HackerNews'
import SpotifyCard from './components/SpotifyCard'
import StravaCard from './components/StravaCard'
import PhilosophyTerminal from './components/PhilosophyTerminal'
import Timeline from './components/Timeline'
import Contact from './components/Contact'

export default function App() {
  return (
    <div className="min-h-screen bg-bg text-light">
      <Navbar />
      <main>
        <Hero />
        <Skills />
        <Projects />
        <Experience />

        {/* Live section — bento grid */}
        <section className="px-6 md:px-10 py-24">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-5 mb-10"
            >
              <span className="font-mono text-[11px] text-muted">04</span>
              <span className="flex-1 h-px bg-border" />
              <h2 className="text-xs font-medium text-muted uppercase tracking-widest">Live</h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-5">
              <div className="flex flex-col gap-5">
                <GitHubStats />
                <StoicQuote />
              </div>
              <div className="flex flex-col gap-5">
                <SpotifyCard />
                <HackerNews />
              </div>
            </div>
            <div className="mt-5">
              <StravaCard />
            </div>
          </div>
        </section>

        {/* Mind & Journey section — philosophy terminal + career timeline */}
        <section className="px-6 md:px-10 py-24">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-5 mb-10"
            >
              <span className="font-mono text-[11px] text-muted">05</span>
              <span className="flex-1 h-px bg-border" />
              <h2 className="text-xs font-medium text-muted uppercase tracking-widest">Mind & Journey</h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-5">
              <PhilosophyTerminal />
              <Timeline />
            </div>
          </div>
        </section>

        <Contact />
      </main>
    </div>
  )
}
