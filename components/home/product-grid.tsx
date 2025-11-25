"use client"

import { useMemo } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { dummyProducts } from "@/lib/dummy-data"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"

interface ProductGridProps {
  title: string
  variant: "recent" | "popular"
}

export function ProductGrid({ title, variant }: ProductGridProps) {
  const products = useMemo(() => {
    if (variant === "recent") {
      return dummyProducts
        .slice()
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        .slice(0, 4)
    }
    return dummyProducts
      .slice()
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 4)
  }, [variant])

  return (
    <section className={`py-20 ${variant === "recent" ? "bg-slate-50" : "bg-white"}`}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold text-slate-900 mb-2">
              {title}
            </h2>
            <p className="text-lg text-slate-600">
              {variant === "recent"
                ? "Check out our latest arrivals and newest products"
                : "Top-rated products loved by our customers"}
            </p>
          </div>
          <Link href="/products">
            <Button
              variant="outline"
              className="hidden md:flex items-center gap-2 border-2 hover:bg-slate-900 hover:text-white transition-colors"
            >
              View All Products
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in-up"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-8 text-center md:hidden">
          <Link href="/products">
            <Button className="w-full sm:w-auto px-8">
              View All Products
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  )
}