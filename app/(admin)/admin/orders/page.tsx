"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Search } from "lucide-react"
import { formatDate, formatPrice } from "@/lib/utils"
import { DataTable, DataTableColumn } from "@/components/ui/data-table"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import useOrders from "./_hooks/useOrders"
import { OrderExpandedRow } from "./_components/order-expanded-row"
// import { OrderStatusModal } from "./_components/order-status-modal"

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

export default function AdminOrdersPage() {
  const {
    listData,
    listLoading,
    listError,
    updateOrderStatus,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    limit,
    setPage,
    setLimit,
  } = useOrders("orders")

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const getStatusBadgeColor = (status: OrderStatus) => {
    const colors: Record<OrderStatus, string> = {
      PENDING: "bg-yellow-100 text-yellow-800",
      PROCESSING: "bg-blue-100 text-blue-800",
      SHIPPED: "bg-purple-100 text-purple-800",
      DELIVERED: "bg-green-100 text-green-800",
      CANCELLED: "bg-red-100 text-red-800",
      REFUNDED: "bg-gray-100 text-gray-800",
    }
    return colors[status] || "bg-gray-100 text-gray-800"
  }

  const renderExpandedRow = (order: Order) => {
    return <OrderExpandedRow order={order} />
  }

  const columns: DataTableColumn<Order>[] = [
    {
      key: "id",
      header: "Order ID",
      cell: (o) => (
        <div className="font-mono text-xs">
          {o.id.substring(0, 8)}...
        </div>
      ),
    },
    {
      key: "user",
      header: "Customer",
      cell: (o) => (
        <div>
          <div className="font-medium">{o.user.name}</div>
          <div className="text-xs text-muted-foreground">{o.user.email}</div>
        </div>
      ),
    },
    {
      key: "total_amount",
      header: "Total",
      cell: (o) => (
        <span className="font-semibold">
          {formatPrice(Number(o.total_amount))}
        </span>
      ),
      sortable: true,
    },
    {
      key: "payment_method",
      header: "Payment",
      cell: (o) => (
        <div className="text-sm">
          {o.payment_method.replace(/_/g, " ")}
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (p) => (
        <select
          value={p.status}
          onChange={(e) => updateOrderStatus(p.id, e.target.value as any)}
          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(p.status)} cursor-pointer hover:opacity-80 transition`}
        >
          <option value="PENDING">PENDING</option>
          <option value="PROCESSING">PROCESSING</option>
          <option value="SHIPPED">SHIPPED</option>
          <option value="DELIVERED">DELIVERED</option>
          <option value="CANCELLED">CANCELLED</option>
          <option value="REFUNDED">REFUNDED</option>
        </select>
      ),
    },
    {
      key: "transaction_status",
      header: "Payment Status",
      cell: (o) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${o.transaction.status === "COMPLETED" ? "bg-green-100 text-green-800" :
          o.transaction.status === "PENDING" ? "bg-yellow-100 text-yellow-800" :
            "bg-red-100 text-red-800"
          }`}>
          {o.transaction.status}
        </span>
      ),
    },
    {
      key: "created_at",
      header: "Order Date",
      cell: (o) => formatDate(new Date(o.created_at)),
      sortable: true,
    },
  ]

  const orders = listData?.orders || []
  const pagination = listData?.pagination

  return (
    <div className="container mx-auto py-2">
      <Card>
        <div className="p-4">
          <div className="flex justify-between mb-6">
            <h1 className="text-xl font-semibold">Order Management</h1>

            <div className="flex gap-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border rounded px-3 py-2 text-sm bg-background"
              >
                <option value="ALL">All Status</option>
                <option value="PENDING">Pending</option>
                <option value="PROCESSING">Processing</option>
                <option value="SHIPPED">Shipped</option>
                <option value="DELIVERED">Delivered</option>
                <option value="CANCELLED">Cancelled</option>
                <option value="REFUNDED">Refunded</option>
              </select>

              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search orders..."
                  className="pl-9 w-full font-normal"
                  value={search}
                  onChange={handleSearch}
                />
              </div>
            </div>
          </div>

          <CardContent className="p-0">
            <DataTable
              data={orders}
              columns={columns}
              isLoading={listLoading}
              keyExtractor={(o) => o.id}
              error={listError ? "Failed to load... Please try again." : undefined}
              searchQuery={search}
              pagination={{
                pageSize: limit,
                total: pagination?.total,
                pageSizeOptions: [10, 20, 50, 100],
                showSizeChanger: true,
                serverSide: true,
                position: "bottom",
                onPageChange: setPage,
                onPageSizeChange: setLimit,
              }}
              selectable={false}
              searchable={false}
              showColumnFilters={false}
              className="shadow-sm"
              expandable={true}
              renderExpandedRow={renderExpandedRow}
            />
          </CardContent>
        </div>
      </Card>

      {/* <OrderStatusModal
        isOpen={showStatusModal}
        order={selectedOrder}
        onClose={() => {
          setShowStatusModal(false)
          setSelectedOrder(null)
        }}
        onUpdate={handleStatusUpdate}
      /> */}
    </div>
  )
}