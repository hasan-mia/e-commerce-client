"use client"

import { useEffect, useState } from "react"
import { apiClient } from "@/services/api-client"
import type { Order } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { formatPrice, formatDate } from "@/lib/utils"
import { AlertCircle } from "lucide-react"
import Link from "next/link"

interface OrderDetailsPageProps {
  params: {
    id: string
  }
}

export default function OrderDetailsPage({ params }: OrderDetailsPageProps) {
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    apiClient.getOrder(params.id).then((data) => {
      setOrder(data)
      setLoading(false)
    })
  }, [params.id])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">Loading order...</div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Order not found</h1>
          <Link href="/orders">
            <Button className="mt-4 bg-transparent" variant="outline">
              Back to Orders
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <Link href="/orders">
          <Button variant="outline" className="mb-6 bg-transparent">
            ← Back to Orders
          </Button>
        </Link>

        <h1 className="text-3xl font-bold mb-8">Order Details</h1>

        <div className="grid gap-6">
          {/* Order Info */}
          <Card className="bg-background border-border p-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Order Number</p>
                <p className="font-bold text-lg">#{order.id}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Order Date</p>
                <p className="font-bold text-lg">{formatDate(order.createdAt)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Status</p>
                <p className={`font-bold text-lg ${order.status === "DELIVERED" ? "text-success" : "text-warning"}`}>
                  {order.status}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Payment Method</p>
                <p className="font-bold text-lg">
                  {order.paymentMethod === "STRIPE" ? "Credit Card" : "Cash on Delivery"}
                </p>
              </div>
            </div>
          </Card>

          {/* Items */}
          <Card className="bg-background border-border p-6">
            <h2 className="font-bold text-lg mb-4">Order Items</h2>
            <div className="space-y-4 divide-y divide-border">
              {order.items.map((item) => (
                <div key={item.id} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{item.product?.name}</p>
                      <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                    </div>
                    <p className="font-bold">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Summary */}
          <Card className="bg-muted border-border p-6">
            <h2 className="font-bold text-lg mb-4">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(order.totalAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-success">Free</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>{formatPrice(order.totalAmount * 0.1)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t border-border pt-2 mt-2">
                <span>Total</span>
                <span className="text-primary">{formatPrice(order.totalAmount * 1.1)}</span>
              </div>
            </div>
          </Card>

          {/* Shipping Address */}
          <Card className="bg-background border-border p-6">
            <h2 className="font-bold text-lg mb-4">Shipping Address</h2>
            <p className="text-muted-foreground">{order.shippingAddress}</p>
          </Card>
        </div>
      </div>
    </div>
  )
}
