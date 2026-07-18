import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Skills from './components/Skills'
import GitHubStats from './components/GitHubStats'
import StoicQuote from './components/StoicQuote'
import Projects from './components/Projects'
import Experience from './components/Experience'
import HackerNews from './components/HackerNews'
import SpotifyCard from './components/SpotifyCard'
import PhilosophyTerminal from './components/PhilosophyTerminal'
import Timeline from './components/Timeline'
import Contact from './components/Contact'
import SectionHeader from './components/ui/SectionHeader'
import IntroSplash from './components/IntroSplash'
import VisitGreeting from './components/VisitGreeting'
import { useState } from 'react'

export default function App() {
  const [introDone, setIntroDone] = useState(false)

  return (
    <div className="min-h-screen bg-paper text-ink">
      <IntroSplash onComplete={() => setIntroDone(true)} />
      {introDone && <VisitGreeting delay={400} />}
      <Navbar />
      <main>
        <Hero />
        <Skills />
        <Projects />
        <Experience />

        {/* Live section — bento grid */}
        <section className="px-6 md:px-10 py-16">
          <div className="max-w-7xl mx-auto">
            <SectionHeader number="04" title="Live" className="mb-8" />

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
          </div>
        </section>

        {/* Mind & Journey section — philosophy terminal + career timeline */}
        <section className="px-6 md:px-10 py-16">
          <div className="max-w-7xl mx-auto">
            <SectionHeader number="05" title="Mind & Journey" className="mb-8" />

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
