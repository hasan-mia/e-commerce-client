"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Trash2, Edit, Search, Plus } from "lucide-react"
import { formatDate, formatPrice } from "@/lib/utils"
import { ProductFormModal } from "@/app/(admin)/admin/products/_components/product-form-modal"
import { useProduct } from "./_hooks/useProduct"
import { Product } from "@/lib/types"
import { DataTable, DataTableColumn } from "@/components/ui/data-table"
import { dummyCategories } from "@/lib/dummy-data"
import { Input } from "@/components/ui/input"

export default function AdminProductsPage() {
  const {
    products,
    handleAdd,
    handleEdit,
    handleDelete,
    searchTerm,
    handleSearch,
    showModal,
    setShowModal,
    editingProduct,
    handleSave
  } = useProduct()

  const columns: DataTableColumn<Product>[] = [
    {
      key: "image",
      header: "Image",
      cell: (p) => (
        <img src={p.image} className="h-10 w-10 rounded-md object-cover" />
      ),
    },
    {
      key: "name",
      header: "Name",
      cell: (p) => p.name,
      sortable: true,
    },
    {
      key: "price",
      header: "Price",
      cell: (p) => formatPrice(p.price),
      sortable: true,
    },
    {
      key: "stock",
      header: "Stock",
      cell: (p) => p.stock,
      sortable: true,
    },
    {
      key: "rating",
      header: "Rating",
      cell: (p) => p.rating,
    },
    {
      key: "createdAt",
      header: "Created",
      cell: (p) => formatDate(p.createdAt),
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
          <Button variant="ghost" size="icon" onClick={() => handleDelete(p.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ]

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
                  value={searchTerm}
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
              isLoading={!products}
              keyExtractor={(p) => p.id}
              pagination={{
                pageSize: 5,
                pageSizeOptions: [5, 10, 20],
                showSizeChanger: true,
                serverSide: false,
                position: 'bottom'
              }}
              searchable={false}
              searchQuery={searchTerm}
              selectable={false}
            />
          </CardContent>
        </div>
      </Card>

      <ProductFormModal
        isOpen={showModal}
        product={null} // <-- required
        onClose={() => setShowModal(false)}
        onSave={handleSave}
        categories={dummyCategories}
      />
    </div>
  )
}
