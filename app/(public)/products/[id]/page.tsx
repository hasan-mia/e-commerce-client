"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, Star, ShoppingCart, AlertCircle, Minus, Plus, Package, Truck, Shield, ArrowLeft, Check, Info, Clock, Award, MessageCircle } from "lucide-react"
import { dummyProducts, dummyCategories } from "@/lib/dummy-data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { formatPrice } from "@/lib/utils"
import { ProductCard } from "@/components/product-card"
import { useParams } from "next/navigation"
import { useCartContext } from "@/contexts/cart-context"
import { useWishlistContext } from "@/contexts/wishlist-context"

export default function ProductDetailsPage() {
  const params = useParams()
  const product = dummyProducts.find((p) => p.id === params.id)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [activeTab, setActiveTab] = useState<"description" | "specs" | "reviews">("description")
  const { addItem, isInCart, getItemQuantity } = useCartContext()
  const { isInWishlist, toggleWishlist } = useWishlistContext()
  const { toast } = useToast()

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-red-600" />
          </div>
          <h1 className="text-3xl font-bold mb-3 text-slate-900">Product Not Found</h1>
          <p className="text-slate-600 mb-8">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/products">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Products
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const relatedProducts = dummyProducts
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4)

  const category = dummyCategories.find((c) => c.id === product.categoryId)
  const inCart = isInCart(product.id)
  const cartQuantity = getItemQuantity(product.id)
  const maxQuantity = product.stock - cartQuantity

  const handleAddToCart = () => {
    if (product.stock === 0) {
      toast({
        title: "Out of stock",
        description: "This product is currently unavailable",
        variant: "destructive",
      })
      return
    }

    if (cartQuantity + quantity > product.stock) {
      toast({
        title: "Insufficient stock",
        description: `Only ${maxQuantity} more ${maxQuantity === 1 ? "item" : "items"} available`,
        variant: "destructive",
      })
      return
    }

    addItem(product, quantity)
    toast({
      title: "Added to cart",
      description: `${quantity}x ${product.name} added to your cart`,
    })
  }

  const handleWishlist = () => {
    const wasInWishlist = isInWishlist(product.id)
    toggleWishlist(product.id)
    toast({
      title: wasInWishlist ? "Removed from wishlist" : "Added to wishlist",
      description: wasInWishlist
        ? `${product.name} removed from your wishlist`
        : `${product.name} added to your wishlist`,
    })
  }

  const incrementQuantity = () => {
    if (quantity < maxQuantity) {
      setQuantity((prev) => prev + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  const isNewProduct = () => {
    const daysSinceCreated = Math.floor(
      (Date.now() - product.createdAt.getTime()) / (1000 * 60 * 60 * 24)
    )
    return daysSinceCreated <= 7
  }

  const productImages = [product.image, product.image, product.image]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-600 mb-8">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-blue-600 transition-colors">Products</Link>
          {category && (
            <>
              <span>/</span>
              <Link href={`/products?category=${category.id}`} className="hover:text-blue-600 transition-colors">
                {category.name}
              </Link>
            </>
          )}
          <span>/</span>
          <span className="text-slate-900 font-medium truncate max-w-[200px]">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content - 8 columns */}
          <div className="lg:col-span-8 space-y-8">
            {/* Product Images */}
            <Card className="bg-white border-slate-200 overflow-hidden">
              <div className="p-6">
                <div className="relative bg-slate-50 rounded-xl overflow-hidden aspect-square mb-4">
                  <Image
                    src={productImages[selectedImage] || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />

                  {/* Badges on image */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {isNewProduct() && (
                      <Badge className="bg-blue-600 text-white border-0 shadow-lg">New Arrival</Badge>
                    )}
                    {product.rating >= 4.5 && (
                      <Badge className="bg-amber-500 text-white border-0 shadow-lg">Best Seller</Badge>
                    )}
                    {product.stock <= 5 && product.stock > 0 && (
                      <Badge variant="destructive" className="shadow-lg">
                        Only {product.stock} left
                      </Badge>
                    )}
                  </div>

                  {/* Wishlist button on image */}
                  <Button
                    size="icon"
                    variant="secondary"
                    onClick={handleWishlist}
                    className={`absolute top-4 right-4 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg ${isInWishlist(product.id) ? "text-red-500" : ""
                      }`}
                  >
                    <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? "fill-current" : ""}`} />
                  </Button>
                </div>

                {/* Thumbnail images */}
                <div className="grid grid-cols-3 gap-3">
                  {productImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${selectedImage === idx
                        ? "border-blue-600 shadow-lg"
                        : "border-slate-200 hover:border-slate-300"
                        }`}
                    >
                      <Image src={img || "/placeholder.svg"} alt={`${product.name} ${idx + 1}`} fill className="object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </Card>

            {/* Product Info Tabs */}
            <Card className="bg-white border-slate-200">
              <div className="border-b border-slate-200">
                <div className="flex gap-6 px-6">
                  <button
                    onClick={() => setActiveTab("description")}
                    className={`py-4 font-semibold transition-colors relative ${activeTab === "description"
                      ? "text-blue-600"
                      : "text-slate-600 hover:text-slate-900"
                      }`}
                  >
                    Description
                    {activeTab === "description" && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab("specs")}
                    className={`py-4 font-semibold transition-colors relative ${activeTab === "specs"
                      ? "text-blue-600"
                      : "text-slate-600 hover:text-slate-900"
                      }`}
                  >
                    Specifications
                    {activeTab === "specs" && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab("reviews")}
                    className={`py-4 font-semibold transition-colors relative ${activeTab === "reviews"
                      ? "text-blue-600"
                      : "text-slate-600 hover:text-slate-900"
                      }`}
                  >
                    Reviews ({product.reviews})
                    {activeTab === "reviews" && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                    )}
                  </button>
                </div>
              </div>

              <div className="p-6">
                {activeTab === "description" && (
                  <div className="prose max-w-none">
                    <p className="text-slate-700 leading-relaxed mb-4">{product.description}</p>
                    <h4 className="font-semibold text-slate-900 mb-2">Key Features:</h4>
                    <ul className="space-y-2 text-slate-700">
                      <li>• Premium build quality and materials</li>
                      <li>• Latest technology and specifications</li>
                      <li>• Excellent performance and reliability</li>
                      <li>• Backed by manufacturer warranty</li>
                    </ul>
                  </div>
                )}

                {activeTab === "specs" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex justify-between py-2 border-b border-slate-100">
                        <span className="text-slate-600">Brand</span>
                        <span className="font-medium text-slate-900">Premium</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-slate-100">
                        <span className="text-slate-600">Category</span>
                        <span className="font-medium text-slate-900">{category?.name}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-slate-100">
                        <span className="text-slate-600">Stock</span>
                        <span className="font-medium text-slate-900">{product.stock} units</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between py-2 border-b border-slate-100">
                        <span className="text-slate-600">Rating</span>
                        <span className="font-medium text-slate-900">{product.rating} / 5.0</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-slate-100">
                        <span className="text-slate-600">Reviews</span>
                        <span className="font-medium text-slate-900">{product.reviews} reviews</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-slate-100">
                        <span className="text-slate-600">Warranty</span>
                        <span className="font-medium text-slate-900">1 Year</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-6 pb-6 border-b border-slate-200">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-slate-900 mb-1">{product.rating}</div>
                        <div className="flex items-center justify-center mb-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < Math.floor(product.rating)
                                ? "fill-amber-400 text-amber-400"
                                : "text-slate-300"
                                }`}
                            />
                          ))}
                        </div>
                        <div className="text-sm text-slate-600">{product.reviews} reviews</div>
                      </div>
                    </div>

                    {/* Mock Review */}
                    <div className="space-y-4">
                      <div className="border-b border-slate-100 pb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                            ))}
                          </div>
                          <span className="font-semibold text-slate-900">John D.</span>
                          <span className="text-sm text-slate-500">• 2 days ago</span>
                        </div>
                        <p className="text-slate-700">Excellent product! Exceeded my expectations in every way.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Sidebar - 4 columns */}
          <div className="lg:col-span-4 space-y-6">
            {/* Purchase Card */}
            <Card className="bg-white border-slate-200 sticky top-4">
              <div className="p-6 space-y-6">
                {/* Category badge */}
                {category && (
                  <Link href={`/products?category=${category.id}`}>
                    <Badge variant="secondary" className="hover:bg-slate-200 transition-colors">
                      {category.name}
                    </Badge>
                  </Link>
                )}

                {/* Product name */}
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 leading-tight mb-3">
                    {product.name}
                  </h1>

                  {/* Rating */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(product.rating)
                              ? "fill-amber-400 text-amber-400"
                              : "text-slate-300"
                              }`}
                          />
                        ))}
                      </div>
                      <span className="font-semibold text-slate-900">{product.rating}</span>
                    </div>
                    <span className="text-sm text-slate-600">({product.reviews} reviews)</span>
                  </div>
                </div>

                {/* Price */}
                <div className="pb-6 border-b border-slate-200">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-3xl font-bold text-blue-600">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                  {product.stock > 0 ? (
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                      <Check className="w-3 h-3 mr-1" />
                      In Stock ({product.stock} available)
                    </Badge>
                  ) : (
                    <Badge variant="destructive">Out of Stock</Badge>
                  )}
                </div>

                {/* Cart quantity info */}
                {inCart && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-sm text-blue-900 font-medium">
                      <Check className="w-4 h-4 inline mr-1" />
                      {cartQuantity} in cart
                    </p>
                  </div>
                )}

                {/* Quantity selector */}
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">Quantity</label>
                  <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-white mb-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={decrementQuantity}
                      disabled={quantity <= 1}
                      className="h-11 w-11 rounded-none hover:bg-slate-100"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <input
                      type="number"
                      min="1"
                      max={maxQuantity}
                      value={quantity}
                      onChange={(e) => {
                        const val = Number.parseInt(e.target.value) || 1
                        setQuantity(Math.min(Math.max(1, val), maxQuantity))
                      }}
                      className="w-16 text-center border-x border-slate-300 h-11 text-base font-semibold focus:outline-none"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={incrementQuantity}
                      disabled={quantity >= maxQuantity}
                      className="h-11 w-11 rounded-none hover:bg-slate-100"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  {maxQuantity < 10 && maxQuantity > 0 && (
                    <p className="text-xs text-orange-600 font-medium">
                      Only {maxQuantity} more available
                    </p>
                  )}
                </div>

                {/* Action buttons */}
                <div className="space-y-3">
                  <Button
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                    size="lg"
                    className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-base font-semibold shadow-lg"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    {inCart ? "Add More to Cart" : "Add to Cart"}
                  </Button>
                  <Button
                    onClick={handleWishlist}
                    variant="outline"
                    size="lg"
                    className="w-full h-12 bg-white"
                  >
                    <Heart
                      className={`w-5 h-5 mr-2 ${isInWishlist(product.id) ? "fill-current text-red-500" : ""}`}
                    />
                    {isInWishlist(product.id) ? "In Wishlist" : "Add to Wishlist"}
                  </Button>
                </div>

                {/* Features */}
                <div className="space-y-3 pt-4 border-t border-slate-200">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Truck className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">Free Shipping</div>
                      <div className="text-xs text-slate-600">On orders over $50</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Shield className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">1 Year Warranty</div>
                      <div className="text-xs text-slate-600">Manufacturer warranty</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Package className="w-4 h-4 text-amber-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">Easy Returns</div>
                      <div className="text-xs text-slate-600">30-day return policy</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Additional Info Card */}
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Info className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-slate-900">Need Help?</h3>
                </div>
                <p className="text-sm text-slate-700 mb-4">
                  Have questions about this product? Our team is here to help!
                </p>
                <Button variant="outline" size="sm" className="w-full bg-white">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Contact Support
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-slate-900">Related Products</h2>
              {category && (
                <Link href={`/products?category=${category.id}`}>
                  <Button variant="outline" className="bg-white">
                    View All {category.name}
                  </Button>
                </Link>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}