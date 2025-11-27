"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Upload, X } from "lucide-react"
import useProducts from "../_hooks/useProducts"

interface Category {
  id: string
  name: string
  description: string
  icon: string
}

interface Product {
  id: string
  name: string
  description: string
  price: string
  images: string[]
  category_id: string
  stock: number
  rating: string
  reviews: number
  status: string
}

interface ProductFormModalProps {
  isOpen: boolean
  product: Product | null
  categories: Category[]
  onClose: () => void
}

export function ProductFormModal({
  isOpen,
  product,
  categories,
  onClose,
}: ProductFormModalProps) {
  const {
    formState,
    handleInputChange,
    setFormState,
    createProduct,
    updateProduct,
    isLoading,
    uploadingImages,
    onUploadImages,
    removeImage,
  } = useProducts(product ? "update" : "create", product?.id)

  // Reset or populate form when modal opens
  useEffect(() => {
    if (isOpen) {
      if (product) {
        setFormState({
          name: product.name,
          description: product.description,
          price: product.price,
          images: product.images || [],
          category_id: product.category_id,
          stock: product.stock.toString(),
          rating: product.rating,
          reviews: product.reviews.toString(),
          status: product.status as any,
        })
      } else {
        setFormState({
          name: "",
          description: "",
          price: "",
          images: [],
          category_id: categories[0]?.id || "",
          stock: "0",
          rating: "0.0",
          reviews: "0",
          status: "active",
        })
      }
    }
  }, [isOpen, product, categories])

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      await onUploadImages(Array.from(files))
      e.target.value = "" // Reset input
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (product) {
      await updateProduct()
    } else {
      await createProduct()
    }

    if (!isLoading) {
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{product ? "Edit Product" : "Add Product"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* NAME */}
          <div>
            <label className="text-sm font-medium block mb-1">Name *</label>
            <Input
              name="name"
              value={formState.name}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="text-sm font-medium block mb-1">Description *</label>
            <Textarea
              name="description"
              rows={3}
              value={formState.description}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* CATEGORY + STATUS */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium block mb-1">Category *</label>
              <select
                name="category_id"
                value={formState.category_id}
                onChange={handleInputChange}
                className="w-full border rounded p-2 bg-background"
                required
              >
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium block mb-1">Status</label>
              <select
                name="status"
                value={formState.status}
                onChange={handleInputChange}
                className="w-full border rounded p-2 bg-background"
              >
                <option value="active">Active</option>
                <option value="out_of_stock">Out of Stock</option>
              </select>
            </div>
          </div>

          {/* PRICE + STOCK */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium block mb-1">Price *</label>
              <Input
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={formState.price}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium block mb-1">Stock</label>
              <Input
                name="stock"
                type="number"
                min="0"
                value={formState.stock}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* RATING + REVIEWS */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium block mb-1">Rating</label>
              <Input
                name="rating"
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={formState.rating}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="text-sm font-medium block mb-1">Reviews</label>
              <Input
                name="reviews"
                type="number"
                min="0"
                value={formState.reviews}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* IMAGES UPLOAD */}
          <div>
            <label className="text-sm font-medium block mb-2">Product Images</label>

            {/* Upload Button */}
            <div className="mb-3">
              <label className="cursor-pointer">
                <div className="border-2 border-dashed rounded-lg p-4 text-center hover:border-primary transition">
                  <Upload className="mx-auto h-8 w-8 mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    {uploadingImages ? "Uploading..." : "Click to upload images"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Multiple files supported
                  </p>
                </div>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                  disabled={uploadingImages}
                />
              </label>
            </div>

            {/* Image Preview Grid */}
            {formState.images.length > 0 && (
              <div className="grid grid-cols-4 gap-3">
                {formState.images.map((url, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={url}
                      alt={`Product ${index + 1}`}
                      className="w-full h-24 object-cover rounded border"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* BUTTONS */}
          <div className="flex gap-2 pt-4">
            <Button
              className="bg-primary text-white"
              type="submit"
              disabled={isLoading || uploadingImages}
            >
              {isLoading ? "Saving..." : "Save"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}