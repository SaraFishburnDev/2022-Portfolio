import Hero, {HeroProps} from "./components/blocks/Hero"
import siteContent from "./siteContent.json"
function App() {
  return (
    <main className="dark min-h-[100vh]">
      <Hero {...siteContent.hero as HeroProps} />
    </main>
  )
}

export default App
