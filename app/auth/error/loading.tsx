import { AlertTriangle } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <AlertTriangle className="w-12 h-12 text-dusty-rose animate-pulse mb-4" />
      <h1 className="text-2xl font-playfair mb-2">Loading Error Details</h1>
      <p className="text-charcoal/70">Please wait while we process the error information...</p>
    </div>
  )
}
