export const siteConfig = {
  name: process.env.NEXT_PUBLIC_NAME || "Archive Owner",
  email: process.env.NEXT_PUBLIC_EMAIL || "",
  github: {
    url: process.env.NEXT_PUBLIC_GITHUB_URL || "",
    username: process.env.NEXT_PUBLIC_GITHUB_USERNAME || "",
  },
  linkedin: {
    url: process.env.NEXT_PUBLIC_LINKEDIN_URL || "",
  },
  instagram: {
    url: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "",
  },
  twitter: {
    url: process.env.NEXT_PUBLIC_TWITTER_URL || "",
  },
  leetcode: {
    username: process.env.NEXT_PUBLIC_LEETCODE_USERNAME || "",
  },
  codeforces: {
    username: process.env.NEXT_PUBLIC_CODEFORCES_USERNAME || "",
  },
  resumeUrl: process.env.NEXT_PUBLIC_RESUME_URL || "",
};
