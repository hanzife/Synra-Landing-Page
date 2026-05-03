import Navbar from "./sections/Navbar"
import Hero from "./sections/Hero"
import KnowledgeGraph from "./sections/KnowledgeGraph/index.jsx"
import Features from "./sections/Features"

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <KnowledgeGraph />
        <Features />

      </main>
    </>
  )
}