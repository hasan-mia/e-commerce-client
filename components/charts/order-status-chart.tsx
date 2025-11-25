"use client"

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"
import { dummyOrders } from "@/lib/dummy-data"

export function OrderStatusChart() {
  const statusCounts = {
    PENDING: dummyOrders.filter((o) => o.status === "PENDING").length,
    CONFIRMED: dummyOrders.filter((o) => o.status === "CONFIRMED").length,
    SHIPPED: dummyOrders.filter((o) => o.status === "SHIPPED").length,
    DELIVERED: dummyOrders.filter((o) => o.status === "DELIVERED").length,
    CANCELLED: dummyOrders.filter((o) => o.status === "CANCELLED").length,
  }

  const data = [
    { name: "Pending", value: statusCounts.PENDING },
    { name: "Confirmed", value: statusCounts.CONFIRMED },
    { name: "Shipped", value: statusCounts.SHIPPED },
    { name: "Delivered", value: statusCounts.DELIVERED },
    { name: "Cancelled", value: statusCounts.CANCELLED },
  ].filter((item) => item.value > 0)

  const COLORS = ["#f59e0b", "#0ea5e9", "#f59e0b", "#10b981", "#ef4444"]

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, value }) => `${name}: ${value}`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "rgba(15, 15, 15, 0.9)",
            border: "1px solid rgba(42, 42, 42, 0.5)",
            borderRadius: "0.5rem",
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
