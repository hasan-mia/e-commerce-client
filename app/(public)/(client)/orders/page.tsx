"use client"

import { Package, ShoppingBag, Truck, CheckCircle, XCircle, Clock, Eye } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatPrice } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"
import { useAuthContext } from "@/contexts/auth-context"
import Spinner from "@/components/Spinner"
import { useMyOrder } from "@/api/order"

// Types based on API response
type OrderStatus = "PENDING" | "CONFIRMED" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED"

interface Product {
  id: string
  name: string
  images: string[]
  price: string
}

interface OrderItem {
  id: string
  order_id: string
  product_id: string
  quantity: number
  price: string
  created_at: string
  updated_at: string
  product: Product
}

interface Transaction {
  id: string
  order_id: string
  amount: string
  status: string
  method: string
  transaction_id: string | null
  metadata: any
  created_at: string
  updated_at: string
}

interface Order {
  id: string
  user_id: string
  status: OrderStatus
  payment_method: string
  total_amount: string
  shipping_address: string
  tracking_number: string | null
  notes: string | null
  created_at: string
  updated_at: string
  items: OrderItem[]
  transaction: Transaction
}

// Status badge configuration
const getStatusConfig = (status: OrderStatus) => {
  const configs = {
    PENDING: {
      icon: Clock,
      color: "bg-yellow-100 text-yellow-700 border-yellow-200",
      label: "Pending"
    },
    CONFIRMED: {
      icon: Package,
      color: "bg-blue-100 text-blue-700 border-blue-200",
      label: "Confirmed"
    },
    PROCESSING: {
      icon: Package,
      color: "bg-blue-100 text-blue-700 border-blue-200",
      label: "Processing"
    },
    SHIPPED: {
      icon: Truck,
      color: "bg-purple-100 text-purple-700 border-purple-200",
      label: "Shipped"
    },
    DELIVERED: {
      icon: CheckCircle,
      color: "bg-green-100 text-green-700 border-green-200",
      label: "Delivered"
    },
    CANCELLED: {
      icon: XCircle,
      color: "bg-red-100 text-red-700 border-red-200",
      label: "Cancelled"
    }
  }
  return configs[status] || configs.PENDING
}

export default function OrdersPage() {
  const { user, mounted } = useAuthContext()
  const { data, isLoading, error } = useMyOrder(!!user)

  if (!mounted || isLoading) {
    return <Spinner />
  }

  // Handle error state
  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="bg-white p-12 text-center">
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <XCircle className="w-12 h-12 text-red-400" />
              </div>
              <h1 className="text-3xl font-bold text-slate-900 mb-3">Error Loading Orders</h1>
              <p className="text-slate-600 mb-8 text-lg">
                We couldn't load your orders. Please try again later.
              </p>
              <Button onClick={() => window.location.reload()}>
                Retry
              </Button>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  const orders: Order[] = data?.orders || []

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="bg-white p-12 text-center">
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-12 h-12 text-slate-400" />
              </div>
              <h1 className="text-3xl font-bold text-slate-900 mb-3">No orders yet</h1>
              <p className="text-slate-600 mb-8 text-lg">
                Start shopping and your orders will appear here!
              </p>
              <Link href="/products">
                <Button size="lg" className="px-8">
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Start Shopping
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">My Orders</h1>
          <p className="text-slate-600">Track and manage your orders</p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Package className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{orders.length}</p>
                <p className="text-xs text-slate-600">Total Orders</p>
              </div>
            </div>
          </Card>
          <Card className="bg-white p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">
                  {orders.filter(o => o.status === "DELIVERED").length}
                </p>
                <p className="text-xs text-slate-600">Delivered</p>
              </div>
            </div>
          </Card>
          <Card className="bg-white p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Truck className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">
                  {orders.filter(o => o.status === "SHIPPED").length}
                </p>
                <p className="text-xs text-slate-600">In Transit</p>
              </div>
            </div>
          </Card>
          <Card className="bg-white p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">
                  {orders.filter(o => o.status === "PENDING" || o.status === "CONFIRMED" || o.status === "PROCESSING").length}
                </p>
                <p className="text-xs text-slate-600">Processing</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {orders.map((order) => {
            const statusConfig = getStatusConfig(order.status)
            const StatusIcon = statusConfig.icon

            return (
              <Card key={order.id} className="bg-white overflow-hidden hover:shadow-lg transition-shadow">
                {/* Order Header */}
                <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="text-sm text-slate-600">Order Number</p>
                        <p className="font-bold text-slate-900 text-xs">#{order.id.slice(0, 8)}</p>
                      </div>
                      <div className="h-8 w-px bg-slate-300" />
                      <div>
                        <p className="text-sm text-slate-600">Order Date</p>
                        <p className="font-medium text-slate-900">
                          {new Date(order.created_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                      <div className="h-8 w-px bg-slate-300" />
                      <div>
                        <p className="text-sm text-slate-600">Total Amount</p>
                        <p className="font-bold text-blue-600">
                          {formatPrice(parseFloat(order.total_amount))}
                        </p>
                      </div>
                    </div>
                    <Badge className={`${statusConfig.color} border flex items-center gap-1.5 px-3 py-1.5`}>
                      <StatusIcon className="w-4 h-4" />
                      {statusConfig.label}
                    </Badge>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6">
                  <div className="space-y-4 mb-6">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-4">
                        <div className="relative w-20 h-20 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                          {item.product?.images && item.product.images.length > 0 ? (
                            <Image
                              src={item.product.images[0]}
                              alt={item.product.name || "Product"}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Package className="w-8 h-8 text-slate-400" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-slate-900 mb-1">
                            {item.product?.name || "Product"}
                          </h4>
                          <p className="text-sm text-slate-600">
                            Quantity: {item.quantity} × {formatPrice(parseFloat(item.price))}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-slate-900">
                            {formatPrice(parseFloat(item.price) * item.quantity)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Shipping Address</p>
                      <p className="text-sm font-medium text-slate-900">{order.shipping_address}</p>
                      <p className="text-xs text-slate-500 mt-1">
                        Payment: {order.payment_method === "STRIPE" ? "Card Payment" : "Cash on Delivery"}
                      </p>
                      {order.tracking_number && (
                        <p className="text-xs text-slate-500 mt-1">
                          Tracking: {order.tracking_number}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/orders/${order.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </Link>
                      {order.status === "DELIVERED" && (
                        <Button size="sm">
                          Order Again
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Pagination Info */}
        {data?.pagination && (
          <div className="mt-8 text-center text-sm text-slate-600">
            Showing page {data.pagination.page} of {data.pagination.totalPages}
            ({data.pagination.total} total orders)
          </div>
        )}
      </div>
    </div>
  )
}