import { Hero } from "@/components/home/hero"
import { CategoryGrid } from "@/components/home/category-grid"
import { ProductGrid } from "@/components/home/product-grid"
import { FeaturesSection } from "@/components/home/features-section"

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Slider */}
      <Hero />

      {/* Features */}
      <FeaturesSection />

      {/* Categories */}
      <CategoryGrid />

      {/* Recent Products */}
      <ProductGrid title="New Arrivals" variant="recent" />

      {/* Popular Products */}
      <ProductGrid title="Best Sellers" variant="popular" />
    </div>
  )
}