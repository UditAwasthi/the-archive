import type { SocialProfile } from "@/types";
import { siteConfig } from "./config";

export function getSocialProfiles(): SocialProfile[] {
  const profiles: SocialProfile[] = [];

  if (siteConfig.github.url) {
    profiles.push({
      platform: "GitHub",
      username: siteConfig.github.username || "GitHub",
      url: siteConfig.github.url,
      description: "Open source contributions and code repositories",
      icon: "github",
    });
  }

  if (siteConfig.linkedin.url) {
    profiles.push({
      platform: "LinkedIn",
      username: extractUsername(siteConfig.linkedin.url),
      url: siteConfig.linkedin.url,
      description: "Professional network and career updates",
      icon: "linkedin",
    });
  }

  if (siteConfig.instagram.url) {
    profiles.push({
      platform: "Instagram",
      username: extractUsername(siteConfig.instagram.url),
      url: siteConfig.instagram.url,
      description: "Visual stories and personal moments",
      icon: "instagram",
    });
  }

  if (siteConfig.twitter.url) {
    profiles.push({
      platform: "X / Twitter",
      username: extractUsername(siteConfig.twitter.url),
      url: siteConfig.twitter.url,
      description: "Thoughts, threads, and conversations",
      icon: "twitter",
    });
  }

  if (siteConfig.email) {
    profiles.push({
      platform: "Email",
      username: siteConfig.email,
      url: `mailto:${siteConfig.email}`,
      description: "Direct communication channel",
      icon: "mail",
    });
  }

  return profiles;
}

function extractUsername(url: string): string {
  try {
    const parts = new URL(url).pathname.split("/").filter(Boolean);
    return parts[parts.length - 1] || url;
  } catch {
    return url;
  }
}
