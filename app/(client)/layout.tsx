"use client"

import type React from "react"

import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Navbar } from "@/components/navbar"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import { Analytics } from "@vercel/analytics/next"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isAuthenticated, isUser, mounted, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Wait for auth to be loaded from localStorage
    if (!mounted || loading) return

    // Redirect if not authenticated
    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    // Redirect if not admin
    if (!isUser) {
      router.push("/")
      return
    }
  }, [isAuthenticated, isUser, mounted, loading, router])

  // Show loading spinner while checking auth
  if (!mounted || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Don't render if not authenticated or not admin
  if (!isAuthenticated || !isUser) {
    return null
  }

  return (
    <main>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <Toaster />
      <Analytics />
    </main>
  )
}
