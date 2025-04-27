import { type NextRequest, NextResponse } from "next/server"

// In a real app, this would come from a database
const dailyBooks = [
  {
    id: "daily-1",
    slug: "the-road",
    summary:
      "In a post-apocalyptic world, a father and his young son journey through a desolate landscape, facing starvation, exposure, and roving bands of cannibals as they head south toward the coast in search of a better life.",
    title: "The Road",
    author: "Cormac McCarthy",
    firstLine:
      "When he woke in the woods in the dark and the cold of the night he'd reach out to touch the child sleeping beside him.",
    quote: "Each the other's world entire.",
  },
  {
    id: "daily-2",
    slug: "to-kill-a-mockingbird",
    summary:
      "In a small Southern town during the Great Depression, a young girl and her brother witness their father, a lawyer, defend a Black man falsely accused of a crime, learning important lessons about justice, compassion, and racial inequality.",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    firstLine: "When he was nearly thirteen, my brother Jem got his arm badly broken at the elbow.",
    quote:
      "You never really understand a person until you consider things from his point of view... Until you climb inside of his skin and walk around in it.",
  },
]

export async function GET(req: NextRequest) {
  try {
    // Get today's date in YYYY-MM-DD format to use as a seed
    const today = new Date().toISOString().split("T")[0]

    // Use the date to select a book (in a real app, you'd have a more sophisticated selection)
    // Here we're just using the date string to pick an index
    const dateSum = today.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0)
    const bookIndex = dateSum % dailyBooks.length

    const dailyBook = dailyBooks[bookIndex]

    // Don't send the title in the response - that's what users need to guess!
    const { title, ...bookWithoutTitle } = dailyBook

    return NextResponse.json(bookWithoutTitle)
  } catch (error) {
    console.error("Error in daily book API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
