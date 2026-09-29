import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import About from "@/components/About";
import Stack from "@/components/Stack";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Reveal from "@/components/Reveal";
import ResumeViewer from "@/components/ResumeViewer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Work />
        <About />
        <Stack />
        <Experience />
        <Contact />
      </main>
      <ResumeViewer />
      <Reveal />
    </>
  );
}
