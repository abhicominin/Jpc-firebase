import Hero from "./_pagesections/hero/hero";
import About from "./_pagesections/about/about";
import Players from "./_pagesections/players/players";
import Reports from "./_pagesections/reports/reports";
import Sponsors from "./_pagesections/sponsors/sponsors";
import Footer from "./_pagesections/footer/footer";
import LenisProvider from "./providers/lenis-provider";
import Particles from "./_pagesections/particles";

export default function Home() {
  return (
    <LenisProvider>
      {/* z-0: particles sit above body bg but below page content */}
      <Particles />
      {/* z-[1] + relative: forms a stacking context above the particle layer */}
      <div className="flex flex-col min-h-screen relative z-[1]">
        <Hero />
        <About />
        <Sponsors />
        <Players />
        <Reports />
        <Footer />
      </div>
    </LenisProvider>
  );
}