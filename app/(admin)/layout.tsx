"use client"

import type React from "react"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Sidebar } from "@/components/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isAuthenticated, isAdmin, mounted, loading } = useAuth()
  const router = useRouter()

  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    // Wait for auth to be loaded from localStorage
    if (!mounted || loading) return

    // Redirect if not authenticated
    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    // Redirect if not admin
    if (!isAdmin) {
      router.push("/")
      return
    }
  }, [isAuthenticated, isAdmin, mounted, loading, router])

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
  if (!isAuthenticated || !isAdmin) {
    return null
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto bg-muted/30 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}