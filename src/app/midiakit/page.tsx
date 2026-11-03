import { About } from "@/components/sections/About";
import { Audience } from "@/components/sections/Audience";
import { Contact } from "@/components/sections/Contact";
import { Craft } from "@/components/sections/Craft";
import { Footer } from "@/components/sections/Footer";
import { Formats } from "@/components/sections/Formats";
import { Hero } from "@/components/sections/Hero";
import { Measures } from "@/components/sections/Measures";
import { Numbers } from "@/components/sections/Numbers";
import { Quote } from "@/components/sections/Quote";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { Header } from "@/components/ui/Header";
import { MotionProvider } from "@/components/ui/MotionProvider";

export default function MediaKitPage() {
  return (
    <MotionProvider>
      <Header />
      <main id="conteudo" tabIndex={-1} className="outline-none">
        <Hero />
        <About />
        <Numbers />
        <Audience />
        <Craft />
        <Formats />
        <Measures />
        <Quote />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </MotionProvider>
  );
}
