import Badge, { type IBadge } from "../models/Badge"
import { connectToDatabase } from "../lib/mongodb"
import mongoose from "mongoose"

export async function createBadge(badgeData: {
  userId: string
  badgeType: string
}): Promise<IBadge | null> {
  await connectToDatabase()

  try {
    // Check if badge already exists
    const existingBadge = await Badge.findOne({
      userId: new mongoose.Types.ObjectId(badgeData.userId),
      badgeType: badgeData.badgeType,
    })

    if (existingBadge) {
      return existingBadge
    }

    const badge = new Badge({
      userId: new mongoose.Types.ObjectId(badgeData.userId),
      badgeType: badgeData.badgeType,
      awardedAt: new Date(),
    })

    await badge.save()
    return badge
  } catch (error) {
    console.error("Error creating badge:", error)
    return null
  }
}

export async function getUserBadges(userId: string): Promise<IBadge[]> {
  await connectToDatabase()

  try {
    return await Badge.find({ userId: new mongoose.Types.ObjectId(userId) }).sort({ awardedAt: -1 })
  } catch (error) {
    console.error("Error fetching user badges:", error)
    return []
  }
}
