"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { dummyCategories } from "@/lib/dummy-data"

export function CategoryGrid() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Explore our wide range of premium electronics and find exactly what you need
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dummyCategories.map((category, index) => (
            <Link
              key={category.id}
              href={`/category/${category.id}`}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 hover:border-blue-300 transition-all duration-300 hover:shadow-xl"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent z-10" />
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Overlay Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:translate-x-2 transition-transform">
                    {category.name}
                  </h3>
                  <p className="text-slate-200 text-sm mb-3 opacity-90">
                    {category.description}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-white font-medium group-hover:gap-4 transition-all">
                    <span>Shop Now</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 border-2 border-blue-500 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300 pointer-events-none" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}