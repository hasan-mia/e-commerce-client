"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
    XCircle,
    AlertTriangle,
    RefreshCcw,
    ArrowLeft,
    ShoppingCart,
    HeadphonesIcon,
    CreditCard,
    Package,
} from "lucide-react"

export default function OrderFailedPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-red-50 via-white to-slate-50">
            <div className="container mx-auto px-4 py-8 lg:py-12">
                <div className="max-w-2xl mx-auto">
                    {/* Error Header */}
                    <div className="text-center mb-8">
                        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                            <XCircle className="w-14 h-14 text-red-600" />
                        </div>
                        <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-3">
                            Payment Failed
                        </h1>
                        <p className="text-slate-600 text-lg">
                            We couldn't process your order. Please try again or contact support if the problem persists.
                        </p>
                    </div>

                    {/* Error Details Card */}
                    <Card className="bg-white border-red-200 mb-6">
                        <div className="p-6">
                            <Alert className="border-red-200 bg-red-50">
                                <AlertTriangle className="h-5 w-5 text-red-600" />
                                <AlertDescription className="text-red-800 ml-2">
                                    <span className="font-semibold">Error: </span>
                                    Your payment could not be processed. Please check your payment details and try again.
                                </AlertDescription>
                            </Alert>

                            <div className="mt-6 p-4 bg-slate-50 rounded-lg">
                                <h3 className="font-semibold text-slate-900 mb-3">Common reasons for payment failure:</h3>
                                <ul className="space-y-2 text-sm text-slate-700">
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-600 mt-0.5">•</span>
                                        <span>Insufficient funds in your account</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-600 mt-0.5">•</span>
                                        <span>Incorrect card details or expired card</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-600 mt-0.5">•</span>
                                        <span>Bank declined the transaction</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-600 mt-0.5">•</span>
                                        <span>Network connectivity issues</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </Card>

                    {/* What to Do Next */}
                    <Card className="bg-white border-slate-200 mb-6">
                        <div className="p-6">
                            <h2 className="text-xl font-bold text-slate-900 mb-4">What to do next?</h2>
                            <div className="space-y-4">
                                <div className="flex gap-4 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <RefreshCcw className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900 mb-1">Try Again</h3>
                                        <p className="text-sm text-slate-600">
                                            Return to checkout and try placing your order again with updated payment details
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <ShoppingCart className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900 mb-1">Review Your Cart</h3>
                                        <p className="text-sm text-slate-600">
                                            Check your cart items and quantities before attempting to checkout again
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                                    <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <CreditCard className="w-6 h-6 text-amber-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900 mb-1">Use Different Payment Method</h3>
                                        <p className="text-sm text-slate-600">
                                            Try using a different card or choose Cash on Delivery option
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <HeadphonesIcon className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900 mb-1">Contact Support</h3>
                                        <p className="text-sm text-slate-600">
                                            Still having issues? Our support team is available 24/7 to help you
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Order Summary Info */}
                    <Card className="bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200 mb-6">
                        <div className="p-6">
                            <div className="flex items-start gap-3 mb-4">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Package className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900 mb-1">Your items are still in the cart</h3>
                                    <p className="text-sm text-slate-600">
                                        Don't worry! Your cart items are saved. You can proceed to checkout whenever you're ready.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                        <Link href="/checkout" className="block">
                            <Button
                                size="lg"
                                className="w-full bg-blue-600 hover:bg-blue-700 h-14 text-base font-semibold shadow-lg"
                            >
                                <RefreshCcw className="w-5 h-5 mr-2" />
                                Try Again
                            </Button>
                        </Link>

                        <div className="grid grid-cols-2 gap-3">
                            <Link href="/cart" className="block">
                                <Button variant="outline" className="w-full h-12 border-slate-300">
                                    <ShoppingCart className="w-5 h-5 mr-2" />
                                    View Cart
                                </Button>
                            </Link>

                            <Link href="/products" className="block">
                                <Button variant="outline" className="w-full h-12 border-slate-300">
                                    <ArrowLeft className="w-5 h-5 mr-2" />
                                    Continue Shopping
                                </Button>
                            </Link>
                        </div>

                        <Link href="/contact" className="block">
                            <Button variant="ghost" className="w-full h-12 text-slate-600 hover:text-slate-900">
                                <HeadphonesIcon className="w-5 h-5 mr-2" />
                                Contact Support
                            </Button>
                        </Link>
                    </div>

                    {/* Help Text */}
                    <div className="mt-8 p-6 bg-white border border-slate-200 rounded-lg text-center">
                        <p className="text-sm text-slate-600 mb-2">
                            Need immediate assistance?
                        </p>
                        <div className="flex items-center justify-center gap-4 text-sm">
                            <a href="mailto:support@yourstore.com" className="text-blue-600 hover:underline font-medium flex items-center gap-1">
                                <HeadphonesIcon className="w-4 h-4" />
                                support@yourstore.com
                            </a>
                            <span className="text-slate-400">|</span>
                            <a href="tel:+1234567890" className="text-blue-600 hover:underline font-medium">
                                +1 (234) 567-890
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}