"use client"

import { useState, useCallback } from "react"
import type { Order, OrderStatus } from "@/lib/types"

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([])

  const createOrder = useCallback((order: Omit<Order, "id" | "createdAt" | "updatedAt">) => {
    const newOrder: Order = {
      ...order,
      id: Math.random().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setOrders((prev) => [newOrder, ...prev])
    return newOrder
  }, [])

  const updateOrderStatus = useCallback((orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, status, updatedAt: new Date() } : order)),
    )
  }, [])

  return {
    orders,
    createOrder,
    updateOrderStatus,
  }
}
