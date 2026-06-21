"use client";

import { motion } from "framer-motion";
import { FlaskConical, Lightbulb, Pause, Archive } from "lucide-react";
import PageContent, {
  PageTitle,
  PageSubtitle,
} from "@/components/ui/PageContent";
import { experiments } from "@/lib/content";
import type { Experiment } from "@/types";

const statusConfig: Record<Experiment["status"], { color: string; icon: React.ReactNode; label: string }> = {
  idea: { color: "#c084fc", icon: <Lightbulb size={14} />, label: "Idea" },
  prototype: { color: "#4a90d9", icon: <FlaskConical size={14} />, label: "Prototype" },
  exploring: { color: "#50b87a", icon: <FlaskConical size={14} />, label: "Exploring" },
  paused: { color: "#f59e0b", icon: <Pause size={14} />, label: "Paused" },
  abandoned: { color: "#9a9a9a", icon: <Archive size={14} />, label: "Abandoned" },
};

function LabNotesPage() {
  return (
    <PageContent>
      <PageTitle>Lab Notes</PageTitle>
      <PageSubtitle>Active explorations &amp; experiments</PageSubtitle>

      <div className="space-y-4 sm:space-y-5">
        {experiments.map((experiment, i) => {
          const config = statusConfig[experiment.status];
          return (
            <motion.div
              key={experiment.slug}
              className="border border-ink/5 rounded-lg p-4 sm:p-6 hover:border-ink/10 transition-colors"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <h4 className="font-serif text-base sm:text-lg text-ink">{experiment.title}</h4>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span style={{ color: config.color }}>{config.icon}</span>
                  <span className="text-[10px] uppercase tracking-wider" style={{ color: config.color }}>
                    {config.label}
                  </span>
                </div>
              </div>

              <p className="text-sm text-ink-muted leading-relaxed mb-3">
                {experiment.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {experiment.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] px-2 py-0.5 rounded-full bg-ink/[0.04] text-ink-faint"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Notes */}
              <div className="border-t border-ink/[0.04] pt-3 mt-3">
                <p className="text-[10px] tracking-[0.15em] uppercase text-ink-faint mb-1.5">
                  Research Notes
                </p>
                <p className="text-xs text-ink-muted leading-relaxed italic">
                  {experiment.notes}
                </p>
              </div>

              <p className="text-[10px] text-ink-faint font-mono mt-3">{experiment.date}</p>
            </motion.div>
          );
        })}
      </div>
    </PageContent>
  );
}

export function getExperimentsPages() {
  return [
    { id: "lab-notes", title: "Lab Notes", content: <LabNotesPage /> },
  ];
}
