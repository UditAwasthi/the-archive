"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PageContent, {
  PageTitle,
  PageSubtitle,
  PageDivider,
  PageSection,
} from "@/components/ui/PageContent";
import type { LeetCodeStats, CodeforcesProfile, CodeforcesContest } from "@/types";
import { fetchLeetCodeStats } from "@/lib/leetcode";
import {
  fetchCodeforcesProfile,
  fetchCodeforcesContests,
  getRankColor,
} from "@/lib/codeforces";

function LoadingState({ label }: { label: string }) {
  return (
    <PageContent>
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-accent-gold/30 border-t-accent-gold rounded-full animate-spin mb-4" />
        <p className="text-xs text-ink-faint tracking-wider uppercase">{label}</p>
      </div>
    </PageContent>
  );
}

function DifficultyRing({
  solved,
  total,
  color,
  label,
}: {
  solved: number;
  total: number;
  color: string;
  label: string;
}) {
  const percentage = total > 0 ? (solved / total) * 100 : 0;
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-20 h-20 sm:w-24 sm:h-24">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r={radius} fill="none" stroke="currentColor" className="text-ink/[0.06]" strokeWidth="4" />
          <motion.circle
            cx="40"
            cy="40"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono text-sm sm:text-base text-ink">{solved}</span>
          <span className="text-[9px] text-ink-faint">/ {total}</span>
        </div>
      </div>
      <span className="text-[10px] sm:text-xs text-ink-muted mt-2 uppercase tracking-wider">{label}</span>
    </div>
  );
}

function LeetCodePage() {
  const [stats, setStats] = useState<LeetCodeStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeetCodeStats().then((data) => {
      setStats(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <LoadingState label="Fetching LeetCode data" />;
  if (!stats) {
    return (
      <PageContent>
        <PageTitle>LeetCode</PageTitle>
        <PageSubtitle>Algorithm records</PageSubtitle>
        <p className="text-sm text-ink-muted text-center py-8">Data currently unavailable.</p>
      </PageContent>
    );
  }

  return (
    <PageContent>
      <PageTitle>LeetCode</PageTitle>
      <PageSubtitle>Algorithm records</PageSubtitle>

      {/* Total solved */}
      <div className="text-center mb-8 sm:mb-10">
        <motion.p
          className="font-mono text-4xl sm:text-5xl text-ink"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          {stats.totalSolved}
        </motion.p>
        <p className="text-xs text-ink-faint uppercase tracking-wider mt-2">
          Problems Solved
        </p>
      </div>

      {/* Difficulty breakdown */}
      <div className="flex justify-center gap-6 sm:gap-10 mb-8 sm:mb-10">
        <DifficultyRing solved={stats.easySolved} total={stats.easyTotal} color="#50b87a" label="Easy" />
        <DifficultyRing solved={stats.mediumSolved} total={stats.mediumTotal} color="#f59e0b" label="Medium" />
        <DifficultyRing solved={stats.hardSolved} total={stats.hardTotal} color="#ef4444" label="Hard" />
      </div>

      <PageDivider />

      <PageSection title="Additional Metrics">
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Ranking", value: stats.ranking > 0 ? `#${stats.ranking.toLocaleString()}` : "N/A" },
            { label: "Contribution", value: stats.contributionPoints.toString() },
            { label: "Reputation", value: stats.reputation.toString() },
            { label: "Acceptance", value: stats.totalQuestions > 0 ? `${Math.round((stats.totalSolved / stats.totalQuestions) * 100)}%` : "N/A" },
          ].map((metric) => (
            <div key={metric.label} className="p-3 sm:p-4 rounded-lg bg-parchment-dark/20 text-center">
              <p className="font-mono text-sm sm:text-base text-ink">{metric.value}</p>
              <p className="text-[10px] text-ink-faint uppercase tracking-wider mt-1">{metric.label}</p>
            </div>
          ))}
        </div>
      </PageSection>
    </PageContent>
  );
}

function CodeforcesPage() {
  const [profile, setProfile] = useState<CodeforcesProfile | null>(null);
  const [contests, setContests] = useState<CodeforcesContest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchCodeforcesProfile(), fetchCodeforcesContests()]).then(
      ([profileData, contestData]) => {
        setProfile(profileData);
        setContests(contestData);
        setLoading(false);
      }
    );
  }, []);

  if (loading) return <LoadingState label="Fetching Codeforces data" />;

  if (!profile) {
    return (
      <PageContent>
        <PageTitle>Codeforces</PageTitle>
        <PageSubtitle>Contest chronicles</PageSubtitle>
        <p className="text-sm text-ink-muted text-center py-8">
          Profile data currently unavailable.
        </p>
      </PageContent>
    );
  }

  const recentContests = [...contests].reverse().slice(0, 10);

  return (
    <PageContent>
      <PageTitle>Codeforces</PageTitle>
      <PageSubtitle>Contest chronicles</PageSubtitle>

      {/* Rating display */}
      <div className="text-center mb-8 sm:mb-10">
        <motion.p
          className="font-mono text-4xl sm:text-5xl"
          style={{ color: getRankColor(profile.rank) }}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          {profile.rating}
        </motion.p>
        <p className="text-xs uppercase tracking-wider mt-2" style={{ color: getRankColor(profile.rank) }}>
          {profile.rank}
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10">
        {[
          { label: "Current", value: profile.rating },
          { label: "Max Rating", value: profile.maxRating },
          { label: "Max Rank", value: profile.maxRank },
          { label: "Contests", value: contests.length },
        ].map((stat) => (
          <div key={stat.label} className="p-3 rounded-lg bg-parchment-dark/20 text-center">
            <p className="font-mono text-sm text-ink">{stat.value}</p>
            <p className="text-[10px] text-ink-faint uppercase tracking-wider mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Contest history */}
      {recentContests.length > 0 && (
        <PageSection title="Recent Contests">
          <div className="space-y-2">
            {recentContests.map((contest) => {
              const ratingChange = contest.newRating - contest.oldRating;
              return (
                <div
                  key={contest.contestId}
                  className="flex items-center justify-between p-3 rounded-lg bg-parchment-dark/10 text-sm"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-ink truncate">{contest.contestName}</p>
                    <p className="text-[10px] text-ink-faint mt-0.5">Rank: #{contest.rank}</p>
                  </div>
                  <span
                    className={`font-mono text-xs shrink-0 ml-3 ${
                      ratingChange >= 0 ? "text-emerald-600" : "text-red-500"
                    }`}
                  >
                    {ratingChange >= 0 ? "+" : ""}{ratingChange}
                  </span>
                </div>
              );
            })}
          </div>
        </PageSection>
      )}
    </PageContent>
  );
}

export function getProblemCodexPages() {
  return [
    { id: "leetcode", title: "LeetCode", content: <LeetCodePage /> },
    { id: "codeforces", title: "Codeforces", content: <CodeforcesPage /> },
  ];
}
