"use client"

import Link from "next/link"
import { Heart, ShoppingCart, Trash2, ArrowRight, Sparkles } from "lucide-react"
import { dummyProducts } from "@/lib/dummy-data"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { ProductCard } from "@/components/product-card"
import { formatPrice } from "@/lib/utils"
import Image from "next/image"
import { useCartContext } from "@/contexts/cart-context"
import { useWishlistContext } from "@/contexts/wishlist-context"

export default function WishlistPage() {
  const { wishlistIds, removeFromWishlist, clearWishlist } = useWishlistContext()
  const { addItem, isInCart } = useCartContext()
  const { toast } = useToast()

  const wishlistProducts = dummyProducts.filter((p) => wishlistIds.includes(p.id))

  const handleAddToCart = (product: typeof dummyProducts[0]) => {
    if (product.stock === 0) {
      toast({
        title: "Out of stock",
        description: "This product is currently unavailable",
        variant: "destructive",
        className: "text-white",
      })
      return
    }

    addItem(product)
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    })
  }

  const handleRemove = (productId: string, productName: string) => {
    removeFromWishlist(productId)
    toast({
      title: "Removed from wishlist",
      description: `${productName} removed from your wishlist`,
    })
  }

  const handleClearAll = () => {
    clearWishlist()
    toast({
      title: "Wishlist cleared",
      description: "All items have been removed from your wishlist",
    })
  }

  if (wishlistProducts.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-pink-100 to-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-12 h-12 text-red-500" />
            </div>
            <h1 className="text-3xl font-bold mb-3 text-slate-900">Your Wishlist is Empty</h1>
            <p className="text-slate-600 mb-8">
              Start adding products you love to your wishlist and keep track of items you want to buy later!
            </p>
            <Link href="/products">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Sparkles className="w-5 h-5 mr-2" />
                Discover Products
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Calculate total value of wishlist
  const totalValue = wishlistProducts.reduce((sum, product) => sum + product.price, 0)

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">
                My Wishlist
                <Heart className="inline-block w-8 h-8 ml-3 text-red-500 fill-current" />
              </h1>
              <p className="text-slate-600">
                You have {wishlistProducts.length} {wishlistProducts.length === 1 ? "item" : "items"} saved
                <span className="mx-2">•</span>
                Total value: <span className="font-semibold text-blue-600">{formatPrice(totalValue)}</span>
              </p>
            </div>
            {wishlistProducts.length > 0 && (
              <Button
                variant="outline"
                onClick={handleClearAll}
                className="bg-white text-red-600 hover:bg-red-50 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All
              </Button>
            )}
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-white border-slate-200">
              <div className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Heart className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900">{wishlistProducts.length}</div>
                  <div className="text-sm text-slate-600">Saved Items</div>
                </div>
              </div>
            </Card>

            <Card className="bg-white border-slate-200">
              <div className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900">
                    {wishlistProducts.filter((p) => p.stock > 0).length}
                  </div>
                  <div className="text-sm text-slate-600">In Stock</div>
                </div>
              </div>
            </Card>

            <Card className="bg-white border-slate-200">
              <div className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900">{formatPrice(totalValue)}</div>
                  <div className="text-sm text-slate-600">Total Value</div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Wishlist Items - Two Views */}
        <div className="space-y-6">
          {/* List View */}
          <div className="space-y-4 mb-8">
            {wishlistProducts.map((product) => {
              const inCart = isInCart(product.id)
              return (
                <Card
                  key={product.id}
                  className="bg-white border-slate-200 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex gap-6">
                      {/* Product Image */}
                      <Link href={`/products/${product.id}`} className="flex-shrink-0">
                        <div className="relative w-32 h-32 lg:w-40 lg:h-40 bg-slate-50 rounded-xl overflow-hidden group">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          {product.stock === 0 && (
                            <div className="absolute inset-0 bg-slate-900/75 backdrop-blur-sm flex items-center justify-center">
                              <Badge variant="destructive" className="text-sm">
                                Out of Stock
                              </Badge>
                            </div>
                          )}
                        </div>
                      </Link>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1 min-w-0 pr-4">
                            <Link href={`/products/${product.id}`}>
                              <h3 className="font-bold text-xl text-slate-900 hover:text-blue-600 transition-colors mb-2 line-clamp-2">
                                {product.name}
                              </h3>
                            </Link>
                            <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                              {product.description}
                            </p>

                            {/* Rating */}
                            <div className="flex items-center gap-2 mb-3">
                              <div className="flex items-center">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <span key={i} className={`text-sm ${i < Math.floor(product.rating) ? "text-amber-400" : "text-slate-300"}`}>
                                    ★
                                  </span>
                                ))}
                              </div>
                              <span className="text-sm font-medium text-slate-700">{product.rating}</span>
                              <span className="text-sm text-slate-500">({product.reviews} reviews)</span>
                            </div>

                            {/* Stock Badge */}
                            {product.stock > 0 && product.stock <= 5 && (
                              <Badge variant="destructive" className="text-xs mb-3">
                                Only {product.stock} left in stock
                              </Badge>
                            )}
                          </div>

                          {/* Remove Button */}
                          <Button
                            onClick={() => handleRemove(product.id, product.name)}
                            variant="ghost"
                            size="icon"
                            className="text-slate-400 hover:text-red-600 hover:bg-red-50 flex-shrink-0"
                          >
                            <Trash2 className="w-5 h-5" />
                          </Button>
                        </div>

                        {/* Price and Actions */}
                        <div className="flex items-center justify-between flex-wrap gap-4">
                          <div className="text-3xl font-bold text-blue-600">
                            {formatPrice(product.price)}
                          </div>

                          <div className="flex gap-3">
                            <Link href={`/products/${product.id}`}>
                              <Button variant="outline" className="bg-white">
                                View Details
                                <ArrowRight className="w-4 h-4 ml-2" />
                              </Button>
                            </Link>
                            <Button
                              onClick={() => handleAddToCart(product)}
                              disabled={product.stock === 0}
                              className={`${inCart
                                ? "bg-green-600 hover:bg-green-700"
                                : "bg-blue-600 hover:bg-blue-700"
                                }`}
                            >
                              <ShoppingCart className="w-4 h-4 mr-2" />
                              {inCart ? "In Cart" : "Add to Cart"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>

          {/* Grid View Title */}
          <div className="border-t border-slate-200 pt-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Browse Your Favorites</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {wishlistProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>

        {/* Continue Shopping */}
        <div className="mt-12 text-center">
          <Link href="/products">
            <Button size="lg" variant="outline" className="bg-white">
              <Sparkles className="w-5 h-5 mr-2" />
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}