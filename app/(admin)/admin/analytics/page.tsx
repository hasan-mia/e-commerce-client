"use client"

import { dummyOrders, dummyProducts, dummyUsers } from "@/lib/dummy-data"
import { Card } from "@/components/ui/card"
import { SalesChart } from "@/components/charts/sales-chart"
import { OrderStatusChart } from "@/components/charts/order-status-chart"
import { RevenueTrendChart } from "@/components/charts/revenue-trend"
import { CategorySalesChart } from "@/components/charts/category-sales"
import { formatPrice } from "@/lib/utils"
import { TrendingUp, TrendingDown } from "lucide-react"

export default function AnalyticsPage() {
  const totalRevenue = dummyOrders.reduce((sum, order) => sum + order.totalAmount, 0)
  const avgOrderValue = totalRevenue / (dummyOrders.length || 1)
  const conversionRate = ((dummyOrders.length / dummyUsers.length) * 100).toFixed(1)
  const repeatCustomers = Math.floor(dummyOrders.length / 2)

  const metrics = [
    {
      label: "Total Revenue",
      value: formatPrice(totalRevenue),
      change: "+12.5%",
      trend: "up",
    },
    {
      label: "Avg Order Value",
      value: formatPrice(avgOrderValue),
      change: "+5.2%",
      trend: "up",
    },
    {
      label: "Conversion Rate",
      value: `${conversionRate}%`,
      change: "+2.1%",
      trend: "up",
    },
    {
      label: "Repeat Customers",
      value: repeatCustomers,
      change: "-1.5%",
      trend: "down",
    },
  ]

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Analytics & Reports</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric) => (
          <Card key={metric.label} className="bg-background border-border p-6">
            <p className="text-sm text-muted-foreground mb-2">{metric.label}</p>
            <p className="text-3xl font-bold mb-2">{metric.value}</p>
            <div
              className={`flex items-center gap-1 text-sm ${metric.trend === "up" ? "text-success" : "text-destructive"
                }`}
            >
              {metric.trend === "up" ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              {metric.change}
            </div>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="bg-background border-border p-6">
          <h2 className="text-xl font-bold mb-6">Sales & Orders by Month</h2>
          <SalesChart />
        </Card>

        <Card className="bg-background border-border p-6">
          <h2 className="text-xl font-bold mb-6">Order Status Distribution</h2>
          <OrderStatusChart />
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="bg-background border-border p-6">
          <h2 className="text-xl font-bold mb-6">Revenue & Profit Trend</h2>
          <RevenueTrendChart />
        </Card>

        <Card className="bg-background border-border p-6">
          <h2 className="text-xl font-bold mb-6">Sales by Category</h2>
          <CategorySalesChart />
        </Card>
      </div>

      {/* Summary Report */}
      <Card className="bg-background border-border p-6">
        <h2 className="text-xl font-bold mb-6">Business Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Total Products</p>
            <p className="text-2xl font-bold">{dummyProducts.length}</p>
            <p className="text-xs text-muted-foreground mt-2">
              {Math.floor((dummyProducts.filter((p) => p.stock > 10).length / dummyProducts.length) * 100)}% in stock
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Total Orders</p>
            <p className="text-2xl font-bold">{dummyOrders.length}</p>
            <p className="text-xs text-muted-foreground mt-2">
              {Math.floor((dummyOrders.filter((o) => o.status === "DELIVERED").length / dummyOrders.length) * 100)}%
              delivered
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Customer Satisfaction</p>
            <p className="text-2xl font-bold">
              {(dummyProducts.reduce((sum, p) => sum + p.rating, 0) / dummyProducts.length).toFixed(1)}
            </p>
            <p className="text-xs text-muted-foreground mt-2">Avg product rating</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
