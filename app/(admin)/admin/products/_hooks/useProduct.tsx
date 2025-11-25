import { useToast } from "@/hooks/use-toast"
import { dummyProducts } from "@/lib/dummy-data"
import { Product } from "@/lib/types"
import { useEffect, useState } from "react"

export function useProduct() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [showModal, setShowModal] = useState(false)
    const [editingProduct, setEditingProduct] = useState<Product | null>(null)
    const [searchTerm, setSearchTerm] = useState("")
    const { toast } = useToast()

    const fetchProducts = async () => {
        setLoading(true)
        setError(null)
        try {
            // Simulate API call
            const response = await new Promise<Product[]>((resolve) =>
                setTimeout(() => resolve(dummyProducts), 1000)
            )
            setProducts(response)
        } catch (err) {
            setError("Failed to fetch products")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

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
                name: "",
                description: "",
                price: 0,
                image: "",
                categoryId: "",
                stock: 0,
                rating: 0
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

    return {
        products,
        loading,
        error,
        refetch: fetchProducts,
        handleDelete,
        handleEdit,
        handleAdd,
        handleSave,
        showModal,
        setShowModal,
        editingProduct,
        searchTerm,
        setSearchTerm,
        handleSearch,
        setEditingProduct,
    }
}