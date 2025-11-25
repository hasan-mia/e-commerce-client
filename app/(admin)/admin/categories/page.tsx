"use client"

import { useState } from "react"
import { dummyCategories } from "@/lib/dummy-data"
import type { Category } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Trash2, Edit2, Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { CategoryFormModal } from "@/components/admin/category-form-modal"

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(dummyCategories)
  const [showModal, setShowModal] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const { toast } = useToast()

  const handleSave = (formData: Omit<Category, "id">) => {
    if (editingCategory) {
      setCategories((prev) => prev.map((c) => (c.id === editingCategory.id ? { ...c, ...formData } : c)))
      toast({
        title: "Category updated",
        description: `${formData.name} has been updated`,
      })
    } else {
      const newCategory: Category = {
        ...formData,
        id: Math.random().toString(),
      }
      setCategories((prev) => [newCategory, ...prev])
      toast({
        title: "Category created",
        description: `${formData.name} has been added`,
      })
    }
    setShowModal(false)
    setEditingCategory(null)
  }

  const handleDelete = (id: string) => {
    const category = categories.find((c) => c.id === id)
    setCategories((prev) => prev.filter((c) => c.id !== id))
    toast({
      title: "Category deleted",
      description: `${category?.name} has been removed`,
    })
  }

  const handleEdit = (category: Category) => {
    setEditingCategory(category)
    setShowModal(true)
  }

  const handleAdd = () => {
    setEditingCategory(null)
    setShowModal(true)
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Categories Management</h1>
        <Button onClick={handleAdd} className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Add Category
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Card key={category.id} className="bg-background border-border p-6">
            <div className="mb-4 h-32 bg-muted rounded-lg overflow-hidden">
              <img
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-bold text-lg mb-2">{category.name}</h3>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{category.description}</p>
            <div className="flex gap-2">
              <Button
                onClick={() => handleEdit(category)}
                size="sm"
                variant="ghost"
                className="flex-1 text-accent hover:bg-accent/10"
              >
                <Edit2 className="w-4 h-4 mr-1" />
                Edit
              </Button>
              <Button
                onClick={() => handleDelete(category.id)}
                size="sm"
                variant="ghost"
                className="flex-1 text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <CategoryFormModal
        isOpen={showModal}
        category={editingCategory}
        onClose={() => {
          setShowModal(false)
          setEditingCategory(null)
        }}
        onSave={handleSave}
      />
    </div>
  )
}
