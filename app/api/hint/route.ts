import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import { getUserByGoogleId } from "@/controllers/userController"
import { recordHintUsage } from "@/controllers/hintController"

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.googleId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { bookSlug, hintType } = await req.json()

    if (!bookSlug || !hintType) {
      return NextResponse.json({ error: "Book slug and hint type are required" }, { status: 400 })
    }

    // Get user ID from Google ID
    const user = await getUserByGoogleId(session.user.googleId)

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Record hint usage
    const hintUsage = await recordHintUsage({
      userId: user._id.toString(),
      bookSlug,
      hintType,
    })

    if (!hintUsage) {
      return NextResponse.json({ error: "Failed to record hint usage" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error in hint API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
