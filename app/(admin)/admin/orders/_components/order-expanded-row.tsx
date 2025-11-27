"use client"

import { formatPrice } from "@/lib/utils"
import { Package, MapPin, CreditCard, Phone } from "lucide-react"

type OrderStatus = "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED" | "REFUNDED"

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

interface User {
    id: string
    name: string
    email: string
    phone: string
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
    user: User
    items: OrderItem[]
    transaction: Transaction
}

interface OrderExpandedRowProps {
    order: Order
}

export function OrderExpandedRow({ order }: OrderExpandedRowProps) {
    return (
        <div className="p-4 bg-gray-50 border-t">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Order Items */}
                <div className="lg:col-span-2 space-y-3">
                    <div className="flex items-center gap-2 mb-3">
                        <Package className="h-4 w-4 text-gray-600" />
                        <h3 className="font-semibold text-sm">Order Items</h3>
                    </div>

                    <div className="space-y-2">
                        {order.items.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center gap-4 p-3 bg-white rounded-lg border"
                            >
                                <img
                                    src={item.product.images?.[0] || "/placeholder.png"}
                                    alt={item.product.name}
                                    className="h-16 w-16 rounded object-cover"
                                />
                                <div className="flex-1">
                                    <h4 className="font-medium text-sm">{item.product.name}</h4>
                                    <p className="text-xs text-muted-foreground">
                                        Quantity: {item.quantity}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold">
                                        {formatPrice(Number(item.price))}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        × {item.quantity}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="bg-white p-4 rounded-lg border mt-3">
                        <div className="flex justify-between items-center">
                            <span className="font-semibold">Total Amount:</span>
                            <span className="text-lg font-bold text-primary">
                                {formatPrice(Number(order.total_amount))}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Order Details */}
                <div className="space-y-4">
                    {/* Customer Info */}
                    <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-3">
                            <Phone className="h-4 w-4 text-gray-600" />
                            <h3 className="font-semibold text-sm">Customer Details</h3>
                        </div>
                        <div className="space-y-2 text-sm">
                            <div>
                                <span className="text-muted-foreground">Name:</span>
                                <p className="font-medium">{order.user.name}</p>
                            </div>
                            <div>
                                <span className="text-muted-foreground">Email:</span>
                                <p className="font-medium">{order.user.email}</p>
                            </div>
                            <div>
                                <span className="text-muted-foreground">Phone:</span>
                                <p className="font-medium">{order.user.phone}</p>
                            </div>
                        </div>
                    </div>

                    {/* Shipping Address */}
                    <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-3">
                            <MapPin className="h-4 w-4 text-gray-600" />
                            <h3 className="font-semibold text-sm">Shipping Address</h3>
                        </div>
                        <p className="text-sm text-gray-700">{order.shipping_address}</p>
                        {order.tracking_number && (
                            <div className="mt-3 pt-3 border-t">
                                <span className="text-xs text-muted-foreground">Tracking Number:</span>
                                <p className="font-mono text-sm font-medium mt-1">
                                    {order.tracking_number}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Payment Info */}
                    <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-3">
                            <CreditCard className="h-4 w-4 text-gray-600" />
                            <h3 className="font-semibold text-sm">Payment Details</h3>
                        </div>
                        <div className="space-y-2 text-sm">
                            <div>
                                <span className="text-muted-foreground">Method:</span>
                                <p className="font-medium">
                                    {order.payment_method.replace(/_/g, " ")}
                                </p>
                            </div>
                            <div>
                                <span className="text-muted-foreground">Transaction Status:</span>
                                <p className="font-medium">{order.transaction.status}</p>
                            </div>
                            {order.transaction.transaction_id && (
                                <div>
                                    <span className="text-muted-foreground">Transaction ID:</span>
                                    <p className="font-mono text-xs">
                                        {order.transaction.transaction_id}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Notes */}
                    {order.notes && (
                        <div className="bg-white p-4 rounded-lg border">
                            <h3 className="font-semibold text-sm mb-2">Notes</h3>
                            <p className="text-sm text-gray-700">{order.notes}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}