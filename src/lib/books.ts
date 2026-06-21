import type { Book } from "@/types";

export const books: Book[] = [
  {
    id: "origins",
    title: "Origins",
    subtitle: "The personal chronicle",
    color: "#1a1a2e",
    accentColor: "#e2c799",
    icon: "compass",
    chapters: [
      { id: "timeline", title: "Timeline", subtitle: "A chronological journey" },
      { id: "journey", title: "The Journey", subtitle: "How it all began" },
      { id: "education", title: "Education", subtitle: "Formal foundations" },
      { id: "discovery", title: "Discovery", subtitle: "Finding code" },
      { id: "mission", title: "Current Mission", subtitle: "What drives me now" },
      { id: "reading", title: "Reading List", subtitle: "Books that shaped me" },
      { id: "philosophy", title: "Philosophy", subtitle: "Core beliefs" },
    ],
  },
  {
    id: "field-reports",
    title: "Field Reports",
    subtitle: "Project case studies",
    color: "#16213e",
    accentColor: "#a3b18a",
    icon: "file-text",
    chapters: [
      { id: "overview", title: "Mission Index", subtitle: "All operations" },
    ],
  },
  {
    id: "code-records",
    title: "Code Records",
    subtitle: "Development activity",
    color: "#0f3460",
    accentColor: "#90e0ef",
    icon: "git-branch",
    chapters: [
      { id: "profile", title: "Profile", subtitle: "GitHub identity" },
      { id: "contributions", title: "Contributions", subtitle: "Activity heatmap" },
      { id: "repositories", title: "Repositories", subtitle: "Active projects" },
      { id: "languages", title: "Languages", subtitle: "Technical spectrum" },
    ],
  },
  {
    id: "problem-codex",
    title: "Problem Codex",
    subtitle: "Competitive programming",
    color: "#1b1b2f",
    accentColor: "#fca311",
    icon: "brain",
    chapters: [
      { id: "leetcode", title: "LeetCode", subtitle: "Algorithm records" },
      { id: "codeforces", title: "Codeforces", subtitle: "Contest chronicles" },
    ],
  },
  {
    id: "network",
    title: "Network",
    subtitle: "Social presence",
    color: "#2d2d44",
    accentColor: "#c9ada7",
    icon: "globe",
    chapters: [
      { id: "connections", title: "Connections", subtitle: "Digital presence" },
    ],
  },
  {
    id: "experiments",
    title: "Experiments",
    subtitle: "Research notebook",
    color: "#252836",
    accentColor: "#b8c0ff",
    icon: "flask-conical",
    chapters: [
      { id: "lab-notes", title: "Lab Notes", subtitle: "Active explorations" },
    ],
  },
  {
    id: "future-releases",
    title: "Future Releases",
    subtitle: "Ambitions & roadmap",
    color: "#1e1e2e",
    accentColor: "#f4a261",
    icon: "rocket",
    chapters: [
      { id: "roadmap", title: "Roadmap", subtitle: "What comes next" },
    ],
  },
];

export function getBook(id: string): Book | undefined {
  return books.find((b) => b.id === id);
}
