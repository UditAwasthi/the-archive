"use client";

import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Lock } from "lucide-react";
import BookCover from "@/components/ui/BookCover";
import BookReader from "@/components/book/BookReader";
import { books } from "@/lib/books";
import { siteConfig } from "@/lib/config";
import { getOriginsPages } from "@/components/books/OriginsBook";
import { getFieldReportsPages } from "@/components/books/FieldReportsBook";
import { getCodeRecordsPages } from "@/components/books/CodeRecordsBook";
import { getProblemCodexPages } from "@/components/books/ProblemCodexBook";
import { getNetworkPages } from "@/components/books/NetworkBook";
import { getExperimentsPages } from "@/components/books/ExperimentsBook";
import { getFutureReleasesPages } from "@/components/books/FutureReleasesBook";
import { getSecretPages } from "@/components/books/SecretArchive";
import type { Book } from "@/types";
import { ReactNode } from "react";

function getPagesForBook(bookId: string): { id: string; title: string; content: ReactNode }[] {
  switch (bookId) {
    case "origins":
      return getOriginsPages();
    case "field-reports":
      return getFieldReportsPages();
    case "code-records":
      return getCodeRecordsPages();
    case "problem-codex":
      return getProblemCodexPages();
    case "network":
      return getNetworkPages();
    case "experiments":
      return getExperimentsPages();
    case "future-releases":
      return getFutureReleasesPages();
    case "secret":
      return getSecretPages();
    default:
      return [];
  }
}

export default function Archive() {
  const [openBook, setOpenBook] = useState<Book | null>(null);
  const [secretUnlocked, setSecretUnlocked] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const handleOpenBook = useCallback((book: Book) => {
    setOpenBook(book);
    document.body.style.overflow = "hidden";
  }, []);

  const handleCloseBook = useCallback(() => {
    setOpenBook(null);
    document.body.style.overflow = "";
  }, []);

  const handleSecretClick = useCallback(() => {
    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (newCount >= 7) {
      setSecretUnlocked(true);
      setShowHint(false);
    } else if (newCount >= 3) {
      setShowHint(true);
    }
  }, [clickCount]);

  useEffect(() => {
    if (showHint) {
      const timer = setTimeout(() => setShowHint(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showHint]);

  const secretBook: Book = {
    id: "secret",
    title: "Hidden",
    subtitle: "The secret archive",
    color: "#1a1a1a",
    accentColor: "#c8a96e",
    icon: "compass",
    chapters: [{ id: "hidden", title: "Hidden Archive" }],
  };

  return (
    <div className="min-h-screen bg-shelf-wood">
      {/* Header */}
      <header className="pt-12 sm:pt-16 md:pt-20 pb-6 sm:pb-8 px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[10px] sm:text-xs tracking-[0.4em] uppercase text-white/30 mb-3 sm:mb-4">
            The personal collection of
          </p>
          <h1
            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white/90 tracking-tight cursor-default"
            onClick={handleSecretClick}
          >
            {siteConfig.name}
          </h1>
          <div className="w-12 sm:w-16 h-px bg-accent-gold/30 mx-auto mt-4 sm:mt-6" />
          <p className="text-xs sm:text-sm text-white/25 mt-3 sm:mt-4 tracking-widest uppercase">
            The Archive
          </p>
        </motion.div>

        {/* Secret hint */}
        <AnimatePresence>
          {showHint && (
            <motion.p
              className="text-[10px] text-accent-gold/40 mt-4 italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Keep going... {7 - clickCount} more
            </motion.p>
          )}
        </AnimatePresence>
      </header>

      {/* Bookshelf */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        {/* Shelf */}
        <div className="mb-12 sm:mb-16">
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 pb-6 sm:pb-8">
            {books.map((book, i) => (
              <BookCover
                key={book.id}
                book={book}
                onClick={() => handleOpenBook(book)}
                index={i}
              />
            ))}

            {/* Secret book */}
            <AnimatePresence>
              {secretUnlocked && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ type: "spring", damping: 15, stiffness: 200 }}
                >
                  <BookCover
                    book={secretBook}
                    onClick={() => handleOpenBook(secretBook)}
                    index={books.length}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Shelf line */}
          <div className="shelf-shadow h-3 sm:h-4 bg-gradient-to-b from-shelf-wood-light to-shelf-wood rounded-b-sm" />
        </div>

        {/* Secret unlock indicator */}
        {secretUnlocked && (
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 text-accent-gold/40 text-xs">
              <Lock size={12} />
              <span className="tracking-wider">Hidden archive unlocked</span>
            </div>
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-8 sm:py-12 text-center border-t border-white/5">
        <p className="text-[10px] sm:text-xs text-white/20 tracking-[0.3em] uppercase">
          A living archive \u2014 {new Date().getFullYear()}
        </p>
      </footer>

      {/* Book Reader */}
      <AnimatePresence>
        {openBook && (
          <BookReader
            book={openBook}
            onClose={handleCloseBook}
            pages={getPagesForBook(openBook.id)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
