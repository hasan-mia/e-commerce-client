"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Trash2, Edit, Search, Plus } from "lucide-react"
import { formatDate, formatPrice } from "@/lib/utils"
import { ProductFormModal } from "@/app/(admin)/admin/products/_components/product-form-modal"
import { DataTable, DataTableColumn } from "@/components/ui/data-table"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import useProducts from "./_hooks/useProducts"
import ConfirmDeleteModal from "@/components/confirm-modal"

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
  status: "active" | "out_of_stock"
  created_at: string
  updated_at: string
  category: {
    id: string
    name: string
    description: string
    icon: string
  }
}

export default function AdminProductsPage() {
  const {
    listData,
    listLoading,
    listError,
    categories,
    onDeleteProduct,
    handleStatusChange,
    search,
    setSearch,
    limit,
    setPage,
    setLimit,
  } = useProducts("products")

  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null)


  const handleAdd = () => {
    setEditingProduct(null)
    setShowModal(true)
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setShowModal(true)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const columns: DataTableColumn<Product>[] = [
    {
      key: "images",
      header: "Image",
      cell: (p) => (
        <img
          src={p.images?.[0] || "/placeholder.png"}
          alt={p.name}
          className="h-10 w-10 rounded-md object-cover"
        />
      ),
    },
    {
      key: "name",
      header: "Name",
      cell: (p) => p.name,
      sortable: true,
    },
    {
      key: "category",
      header: "Category",
      cell: (p) => p.category?.name || "N/A",
    },
    {
      key: "price",
      header: "Price",
      cell: (p) => formatPrice(Number(p.price)),
      sortable: true,
    },
    {
      key: "stock",
      header: "Stock",
      cell: (p) => (
        <span className={p.stock === 0 ? "text-red-500" : ""}>
          {p.stock}
        </span>
      ),
      sortable: true,
    },
    {
      key: "rating",
      header: "Rating",
      cell: (p) => `${p.rating} ⭐`,
    },
    {
      key: "status",
      header: "Status",
      cell: (p) => (
        <select
          value={p.status}
          onChange={(e) => handleStatusChange(p.id, e.target.value as any)}
          className="border rounded px-2 py-1 text-sm"
        >
          <option value="active">Active</option>
          <option value="out_of_stock">Out of Stock</option>
        </select>
      ),
    },
    {
      key: "created_at",
      header: "Created",
      cell: (p) => formatDate(new Date(p.created_at)),
      sortable: true,
    },
    {
      key: "actions",
      header: "Actions",
      cell: (p) => (
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon" onClick={() => handleEdit(p)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setSelectedProductId(p.id)
              setShowDeleteModal(true)
            }}
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      ),
    },
  ]

  const products = listData?.products || []
  const pagination = listData?.pagination

  return (
    <div className="container mx-auto py-2">
      <Card>
        <div className="p-4">
          <div className="flex justify-between mb-6">
            <h1 className="text-xl font-semibold">Product Management</h1>

            <div className="flex gap-3">
              <div className="relative w-6/12">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  className="pl-9 w-full font-normal"
                  value={search}
                  onChange={handleSearch}
                />
              </div>

              <Button className="gap-2 bg-green-600 text-white" onClick={handleAdd}>
                <Plus className="h-4 w-4" />
                Add Product
              </Button>
            </div>
          </div>

          <CardContent className="p-0">
            <DataTable
              data={products}
              columns={columns}
              isLoading={listLoading}
              keyExtractor={(p) => p.id}
              error={listError ? "Failed to load... Please try again." : undefined}
              searchQuery={search}
              pagination={{
                pageSize: limit,
                total: pagination?.total,
                pageSizeOptions: [10, 20, 50, 100],
                showSizeChanger: true,
                serverSide: true,
                position: "bottom",
                onPageChange: setPage,
                onPageSizeChange: setLimit,
              }}
              selectable={false}

              searchable={false}
              showColumnFilters={false}
              className="shadow-sm"
              expandable={false}
            // renderExpandedRow={(item) => item?.body && <ExpandedRow
            //   message={item.body || ""}
            // />
            />
          </CardContent>
        </div>
      </Card>

      <ProductFormModal
        isOpen={showModal}
        product={editingProduct}
        onClose={() => {
          setShowModal(false)
          setEditingProduct(null)
        }}
        categories={categories}
      />

      <ConfirmDeleteModal
        isOpen={showDeleteModal}
        isLoading={false}
        title="Delete?"
        description="Are you sure you want to delete this? This action cannot be undone."
        onClose={() => {
          setShowDeleteModal(false)
          setSelectedProductId(null)
        }}
        onConfirm={() => {
          if (selectedProductId) {
            onDeleteProduct(selectedProductId)
            setShowDeleteModal(false)
          }
        }}
      />

    </div>
  )
}