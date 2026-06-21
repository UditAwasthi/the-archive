"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { BookOpen, GraduationCap, Code, Target, Lightbulb } from "lucide-react";
import PageContent, {
  PageTitle,
  PageSubtitle,
  PageDivider,
  PageSection,
} from "@/components/ui/PageContent";
import { timeline, readingList, philosophy } from "@/lib/content";
import { siteConfig } from "@/lib/config";
import type { TimelineEntry } from "@/types";

const typeColors: Record<TimelineEntry["type"], string> = {
  education: "#4a90d9",
  career: "#50b87a",
  milestone: "#c8a96e",
  personal: "#c084fc",
};

const typeIcons: Record<TimelineEntry["type"], ReactNode> = {
  education: <GraduationCap size={14} />,
  career: <Code size={14} />,
  milestone: <Target size={14} />,
  personal: <Lightbulb size={14} />,
};

function TimelinePage() {
  return (
    <PageContent>
      <PageTitle>Timeline</PageTitle>
      <PageSubtitle>A chronological journey</PageSubtitle>

      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-px bg-ink/10" />

        {timeline.map((entry, i) => (
          <motion.div
            key={entry.year + entry.title}
            className="relative pl-12 pb-8 last:pb-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
          >
            <div
              className="absolute left-2.5 top-1 w-3 h-3 rounded-full border-2 bg-parchment"
              style={{ borderColor: typeColors[entry.type] }}
            />

            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs text-ink-faint">{entry.year}</span>
              <span style={{ color: typeColors[entry.type] }}>{typeIcons[entry.type]}</span>
            </div>

            <h4 className="font-serif text-base sm:text-lg text-ink mb-1">{entry.title}</h4>
            <p className="text-sm text-ink-muted leading-relaxed">{entry.description}</p>
          </motion.div>
        ))}
      </div>
    </PageContent>
  );
}

function JourneyPage() {
  return (
    <PageContent>
      <PageTitle>The Journey</PageTitle>
      <PageSubtitle>How it all began</PageSubtitle>

      <div className="space-y-6 text-ink-light leading-relaxed text-sm sm:text-base">
        <p>
          Every engineer has an origin story. Mine began not with a grand vision, but with curiosity — 
          a simple question about how things work, followed by the discovery that I could build them myself.
        </p>
        <p>
          The first program was nothing special. A few lines of C that printed text to a screen. 
          But it was the first time I felt the power of creation through code. The machine did exactly what I told it to do. 
          No ambiguity. No interpretation. Pure logic.
        </p>
        <p>
          From there, the path was set. Every late night debugging, every breakthrough moment, 
          every failed project — they all led here. To someone who builds not because they have to, 
          but because they cannot imagine doing anything else.
        </p>
      </div>

      <PageDivider />

      <p className="text-xs text-ink-faint italic">
        &ldquo;The only way to do great work is to love what you do.&rdquo;
      </p>
    </PageContent>
  );
}

function EducationPage() {
  return (
    <PageContent>
      <PageTitle>Education</PageTitle>
      <PageSubtitle>Formal foundations</PageSubtitle>

      <PageSection title="Academic Background">
        <div className="space-y-6">
          <div className="border border-ink/5 rounded-lg p-5 sm:p-6 bg-parchment-light/50">
            <div className="flex items-start gap-3">
              <GraduationCap size={20} className="text-accent-gold mt-0.5 shrink-0" />
              <div>
                <h4 className="font-serif text-base sm:text-lg text-ink">
                  Bachelor of Computer Science
                </h4>
                <p className="text-sm text-ink-muted mt-1">
                  Focused on algorithms, data structures, software engineering, and systems design.
                </p>
                <p className="text-xs text-ink-faint mt-2 font-mono">Ongoing</p>
              </div>
            </div>
          </div>
        </div>
      </PageSection>

      <PageSection title="Self-Directed Learning">
        <p className="text-sm text-ink-muted leading-relaxed">
          Beyond formal education, continuous self-learning through online courses, 
          open source contributions, competitive programming, and building real projects 
          has been the primary driver of growth.
        </p>
      </PageSection>
    </PageContent>
  );
}

