import { Hero } from './components/Hero'
import { About } from './components/About'
import { Footer } from './components/Footer'

function App() {
  return (
    <div className="bg-[#09090b] min-h-screen">
      <Hero />
      <div
        className="h-px mx-6 sm:mx-14 bg-gradient-to-r from-transparent via-zinc-800 to-transparent"
        aria-hidden="true"
      />
      <About />
      <Footer />
    </div>
  )
}

export default App
