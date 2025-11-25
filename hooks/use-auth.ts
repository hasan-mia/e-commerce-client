"use client"

import { useState, useCallback, useEffect } from "react"
import type { User } from "@/lib/types"
import { dummyUsers } from "@/lib/dummy-data"

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(true)

  // Load user from localStorage on mount
  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem("user")
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setUser({
          ...parsed,
          createdAt: new Date(parsed.createdAt)
        })
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error)
        localStorage.removeItem("user")
      }
    }
    setLoading(false)
  }, [])

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (mounted) {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user))
      } else {
        localStorage.removeItem("user")
      }
    }
  }, [user, mounted])

  const login = useCallback((email: string, password: string) => {
    // Validate with dummy users
    const foundUser = dummyUsers.find(u => u.email === email)

    if (foundUser) {
      // In production, verify password here
      setUser(foundUser)
      localStorage.setItem("user", JSON.stringify(foundUser))
      return { success: true, user: foundUser }
    }

    // Mock login for any email if not in dummy data
    const mockUser: User = {
      id: email.includes("admin") ? "2" : "1",
      email,
      name: email.split("@")[0],
      role: email.includes("admin") ? "ADMIN" : "USER",
      createdAt: new Date(),
    }
    setUser(mockUser)
    localStorage.setItem("user", JSON.stringify(mockUser))
    return { success: true, user: mockUser }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem("user")
    localStorage.removeItem("cart")
    localStorage.removeItem("wishlist")
  }, [])

  const updateUser = useCallback((updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates }
      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))
    }
  }, [user])

  // Role-based checks
  const isAdmin = user?.role === "ADMIN"
  const isUser = user?.role === "USER"
  const isAuthenticated = !!user

  // Role-based permissions
  const hasPermission = useCallback((requiredRole: "USER" | "ADMIN") => {
    if (!user) return false
    if (requiredRole === "USER") return true // Both USER and ADMIN can access USER routes
    return user.role === "ADMIN" // Only ADMIN can access ADMIN routes
  }, [user])

  const canAccessAdminPanel = isAdmin
  const canManageProducts = isAdmin
  const canManageOrders = isAdmin
  const canManageUsers = isAdmin
  const canViewAnalytics = isAdmin

  return {
    user,
    login,
    logout,
    updateUser,
    isAuthenticated,
    isAdmin,
    isUser,
    hasPermission,
    canAccessAdminPanel,
    canManageProducts,
    canManageOrders,
    canManageUsers,
    canViewAnalytics,
    mounted,
    loading,
  }
}