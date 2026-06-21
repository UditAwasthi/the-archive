"use client";

import { motion } from "framer-motion";
import { Target, Compass, Eye, Package } from "lucide-react";
import PageContent, {
  PageTitle,
  PageSubtitle,
  PageDivider,
} from "@/components/ui/PageContent";
import { futureItems } from "@/lib/content";
import type { FutureItem } from "@/types";

const categoryConfig: Record<FutureItem["category"], { icon: React.ReactNode; label: string }> = {
  goal: { icon: <Target size={14} />, label: "Goal" },
  mission: { icon: <Compass size={14} />, label: "Mission" },
  vision: { icon: <Eye size={14} />, label: "Vision" },
  product: { icon: <Package size={14} />, label: "Product" },
};

const priorityColors: Record<FutureItem["priority"], string> = {
  active: "#50b87a",
  planned: "#4a90d9",
  someday: "#9a9a9a",
};

function RoadmapPage() {
  const grouped = {
    active: futureItems.filter((i) => i.priority === "active"),
    planned: futureItems.filter((i) => i.priority === "planned"),
    someday: futureItems.filter((i) => i.priority === "someday"),
  };

  return (
    <PageContent>
      <PageTitle>Roadmap</PageTitle>
      <PageSubtitle>What comes next</PageSubtitle>

      {(["active", "planned", "someday"] as const).map((priority) => {
        const items = grouped[priority];
        if (items.length === 0) return null;

        return (
          <section key={priority} className="mb-8 sm:mb-10">
            <div className="flex items-center gap-2 mb-4 sm:mb-5">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: priorityColors[priority] }}
              />
              <h3 className="text-xs tracking-[0.2em] uppercase text-ink-faint font-medium">
                {priority === "active" ? "Active Now" : priority === "planned" ? "Planned" : "Someday"}
              </h3>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {items.map((item, i) => {
                const config = categoryConfig[item.category];
                return (
                  <motion.div
                    key={item.title}
                    className="border border-ink/5 rounded-lg p-4 sm:p-5 hover:border-ink/10 transition-colors"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.3 }}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-ink-muted">{config.icon}</span>
                        <h4 className="font-serif text-base text-ink">{item.title}</h4>
                      </div>
                      <span className="text-[10px] text-ink-faint font-mono shrink-0">
                        {item.timeline}
                      </span>
                    </div>

                    <p className="text-sm text-ink-muted leading-relaxed">{item.description}</p>

                    <div className="mt-3 pt-2 border-t border-ink/[0.04]">
                      <span className="text-[10px] tracking-[0.15em] uppercase text-ink-faint">
                        {config.label}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>
        );
      })}

      <PageDivider />

      <p className="text-xs text-ink-faint italic text-center">
        This roadmap is a living document. Priorities shift as new opportunities emerge.
      </p>
    </PageContent>
  );
}

export function getFutureReleasesPages() {
  return [
    { id: "roadmap", title: "Roadmap", content: <RoadmapPage /> },
  ];
}
