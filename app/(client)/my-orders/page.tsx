"use client"

import Link from "new/link"
import { Package } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { apiClient } from "@/services/api-client"
import { useState, useEffect } from "react"
import type { Order } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { formatPrice, formatDate } from "@/lib/utils"

export default function OrdersPage() {
  const { user } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      apiClient.getOrders(user.id).then((data) => {
        setOrders(data)
        setLoading(false)
      })
    }
  }, [user])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">Loading orders...</div>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">No orders yet</h1>
          <p className="text-muted-foreground mb-8">Start shopping to create your first order!</p>
          <Link href="/products">
            <Button className="bg-primary hover:bg-primary/90">Shop Now</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.id} className="bg-background border-border p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-lg mb-1">Order #{order.id}</h3>
                <p className="text-sm text-muted-foreground">{formatDate(order.createdAt)}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  order.status === "DELIVERED"
                    ? "bg-success/20 text-success"
                    : order.status === "SHIPPED"
                      ? "bg-accent/20 text-accent"
                      : order.status === "CANCELLED"
                        ? "bg-destructive/20 text-destructive"
                        : "bg-warning/20 text-warning"
                }`}
              >
                {order.status}
              </span>
            </div>

            <div className="mb-4 pb-4 border-b border-border">
              <p className="text-sm text-muted-foreground mb-2">Items: {order.items.length}</p>
              {order.items.map((item) => (
                <p key={item.id} className="text-sm">
                  {item.product?.name} × {item.quantity}
                </p>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Amount</p>
                <p className="text-2xl font-bold text-primary">{formatPrice(order.totalAmount)}</p>
              </div>
              <Link href={`/orders/${order.id}`}>
                <Button variant="outline">View Details</Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
