"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, HelpCircle, Send, Loader2 } from "lucide-react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { submitGuess, recordHintUsage } from "@/lib/api"
import { booksByGenre } from "@/lib/book"

export default function GenrePage() {
  const router = useRouter()
  const { id } = useParams() as { id: string }
  const [mounted, setMounted] = useState(false)
  const [bookIndex, setBookIndex] = useState(0)
  const [guess, setGuess] = useState("")
  const [result, setResult] = useState<"correct" | "incorrect" | null>(null)
  const [showHint, setShowHint] = useState(false)
  const [hintType, setHintType] = useState<"author" | "quote" | null>(null)
  const [attempts, setAttempts] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { data: session, status } = useSession()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const genreBooks = booksByGenre[id as keyof typeof booksByGenre] || []
  const currentBook = genreBooks[bookIndex]

  if (!currentBook) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-playfair mb-4">Genre not found</h1>
        <Link href="/" className="btn-primary">
          Return Home
        </Link>
      </div>
    )
  }

  const genreName = id.charAt(0).toUpperCase() + id.slice(1)

  const handleSubmitGuess = async () => {
    if (!guess.trim()) return

    setIsLoading(true)
    setError(null)

    const normalizedGuess = guess.trim().toLowerCase()
    const normalizedTitle = currentBook.title.toLowerCase()
    const isCorrect = normalizedGuess === normalizedTitle

    // Set local state
    setResult(isCorrect ? "correct" : "incorrect")
    if (!isCorrect) {
      setAttempts(attempts + 1)
    }

    try {
      // Save guess to MongoDB if user is logged in
      if (status === "authenticated") {
        await submitGuess({
          bookSlug: `${id}-${currentBook.id}`,
          wasCorrect: isCorrect,
          usedHint: showHint,
        })
      } else {
        // For non-authenticated users, just store in localStorage
        const storedGuesses = JSON.parse(localStorage.getItem("guesses") || "[]")
        storedGuesses.push({
          book_slug: `${id}-${currentBook.id}`,
          was_correct: isCorrect,
          used_hint: showHint,
          timestamp: new Date().toISOString(),
        })
        localStorage.setItem("guesses", JSON.stringify(storedGuesses))
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
          bookSlug: `${id}-${currentBook.id}`,
          hintType: type,
        })
      } catch (err) {
        console.error("Error in handleShowHint:", err)
        // Don't show error to user for hint usage
      }
    }
  }

  const handleNextBook = () => {
    if (bookIndex < genreBooks.length - 1) {
      setBookIndex(bookIndex + 1)
    } else {
      router.push("/")
    }

    // Reset state for next book
    setGuess("")
    setResult(null)
    setShowHint(false)
    setHintType(null)
    setAttempts(0)
    setError(null)
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
        <h1 className="text-xl font-playfair">{genreName} Books</h1>
      </header>

      <main className="flex-1 container max-w-2xl mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="card">
          <div className="mb-8">
            <h2 className="text-2xl font-playfair mb-4 text-center">Guess the Book</h2>
            <div className="bg-beige/50 p-6 rounded-xl mb-6">
              <p className="text-lg leading-relaxed">{currentBook.summary}</p>
            </div>

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
                    {currentBook.author
                      .split(" ")
                      .map((name) => name[0])
                      .join(". ")}
                    .
                  </p>
                )}
                {hintType === "quote" && <p>Famous quote: "{currentBook.quote}"</p>}
                {/* {hintType === "firstLine" && <p>First line: "{currentBook.firstLine}"</p>} */}
              </motion.div>
            )}

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-red-50 text-red-700 p-3 rounded-lg mb-4"
              >
                {error}
              </motion.div>
            )}

            {result === "correct" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <div className={`mb-4 py-3 px-4 rounded-xl inline-block ${revealed ? "bg-yellow-50 text-yellow-700" : "bg-green-50 text-green-700"}`}>
                  {revealed ? (
                    <>
                      <h3 className="font-playfair text-xl">Better Luck Next Time!</h3>
                      <p>
                        The correct answer was "{currentBook.title}" by {currentBook.author}
                      </p>
                    </>
                  ) : (
                    <>
                      <h3 className="font-playfair text-xl">Correct!</h3>
                      <p>
                        The book is indeed "{currentBook.title}" by {currentBook.author}
                      </p>
                    </>
                  )}
                </div>
                <button onClick={handleNextBook} className="btn-primary mt-4">
                  Next Book
                </button>
              </motion.div>
            ) : result === "incorrect" ? (

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center mb-4 py-3 px-4 bg-red-50 text-red-700 rounded-xl"
              >
                <p>That's not correct. Try again or use a hint!</p>
                {attempts >= 3 && (
                  <button
                    onClick={() => {
                      setResult("correct")
                      setRevealed(true)
                    }}
                    className="underline mt-2 text-sm"
                  >
                    Reveal Answer
                  </button>
                )}

              </motion.div>
            ) : null}

            {result !== "correct" && (
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
          </div>
        </motion.div>
      </main>

      <footer className="py-6 px-4 border-t border-dusty-rose/10 text-center text-charcoal/60 text-sm">
        <p>© {new Date().getFullYear()} Plotline</p>
      </footer>
    </div>
  )
}
