"use client"

import { useState } from "react"
import { dummyTransactions } from "@/lib/dummy-data"
import type { Transaction } from "@/lib/types"
import { Card } from "@/components/ui/card"
import { formatPrice, formatDate } from "@/lib/utils"

export default function AdminTransactionsPage() {
  const [transactions] = useState<Transaction[]>(dummyTransactions)

  const stats = {
    total: transactions.reduce((sum, t) => sum + t.amount, 0),
    completed: transactions.filter((t) => t.status === "COMPLETED").length,
    pending: transactions.filter((t) => t.status === "PENDING").length,
    failed: transactions.filter((t) => t.status === "FAILED").length,
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Transactions</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-background border-border p-6">
          <p className="text-sm text-muted-foreground mb-2">Total Revenue</p>
          <p className="text-3xl font-bold text-primary">{formatPrice(stats.total)}</p>
        </Card>
        <Card className="bg-background border-border p-6">
          <p className="text-sm text-muted-foreground mb-2">Completed</p>
          <p className="text-3xl font-bold text-success">{stats.completed}</p>
        </Card>
        <Card className="bg-background border-border p-6">
          <p className="text-sm text-muted-foreground mb-2">Pending</p>
          <p className="text-3xl font-bold text-warning">{stats.pending}</p>
        </Card>
        <Card className="bg-background border-border p-6">
          <p className="text-sm text-muted-foreground mb-2">Failed</p>
          <p className="text-3xl font-bold text-destructive">{stats.failed}</p>
        </Card>
      </div>

      <Card className="bg-background border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border bg-muted">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-bold">Transaction ID</th>
                <th className="px-6 py-3 text-left text-sm font-bold">Order ID</th>
                <th className="px-6 py-3 text-left text-sm font-bold">Amount</th>
                <th className="px-6 py-3 text-left text-sm font-bold">Method</th>
                <th className="px-6 py-3 text-left text-sm font-bold">Status</th>
                <th className="px-6 py-3 text-left text-sm font-bold">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium">#{transaction.id}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">#{transaction.orderId}</td>
                  <td className="px-6 py-4 text-sm font-bold text-primary">{formatPrice(transaction.amount)}</td>
                  <td className="px-6 py-4 text-sm">
                    {transaction.method === "STRIPE" ? "Credit Card" : "Cash on Delivery"}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        transaction.status === "COMPLETED"
                          ? "bg-success/20 text-success"
                          : transaction.status === "PENDING"
                            ? "bg-warning/20 text-warning"
                            : "bg-destructive/20 text-destructive"
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{formatDate(transaction.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
