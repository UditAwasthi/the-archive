"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, GitFork, ExternalLink } from "lucide-react";
import PageContent, {
  PageTitle,
  PageSubtitle,
  PageDivider,
} from "@/components/ui/PageContent";
import type { GitHubProfile, GitHubRepo, GitHubContribution } from "@/types";
import {
  fetchGitHubProfile,
  fetchGitHubRepos,
  fetchContributions,
  getLanguageStats,
} from "@/lib/github";
import { siteConfig } from "@/lib/config";

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

function ErrorState({ message }: { message: string }) {
  return (
    <PageContent>
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-sm text-ink-muted">{message}</p>
        <p className="text-xs text-ink-faint mt-2">Data may be temporarily unavailable.</p>
      </div>
    </PageContent>
  );
}

function ContributionHeatmap({ contributions }: { contributions: GitHubContribution[] }) {
  const weeks: GitHubContribution[][] = [];
  let currentWeek: GitHubContribution[] = [];

  for (const c of contributions) {
    const dayOfWeek = new Date(c.date).getDay();
    if (dayOfWeek === 0 && currentWeek.length > 0) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
    currentWeek.push(c);
  }
  if (currentWeek.length > 0) weeks.push(currentWeek);

  const levelColors = [
    "bg-ink/[0.04]",
    "bg-emerald-200/60",
    "bg-emerald-300/60",
    "bg-emerald-500/60",
    "bg-emerald-700/70",
  ];

  const totalContributions = contributions.reduce((sum, c) => sum + c.count, 0);

  return (
    <div>
      <div className="flex items-baseline justify-between mb-4">
        <p className="text-xs text-ink-faint">
          <span className="font-mono text-ink text-sm">{totalContributions.toLocaleString()}</span>{" "}
          contributions in the last year
        </p>
      </div>

      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-[3px] min-w-fit">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {week.map((day) => (
                <div
                  key={day.date}
                  className={`w-[10px] h-[10px] sm:w-3 sm:h-3 rounded-[2px] ${levelColors[day.level]} transition-colors`}
                  title={`${day.date}: ${day.count} contributions`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-1.5 mt-3 justify-end">
        <span className="text-[10px] text-ink-faint mr-1">Less</span>
        {levelColors.map((color, i) => (
          <div key={i} className={`w-[10px] h-[10px] rounded-[2px] ${color}`} />
        ))}
        <span className="text-[10px] text-ink-faint ml-1">More</span>
      </div>
    </div>
  );
}

function ProfilePage() {
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGitHubProfile().then((data) => {
      setProfile(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <LoadingState label="Fetching GitHub profile" />;
  if (!profile) return <ErrorState message="Could not load GitHub profile." />;

  return (
    <PageContent>
      <PageTitle>Profile</PageTitle>
      <PageSubtitle>GitHub identity</PageSubtitle>

      <div className="flex items-start gap-4 sm:gap-6 mb-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={profile.avatar_url}
          alt={profile.name || profile.login}
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-ink/5"
        />
        <div>
          <h3 className="font-serif text-lg sm:text-xl text-ink">{profile.name || profile.login}</h3>
          <p className="text-sm text-ink-muted font-mono">@{profile.login}</p>
          {profile.bio && (
            <p className="text-sm text-ink-light mt-2 leading-relaxed">{profile.bio}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 sm:gap-6">
        {[
          { label: "Repositories", value: profile.public_repos },
          { label: "Followers", value: profile.followers },
          { label: "Following", value: profile.following },
        ].map((stat) => (
          <div key={stat.label} className="text-center p-3 sm:p-4 rounded-lg bg-parchment-dark/20">
            <p className="font-mono text-lg sm:text-xl text-ink">{stat.value}</p>
            <p className="text-[10px] text-ink-faint uppercase tracking-wider mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <PageDivider />

      <a
        href={siteConfig.github.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-sm text-accent-warm hover:text-accent-gold transition-colors"
      >
        <ExternalLink size={14} />
        View on GitHub
      </a>
    </PageContent>
  );
}

function ContributionsPage() {
  const [contributions, setContributions] = useState<GitHubContribution[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContributions().then((data) => {
      setContributions(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <LoadingState label="Loading contribution data" />;

  return (
    <PageContent>
      <PageTitle>Contributions</PageTitle>
      <PageSubtitle>Activity heatmap</PageSubtitle>

      <ContributionHeatmap contributions={contributions} />
    </PageContent>
  );
}

function RepositoriesPage() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGitHubRepos().then((data) => {
      setRepos(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <LoadingState label="Loading repositories" />;

  const sortedRepos = [...repos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 12);

  return (
    <PageContent>
      <PageTitle>Repositories</PageTitle>
      <PageSubtitle>Active projects</PageSubtitle>

      <div className="space-y-3">
        {sortedRepos.map((repo, i) => (
          <motion.a
            key={repo.name}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-3 sm:p-4 rounded-lg border border-ink/5 hover:border-ink/10 hover:bg-parchment-dark/20 transition-all"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h4 className="font-mono text-sm text-ink truncate">{repo.name}</h4>
                {repo.description && (
                  <p className="text-xs text-ink-muted mt-1 line-clamp-2">{repo.description}</p>
                )}
              </div>
              <ExternalLink size={14} className="text-ink-faint shrink-0 mt-0.5" />
            </div>

            <div className="flex items-center gap-4 mt-2.5">
              {repo.language && (
                <span className="text-[10px] text-ink-muted flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-accent-gold/50" />
                  {repo.language}
                </span>
              )}
              {repo.stargazers_count > 0 && (
                <span className="text-[10px] text-ink-faint flex items-center gap-1">
                  <Star size={10} />
                  {repo.stargazers_count}
                </span>
              )}
              {repo.forks_count > 0 && (
                <span className="text-[10px] text-ink-faint flex items-center gap-1">
                  <GitFork size={10} />
                  {repo.forks_count}
                </span>
              )}
            </div>
          </motion.a>
        ))}
      </div>
    </PageContent>
  );
}

function LanguagesPage() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGitHubRepos().then((data) => {
      setRepos(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <LoadingState label="Analyzing languages" />;

  const languages = getLanguageStats(repos);

  const langColors: Record<string, string> = {
    TypeScript: "#3178c6",
    JavaScript: "#f7df1e",
    Python: "#3572A5",
    Java: "#b07219",
    "C++": "#f34b7d",
    C: "#555555",
    Go: "#00ADD8",
    Rust: "#dea584",
    Ruby: "#cc342d",
    Swift: "#F05138",
    Kotlin: "#A97BFF",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Shell: "#89e051",
    Dart: "#00B4AB",
  };

  return (
    <PageContent>
      <PageTitle>Languages</PageTitle>
      <PageSubtitle>Technical spectrum</PageSubtitle>

      <div className="space-y-4">
        {languages.map((lang, i) => (
          <motion.div
            key={lang.language}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08, duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: langColors[lang.language] || "#808080" }}
                />
                <span className="text-sm text-ink">{lang.language}</span>
              </div>
              <span className="text-xs text-ink-faint font-mono">{lang.percentage}%</span>
            </div>
            <div className="h-1.5 bg-ink/[0.04] rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: langColors[lang.language] || "#808080" }}
                initial={{ width: 0 }}
                animate={{ width: `${lang.percentage}%` }}
                transition={{ delay: i * 0.08 + 0.2, duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {languages.length === 0 && (
        <p className="text-sm text-ink-muted text-center py-8">No language data available.</p>
      )}
    </PageContent>
  );
}

export function getCodeRecordsPages() {
  return [
    { id: "profile", title: "Profile", content: <ProfilePage /> },
    { id: "contributions", title: "Contributions", content: <ContributionsPage /> },
    { id: "repositories", title: "Repositories", content: <RepositoriesPage /> },
    { id: "languages", title: "Languages", content: <LanguagesPage /> },
  ];
}
