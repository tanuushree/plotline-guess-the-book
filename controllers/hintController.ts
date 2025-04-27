import HintUsage, { type IHintUsage } from "../models/HintUsage"
import { connectToDatabase } from "../lib/mongodb"
import mongoose from "mongoose"

export async function recordHintUsage(hintData: {
  userId: string
  bookSlug: string
  hintType: string
}): Promise<IHintUsage | null> {
  await connectToDatabase()

  try {
    const hintUsage = new HintUsage({
      userId: new mongoose.Types.ObjectId(hintData.userId),
      bookSlug: hintData.bookSlug,
      hintType: hintData.hintType,
    })

    await hintUsage.save()
    return hintUsage
  } catch (error) {
    console.error("Error recording hint usage:", error)
    return null
  }
}

export async function getUserHintUsage(userId: string): Promise<IHintUsage[]> {
  await connectToDatabase()

  try {
    return await HintUsage.find({ userId: new mongoose.Types.ObjectId(userId) }).sort({ createdAt: -1 })
  } catch (error) {
    console.error("Error fetching user hint usage:", error)
    return []
  }
}
