import SheetProvider from "@/components/SheetProvider";
import Reveal from "@/components/Reveal";
import LightsOut from "@/components/race/LightsOut";
import SmoothScroll from "@/components/race/SmoothScroll";
import SpeedLines from "@/components/race/SpeedLines";
import Reticle from "@/components/race/Reticle";
import Hud from "@/components/race/Hud";
import Hero from "@/components/race/Hero";
import Podium from "@/components/race/Podium";
import Driver from "@/components/race/Driver";
import Season from "@/components/race/Season";
import PitWall from "@/components/race/PitWall";

export default function Home() {
  return (
    <SheetProvider>
      <LightsOut />
      <SmoothScroll />
      <SpeedLines />
      <Reticle />
      <Hud />
      <main className="relative z-[2]">
        <Hero />
        <Podium />
        <Driver />
        <Season />
        <PitWall />
      </main>
      <Reveal />
    </SheetProvider>
  );
}
