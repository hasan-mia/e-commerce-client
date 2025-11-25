'use client'

import { Bell, Menu } from 'lucide-react'

export function AdminHeader({ onMenuClick }: any) {
    return (
        <header className="h-16 bg-white border-b border-gray-200 px-4 lg:px-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <button
                    onClick={onMenuClick}
                    className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <Menu className="h-5 w-5 text-gray-600" />
                </button>
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">Welcome back, John</h2>
                    <p className="text-xs text-gray-500 hidden sm:block">Here's what's happening with your account today</p>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Bell className="h-5 w-5 text-gray-600" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs font-medium text-gray-700">Active</span>
                </div>
            </div>
        </header>
    )
}
