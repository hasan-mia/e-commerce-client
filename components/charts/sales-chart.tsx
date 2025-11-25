"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export function SalesChart() {
  const data = months.map((month, index) => ({
    month,
    sales: Math.floor(Math.random() * 15000) + 5000,
    orders: Math.floor(Math.random() * 50) + 10,
  }))

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(42, 42, 42, 0.5)" />
        <XAxis dataKey="month" stroke="rgba(160, 160, 160, 0.8)" />
        <YAxis stroke="rgba(160, 160, 160, 0.8)" />
        <Tooltip
          contentStyle={{
            backgroundColor: "rgba(15, 15, 15, 0.9)",
            border: "1px solid rgba(42, 42, 42, 0.5)",
            borderRadius: "0.5rem",
          }}
        />
        <Legend />
        <Bar dataKey="sales" fill="#10b981" name="Sales ($)" />
        <Bar dataKey="orders" fill="#0ea5e9" name="Orders" />
      </BarChart>
    </ResponsiveContainer>
  )
}
