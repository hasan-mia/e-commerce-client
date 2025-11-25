import { dummyProducts, dummyCategories, dummyOrders, dummyTransactions, dummyUsers } from "@/lib/dummy-data"
import type { Product, Category, Order, Transaction, User } from "@/lib/types"

// Simulated delay for realistic API calls
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const apiClient = {
  // Products
  async getProducts(): Promise<Product[]> {
    await delay(300)
    return dummyProducts
  },

  async getProduct(id: string): Promise<Product | null> {
    await delay(200)
    return dummyProducts.find((p) => p.id === id) || null
  },

  async getProductsByCategory(categoryId: string): Promise<Product[]> {
    await delay(300)
    return dummyProducts.filter((p) => p.categoryId === categoryId)
  },

  // Categories
  async getCategories(): Promise<Category[]> {
    await delay(200)
    return dummyCategories
  },

  async getCategory(id: string): Promise<Category | null> {
    await delay(200)
    return dummyCategories.find((c) => c.id === id) || null
  },

  // Orders
  async getOrders(userId: string): Promise<Order[]> {
    await delay(300)
    return dummyOrders.filter((o) => o.userId === userId)
  },

  async getOrder(id: string): Promise<Order | null> {
    await delay(200)
    return dummyOrders.find((o) => o.id === id) || null
  },

  async createOrder(data: Omit<Order, "id" | "createdAt" | "updatedAt">): Promise<Order> {
    await delay(500)
    const newOrder: Order = {
      ...data,
      id: Math.random().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    dummyOrders.push(newOrder)
    return newOrder
  },

  // Transactions
  async getTransactions(): Promise<Transaction[]> {
    await delay(300)
    return dummyTransactions
  },

  async getTransaction(id: string): Promise<Transaction | null> {
    await delay(200)
    return dummyTransactions.find((t) => t.id === id) || null
  },

  // Users
  async getUser(id: string): Promise<User | null> {
    await delay(200)
    return dummyUsers.find((u) => u.id === id) || null
  },

  async getAllUsers(): Promise<User[]> {
    await delay(200)
    return dummyUsers
  },
}
