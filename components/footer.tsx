"use client"

import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, CreditCard, Shield, Truck } from "lucide-react"
export default function Footer() {

    return (
        <footer className="bg-slate-900 text-slate-300">
            {/* Main Footer */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                                TS
                            </div>
                            <div className="font-bold text-xl text-white">TechStore</div>
                        </div>
                        <p className="text-sm mb-4">Your trusted destination for premium electronics and cutting-edge technology products.</p>
                        <div className="flex items-center gap-3">
                            <a href="#" className="w-9 h-9 bg-slate-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition">
                                <Facebook className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-9 h-9 bg-slate-800 hover:bg-blue-400 rounded-lg flex items-center justify-center transition">
                                <Twitter className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-9 h-9 bg-slate-800 hover:bg-pink-600 rounded-lg flex items-center justify-center transition">
                                <Instagram className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-9 h-9 bg-slate-800 hover:bg-blue-700 rounded-lg flex items-center justify-center transition">
                                <Linkedin className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="/about" className="hover:text-white transition">About Us</a></li>
                            <li><a href="/contact" className="hover:text-white transition">Contact Us</a></li>
                            <li><a href="/careers" className="hover:text-white transition">Careers</a></li>
                            <li><a href="/blog" className="hover:text-white transition">Blog</a></li>
                            <li><a href="/press" className="hover:text-white transition">Press</a></li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Customer Service</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="/help" className="hover:text-white transition">Help Center</a></li>
                            <li><a href="/shipping" className="hover:text-white transition">Shipping Info</a></li>
                            <li><a href="/returns" className="hover:text-white transition">Returns & Refunds</a></li>
                            <li><a href="/warranty" className="hover:text-white transition">Warranty</a></li>
                            <li><a href="/track" className="hover:text-white transition">Track Order</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Contact Info</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                <span>123 Tech Avenue, Silicon Valley, CA 94025</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 flex-shrink-0" />
                                <a href="tel:+1234567890" className="hover:text-white transition">+1 (234) 567-890</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 flex-shrink-0" />
                                <a href="mailto:support@techstore.com" className="hover:text-white transition">support@techstore.com</a>
                            </li>
                        </ul>
                        <div className="mt-4">
                            <p className="text-sm mb-2">Subscribe to our newsletter</p>
                            <div className="flex gap-2">
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="flex-1 px-3 py-2 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:border-blue-500 text-sm"
                                />
                                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white text-sm font-medium transition">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Bar */}
            <div className="border-t border-slate-800">
                <div className="container mx-auto px-4 py-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center">
                                <Truck className="w-6 h-6 text-blue-500" />
                            </div>
                            <div>
                                <div className="text-white font-semibold text-sm">Free Shipping</div>
                                <div className="text-slate-400 text-xs">On orders over $50</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center">
                                <Shield className="w-6 h-6 text-green-500" />
                            </div>
                            <div>
                                <div className="text-white font-semibold text-sm">Secure Payment</div>
                                <div className="text-slate-400 text-xs">100% secure transactions</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center">
                                <CreditCard className="w-6 h-6 text-purple-500" />
                            </div>
                            <div>
                                <div className="text-white font-semibold text-sm">Easy Returns</div>
                                <div className="text-slate-400 text-xs">30-day return policy</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-slate-800">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
                        <p>&copy; 2025 TechStore. All rights reserved.</p>
                        <div className="flex items-center gap-6">
                            <a href="/privacy" className="hover:text-white transition">Privacy Policy</a>
                            <a href="/terms" className="hover:text-white transition">Terms of Service</a>
                            <a href="/cookies" className="hover:text-white transition">Cookie Policy</a>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-slate-400">We accept:</span>
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-7 bg-slate-800 rounded flex items-center justify-center text-xs font-bold">VISA</div>
                                <div className="w-10 h-7 bg-slate-800 rounded flex items-center justify-center text-xs font-bold">MC</div>
                                <div className="w-10 h-7 bg-slate-800 rounded flex items-center justify-center text-xs font-bold">AMEX</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}