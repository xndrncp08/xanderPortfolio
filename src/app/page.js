import About from "@/components/About";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import GitHubActivity from "@/components/GitHubActivity";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Work from "@/components/Work";

// Re-render at most twice a day so GitHub data stays fresh without hitting the API per visit.
export const revalidate = 43200;

export default function Home() {
  return (
    <>
      <Hero />
      <Work />
      <About />
      <Experience />
      <Skills />
      <GitHubActivity />
      <Contact />
    </>
  );
}
