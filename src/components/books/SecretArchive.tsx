"use client";

import { motion } from "framer-motion";
import { Lock, BookOpen, Heart, Brain, Pen } from "lucide-react";
import PageContent, {
  PageTitle,
  PageSubtitle,
  PageDivider,
  PageSection,
} from "@/components/ui/PageContent";
import { secretContent } from "@/lib/content";

function SecretPage() {
  return (
    <PageContent>
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", damping: 15, stiffness: 200 }}
          className="inline-block mb-4"
        >
          <Lock size={24} className="text-accent-gold" />
        </motion.div>
        <PageTitle>Hidden Archive</PageTitle>
        <PageSubtitle>You found the secret collection</PageSubtitle>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <PageSection title="Favorite Books">
          <div className="space-y-3">
            {secretContent.favoriteBooks.map((book) => (
              <div key={book.title} className="flex items-start gap-3">
                <BookOpen size={14} className="text-accent-gold/50 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-ink font-serif">{book.title}</p>
                  <p className="text-xs text-ink-faint">{book.author}</p>
                </div>
              </div>
            ))}
          </div>
        </PageSection>

        <PageDivider />

        <PageSection title="Current Obsessions">
          <div className="space-y-2.5">
            {secretContent.currentObsessions.map((obsession) => (
              <div key={obsession} className="flex items-start gap-2.5">
                <Heart size={12} className="text-rose-400/50 mt-1 shrink-0" />
                <p className="text-sm text-ink-light">{obsession}</p>
              </div>
            ))}
          </div>
        </PageSection>

        <PageDivider />

        <PageSection title="Lessons Learned">
          <div className="space-y-4">
            {secretContent.lessonsLearned.map((lesson, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.3 }}
              >
                <Brain size={12} className="text-purple-400/50 mt-1 shrink-0" />
                <p className="text-sm text-ink-light italic leading-relaxed">{lesson}</p>
              </motion.div>
            ))}
          </div>
        </PageSection>

        <PageDivider />

        <PageSection title="Personal Notes">
          <div className="space-y-3">
            {secretContent.personalNotes.map((note) => (
              <div key={note} className="flex items-start gap-2.5">
                <Pen size={12} className="text-ink-faint mt-1 shrink-0" />
                <p className="text-xs text-ink-muted leading-relaxed">{note}</p>
              </div>
            ))}
          </div>
        </PageSection>
      </motion.div>
    </PageContent>
  );
}

export function getSecretPages() {
  return [
    { id: "hidden", title: "Hidden Archive", content: <SecretPage /> },
  ];
}
