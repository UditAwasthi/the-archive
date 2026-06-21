import type { CodeforcesProfile, CodeforcesContest } from "@/types";
import { siteConfig } from "./config";

const CF_API = "https://codeforces.com/api";
const CACHE_TTL = 3600;

export async function fetchCodeforcesProfile(): Promise<CodeforcesProfile | null> {
  const handle = siteConfig.codeforces.username;
  if (!handle) return null;

  try {
    const res = await fetch(`${CF_API}/user.info?handles=${handle}`, {
      next: { revalidate: CACHE_TTL },
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (data.status !== "OK" || !data.result?.length) return null;
    const user = data.result[0];
    return {
      handle: user.handle,
      rating: user.rating ?? 0,
      maxRating: user.maxRating ?? 0,
      rank: user.rank ?? "unrated",
      maxRank: user.maxRank ?? "unrated",
      contribution: user.contribution ?? 0,
      avatar: user.titlePhoto ?? "",
    };
  } catch {
    return null;
  }
}

export async function fetchCodeforcesContests(): Promise<CodeforcesContest[]> {
  const handle = siteConfig.codeforces.username;
  if (!handle) return [];

  try {
    const res = await fetch(`${CF_API}/user.rating?handle=${handle}`, {
      next: { revalidate: CACHE_TTL },
    });
    if (!res.ok) return [];
    const data = await res.json();
    if (data.status !== "OK") return [];
    return (data.result ?? []).map(
      (c: {
        contestId: number;
        contestName: string;
        rank: number;
        ratingUpdateTimeSeconds: number;
        oldRating: number;
        newRating: number;
      }) => ({
        contestId: c.contestId,
        contestName: c.contestName,
        rank: c.rank,
        ratingUpdateTimeSeconds: c.ratingUpdateTimeSeconds,
        oldRating: c.oldRating,
        newRating: c.newRating,
      })
    );
  } catch {
    return [];
  }
}

export function getRankColor(rank: string): string {
  const colors: Record<string, string> = {
    newbie: "#808080",
    pupil: "#008000",
    specialist: "#03a89e",
    expert: "#0000ff",
    "candidate master": "#aa00aa",
    master: "#ff8c00",
    "international master": "#ff8c00",
    grandmaster: "#ff0000",
    "international grandmaster": "#ff0000",
    "legendary grandmaster": "#ff0000",
  };
  return colors[rank.toLowerCase()] ?? "#808080";
}
