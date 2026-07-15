import { Cursor } from "./components/Cursor";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Projects } from "./components/Projects";
import { Experience } from "./components/Experience";
import { Skills } from "./components/Skills";
import { Contact } from "./components/Contact";

export default function App() {
  return (
    <div className="bg-zinc-950 min-h-screen">
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Projects />
        <Experience />
        <Skills />
      </main>
      <Contact />
    </div>
  );
}
