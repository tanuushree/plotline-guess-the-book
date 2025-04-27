import { NextResponse } from "next/server"
import { getMongoDBStatus, countDocuments } from "@/lib/debug-mongodb"

export async function GET() {
  try {
    const status = await getMongoDBStatus()
    const counts = await countDocuments()

    return NextResponse.json({
      status,
      counts,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
