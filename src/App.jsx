import Navbar from "./sections/Navbar"
import Hero from "./sections/Hero"
import KnowledgeGraph from "./sections/KnowledgeGraph/index.jsx"
import Features from "./sections/Features"
import Capabilities from "./sections/Capabilities"
import HowItWorks from "./sections/HowItWorks"
import Footer from "./sections/Footer"

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <KnowledgeGraph />
        <Features />
        <HowItWorks />
      </main>
      <Footer />
    </>
  )
}