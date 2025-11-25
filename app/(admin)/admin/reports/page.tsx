"use client"

import { useState } from "react"
import { dummyOrders, dummyProducts } from "@/lib/dummy-data"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatPrice, formatDate } from "@/lib/utils"
import { Download } from "lucide-react"

export default function ReportsPage() {
  const [reportType, setReportType] = useState<"sales" | "inventory" | "customer">("sales")

  const handleExport = () => {
    const csv = generateCSV()
    const element = document.createElement("a")
    element.setAttribute("href", "data:text/csv;charset=utf-8," + encodeURIComponent(csv))
    element.setAttribute("download", `${reportType}-report.csv`)
    element.style.display = "none"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const generateCSV = () => {
    if (reportType === "sales") {
      const headers = ["Order ID", "Amount", "Status", "Date", "Payment Method"]
      const rows = dummyOrders.map((order) => [
        order.id,
        order.totalAmount,
        order.status,
        formatDate(order.createdAt),
        order.paymentMethod,
      ])
      return [headers, ...rows].map((row) => row.join(",")).join("\n")
    } else if (reportType === "inventory") {
      const headers = ["Product Name", "Price", "Stock", "Rating", "Total Value"]
      const rows = dummyProducts.map((product) => [
        product.name,
        product.price,
        product.stock,
        product.rating,
        product.price * product.stock,
      ])
      return [headers, ...rows].map((row) => row.join(",")).join("\n")
    } else {
      const headers = ["User ID", "Email", "Role", "Join Date"]
      const rows = []
      return [headers, ...rows].map((row) => row.join(",")).join("\n")
    }
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Reports</h1>
        <Button onClick={handleExport} className="bg-primary hover:bg-primary/90">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Report Type Filter */}
      <div className="flex gap-4 mb-8">
        <Button
          onClick={() => setReportType("sales")}
          variant={reportType === "sales" ? "default" : "outline"}
          className={reportType === "sales" ? "bg-primary hover:bg-primary/90" : ""}
        >
          Sales Report
        </Button>
        <Button
          onClick={() => setReportType("inventory")}
          variant={reportType === "inventory" ? "default" : "outline"}
          className={reportType === "inventory" ? "bg-primary hover:bg-primary/90" : ""}
        >
          Inventory Report
        </Button>
        <Button
          onClick={() => setReportType("customer")}
          variant={reportType === "customer" ? "default" : "outline"}
          className={reportType === "customer" ? "bg-primary hover:bg-primary/90" : ""}
        >
          Customer Report
        </Button>
      </div>

      {/* Sales Report */}
      {reportType === "sales" && (
        <Card className="bg-background border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border bg-muted">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-bold">Order ID</th>
                  <th className="px-6 py-3 text-left text-sm font-bold">Amount</th>
                  <th className="px-6 py-3 text-left text-sm font-bold">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-bold">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-bold">Payment Method</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {dummyOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium">#{order.id}</td>
                    <td className="px-6 py-4 text-sm font-bold text-primary">{formatPrice(order.totalAmount)}</td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          order.status === "DELIVERED" ? "bg-success/20 text-success" : "bg-warning/20 text-warning"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{formatDate(order.createdAt)}</td>
                    <td className="px-6 py-4 text-sm">
                      {order.paymentMethod === "STRIPE" ? "Credit Card" : "Cash on Delivery"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Inventory Report */}
      {reportType === "inventory" && (
        <Card className="bg-background border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border bg-muted">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-bold">Product Name</th>
                  <th className="px-6 py-3 text-left text-sm font-bold">Price</th>
                  <th className="px-6 py-3 text-left text-sm font-bold">Stock</th>
                  <th className="px-6 py-3 text-left text-sm font-bold">Rating</th>
                  <th className="px-6 py-3 text-left text-sm font-bold">Total Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {dummyProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium">{product.name}</td>
                    <td className="px-6 py-4 text-sm">{formatPrice(product.price)}</td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          product.stock > 10 ? "bg-success/20 text-success" : "bg-warning/20 text-warning"
                        }`}
                      >
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">{product.rating.toFixed(1)}</td>
                    <td className="px-6 py-4 text-sm font-bold text-primary">
                      {formatPrice(product.price * product.stock)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Customer Report */}
      {reportType === "customer" && (
        <Card className="bg-background border-border p-6">
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">Customer analytics coming soon</p>
            <p className="text-sm text-muted-foreground">
              Track customer behavior, lifetime value, and retention metrics
            </p>
          </div>
        </Card>
      )}
    </div>
  )
}
