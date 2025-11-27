"use client"

import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  CheckCircle,
  Package,
  MapPin,
  CreditCard,
  Clock,
  Phone,
  Mail,
  FileText,
  ArrowLeft,
  Download,
  Loader2,
  AlertCircle,
  Truck,
  ShoppingBag,
} from "lucide-react"
import { formatPrice } from "@/lib/utils"
import { useGetOrderDetails } from "@/api/order"

export default function OrderSuccessPage() {
  const params = useParams()
  const router = useRouter()
  const orderId = params.id as string

  const { data: order, isLoading, error } = useGetOrderDetails(orderId)

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-green-600 mx-auto mb-4" />
          <p className="text-slate-600">Loading order details...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error || !order) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex items-center justify-center">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto text-center">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-12 h-12 text-red-600" />
            </div>
            <h1 className="text-3xl font-bold mb-3 text-slate-900">Order Not Found</h1>
            <p className="text-slate-600 mb-8">
              We couldn't find the order you're looking for.
            </p>
            <Link href="/orders">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                View All Orders
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    const colors = {
      PENDING: "bg-amber-100 text-amber-800 border-amber-300",
      PROCESSING: "bg-blue-100 text-blue-800 border-blue-300",
      SHIPPED: "bg-purple-100 text-purple-800 border-purple-300",
      DELIVERED: "bg-green-100 text-green-800 border-green-300",
      CANCELLED: "bg-red-100 text-red-800 border-red-300",
    }
    return colors[status as keyof typeof colors] || colors.PENDING
  }

  const getPaymentMethodIcon = (method: string) => {
    return method === "CASH_ON_DELIVERY" ? (
      <Package className="w-5 h-5" />
    ) : (
      <CreditCard className="w-5 h-5" />
    )
  }

  const subtotal = order.items.reduce(
    (sum: number, item: any) => sum + parseFloat(item.price) * item.quantity,
    0
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-slate-50">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        {/* Success Header */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">
              Order Confirmed! 🎉
            </h1>
            <p className="text-slate-600 text-lg">
              Thank you for your purchase. Your order has been successfully placed.
            </p>
          </div>

          {/* Order Number Card */}
          <Card className="bg-gradient-to-r from-green-600 to-emerald-600 text-white border-0 shadow-lg">
            <div className="p-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <p className="text-green-100 text-sm mb-1">Order Number</p>
                  <p className="text-2xl font-bold tracking-wide">#{order.id.slice(0, 8).toUpperCase()}</p>
                </div>
                <Badge className={`${getStatusColor(order.status)} border text-sm px-4 py-2`}>
                  {order.status}
                </Badge>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <Card className="bg-white border-slate-200">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">Order Items</h2>
                </div>

                <div className="space-y-4">
                  {order.items.map((item: any) => (
                    <div
                      key={item.id}
                      className="flex gap-4 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                      <div className="relative w-20 h-20 bg-white rounded-lg overflow-hidden flex-shrink-0 border border-slate-200">
                        {item.product.images?.[0] ? (
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package className="w-8 h-8 text-slate-300" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-slate-900 mb-1 line-clamp-2">
                          {item.product.name}
                        </h3>
                        <p className="text-sm text-slate-600 line-clamp-1 mb-2">
                          {item.product.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-600">
                            Qty: {item.quantity} × {formatPrice(parseFloat(item.price))}
                          </span>
                          <span className="font-bold text-blue-600">
                            {formatPrice(parseFloat(item.price) * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-6" />

                {/* Order Summary */}
                <div className="space-y-3">
                  <div className="flex justify-between text-slate-700">
                    <span>Subtotal</span>
                    <span className="font-semibold">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span>Shipping</span>
                    <span className="font-semibold text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span>Tax (included)</span>
                    <span className="font-semibold">
                      {formatPrice(parseFloat(order.total_amount) - subtotal)}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold text-slate-900">
                    <span>Total</span>
                    <span className="text-2xl text-blue-600">
                      {formatPrice(parseFloat(order.total_amount))}
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Shipping Address */}
            <Card className="bg-white border-slate-200">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-green-600" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">Delivery Address</h2>
                </div>
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-slate-900 font-medium mb-2">{order.user.name}</p>
                  <p className="text-slate-700 mb-2">{order.shipping_address}</p>
                  <div className="flex items-center gap-4 text-sm text-slate-600 mt-3">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>{order.user.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>{order.user.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Order Notes */}
            {order.notes && (
              <Card className="bg-white border-slate-200">
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-amber-600" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900">Order Notes</h2>
                  </div>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <p className="text-slate-700">{order.notes}</p>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Right Column - Quick Info */}
          <div className="space-y-6">
            {/* Payment Info */}
            <Card className="bg-white border-slate-200">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    {getPaymentMethodIcon(order.payment_method)}
                  </div>
                  <h3 className="font-bold text-slate-900">Payment</h3>
                </div>
                <div className="space-y-3">
                  <div className="bg-slate-50 rounded-lg p-4">
                    <p className="text-sm text-slate-600 mb-1">Method</p>
                    <p className="font-semibold text-slate-900">
                      {order.payment_method === "CASH_ON_DELIVERY"
                        ? "Cash on Delivery"
                        : "Card Payment"}
                    </p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <p className="text-sm text-slate-600 mb-1">Status</p>
                    <Badge className={getStatusColor(order.transaction.status)}>
                      {order.transaction.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>

            {/* Order Timeline */}
            <Card className="bg-white border-slate-200">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-slate-900">Order Date</h3>
                </div>
                <p className="text-slate-700">
                  {new Date(order.created_at).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p className="text-sm text-slate-600 mt-1">
                  {new Date(order.created_at).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </Card>

            {/* Expected Delivery */}
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Truck className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-slate-900">Estimated Delivery</h3>
                </div>
                <p className="text-lg font-semibold text-blue-900">2-5 Business Days</p>
                <p className="text-sm text-slate-600 mt-2">
                  We'll send you shipping updates via email and SMS
                </p>
              </div>
            </Card>

            {/* Actions */}
            <div className="space-y-3">
              <Link href="/orders" className="block">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 h-12">
                  <Package className="w-5 h-5 mr-2" />
                  View All Orders
                </Button>
              </Link>
              <Link href="/products" className="block">
                <Button variant="outline" className="w-full h-12 border-slate-300">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Continue Shopping
                </Button>
              </Link>
              <Button
                variant="ghost"
                className="w-full h-12 text-slate-600 hover:text-slate-900"
                onClick={() => window.print()}
              >
                <Download className="w-5 h-5 mr-2" />
                Download Receipt
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}