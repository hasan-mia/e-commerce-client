"use client"

import type React from "react"

import { useState, useEffect } from "react"
import type { Product, Category } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

interface ProductFormModalProps {
  isOpen: boolean
  product: Product | null
  categories: Category[]
  onClose: () => void
  onSave: (data: Omit<Product, "id" | "createdAt" | "reviews">) => void
}

export function ProductFormModal({ isOpen, product, categories, onClose, onSave }: ProductFormModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    categoryId: categories[0]?.id || "",
    stock: 0,
    rating: 0,
    image: "",
  })

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        categoryId: product.categoryId,
        stock: product.stock,
        rating: product.rating,
        image: product.image,
      })
    } else {
      setFormData({
        name: "",
        description: "",
        price: 0,
        categoryId: categories[0]?.id || "",
        stock: 0,
        rating: 0,
        image: "",
      })
    }
  }, [product, categories])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" || name === "rating" ? Number.parseFloat(value) : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="bg-background border-border p-6 w-full max-w-md max-h-96 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">{product ? "Edit Product" : "Add Product"}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium block mb-1">Name</label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="bg-muted border-border"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium block mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full bg-muted border border-border rounded p-2 text-sm"
              rows={2}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-sm font-medium block mb-1">Price</label>
              <Input
                name="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                className="bg-muted border-border"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">Stock</label>
              <Input
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleChange}
                className="bg-muted border-border"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-sm font-medium block mb-1">Category</label>
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                className="w-full bg-muted border border-border rounded p-2 text-sm"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">Rating</label>
              <Input
                name="rating"
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={formData.rating}
                onChange={handleChange}
                className="bg-muted border-border"
              />
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
              Save
            </Button>
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
