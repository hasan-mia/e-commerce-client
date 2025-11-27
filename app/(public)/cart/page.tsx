"use client"

import Link from "next/link"
import Image from "next/image"
import { Trash2, ShoppingCart, Minus, Plus, ArrowRight, Package, Tag, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatPrice } from "@/lib/utils"
import { useCartContext } from "@/contexts/cart-context"

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, count } = useCartContext()

  const subtotal = total
  const shipping = total >= 50 ? 0 : 5.99
  const tax = total * 0.1
  const finalTotal = subtotal + shipping + tax

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto text-center">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-12 h-12 text-slate-400" />
            </div>
            <h1 className="text-3xl font-bold mb-3 text-slate-900">Your cart is empty</h1>
            <p className="text-slate-600 mb-8">
              Looks like you haven't added anything to your cart yet. Start shopping to fill it up!
            </p>
            <Link href="/products">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Start Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">Shopping Cart</h1>
          <p className="text-slate-600">
            You have {count} {count === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Cart Items - 8 columns */}
          <div className="lg:col-span-8 space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="bg-white border-slate-200 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex gap-6">
                    {/* Product Image */}
                    <Link href={`/products/${item.productId}`} className="flex-shrink-0">
                      <div className="relative w-24 h-24 lg:w-32 lg:h-32 bg-slate-50 rounded-lg overflow-hidden group">
                        <Image
                          src={item.product?.images[0] || "/placeholder.svg"}
                          alt={item.product?.name || ""}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    </Link>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1 min-w-0 pr-4">
                          <Link href={`/products/${item.productId}`}>
                            <h3 className="font-bold text-lg text-slate-900 hover:text-blue-600 transition-colors mb-1 line-clamp-2">
                              {item.product?.name}
                            </h3>
                          </Link>
                          {item.product && item.product.stock <= 5 && (
                            <Badge variant="destructive" className="text-xs">
                              Only {item.product.stock} left in stock
                            </Badge>
                          )}
                        </div>
                        <Button
                          onClick={() => removeItem(item.productId)}
                          variant="ghost"
                          size="icon"
                          className="text-slate-400 hover:text-red-600 hover:bg-red-50 flex-shrink-0"
                        >
                          <Trash2 className="w-5 h-5" />
                        </Button>
                      </div>

                      {/* Price and Quantity Controls */}
                      <div className="flex items-center justify-between flex-wrap gap-4">
                        {/* Quantity Selector */}
                        <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-white">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="h-10 w-10 rounded-none hover:bg-slate-100"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <input
                            type="number"
                            min="1"
                            max={item.product?.stock || 1}
                            value={item.quantity}
                            onChange={(e) => {
                              const val = Number.parseInt(e.target.value) || 1
                              updateQuantity(
                                item.productId,
                                Math.min(Math.max(1, val), item.product?.stock || 1)
                              )
                            }}
                            className="w-14 text-center border-x border-slate-300 h-10 text-sm font-semibold focus:outline-none"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            disabled={item.quantity >= (item.product?.stock || 1)}
                            className="h-10 w-10 rounded-none hover:bg-slate-100"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <div className="text-sm text-slate-600 mb-1">
                            {formatPrice(item.price)} × {item.quantity}
                          </div>
                          <div className="text-2xl font-bold text-blue-600">
                            {formatPrice(item.price * item.quantity)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}

            {/* Continue Shopping */}
            <div className="pt-4">
              <Link href="/products">
                <Button variant="outline" size="lg" className="bg-white">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>

          {/* Order Summary Sidebar - 4 columns */}
          <div className="lg:col-span-4">
            <div className="sticky top-4 space-y-6">
              {/* Order Summary Card */}
              <Card className="bg-white border-slate-200">
                <div className="p-6">
                  <h2 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h2>

                  <div className="space-y-4 mb-6 pb-6 border-b border-slate-200">
                    <div className="flex justify-between text-slate-700">
                      <span>Subtotal ({count} {count === 1 ? "item" : "items"})</span>
                      <span className="font-semibold">{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-slate-700">
                      <span>Shipping</span>
                      <span className={`font-semibold ${shipping === 0 ? "text-green-600" : ""}`}>
                        {shipping === 0 ? "Free" : formatPrice(shipping)}
                      </span>
                    </div>
                    {shipping > 0 && (
                      <div className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-lg p-3">
                        Add {formatPrice(50 - total)} more to get free shipping!
                      </div>
                    )}
                    <div className="flex justify-between text-slate-700">
                      <span>Tax (10%)</span>
                      <span className="font-semibold">{formatPrice(tax)}</span>
                    </div>
                  </div>

                  <div className="flex justify-between text-lg font-bold text-slate-900 mb-6">
                    <span>Total</span>
                    <span className="text-2xl text-blue-600">{formatPrice(finalTotal)}</span>
                  </div>

                  <Link href="/checkout">
                    <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 h-14 text-base font-semibold shadow-lg">
                      Proceed to Checkout
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </Card>

              {/* Benefits Card */}
              <Card className="bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200">
                <div className="p-6 space-y-4">
                  <h3 className="font-semibold text-slate-900 mb-4">Shopping Benefits</h3>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Package className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium text-slate-900 text-sm">Free Shipping</div>
                      <div className="text-xs text-slate-600">On orders over $50</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <ShieldCheck className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="font-medium text-slate-900 text-sm">Secure Payment</div>
                      <div className="text-xs text-slate-600">100% secure transactions</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Tag className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <div className="font-medium text-slate-900 text-sm">Best Prices</div>
                      <div className="text-xs text-slate-600">Competitive pricing guaranteed</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}