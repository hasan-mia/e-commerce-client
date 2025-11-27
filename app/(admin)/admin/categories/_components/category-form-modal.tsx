"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Upload, X } from "lucide-react"
import useCategories from "../_hooks/useCategories"

interface Category {
  id: string
  name: string
  description: string
  icon: string
}

interface CategoryFormModalProps {
  isOpen: boolean
  category: Category | null
  onClose: () => void
}

export function CategoryFormModal({
  isOpen,
  category,
  onClose,
}: CategoryFormModalProps) {
  const {
    formState,
    handleInputChange,
    setFormState,
    createCategory,
    updateCategory,
    isLoading,
    uploadingIcon,
    onUploadIcon,
    removeIcon,
  } = useCategories(category ? "update" : "create", category?.id)

  // Reset or populate form when modal opens
  useEffect(() => {
    if (isOpen) {
      if (category) {
        setFormState({
          name: category.name,
          description: category.description,
          icon: category.icon || "",
        })
      } else {
        setFormState({
          name: "",
          description: "",
          icon: "",
        })
      }
    }
  }, [isOpen, category])

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      await onUploadIcon(file)
      e.target.value = "" // Reset input
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (category) {
      await updateCategory()
    } else {
      await createCategory()
    }

    if (!isLoading) {
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{category ? "Edit Category" : "Add Category"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* NAME */}
          <div>
            <label className="text-sm font-medium block mb-1">Name *</label>
            <Input
              name="name"
              value={formState.name}
              onChange={handleInputChange}
              placeholder="Enter category name"
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
              placeholder="Enter category description"
              required
            />
          </div>

          {/* ICON UPLOAD */}
          <div>
            <label className="text-sm font-medium block mb-2">Category Icon</label>

            {/* Upload Button or Preview */}
            {!formState.icon ? (
              <div>
                <label className="cursor-pointer">
                  <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary transition">
                    <Upload className="mx-auto h-10 w-10 mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      {uploadingIcon ? "Uploading..." : "Click to upload icon"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Recommended: Square image (PNG, JPG, WebP)
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                    disabled={uploadingIcon}
                  />
                </label>
              </div>
            ) : (
              <div className="relative inline-block">
                <img
                  src={formState.icon}
                  alt="Category icon"
                  className="w-32 h-32 object-cover rounded-lg border"
                />
                <button
                  type="button"
                  onClick={removeIcon}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          {/* BUTTONS */}
          <div className="flex gap-2 pt-4">
            <Button
              className="bg-primary text-white"
              type="submit"
              disabled={isLoading || uploadingIcon}
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