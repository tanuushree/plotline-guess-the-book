import User, { type IUser } from "../models/User"
import { connectToDatabase } from "../lib/mongodb"

export async function getUserById(userId: string): Promise<IUser | null> {
  await connectToDatabase()

  try {
    return await User.findById(userId)
  } catch (error) {
    console.error("Error fetching user by ID:", error)
    return null
  }
}

export async function getUserByGoogleId(googleId: string): Promise<IUser | null> {
  await connectToDatabase()

  try {
    return await User.findOne({ googleId })
  } catch (error) {
    console.error("Error fetching user by Google ID:", error)
    return null
  }
}

export async function createOrUpdateUser(userData: {
  googleId: string
  username: string
  email?: string
  profilePic?: string
}): Promise<IUser | null> {
  await connectToDatabase()

  try {
    const user = await User.findOneAndUpdate(
      { googleId: userData.googleId },
      {
        ...userData,
        lastActive: new Date(),
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      },
    )

    return user
  } catch (error) {
    console.error("Error creating/updating user:", error)
    return null
  }
}

export async function updateUserStats(
  userId: string,
  update: {
    streak?: number
    bestStreak?: number
    totalCorrect?: number
    totalGuesses?: number
    bio?: string
    favoriteGenre?: string
  },
): Promise<IUser | null> {
  await connectToDatabase()

  try {
    return await User.findByIdAndUpdate(
      userId,
      {
        ...update,
        lastActive: new Date(),
      },
      { new: true },
    )
  } catch (error) {
    console.error("Error updating user stats:", error)
    return null
  }
}

export async function incrementUserStats(
  userId: string,
  stats: {
    streak?: number
    bestStreak?: number
    totalCorrect?: number
    totalGuesses?: number
  },
): Promise<IUser | null> {
  await connectToDatabase()

  try {
    const updateObj: any = { lastActive: new Date() }

    // Create increment operations for each stat
    Object.entries(stats).forEach(([key, value]) => {
      if (value) {
        updateObj[key] = { $inc: value }
      }
    })

    return await User.findByIdAndUpdate(userId, updateObj, { new: true })
  } catch (error) {
    console.error("Error incrementing user stats:", error)
    return null
  }
}

export async function getTopUsers(limit = 10): Promise<IUser[]> {
  await connectToDatabase()

  try {
    return await User.find().sort({ totalCorrect: -1 }).limit(limit)
  } catch (error) {
    console.error("Error fetching top users:", error)
    return []
  }
}
