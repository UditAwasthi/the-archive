import type { TimelineEntry, Project, Experiment, FutureItem } from "@/types";

export const timeline: TimelineEntry[] = [
  {
    year: "2018",
    title: "First Line of Code",
    description:
      "Wrote the first program in C. A simple Hello World that opened a door to an entirely new way of thinking.",
    type: "milestone",
  },
  {
    year: "2019",
    title: "High School Graduation",
    description:
      "Completed secondary education with a focus on mathematics and science. Knew that computer science was the path forward.",
    type: "education",
  },
  {
    year: "2020",
    title: "University Begins",
    description:
      "Started pursuing a degree in Computer Science. The pandemic made it remote, but the learning never stopped.",
    type: "education",
  },
  {
    year: "2021",
    title: "Competitive Programming",
    description:
      "Discovered competitive programming. Started solving problems on LeetCode and Codeforces daily.",
    type: "milestone",
  },
  {
    year: "2022",
    title: "First Real Project",
    description:
      "Built the first full-stack application. Learned about databases, APIs, deployment, and shipping to real users.",
    type: "career",
  },
  {
    year: "2023",
    title: "Open Source Contributions",
    description:
      "Started contributing to open source. Learned the value of community, code review, and building in public.",
    type: "career",
  },
  {
    year: "2024",
    title: "Deep Specialization",
    description:
      "Focused on modern web technologies \u2014 React, Next.js, TypeScript. Started building products with real impact.",
    type: "career",
  },
  {
    year: "2025",
    title: "The Archive",
    description:
      "Created this living archive to document everything. A commitment to building, learning, and sharing in the open.",
    type: "personal",
  },
];

export const readingList = [
  { title: "Clean Code", author: "Robert C. Martin", category: "Engineering" },
  { title: "Designing Data-Intensive Applications", author: "Martin Kleppmann", category: "Systems" },
  { title: "The Pragmatic Programmer", author: "Hunt & Thomas", category: "Engineering" },
  { title: "Zero to One", author: "Peter Thiel", category: "Thinking" },
  { title: "Atomic Habits", author: "James Clear", category: "Growth" },
  { title: "Deep Work", author: "Cal Newport", category: "Productivity" },
  { title: "Structure and Interpretation of Computer Programs", author: "Abelson & Sussman", category: "Foundations" },
  { title: "The Art of Doing Science and Engineering", author: "Richard Hamming", category: "Thinking" },
];

export const philosophy = [
  "Ship early, iterate often. Perfection is the enemy of progress.",
  "Write code for humans first, machines second.",
  "Every complex system that works evolved from a simple system that worked.",
  "Learn by building. Theory without practice is incomplete.",
  "Open source is a superpower. Give back more than you take.",
  "Stay curious. The best engineers are perpetual students.",
];

export const projects: Project[] = [
  {
    slug: "communication-coach-ai",
    title: "Communication Coach AI",
    mission: "Build an AI-powered platform for improving communication skills through practice and feedback.",
    problem:
      "Most people struggle with public speaking and communication but lack access to personalized coaching and feedback loops.",
    solution:
      "A full-stack Next.js application that uses AI to analyze speech patterns, provide real-time feedback, and create personalized improvement plans.",
    architecture:
      "Next.js 15 App Router with server components for data fetching, client components for interactive coaching sessions, and API routes for AI integration.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "OpenAI API", "Prisma", "PostgreSQL"],
    challenges: [
      "Real-time audio processing in the browser",
      "Designing an intuitive feedback interface",
      "Balancing AI accuracy with response latency",
    ],
    results: [
      "Functional prototype with speech analysis",
      "YouTube playlist ingestion pipeline",
      "Clean, accessible UI with responsive design",
    ],
    links: [
      { label: "Repository", url: "https://github.com/UditAwasthi/communication-coach-ai" },
    ],
    year: "2025",
    status: "active",
  },
  {
    slug: "zynon-mobile",
    title: "Zynon",
    mission: "Create a mobile-first social media platform for authentic real-time interaction.",
    problem:
      "Existing social platforms prioritize algorithmic feeds over genuine human connection. Users want real, unfiltered interaction.",
    solution:
      "A React Native mobile application with a GraphQL backend, emphasizing real-time features, clean design, and privacy-first architecture.",
    architecture:
      "React Native client with Apollo Client connecting to a Node.js/Express GraphQL API. Prisma ORM with PostgreSQL for data persistence.",
    stack: ["React Native", "TypeScript", "GraphQL", "Apollo Client", "Node.js", "Prisma", "PostgreSQL"],
    challenges: [
      "Cross-platform native performance optimization",
      "Real-time data synchronization",
      "Secure token-based authentication flow",
    ],
    results: [
      "Fully functional mobile client for iOS and Android",
      "Secure authentication with Google Sign-In",
      "Clean, themeable UI with light/dark mode support",
    ],
    links: [
      { label: "Repository", url: "https://github.com/UditAwasthi/zynon-mobile" },
    ],
    year: "2025",
    status: "active",
  },
];

