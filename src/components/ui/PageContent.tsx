"use client";

import { ReactNode } from "react";

interface PageContentProps {
  children: ReactNode;
  className?: string;
}

export default function PageContent({ children, className = "" }: PageContentProps) {
  return (
    <div className={`paper-texture min-h-full p-6 sm:p-8 md:p-12 ${className}`}>
      <div className="max-w-2xl mx-auto">
        {children}
      </div>
    </div>
  );
}

export function PageTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-ink mb-2 tracking-tight">
      {children}
    </h2>
  );
}

export function PageSubtitle({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs sm:text-sm text-ink-muted tracking-[0.15em] uppercase mb-8 sm:mb-12">
      {children}
    </p>
  );
}

export function PageDivider() {
  return <div className="w-12 h-px bg-accent-gold/40 my-8 sm:my-12" />;
}

export function PageSection({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <section className="mb-8 sm:mb-12">
      {title && (
        <h3 className="font-serif text-lg sm:text-xl text-ink-light mb-4 sm:mb-6">
          {title}
        </h3>
      )}
      {children}
    </section>
  );
}
