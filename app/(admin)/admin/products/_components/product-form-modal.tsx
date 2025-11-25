"use client"

import { useState, useEffect } from "react"
import type { Product, Category } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface ProductFormModalProps {
  isOpen: boolean
  product: Product | null
  categories: Category[]
  onClose: () => void
  onSave: (data: Omit<Product, "id" | "createdAt" | "reviews">) => void
}

export function ProductFormModal({
  isOpen,
  product,
  categories,
  onClose,
  onSave
}: ProductFormModalProps) {
  const initialState = {
    name: "",
    description: "",
    price: 0,
    categoryId: categories[0]?.id || "",
    stock: 0,
    rating: 0,
    image: "",
  }

  const [formData, setFormData] = useState(initialState)

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
      setFormData(initialState)
    }
  }, [product, categories])

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price" ||
          name === "stock" ||
          name === "rating"
          ? Number(value)
          : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-w-6xl">
        <DialogHeader>
          <DialogTitle>{product ? "Edit Product" : "Add Product"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* NAME */}
          <div>
            <label className="text-sm font-medium block mb-1">Name</label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="text-sm font-medium block mb-1">Description</label>
            <Textarea
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          {/* PRICE + STOCK */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium block mb-1">Price</label>
              <Input
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium block mb-1">Stock</label>
              <Input
                name="stock"
                type="number"
                min="0"
                value={formData.stock}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* CATEGORY + RATING */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium block mb-1">Category</label>
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                className="w-full border rounded p-2 bg-muted"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
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
              />
            </div>
          </div>

          {/* IMAGE */}
          <div>
            <label className="text-sm font-medium block mb-1">Image URL</label>
            <Input
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="/product.jpg"
            />
          </div>

          {/* BUTTONS */}
          <div className="flex gap-2 pt-4">
            <Button className="bg-primary text-white" type="submit">
              Save
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
