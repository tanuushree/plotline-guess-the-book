import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import { getUserByGoogleId, updateUserStats } from "@/controllers/userController"
import { getUserBadges } from "@/controllers/badgeController"
import { getGenreStats } from "@/controllers/guessController"

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.googleId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get user data
    const user = await getUserByGoogleId(session.user.googleId)

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Get badges
    const badges = await getUserBadges(user._id.toString())

    // Get genre stats
    const genreStats = await getGenreStats(user._id.toString())

    return NextResponse.json({
      user,
      badges,
      genreStats,
    })
  } catch (error) {
    console.error("Error in profile API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.googleId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await getUserByGoogleId(session.user.googleId)

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const { bio } = await req.json()

    // Update user bio
    const updatedUser = await updateUserStats(user._id.toString(), { bio })

    if (!updatedUser) {
      return NextResponse.json({ error: "Failed to update user bio" }, { status: 500 })
    }

    return NextResponse.json({ success: true, user: updatedUser })
  } catch (error) {
    console.error("Error in profile API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
