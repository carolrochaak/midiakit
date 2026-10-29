import { About } from "@/components/sections/About";
import { Audience } from "@/components/sections/Audience";
import { Contact } from "@/components/sections/Contact";
import { Craft } from "@/components/sections/Craft";
import { Formats } from "@/components/sections/Formats";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Measures } from "@/components/sections/Measures";
import { Numbers } from "@/components/sections/Numbers";
import { Header } from "@/components/ui/Header";
import { MotionProvider } from "@/components/ui/MotionProvider";

export default function MediaKitPage() {
  return (
    <MotionProvider>
      <Header />
      <main id="conteudo" tabIndex={-1} className="outline-none">
        <Hero />
        <Marquee />
        <About />
        <Numbers />
        <Audience />
        <Craft />
        <Formats />
        <Measures />
        <Contact />
      </main>
    </MotionProvider>
  );
}