export const experiments: Experiment[] = [
  {
    slug: "archive-design-system",
    title: "Archive Design System",
    description:
      "Exploring a cohesive design language for digital archives. Paper textures, editorial typography, and cinematic interactions.",
    status: "exploring",
    tags: ["design", "ui/ux", "motion"],
    date: "2025",
    notes:
      "Inspired by physical books, museum catalogs, and editorial magazines. The goal is to make digital feel tangible.",
  },
  {
    slug: "ai-code-reviewer",
    title: "AI Code Reviewer",
    description:
      "A tool that reviews pull requests using LLMs, providing contextual feedback based on project conventions.",
    status: "idea",
    tags: ["ai", "developer-tools", "automation"],
    date: "2025",
    notes:
      "Want to build something that understands not just syntax but intent. Should learn from the codebase over time.",
  },
  {
    slug: "terminal-portfolio",
    title: "Terminal Portfolio",
    description:
      "An interactive CLI-based portfolio accessible via the web. Navigate through projects and info using commands.",
    status: "prototype",
    tags: ["web", "interactive", "portfolio"],
    date: "2024",
    notes:
      "Built a basic version with xterm.js. Exploring custom command parsing and file system simulation.",
  },
  {
    slug: "distributed-task-queue",
    title: "Distributed Task Queue",
    description:
      "Experimenting with building a lightweight distributed task queue using Redis and worker processes.",
    status: "paused",
    tags: ["systems", "distributed", "backend"],
    date: "2024",
    notes:
      "Got the basic producer-consumer pattern working. Paused to focus on other priorities.",
  },
];

export const futureItems: FutureItem[] = [
  {
    title: "Launch The Archive",
    description:
      "Complete and deploy this living portfolio. Make it the definitive representation of my work and thinking.",
    timeline: "Q3 2025",
    category: "goal",
    priority: "active",
  },
  {
    title: "Contribute to Major OSS Project",
    description:
      "Make a meaningful contribution to a widely-used open source project. Not just fixes, but features.",
    timeline: "2025",
    category: "mission",
    priority: "active",
  },
  {
    title: "Build a Developer Tool",
    description:
      "Create a tool that solves a real pain point in the developer workflow. Ship it publicly.",
    timeline: "2025-2026",
    category: "product",
    priority: "planned",
  },
  {
    title: "Master System Design",
    description:
      "Deep dive into distributed systems, scalability patterns, and infrastructure. Build systems that handle real scale.",
    timeline: "Ongoing",
    category: "mission",
    priority: "active",
  },
  {
    title: "Start Technical Writing",
    description:
      "Document learnings, write technical deep-dives, and build a body of written work that helps others.",
    timeline: "2025",
    category: "goal",
    priority: "planned",
  },
  {
    title: "Build Something People Love",
    description:
      "Ship a product that genuinely improves someone's life or work. Not for the resume, but for the impact.",
    timeline: "Someday",
    category: "vision",
    priority: "someday",
  },
];

export const secretContent = {
  favoriteBooks: [
    { title: "Siddhartha", author: "Hermann Hesse" },
    { title: "The Alchemist", author: "Paulo Coelho" },
    { title: "Sapiens", author: "Yuval Noah Harari" },
    { title: "Man's Search for Meaning", author: "Viktor Frankl" },
  ],
  currentObsessions: [
    "Building beautiful, functional interfaces",
    "The intersection of AI and developer tools",
    "How to make software feel alive",
    "Minimalism in design and life",
  ],
  lessonsLearned: [
    "Start before you're ready. You'll never feel fully prepared.",
    "The best code is the code you don't write.",
    "Focus is more valuable than intelligence.",
    "Build for yourself first. If you love it, others might too.",
    "Everything is a skill. Communication, design, empathy \u2014 all learnable.",
  ],
  personalNotes: [
    "Still figuring things out, and that's okay.",
    "The journey matters more than the destination, but the destination gives the journey meaning.",
    "Trying to build things that last.",
  ],
};
