"use client";

import { motion } from "framer-motion";
import {
  Compass,
  FileText,
  GitBranch,
  Brain,
  Globe,
  FlaskConical,
  Rocket,
} from "lucide-react";
import type { Book } from "@/types";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  compass: Compass,
  "file-text": FileText,
  "git-branch": GitBranch,
  brain: Brain,
  globe: Globe,
  "flask-conical": FlaskConical,
  rocket: Rocket,
};

interface BookCoverProps {
  book: Book;
  onClick: () => void;
  index: number;
}

export default function BookCover({ book, onClick, index }: BookCoverProps) {
  const Icon = iconMap[book.icon] || FileText;

  return (
    <motion.button
      onClick={onClick}
      className="group relative flex flex-col items-center cursor-pointer focus:outline-none"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -12 }}
      whileTap={{ scale: 0.97 }}
      aria-label={`Open ${book.title}`}
    >
      <div
        className="relative w-36 h-52 sm:w-44 sm:h-64 md:w-48 md:h-72 rounded-sm overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${book.color} 0%, ${book.color}ee 100%)`,
          boxShadow: `4px 4px 16px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05) inset`,
        }}
      >
        <div className="book-spine absolute inset-0" />

        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-6 text-center">
          <div
            className="mb-3 sm:mb-4 opacity-60 group-hover:opacity-100 transition-opacity duration-300"
            style={{ color: book.accentColor }}
          >
            <Icon size={28} />
          </div>

          <div className="w-8 h-px mb-3 sm:mb-4 opacity-30" style={{ backgroundColor: book.accentColor }} />

          <h3
            className="font-serif text-sm sm:text-base md:text-lg font-semibold tracking-wide uppercase leading-tight"
            style={{ color: book.accentColor }}
          >
            {book.title}
          </h3>

          <p className="mt-1.5 sm:mt-2 text-[10px] sm:text-xs opacity-50 tracking-wider uppercase text-white/70">
            {book.subtitle}
          </p>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ backgroundColor: book.accentColor }}
        />
      </div>

      <div
        className="mt-3 sm:mt-4 text-[10px] sm:text-xs tracking-[0.2em] uppercase opacity-40 group-hover:opacity-70 transition-opacity"
        style={{ color: book.accentColor }}
      >
        Vol. {String(index + 1).padStart(2, "0")}
      </div>
    </motion.button>
  );
}
