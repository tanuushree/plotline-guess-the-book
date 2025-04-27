"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { ArrowLeft, Clock, HelpCircle, Send, Trophy, Loader2 } from "lucide-react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { submitGuess, recordHintUsage, createOrUpdateUser } from "@/lib/api"
import { booksByGenre } from "@/lib/book" // Import booksByGenre

// Utility function to deterministically fetch book
const getBookOfTheDay = () => {
  const genres = Object.keys(booksByGenre)
  const allBooks = genres.flatMap((genre) => booksByGenre[genre])

  // Get today's date in YYYYMMDD format as a number
  const today = new Date()
  const dateString = today.toISOString().slice(0, 10).replace(/-/g, "") // e.g., "20250427"
  const seed = parseInt(dateString, 10)

  // Pick a book deterministically
  const index = seed % allBooks.length
  return allBooks[index]
}


export default function DailyChallengePage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [guess, setGuess] = useState("")
  const [result, setResult] = useState<"correct" | "incorrect" | null>(null)
  const [showHint, setShowHint] = useState(false)
  const [hintType, setHintType] = useState<"author" | "quote" | null>(null)
  const [timeRemaining, setTimeRemaining] = useState("")
  const [hasGuessed, setHasGuessed] = useState(false)
  const [streak, setStreak] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { data: session, status } = useSession()

  // Fetch a random book for the daily challenge
  const dailyChallenge = getBookOfTheDay()

  useEffect(() => {
    setMounted(true)

    // Check if user has already guessed today
    const lastGuessDate = localStorage.getItem("lastGuessDate")
    const today = new Date().toDateString()

    if (lastGuessDate === today) {
      setHasGuessed(true)
      const wasCorrect = localStorage.getItem("lastGuessCorrect") === "true"
      setResult(wasCorrect ? "correct" : "incorrect")
    }

    // Get streak from localStorage or MongoDB
    const fetchUserData = async () => {
      if (status === "authenticated") {
        try {
          // Ensure user exists in database
          const { user } = await createOrUpdateUser()
          if (user) {
            setStreak(user.streak || 0)
          }
        } catch (err) {
          console.error("Error fetching user data:", err)
        }
      } else {
        const savedStreak = localStorage.getItem("streak")
        if (savedStreak) {
          setStreak(Number.parseInt(savedStreak))
        }
      }
    }

    if (status !== "loading") {
      fetchUserData()
    }

    // Calculate time until next challenge
    const updateTimeRemaining = () => {
      const now = new Date()
      const tomorrow = new Date(now)
      tomorrow.setDate(tomorrow.getDate() + 1)
      tomorrow.setHours(0, 0, 0, 0)

      const diffMs = tomorrow.getTime() - now.getTime()
      const diffHrs = Math.floor(diffMs / (1000 * 60 * 60))
      const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))

      setTimeRemaining(`${diffHrs}h ${diffMins}m`)
    }

    updateTimeRemaining()
    const interval = setInterval(updateTimeRemaining, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [status])

  if (!mounted) return null

  const handleSubmitGuess = async () => {
    if (!guess.trim() || hasGuessed || isLoading) return

    setIsLoading(true)
    setError(null)

    const normalizedGuess = guess.trim().toLowerCase()
    const normalizedTitle = dailyChallenge.title.toLowerCase()
    const isCorrect = normalizedGuess === normalizedTitle

    // Set local state
    setResult(isCorrect ? "correct" : "incorrect")
    setHasGuessed(true)

    // Save to localStorage
    localStorage.setItem("lastGuessDate", new Date().toDateString())
    localStorage.setItem("lastGuessCorrect", isCorrect.toString())

    try {
      // Save guess to MongoDB if user is logged in
      if (status === "authenticated") {
        await submitGuess({
          bookSlug: dailyChallenge.title,
          wasCorrect: isCorrect,
          usedHint: showHint,
        })

        // The streak will be updated by the backend
        // Refresh user data to get updated streak
        const { user } = await createOrUpdateUser()
        if (user) {
          setStreak(user.streak || 0)
        }
      } else {
        // For non-authenticated users, just update localStorage
        const newStreak = isCorrect ? streak + 1 : 0
        setStreak(newStreak)
        localStorage.setItem("streak", newStreak.toString())
      }
    } catch (err) {
      console.error("Error in handleSubmitGuess:", err)
      setError("Failed to save your guess. Your progress may not be tracked.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleShowHint = async (type: "author" | "quote") => {
    setShowHint(true)
    setHintType(type)

    // Record hint usage in MongoDB if user is logged in
    if (status === "authenticated") {
      try {
        await recordHintUsage({
          bookSlug: dailyChallenge.title,
          hintType: type,
        })
      } catch (err) {
        console.error("Error in handleShowHint:", err)
        // Don't show error to user for hint usage
      }
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-4 px-6 flex items-center border-b border-dusty-rose/10">
        <button
          onClick={() => router.push("/")}
          className="mr-4 text-charcoal/70 hover:text-dusty-rose transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-playfair">Daily Challenge</h1>
        <div className="ml-auto flex items-center">
          <Trophy className="w-5 h-5 text-dusty-rose mr-1" />
          <span className="text-sm">Streak: {streak}</span>
        </div>
      </header>

      <main className="flex-1 container max-w-2xl mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-playfair">Today's Book</h2>
            <div className="flex items-center text-sm text-charcoal/70">
              <Clock className="w-4 h-4 mr-1" />
              <span>Next in: {timeRemaining}</span>
            </div>
          </div>

          <div className="bg-beige/50 p-6 rounded-xl mb-6">
            <p className="text-lg leading-relaxed">{dailyChallenge.summary}</p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-50 text-red-700 p-3 rounded-lg mb-4"
            >
              {error}
            </motion.div>
          )}

          {showHint && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-faded-teal/10 p-4 rounded-xl mb-6"
            >
              <h3 className="font-playfair text-sm uppercase tracking-wider mb-2">Hint</h3>
              {hintType === "author" && (
                <p>
                  Author's initials:{" "}
                  {dailyChallenge.author
                    .split(" ")
                    .map((name) => name[0])
                    .join(". ")}
                  .
                </p>
              )}
              {hintType === "quote" && <p>Famous quote: "{dailyChallenge.quote}"</p>}
              {/* {hintType === "firstLine" && <p>First line: "{dailyChallenge.firstLine}"</p>} */}
            </motion.div>
          )}

          {result === "correct" ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
              <div className="mb-4 py-3 px-4 bg-green-50 text-green-700 rounded-xl inline-block">
                <h3 className="font-playfair text-xl">Correct!</h3>
                <p>
                  The book is indeed "{dailyChallenge.title}" by {dailyChallenge.author}
                </p>
              </div>
              <div className="mt-4">
                <p className="text-charcoal/70 mb-2">Come back tomorrow for a new challenge!</p>
                <Link href="/leaderboard" className="btn-secondary">
                  View Leaderboard
                </Link>
              </div>
            </motion.div>
          ) : result === "incorrect" ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mb-4 py-3 px-4 bg-red-50 text-red-700 rounded-xl"
            >
              <p>
                That's not correct. The answer was "{dailyChallenge.title}" by {dailyChallenge.author}
              </p>
              <p className="mt-2 text-sm">You'll get another chance tomorrow!</p>
            </motion.div>
          ) : null}

          {!hasGuessed && (
            <div className="space-y-4">
              <div className="flex">
                <input
                  type="text"
                  value={guess}
                  onChange={(e) => setGuess(e.target.value)}
                  placeholder="Enter book title..."
                  className="input-field flex-1"
                  onKeyDown={(e) => e.key === "Enter" && !isLoading && handleSubmitGuess()}
                  disabled={isLoading}
                />
                <button
                  onClick={handleSubmitGuess}
                  className="ml-2 p-3 rounded-xl bg-dusty-rose text-ivory"
                  disabled={!guess.trim() || isLoading}
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                </button>
              </div>

              <div className="flex justify-center space-x-3">
                <button
                  onClick={() => handleShowHint("author")}
                  className="btn-secondary text-sm py-2"
                  disabled={isLoading}
                >
                  <span className="flex items-center">
                    <HelpCircle className="w-4 h-4 mr-1" />
                    Author Hint
                  </span>
                </button>
                <button
                  onClick={() => handleShowHint("quote")}
                  className="btn-secondary text-sm py-2"
                  disabled={isLoading}
                >
                  <span className="flex items-center">
                    <HelpCircle className="w-4 h-4 mr-1" />
                    Quote Hint
                  </span>
                </button>
                {/* <button
                  onClick={() => handleShowHint("firstLine")}
                  className="btn-secondary text-sm py-2"
                  disabled={isLoading}
                >
                  <span className="flex items-center">
                    <HelpCircle className="w-4 h-4 mr-1" />
                    First Line
                  </span>
                </button> */}
              </div>
            </div>
          )}
        </motion.div>
      </main>

      <footer className="py-6 px-4 border-t border-dusty-rose/10 text-center text-charcoal/60 text-sm">
        <p>© {new Date().getFullYear()} Plotline</p>
      </footer>
    </div>
  )
}
