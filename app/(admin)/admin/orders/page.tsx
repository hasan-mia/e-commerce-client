"use client"

import { useState } from "react"
import { dummyOrders } from "@/lib/dummy-data"
import type { Order, OrderStatus } from "@/lib/types"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { formatPrice, formatDate } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>(dummyOrders)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<OrderStatus | "ALL">("ALL")
  const { toast } = useToast()

  const filtered = orders.filter((order) => {
    const matchSearch = order.id.includes(searchTerm)
    const matchStatus = filterStatus === "ALL" || order.status === filterStatus
    return matchSearch && matchStatus
  })

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, status: newStatus, updatedAt: new Date() } : order)),
    )
    toast({
      title: "Order updated",
      description: `Order status changed to ${newStatus}`,
    })
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Orders Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Input
          placeholder="Search by order ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-muted border-border"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as OrderStatus | "ALL")}
          className="bg-muted border border-border rounded-lg px-4 py-2"
        >
          <option value="ALL">All Statuses</option>
          <option value="PENDING">Pending</option>
          <option value="CONFIRMED">Confirmed</option>
          <option value="SHIPPED">Shipped</option>
          <option value="DELIVERED">Delivered</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>

      <Card className="bg-background border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border bg-muted">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-bold">Order ID</th>
                <th className="px-6 py-3 text-left text-sm font-bold">Customer</th>
                <th className="px-6 py-3 text-left text-sm font-bold">Amount</th>
                <th className="px-6 py-3 text-left text-sm font-bold">Status</th>
                <th className="px-6 py-3 text-left text-sm font-bold">Date</th>
                <th className="px-6 py-3 text-left text-sm font-bold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((order) => (
                <tr key={order.id} className="hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium">#{order.id}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{order.user?.name || "Unknown"}</td>
                  <td className="px-6 py-4 text-sm font-bold text-primary">{formatPrice(order.totalAmount)}</td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
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
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{formatDate(order.createdAt)}</td>
                  <td className="px-6 py-4 text-sm">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                      className="bg-muted border border-border rounded px-2 py-1 text-sm"
                    >
                      <option value="PENDING">Pending</option>
                      <option value="CONFIRMED">Confirmed</option>
                      <option value="SHIPPED">Shipped</option>
                      <option value="DELIVERED">Delivered</option>
                      <option value="CANCELLED">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
