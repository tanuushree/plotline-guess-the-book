import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import { getUserByGoogleId, createOrUpdateUser } from "@/controllers/userController"
import { updateUserStats } from "@/controllers/userController"

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.googleId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const user = await getUserByGoogleId(session.user.googleId)

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error("Error in user API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.googleId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const user = await createOrUpdateUser({
      googleId: session.user.googleId,
      username: session.user.name || "User",
      email: session.user.email || undefined,
      profilePic: session.user.image || undefined,
    })

    if (!user) {
      return NextResponse.json({ error: "Failed to create/update user" }, { status: 500 })
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error("Error in user API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.googleId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const user = await getUserByGoogleId(session.user.googleId)

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const { bio, favoriteGenre } = await req.json()

    const updatedUser = await updateUserStats(user._id.toString(), {
      bio,
      favoriteGenre,
    })

    if (!updatedUser) {
      return NextResponse.json({ error: "Failed to update user" }, { status: 500 })
    }

    return NextResponse.json({ user: updatedUser })
  } catch (error) {
    console.error("Error in user API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
