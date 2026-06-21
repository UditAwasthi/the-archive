import type { MDXComponents } from "mdx/types";

const components: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="font-serif text-3xl text-ink mb-4 tracking-tight">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="font-serif text-2xl text-ink mb-3 mt-8 tracking-tight">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-serif text-xl text-ink-light mb-2 mt-6">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="text-sm text-ink-light leading-relaxed mb-4">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="space-y-1.5 mb-4 ml-4">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="space-y-1.5 mb-4 ml-4 list-decimal">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="text-sm text-ink-light leading-relaxed flex items-start gap-2">
      <span className="w-1 h-1 rounded-full bg-ink-faint mt-2 shrink-0" />
      <span>{children}</span>
    </li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-accent-gold/30 pl-4 my-6 italic text-ink-muted">
      {children}
    </blockquote>
  ),
  code: ({ children }) => (
    <code className="font-mono text-xs bg-ink/[0.04] px-1.5 py-0.5 rounded text-ink-light">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="font-mono text-xs bg-ink/[0.04] p-4 rounded-lg overflow-x-auto mb-4">
      {children}
    </pre>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-accent-warm hover:text-accent-gold transition-colors underline underline-offset-2"
    >
      {children}
    </a>
  ),
  hr: () => <div className="w-12 h-px bg-accent-gold/40 my-8" />,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