function DiscoveryPage() {
  return (
    <PageContent>
      <PageTitle>Discovery</PageTitle>
      <PageSubtitle>Finding code</PageSubtitle>

      <div className="space-y-6 text-ink-light leading-relaxed text-sm sm:text-base">
        <p>
          Programming wasn&apos;t the first passion, but it became the deepest one. 
          The discovery happened gradually — through tinkering, through breaking things, 
          through the satisfaction of making something work.
        </p>
        <p>
          What started as curiosity about how websites worked turned into late nights 
          learning HTML, then CSS, then JavaScript. Each layer revealed a new world. 
          The frontend was art. The backend was architecture. Databases were libraries.
        </p>
        <p>
          The real breakthrough came with building the first full application — something 
          that solved a real problem, something that real people could use. That&apos;s when 
          code stopped being an exercise and became a craft.
        </p>
      </div>
    </PageContent>
  );
}

function MissionPage() {
  return (
    <PageContent>
      <PageTitle>Current Mission</PageTitle>
      <PageSubtitle>What drives {siteConfig.name} now</PageSubtitle>

      <div className="space-y-8">
        <div className="border-l-2 border-accent-gold/40 pl-5 sm:pl-6">
          <p className="font-serif text-lg sm:text-xl text-ink leading-relaxed italic">
            &ldquo;Build software that matters. Ship things that last. 
            Learn something new every single day.&rdquo;
          </p>
        </div>

        <PageSection title="Active Focus Areas">
          <div className="grid gap-4">
            {[
              { area: "Full-Stack Development", detail: "Next.js, React, TypeScript, Node.js" },
              { area: "System Design", detail: "Scalable architectures and distributed systems" },
              { area: "Open Source", detail: "Contributing to and building in public" },
              { area: "Product Thinking", detail: "Building with the user in mind" },
            ].map((item) => (
              <div key={item.area} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-accent-gold mt-2 shrink-0" />
                <div>
                  <span className="text-sm font-medium text-ink">{item.area}</span>
                  <p className="text-xs text-ink-muted mt-0.5">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </PageSection>
      </div>
    </PageContent>
  );
}

function ReadingPage() {
  return (
    <PageContent>
      <PageTitle>Reading List</PageTitle>
      <PageSubtitle>Books that shaped the thinking</PageSubtitle>

      <div className="space-y-3">
        {readingList.map((book, i) => (
          <motion.div
            key={book.title}
            className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg hover:bg-parchment-dark/30 transition-colors"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
          >
            <div className="shrink-0 mt-0.5">
              <BookOpen size={16} className="text-accent-gold/60" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-serif text-sm sm:text-base text-ink">{book.title}</h4>
              <p className="text-xs text-ink-muted mt-0.5">{book.author}</p>
            </div>
            <span className="text-[10px] tracking-wider uppercase text-ink-faint shrink-0">
              {book.category}
            </span>
          </motion.div>
        ))}
      </div>
    </PageContent>
  );
}

function PhilosophyPage() {
  return (
    <PageContent>
      <PageTitle>Philosophy</PageTitle>
      <PageSubtitle>Core beliefs</PageSubtitle>

      <div className="space-y-6 sm:space-y-8">
        {philosophy.map((belief, i) => (
          <motion.div
            key={i}
            className="relative pl-6 sm:pl-8"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
          >
            <span className="absolute left-0 top-0 font-serif text-2xl sm:text-3xl text-accent-gold/30">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="text-sm sm:text-base text-ink-light leading-relaxed pt-1">
              {belief}
            </p>
          </motion.div>
        ))}
      </div>

      <PageDivider />

      <p className="text-xs text-ink-faint italic text-center">
        These principles are not fixed. They evolve with experience.
      </p>
    </PageContent>
  );
}

export function getOriginsPages() {
  return [
    { id: "timeline", title: "Timeline", content: <TimelinePage /> },
    { id: "journey", title: "The Journey", content: <JourneyPage /> },
    { id: "education", title: "Education", content: <EducationPage /> },
    { id: "discovery", title: "Discovery", content: <DiscoveryPage /> },
    { id: "mission", title: "Current Mission", content: <MissionPage /> },
    { id: "reading", title: "Reading List", content: <ReadingPage /> },
    { id: "philosophy", title: "Philosophy", content: <PhilosophyPage /> },
  ];
}
