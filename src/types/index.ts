export interface Book {
  id: string;
  title: string;
  subtitle: string;
  color: string;
  accentColor: string;
  icon: string;
  chapters: Chapter[];
}

export interface Chapter {
  id: string;
  title: string;
  subtitle?: string;
}

export interface TimelineEntry {
  year: string;
  title: string;
  description: string;
  type: "education" | "career" | "milestone" | "personal";
}

export interface Project {
  slug: string;
  title: string;
  mission: string;
  problem: string;
  solution: string;
  architecture: string;
  stack: string[];
  challenges: string[];
  results: string[];
  links: { label: string; url: string }[];
  year: string;
  status: "completed" | "active" | "archived";
}

export interface GitHubProfile {
  login: string;
  name: string;
  bio: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

export interface GitHubRepo {
  name: string;
  description: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  updated_at: string;
  topics: string[];
}

export interface GitHubContribution {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface LeetCodeStats {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  totalQuestions: number;
  easyTotal: number;
  mediumTotal: number;
  hardTotal: number;
  ranking: number;
  contributionPoints: number;
  reputation: number;
}

export interface CodeforcesProfile {
  handle: string;
  rating: number;
  maxRating: number;
  rank: string;
  maxRank: string;
  contribution: number;
  avatar: string;
}

export interface CodeforcesContest {
  contestId: number;
  contestName: string;
  rank: number;
  ratingUpdateTimeSeconds: number;
  oldRating: number;
  newRating: number;
}

export interface SocialProfile {
  platform: string;
  username: string;
  url: string;
  description: string;
  icon: string;
}

export interface Experiment {
  slug: string;
  title: string;
  description: string;
  status: "idea" | "prototype" | "exploring" | "paused" | "abandoned";
  tags: string[];
  date: string;
  notes: string;
}

export interface FutureItem {
  title: string;
  description: string;
  timeline: string;
  category: "goal" | "mission" | "vision" | "product";
  priority: "active" | "planned" | "someday";
}
