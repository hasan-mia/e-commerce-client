"use client"

import { useState, useCallback, useEffect } from "react"

export function useWishlist() {
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(new Set())
  const [mounted, setMounted] = useState(false)

  // Load wishlist from localStorage on mount
  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem("wishlist")
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setWishlistIds(new Set(parsed))
      } catch (error) {
        console.error("Failed to parse wishlist from localStorage:", error)
        localStorage.removeItem("wishlist")
      }
    }
  }, [])

  // Save wishlist to localStorage whenever it changes (only after mount)
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("wishlist", JSON.stringify(Array.from(wishlistIds)))
    }
  }, [wishlistIds, mounted])

  const toggleWishlist = useCallback((productId: string) => {
    setWishlistIds((prev) => {
      const next = new Set(prev)
      if (next.has(productId)) {
        next.delete(productId)
      } else {
        next.add(productId)
      }
      return next
    })
  }, [])

  const addToWishlist = useCallback((productId: string) => {
    setWishlistIds((prev) => {
      const next = new Set(prev)
      next.add(productId)
      return next
    })
  }, [])

  const removeFromWishlist = useCallback((productId: string) => {
    setWishlistIds((prev) => {
      const next = new Set(prev)
      next.delete(productId)
      return next
    })
  }, [])

  const clearWishlist = useCallback(() => {
    setWishlistIds(new Set())
  }, [])

  const isInWishlist = useCallback((productId: string) => {
    return wishlistIds.has(productId)
  }, [wishlistIds])

  return {
    wishlistIds: Array.from(wishlistIds),
    toggleWishlist,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    isInWishlist,
    count: wishlistIds.size,
    mounted,
  }
}