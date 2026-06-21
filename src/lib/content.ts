import type { TimelineEntry, Project, Experiment, FutureItem } from "@/types";

export const timeline: TimelineEntry[] = [
  {
    year: "2021",
    title: "First Steps Into Programming",
    description:
      "Started learning Python during Class 9. Built small scripts, explored automation, and discovered a fascination with creating things through code.",
    type: "milestone",
  },
  {
    year: "2022",
    title: "Exploring Development",
    description:
      "Experimented with web development, problem solving, and programming fundamentals while continuing school studies.",
    type: "milestone",
  },
  {
    year: "2024",
    title: "Completed Class 12",
    description:
      "Finished higher secondary education and committed to pursuing a career in technology and software engineering.",
    type: "education",
  },
  {
    year: "2025",
    title: "Joined PSIT Kanpur",
    description:
      "Started B.Tech in Computer Science and Engineering. Shifted focus from learning technologies to building complete software products.",
    type: "education",
  },
  {
    year: "2025",
    title: "Border Intruder Alert System",
    description:
      "Built a computer vision powered surveillance system using YOLO for real-time intrusion detection and monitoring. The project became a TechExpo finalist.",
    type: "career",
  },
  {
    year: "2025",
    title: "Pylotix",
    description:
      "Developed an AI-powered learning platform focused on improving educational experiences through intelligent tools and personalized learning workflows.",
    type: "career",
  },
  {
    year: "2026",
    title: "Zynon",
    description:
      "Started building a social platform focused on communities, real-time interaction, scalable architecture, and AI-native experiences across web and mobile platforms.",
    type: "career",
  },
  {
    year: "2026",
    title: "Livescope",
    description:
      "Building Livescope while expanding expertise in backend engineering, AI systems, distributed architectures, and product development.",
    type: "career",
  },
];

export const readingList = [
  {
    title: "What Every BODY Is Saying",
    author: "Joe Navarro",
    category: "Communication",
  },
  {
    title: "The Power of Your Subconscious Mind",
    author: "Joseph Murphy",
    category: "Psychology",
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    category: "Growth",
  },
  {
    title: "The Almanack of Naval Ravikant",
    author: "Eric Jorgenson",
    category: "Thinking",
  },
  {
    title: "Zero to One",
    author: "Peter Thiel",
    category: "Startups",
  },
  {
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    category: "Systems",
  },
  {
    title: "The Psychology of Money",
    author: "Morgan Housel",
    category: "Thinking",
  },
  {
    title: "Deep Work",
    author: "Cal Newport",
    category: "Productivity",
  },
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
  slug: "zynon",

  title: "Zynon",

  mission:
    "Build a modern social ecosystem where communities, conversations, and digital identity matter more than algorithms.",

  problem:
    "Most social platforms are optimized for engagement and endless scrolling rather than meaningful interaction, community building, and user ownership. Users increasingly want spaces that feel personal, intentional, and authentic.",

  solution:
    "Zynon is a social platform being built across web and mobile that combines communities, profiles, content creation, messaging, and AI-powered experiences into a unified ecosystem. The goal is to create a platform that feels modern, scalable, and community-first.",

  architecture:
    "A TypeScript-first architecture powered by React Native and Next.js clients, communicating with a GraphQL backend. Prisma ORM manages database access while PostgreSQL provides persistence. The system is designed around modular services, scalable APIs, and real-time capabilities.",

  stack: [
    "Next.js",
    "React Native",
    "TypeScript",
    "GraphQL",
    "Node.js",
    "Prisma",
    "PostgreSQL",
    "Redis",
    "Tailwind CSS",
  ],

  challenges: [
    "Designing a scalable social platform architecture",
    "Maintaining feature parity across web and mobile applications",
    "Building secure authentication and account management systems",
    "Designing real-time interactions and community experiences",
    "Balancing product ambition with development velocity"
  ],

  results: [
    "Established the foundation of a complete social ecosystem",
    "Implemented GraphQL-first backend architecture",
    "Built cross-platform web and mobile clients",
    "Created reusable design systems and application infrastructure",
    "Continuing active development and expansion of platform capabilities"
  ],

  links: [
    {
      label: "GitHub",
      url: "<YOUR_ZYNON_REPOSITORY_URL>"
    }
  ],

  year: "2026",

  status: "active"
}
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
