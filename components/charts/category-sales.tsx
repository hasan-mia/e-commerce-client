"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { dummyCategories, dummyProducts } from "@/lib/dummy-data"

export function CategorySalesChart() {
  const data = dummyCategories.map((category) => {
    const categoryProducts = dummyProducts.filter((p) => p.categoryId === category.id)
    const totalValue = categoryProducts.reduce((sum, p) => sum + p.price * p.stock, 0)
    return {
      name: category.name,
      value: totalValue,
      products: categoryProducts.length,
    }
  })

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(42, 42, 42, 0.5)" />
        <XAxis type="number" stroke="rgba(160, 160, 160, 0.8)" />
        <YAxis dataKey="name" type="category" stroke="rgba(160, 160, 160, 0.8)" width={100} />
        <Tooltip
          contentStyle={{
            backgroundColor: "rgba(15, 15, 15, 0.9)",
            border: "1px solid rgba(42, 42, 42, 0.5)",
            borderRadius: "0.5rem",
          }}
        />
        <Legend />
        <Bar dataKey="value" fill="#f59e0b" name="Total Inventory Value ($)" />
      </BarChart>
    </ResponsiveContainer>
  )
}
