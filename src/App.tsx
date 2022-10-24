import { useState } from "react"
import Hero, {HeroProps} from "./components/blocks/Hero"
import SkillsBackground from "./components/molecules/SkillsBackground"
import siteContent from "./siteContent.json"
function App() {

  const [animateStars, setAnimateStars] = useState(false)
  return (
    <main className="dark min-h-[100vh]">
      <div
        onMouseEnter={() => setAnimateStars(true)}
        onMouseLeave={() => setAnimateStars(false)}>
        <Hero {...siteContent.hero as HeroProps} />
      </div>
      <SkillsBackground
        density={15} 
        width={500} 
        height={500}
        circle={true}
        twinkle={true}
        expanded={animateStars}
        // sizeVariation={[2, 4, 6, 8, 10]}
        // icons={[
        //   "simple-icons:scratch",
        //   "akar-icons:python-fill",
        //   "mdi:language-ruby-on-rails",
        //   "cib:ruby",
        //   "akar-icons:typescript-fill"
        // ]} 
        />
    </main>
  )
}

export default App
