import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Skills from './components/Skills'
import GitHubStats from './components/GitHubStats'
import Projects from './components/Projects'
import HackerNews from './components/HackerNews'
import Contact from './components/Contact'

export default function App() {
  return (
    <div className="min-h-screen bg-bg text-light">
      <Navbar />
      <main>
        <Hero />
        <Skills />
        <GitHubStats />
        <Projects />
        <HackerNews />
        <Contact />
      </main>
    </div>
  )
}
