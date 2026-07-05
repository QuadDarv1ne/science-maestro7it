import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { About } from "@/components/site/about";
import { Stats } from "@/components/site/stats";
import { Timeline } from "@/components/site/timeline";
import { Publications } from "@/components/site/publications";
import { Projects } from "@/components/site/projects";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";
import { ScrollEnhancements } from "@/components/site/scroll-enhancements";
import { CommandPalette } from "@/components/site/command-palette";
import { ShortcutsHelp } from "@/components/site/shortcuts-help";
import {
  FavoritesProvider,
} from "@/components/site/favorites-context";
import {
  FavoritesPanel,
} from "@/components/site/favorites-panel";

export default function Home() {
  return (
    <FavoritesProvider>
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        {/* Skip-to-content link for keyboard users */}
        <a
          href="#publications"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-accent focus:text-accent-foreground focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg focus:outline-none"
        >
          Перейти к содержимому
        </a>
        <ScrollEnhancements />
        <CommandPalette />
        <ShortcutsHelp />
        <FavoritesPanel />
        <Header />
        <main className="flex-1">
          <Hero />
          <About />
          <Stats />
          <Timeline />
          <Publications />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </FavoritesProvider>
  );
}
