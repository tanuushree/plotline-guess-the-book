import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import { getUserByGoogleId } from "@/controllers/userController"
import { createGuess } from "@/controllers/guessController"
import { createBadge } from "@/controllers/badgeController"
import { getUserGuesses } from "@/controllers/guessController"

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.googleId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { bookSlug, wasCorrect, usedHint } = await req.json()

    if (!bookSlug) {
      return NextResponse.json({ error: "Book slug is required" }, { status: 400 })
    }

    // Get user ID from Google ID
    const user = await getUserByGoogleId(session.user.googleId)

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Record the guess
    const guess = await createGuess({
      userId: user._id.toString(),
      bookSlug,
      wasCorrect,
      usedHint,
    })

    if (!guess) {
      return NextResponse.json({ error: "Failed to record guess" }, { status: 500 })
    }

    // Check for badges (simplified example)
    // In a real app, you'd have more complex badge logic
    if (wasCorrect) {
      // Get total correct guesses
      const userGuesses = await getUserGuesses(user._id.toString())
      const correctGuesses = userGuesses.filter((g) => g.wasCorrect).length

      if (correctGuesses === 10) {
        // Award a badge for 10 correct guesses
        await createBadge({
          userId: user._id.toString(),
          badgeType: "Bookworm",
        })
      }
    }

    return NextResponse.json({ success: true, guess })
  } catch (error) {
    console.error("Error in guess API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
