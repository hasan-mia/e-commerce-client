"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const weeks = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"]

export function RevenueTrendChart() {
  const data = weeks.map((week) => ({
    week,
    revenue: Math.floor(Math.random() * 20000) + 10000,
    profit: Math.floor(Math.random() * 8000) + 5000,
  }))

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(42, 42, 42, 0.5)" />
        <XAxis dataKey="week" stroke="rgba(160, 160, 160, 0.8)" />
        <YAxis stroke="rgba(160, 160, 160, 0.8)" />
        <Tooltip
          contentStyle={{
            backgroundColor: "rgba(15, 15, 15, 0.9)",
            border: "1px solid rgba(42, 42, 42, 0.5)",
            borderRadius: "0.5rem",
          }}
        />
        <Legend />
        <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} name="Revenue" />
        <Line type="monotone" dataKey="profit" stroke="#0ea5e9" strokeWidth={2} name="Profit" />
      </LineChart>
    </ResponsiveContainer>
  )
}
