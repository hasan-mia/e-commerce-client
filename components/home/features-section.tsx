"use client"

import { Truck, Shield, CreditCard, HeadphonesIcon } from "lucide-react"

const features = [
    {
        icon: Truck,
        title: "Free Shipping",
        description: "Free delivery on orders over $50",
        color: "from-blue-500 to-blue-600"
    },
    {
        icon: Shield,
        title: "Secure Payment",
        description: "100% secure transactions",
        color: "from-green-500 to-green-600"
    },
    {
        icon: CreditCard,
        title: "Easy Returns",
        description: "30-day return policy",
        color: "from-purple-500 to-purple-600"
    },
    {
        icon: HeadphonesIcon,
        title: "24/7 Support",
        description: "Dedicated customer service",
        color: "from-orange-500 to-orange-600"
    }
]

export function FeaturesSection() {
    return (
        <section className="py-16 bg-white border-y border-slate-200">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => {
                        const Icon = feature.icon
                        return (
                            <div
                                key={index}
                                className="flex flex-col items-center text-center group cursor-pointer"
                            >
                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                                    <Icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-slate-600 text-sm">
                                    {feature.description}
                                </p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}