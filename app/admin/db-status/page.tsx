"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, RefreshCw, Database, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function DbStatusPage() {
  const [status, setStatus] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchStatus = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/db-status")
      if (!res.ok) throw new Error(`HTTP error ${res.status}`)

      const data = await res.json()
      setStatus(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchStatus()
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-4 px-6 flex items-center border-b border-dusty-rose/10">
        <Link href="/" className="mr-4 text-charcoal/70 hover:text-dusty-rose transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-xl font-playfair">Database Status</h1>
        <button
          onClick={fetchStatus}
          className="ml-auto flex items-center text-charcoal/70 hover:text-dusty-rose transition-colors"
          disabled={isLoading}
        >
          <RefreshCw className={`w-5 h-5 mr-1 ${isLoading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </header>

      <main className="flex-1 container max-w-4xl mx-auto px-4 py-8">
        <div className="card">
          <div className="flex items-center mb-6">
            <Database className="w-6 h-6 text-dusty-rose mr-2" />
            <h2 className="text-2xl font-playfair">MongoDB Status</h2>
          </div>

          {error ? (
            <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-4">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 mr-2 mt-0.5" />
                <div>
                  <p className="font-medium">Error fetching database status</p>
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            </div>
          ) : isLoading ? (
            <div className="flex justify-center py-12">
              <div className="flex flex-col items-center">
                <RefreshCw className="w-8 h-8 text-dusty-rose animate-spin mb-2" />
                <p className="text-dusty-rose">Checking database status...</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-beige/30 p-4 rounded-xl">
                <h3 className="font-medium mb-2">Connection Status</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-charcoal/70">Connected</p>
                    <p className="font-medium">
                      {status?.status?.connected ? (
                        <span className="text-green-600">Yes</span>
                      ) : (
                        <span className="text-red-600">No</span>
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-charcoal/70">Ready State</p>
                    <p className="font-medium">{status?.status?.readyState}</p>
                  </div>
                  <div>
                    <p className="text-sm text-charcoal/70">Database Name</p>
                    <p className="font-medium">{status?.status?.name || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-charcoal/70">Host</p>
                    <p className="font-medium">{status?.status?.host || "N/A"}</p>
                  </div>
                </div>
              </div>

              <div className="bg-beige/30 p-4 rounded-xl">
                <h3 className="font-medium mb-2">Models</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {status?.status?.models?.map((model: string) => (
                    <div key={model} className="bg-ivory p-3 rounded-lg">
                      <p className="font-medium">{model}</p>
                      <p className="text-sm text-charcoal/70">Documents: {status?.counts?.[model] ?? "Unknown"}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-xs text-charcoal/50">
                <p>Last updated: {status?.timestamp ? new Date(status.timestamp).toLocaleString() : "Unknown"}</p>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="py-6 px-4 border-t border-dusty-rose/10 text-center text-charcoal/60 text-sm">
        <p>© {new Date().getFullYear()} Plotline</p>
      </footer>
    </div>
  )
}
