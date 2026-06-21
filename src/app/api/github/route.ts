import { fetchGitHubProfile, fetchGitHubRepos, fetchContributions } from "@/lib/github";

export async function GET() {
  try {
    const [profile, repos, contributions] = await Promise.all([
      fetchGitHubProfile(),
      fetchGitHubRepos(),
      fetchContributions(),
    ]);

    return Response.json({
      profile,
      repos,
      contributions,
    });
  } catch {
    return Response.json(
      { error: "Failed to fetch GitHub data" },
      { status: 500 }
    );
  }
}
