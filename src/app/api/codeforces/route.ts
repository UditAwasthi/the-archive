import {
  fetchCodeforcesProfile,
  fetchCodeforcesContests,
} from "@/lib/codeforces";

export async function GET() {
  try {
    const [profile, contests] = await Promise.all([
      fetchCodeforcesProfile(),
      fetchCodeforcesContests(),
    ]);

    return Response.json({ profile, contests });
  } catch {
    return Response.json(
      { error: "Failed to fetch Codeforces data" },
      { status: 500 }
    );
  }
}
