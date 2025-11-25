import type React from "react"
import { Analytics } from "@vercel/analytics/next"
import { Navbar } from "@/components/navbar"
import { Toaster } from "@/components/ui/toaster"
import Footer from "@/components/footer"
export default function PublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <main>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <Toaster />
            <Analytics />
        </main>
    )
}
