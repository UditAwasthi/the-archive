"use client";

import { motion } from "framer-motion";
import { ExternalLink, Layers, AlertTriangle, CheckCircle } from "lucide-react";
import PageContent, {
  PageTitle,
  PageSubtitle,
  PageDivider,
} from "@/components/ui/PageContent";
import { projects } from "@/lib/content";
import type { Project } from "@/types";

const statusColors: Record<Project["status"], string> = {
  active: "#50b87a",
  completed: "#4a90d9",
  archived: "#9a9a9a",
};

function ProjectIndexPage() {
  return (
    <PageContent>
      <PageTitle>Mission Index</PageTitle>
      <PageSubtitle>All field operations</PageSubtitle>

      <div className="space-y-4">
        {projects.map((project, i) => (
          <motion.div
            key={project.slug}
            className="border border-ink/5 rounded-lg p-4 sm:p-5 hover:border-ink/10 transition-colors bg-parchment-light/30"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h4 className="font-serif text-base sm:text-lg text-ink">{project.title}</h4>
                <p className="text-xs text-ink-muted mt-1 leading-relaxed">{project.mission}</p>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: statusColors[project.status] }}
                />
                <span className="text-[10px] uppercase tracking-wider text-ink-faint">
                  {project.status}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 mt-3">
              {project.stack.slice(0, 5).map((tech) => (
                <span
                  key={tech}
                  className="text-[10px] px-2 py-0.5 rounded-full bg-ink/[0.04] text-ink-muted"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="text-[10px] text-ink-faint mt-2 font-mono">{project.year}</div>
          </motion.div>
        ))}
      </div>

      <PageDivider />
      <p className="text-xs text-ink-faint italic text-center">
        Select a project from the chapter list for the full report.
      </p>
    </PageContent>
  );
}

function ProjectReportPage({ project }: { project: Project }) {
  return (
    <PageContent>
      <div className="flex items-center gap-2 mb-1">
        <div
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: statusColors[project.status] }}
        />
        <span className="text-[10px] uppercase tracking-[0.15em] text-ink-faint">
          Field Report \u2014 {project.status}
        </span>
      </div>
      <PageTitle>{project.title}</PageTitle>
      <PageSubtitle>{project.year}</PageSubtitle>

      {/* Mission */}
      <section className="mb-8">
        <h3 className="font-serif text-sm uppercase tracking-[0.15em] text-ink-faint mb-3">Mission</h3>
        <p className="text-sm sm:text-base text-ink-light leading-relaxed border-l-2 border-accent-gold/30 pl-4 sm:pl-5 italic">
          {project.mission}
        </p>
      </section>

      {/* Problem */}
      <section className="mb-8">
        <h3 className="font-serif text-sm uppercase tracking-[0.15em] text-ink-faint mb-3 flex items-center gap-2">
          <AlertTriangle size={14} className="text-amber-600/60" />
          Problem
        </h3>
        <p className="text-sm text-ink-light leading-relaxed">{project.problem}</p>
      </section>

      {/* Solution */}
      <section className="mb-8">
        <h3 className="font-serif text-sm uppercase tracking-[0.15em] text-ink-faint mb-3 flex items-center gap-2">
          <CheckCircle size={14} className="text-emerald-600/60" />
          Solution
        </h3>
        <p className="text-sm text-ink-light leading-relaxed">{project.solution}</p>
      </section>

      {/* Architecture */}
      <section className="mb-8">
        <h3 className="font-serif text-sm uppercase tracking-[0.15em] text-ink-faint mb-3 flex items-center gap-2">
          <Layers size={14} className="text-blue-600/60" />
          Architecture
        </h3>
        <p className="text-sm text-ink-light leading-relaxed">{project.architecture}</p>
      </section>

      {/* Stack */}
      <section className="mb-8">
        <h3 className="font-serif text-sm uppercase tracking-[0.15em] text-ink-faint mb-3">Stack</h3>
        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="text-xs px-3 py-1 rounded-full bg-ink/[0.04] text-ink-muted border border-ink/[0.06]"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* Challenges */}
      <section className="mb-8">
        <h3 className="font-serif text-sm uppercase tracking-[0.15em] text-ink-faint mb-3">Challenges</h3>
        <ul className="space-y-2">
          {project.challenges.map((challenge) => (
            <li key={challenge} className="flex items-start gap-2.5 text-sm text-ink-light">
              <span className="w-1 h-1 rounded-full bg-ink-faint mt-2 shrink-0" />
              {challenge}
            </li>
          ))}
        </ul>
      </section>

      {/* Results */}
      <section className="mb-8">
        <h3 className="font-serif text-sm uppercase tracking-[0.15em] text-ink-faint mb-3">Results</h3>
        <ul className="space-y-2">
          {project.results.map((result) => (
            <li key={result} className="flex items-start gap-2.5 text-sm text-ink-light">
              <span className="w-1 h-1 rounded-full bg-emerald-500/60 mt-2 shrink-0" />
              {result}
            </li>
          ))}
        </ul>
      </section>

      {/* Links */}
      {project.links.length > 0 && (
        <section>
          <h3 className="font-serif text-sm uppercase tracking-[0.15em] text-ink-faint mb-3">Links</h3>
          <div className="space-y-2">
            {project.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-accent-warm hover:text-accent-gold transition-colors"
              >
                <ExternalLink size={14} />
                {link.label}
              </a>
            ))}
          </div>
        </section>
      )}
    </PageContent>
  );
}

export function getFieldReportsPages() {
  const pages = [
    { id: "overview", title: "Mission Index", content: <ProjectIndexPage /> },
  ];

  for (const project of projects) {
    pages.push({
      id: project.slug,
      title: project.title,
      content: <ProjectReportPage project={project} />,
    });
  }

  return pages;
}
