import type { LeetCodeStats } from "@/types";
import { siteConfig } from "./config";

const CACHE_TTL = 3600;

export async function fetchLeetCodeStats(): Promise<LeetCodeStats | null> {
  const username = siteConfig.leetcode.username;
  if (!username) return null;

  try {
    const res = await fetch(
      `https://leetcode-stats-api.herokuapp.com/${username}`,
      { next: { revalidate: CACHE_TTL } }
    );
    if (!res.ok) return getFallbackStats();
    const data = await res.json();
    if (data.status === "error") return getFallbackStats();
    return {
      totalSolved: data.totalSolved ?? 0,
      easySolved: data.easySolved ?? 0,
      mediumSolved: data.mediumSolved ?? 0,
      hardSolved: data.hardSolved ?? 0,
      totalQuestions: data.totalQuestions ?? 3000,
      easyTotal: data.totalEasy ?? 800,
      mediumTotal: data.totalMedium ?? 1700,
      hardTotal: data.totalHard ?? 600,
      ranking: data.ranking ?? 0,
      contributionPoints: data.contributionPoints ?? 0,
      reputation: data.reputation ?? 0,
    };
  } catch {
    return getFallbackStats();
  }
}

function getFallbackStats(): LeetCodeStats {
  return {
    totalSolved: 0,
    easySolved: 0,
    mediumSolved: 0,
    hardSolved: 0,
    totalQuestions: 3000,
    easyTotal: 800,
    mediumTotal: 1700,
    hardTotal: 600,
    ranking: 0,
    contributionPoints: 0,
    reputation: 0,
  };
}
