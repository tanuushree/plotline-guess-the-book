import Guess, { type IGuess } from "../models/Guess"
import User from "../models/User"
import { connectToDatabase } from "../lib/mongodb"
import mongoose from "mongoose"

export async function createGuess(guessData: {
  userId: string
  bookSlug: string
  wasCorrect: boolean
  usedHint: boolean
}): Promise<IGuess | null> {
  await connectToDatabase()

  try {
    const guess = new Guess({
      userId: new mongoose.Types.ObjectId(guessData.userId),
      bookSlug: guessData.bookSlug,
      wasCorrect: guessData.wasCorrect,
      usedHint: guessData.usedHint,
    })

    await guess.save()

    // Update user stats
    if (guessData.wasCorrect) {
      await User.findByIdAndUpdate(guessData.userId, {
        $inc: { totalCorrect: 1, totalGuesses: 1 },
        lastActive: new Date(),
      })
    } else {
      await User.findByIdAndUpdate(guessData.userId, {
        $inc: { totalGuesses: 1 },
        lastActive: new Date(),
      })
    }

    return guess
  } catch (error) {
    console.error("Error creating guess:", error)
    return null
  }
}

export async function getUserGuesses(userId: string): Promise<IGuess[]> {
  await connectToDatabase()

  try {
    return await Guess.find({ userId: new mongoose.Types.ObjectId(userId) }).sort({ createdAt: -1 })
  } catch (error) {
    console.error("Error fetching user guesses:", error)
    return []
  }
}

export async function getGenreStats(userId: string): Promise<any[]> {
  await connectToDatabase()

  try {
    const guesses = await Guess.find({ userId: new mongoose.Types.ObjectId(userId) })

    // Group by genre (extracted from book_slug)
    const genreMap = new Map()

    guesses.forEach((guess) => {
      const genre = guess.bookSlug.split("-")[0]
      if (!genreMap.has(genre)) {
        genreMap.set(genre, {
          genre: genre.charAt(0).toUpperCase() + genre.slice(1),
          guesses: 0,
          correct: 0,
        })
      }

      const stats = genreMap.get(genre)
      stats.guesses++
      if (guess.wasCorrect) {
        stats.correct++
      }
    })

    // Convert map to array and calculate accuracy
    const genreStatsArray = Array.from(genreMap.values()).map((stats) => ({
      ...stats,
      accuracy: stats.guesses > 0 ? Math.round((stats.correct / stats.guesses) * 100) : 0,
    }))

    // Sort by number of guesses (descending)
    genreStatsArray.sort((a, b) => b.guesses - a.guesses)

    return genreStatsArray
  } catch (error) {
    console.error("Error calculating genre stats:", error)
    return []
  }
}
