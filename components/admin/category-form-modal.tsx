"use client"

import type React from "react"

import { useState, useEffect } from "react"
import type { Category } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

interface CategoryFormModalProps {
  isOpen: boolean
  category: Category | null
  onClose: () => void
  onSave: (data: Omit<Category, "id">) => void
}

export function CategoryFormModal({ isOpen, category, onClose, onSave }: CategoryFormModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
  })

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        description: category.description,
        image: category.image,
      })
    } else {
      setFormData({
        name: "",
        description: "",
        image: "",
      })
    }
  }, [category])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="bg-background border-border p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">{category ? "Edit Category" : "Add Category"}</h2>

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
              rows={3}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium block mb-1">Image URL</label>
            <Input
              name="image"
              type="url"
              value={formData.image}
              onChange={handleChange}
              className="bg-muted border-border"
              required
            />
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
