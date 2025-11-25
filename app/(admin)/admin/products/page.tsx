"use client"

import { useState } from "react"
import { dummyProducts, dummyCategories } from "@/lib/dummy-data"
import type { Product } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Trash2, Edit2, Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { formatPrice } from "@/lib/utils"
import { ProductFormModal } from "@/components/admin/product-form-modal"

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>(dummyProducts)
  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  const filtered = products.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleSave = (formData: Omit<Product, "id" | "createdAt" | "reviews">) => {
    if (editingProduct) {
      setProducts((prev) => prev.map((p) => (p.id === editingProduct.id ? { ...p, ...formData } : p)))
      toast({
        title: "Product updated",
        description: `${formData.name} has been updated`,
      })
    } else {
      const newProduct: Product = {
        ...formData,
        id: Math.random().toString(),
        reviews: 0,
        createdAt: new Date(),
      }
      setProducts((prev) => [newProduct, ...prev])
      toast({
        title: "Product created",
        description: `${formData.name} has been added`,
      })
    }
    setShowModal(false)
    setEditingProduct(null)
  }

  const handleDelete = (id: string) => {
    const product = products.find((p) => p.id === id)
    setProducts((prev) => prev.filter((p) => p.id !== id))
    toast({
      title: "Product deleted",
      description: `${product?.name} has been removed`,
    })
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setShowModal(true)
  }

  const handleAdd = () => {
    setEditingProduct(null)
    setShowModal(true)
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Products Management</h1>
        <Button onClick={handleAdd} className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      <div className="mb-6">
        <Input
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-muted border-border"
        />
      </div>

      <Card className="bg-background border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border bg-muted">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-bold">Name</th>
                <th className="px-6 py-3 text-left text-sm font-bold">Category</th>
                <th className="px-6 py-3 text-left text-sm font-bold">Price</th>
                <th className="px-6 py-3 text-left text-sm font-bold">Stock</th>
                <th className="px-6 py-3 text-left text-sm font-bold">Rating</th>
                <th className="px-6 py-3 text-left text-sm font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((product) => (
                <tr key={product.id} className="hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium">{product.name}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {dummyCategories.find((c) => c.id === product.categoryId)?.name}
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-primary">{formatPrice(product.price)}</td>
                  <td className="px-6 py-4 text-sm">{product.stock}</td>
                  <td className="px-6 py-4 text-sm">{product.rating.toFixed(1)}</td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleEdit(product)}
                        size="sm"
                        variant="ghost"
                        className="text-accent hover:bg-accent/10"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => handleDelete(product.id)}
                        size="sm"
                        variant="ghost"
                        className="text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <ProductFormModal
        isOpen={showModal}
        product={editingProduct}
        categories={dummyCategories}
        onClose={() => {
          setShowModal(false)
          setEditingProduct(null)
        }}
        onSave={handleSave}
      />
    </div>
  )
}
