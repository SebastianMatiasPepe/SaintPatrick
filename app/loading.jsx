import React from "react"
import { Shield } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-pulse">
          <Shield className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-2xl font-bold">Loading SecureBank...</h1>
        <div className="h-2 w-48 rounded-full bg-muted overflow-hidden">
          <div className="h-full w-1/2 bg-primary animate-[loading_1.5s_ease-in-out_infinite]"></div>
        </div>
      </div>
    </div>
  )
}