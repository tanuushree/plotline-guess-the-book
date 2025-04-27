import { type NextRequest, NextResponse } from "next/server"
import { getTopUsers } from "@/controllers/userController"
import { getUserGuesses } from "@/controllers/guessController"

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const genre = searchParams.get("genre")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    // Get top users
    const users = await getTopUsers(limit)

    // Calculate accuracy for each user
    const leaderboard = await Promise.all(
      users.map(async (user) => {
        const guesses = await getUserGuesses(user._id.toString())
        const totalGuesses = guesses.length
        const accuracy = totalGuesses > 0 ? Math.round((user.totalCorrect / totalGuesses) * 100) : 0

        return {
          id: user._id,
          username: user.username,
          profile_pic: user.profilePic,
          streak: user.streak,
          total_correct: user.totalCorrect,
          accuracy,
        }
      }),
    )

    return NextResponse.json(leaderboard)
  } catch (error) {
    console.error("Error in leaderboard API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
