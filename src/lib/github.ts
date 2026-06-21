import type { GitHubProfile, GitHubRepo, GitHubContribution } from "@/types";
import { siteConfig } from "./config";

const GITHUB_API = "https://api.github.com";
const CACHE_TTL = 3600;

let profileCache: { data: GitHubProfile; timestamp: number } | null = null;
let reposCache: { data: GitHubRepo[]; timestamp: number } | null = null;

function isCacheValid(timestamp: number): boolean {
  return Date.now() - timestamp < CACHE_TTL * 1000;
}

export async function fetchGitHubProfile(): Promise<GitHubProfile | null> {
  if (profileCache && isCacheValid(profileCache.timestamp)) {
    return profileCache.data;
  }

  const username = siteConfig.github.username;
  if (!username) return null;

  try {
    const res = await fetch(`${GITHUB_API}/users/${username}`, {
      headers: { Accept: "application/vnd.github.v3+json" },
      next: { revalidate: CACHE_TTL },
    });
    if (!res.ok) return null;
    const data = await res.json();
    profileCache = { data, timestamp: Date.now() };
    return data;
  } catch {
    return null;
  }
}

export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  if (reposCache && isCacheValid(reposCache.timestamp)) {
    return reposCache.data;
  }

  const username = siteConfig.github.username;
  if (!username) return [];

  try {
    const res = await fetch(
      `${GITHUB_API}/users/${username}/repos?sort=updated&per_page=30&type=owner`,
      {
        headers: { Accept: "application/vnd.github.v3+json" },
        next: { revalidate: CACHE_TTL },
      }
    );
    if (!res.ok) return [];
    const data = await res.json();
    reposCache = { data, timestamp: Date.now() };
    return data;
  } catch {
    return [];
  }
}

export async function fetchContributions(): Promise<GitHubContribution[]> {
  const username = siteConfig.github.username;
  if (!username) return [];

  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
      { next: { revalidate: CACHE_TTL } }
    );
    if (!res.ok) return generateMockContributions();
    const data = await res.json();
    if (!data.contributions || !Array.isArray(data.contributions)) {
      return generateMockContributions();
    }
    return data.contributions.map(
      (c: { date: string; count: number; level: number }) => ({
        date: c.date,
        count: c.count,
        level: Math.min(c.level, 4) as 0 | 1 | 2 | 3 | 4,
      })
    );
  } catch {
    return generateMockContributions();
  }
}

function generateMockContributions(): GitHubContribution[] {
  const contributions: GitHubContribution[] = [];
  const today = new Date();
  for (let i = 364; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const count = Math.floor(Math.random() * 8);
    contributions.push({
      date: date.toISOString().split("T")[0],
      count,
      level: (count === 0 ? 0 : count <= 2 ? 1 : count <= 4 ? 2 : count <= 6 ? 3 : 4) as 0 | 1 | 2 | 3 | 4,
    });
  }
  return contributions;
}

export function getLanguageStats(repos: GitHubRepo[]): { language: string; count: number; percentage: number }[] {
  const langMap: Record<string, number> = {};
  for (const repo of repos) {
    if (repo.language) {
      langMap[repo.language] = (langMap[repo.language] || 0) + 1;
    }
  }
  const total = Object.values(langMap).reduce((a, b) => a + b, 0);
  return Object.entries(langMap)
    .map(([language, count]) => ({
      language,
      count,
      percentage: Math.round((count / total) * 100),
    }))
    .sort((a, b) => b.count - a.count);
}
