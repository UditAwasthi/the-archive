"use client";

import { useState, useCallback, useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Book } from "@/types";

interface BookReaderProps {
  book: Book;
  onClose: () => void;
  pages: { id: string; title: string; content: ReactNode }[];
}

export default function BookReader({ book, onClose, pages }: BookReaderProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);

  const goToPage = useCallback(
    (index: number) => {
      if (index < 0 || index >= pages.length) return;
      setDirection(index > currentPage ? 1 : -1);
      setCurrentPage(index);
    },
    [currentPage, pages.length]
  );

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        goToPage(currentPage + 1);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        goToPage(currentPage - 1);
      } else if (e.key === "Escape") {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage, goToPage, onClose]);

  const pageVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  const page = pages[currentPage];
  const progress = ((currentPage + 1) / pages.length) * 100;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      <motion.div
        className="relative w-full max-w-6xl mx-4 h-[85vh] sm:h-[80vh] flex flex-col"
        initial={{ scale: 0.8, y: 40, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.8, y: 40, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3 sm:mb-4 px-1">
          <div className="flex items-center gap-3">
            <span
              className="text-xs tracking-[0.2em] uppercase font-medium"
              style={{ color: book.accentColor }}
            >
              {book.title}
            </span>
            <span className="text-white/30 text-xs">
              {currentPage + 1} / {pages.length}
            </span>
          </div>

          <button
            onClick={onClose}
            className="text-white/50 hover:text-white transition-colors p-1"
            aria-label="Close book"
          >
            <X size={20} />
          </button>
        </div>

        {/* Progress bar */}
        <div className="h-px bg-white/10 mb-3 sm:mb-4 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: book.accentColor }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Book spread */}
        <div className="flex-1 flex rounded-lg overflow-hidden shadow-2xl min-h-0">
          {/* Left page - Chapter navigation (desktop only) */}
          <div className="hidden lg:flex w-64 xl:w-72 paper-texture page-shadow-left flex-col">
            <div className="p-6 xl:p-8 flex-1 overflow-y-auto scrollbar-hide">
              <p className="text-[10px] tracking-[0.2em] uppercase text-ink-faint mb-6">
                Chapters
              </p>
              <nav className="space-y-1">
                {pages.map((p, i) => (
                  <button
                    key={p.id}
                    onClick={() => goToPage(i)}
                    className={`w-full text-left px-3 py-2.5 rounded transition-all text-sm ${
                      i === currentPage
                        ? "bg-accent-gold/10 text-ink font-medium"
                        : "text-ink-muted hover:text-ink hover:bg-black/[0.03]"
                    }`}
                  >
                    <span className="text-[10px] text-ink-faint mr-2">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {p.title}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Gutter */}
          <div className="hidden lg:block w-px bg-gutter" />

          {/* Right page - Content */}
          <div className="flex-1 relative bg-parchment overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentPage}
                custom={direction}
                variants={pageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute inset-0 overflow-y-auto scrollbar-hide page-shadow-right"
              >
                {page.content}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation controls */}
        <div className="flex items-center justify-between mt-3 sm:mt-4 px-1">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 0}
            className="flex items-center gap-1.5 text-white/40 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors text-sm"
            aria-label="Previous page"
          >
            <ChevronLeft size={16} />
            <span className="hidden sm:inline">Previous</span>
          </button>

          {/* Mobile chapter selector */}
          <div className="lg:hidden">
            <select
              value={currentPage}
              onChange={(e) => goToPage(Number(e.target.value))}
              className="bg-white/10 text-white/70 text-xs rounded px-2 py-1 border border-white/10"
            >
              {pages.map((p, i) => (
                <option key={p.id} value={i} className="bg-neutral-900">
                  {p.title}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === pages.length - 1}
            className="flex items-center gap-1.5 text-white/40 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors text-sm"
            aria-label="Next page"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
