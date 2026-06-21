import { fetchLeetCodeStats } from "@/lib/leetcode";

export async function GET() {
  try {
    const stats = await fetchLeetCodeStats();
    return Response.json({ stats });
  } catch {
    return Response.json(
      { error: "Failed to fetch LeetCode data" },
      { status: 500 }
    );
  }
}
