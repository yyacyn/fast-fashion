"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { isAuthenticated, signOut } from "../lib/adminAuth"
import { LogOut, Menu, X, Store, Lock } from "lucide-react"
import Link from "next/link"
import "../app/globals.css"

export default function AdminLayout({ children }) {
    const [authenticated, setAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const router = useRouter()

    useEffect(() => {
        async function checkAuth() {
            try {
                const authed = await isAuthenticated()
                setAuthenticated(authed)
                if (!authed) {
                    router.push("/admin-login")
                }
            } catch (error) {
                console.error("Auth check error:", error)
                router.push("/admin-login")
            } finally {
                setLoading(false)
            }
        }

        checkAuth()
    }, [router])

    const handleSignOut = async () => {
        try {
            await signOut()
            router.push("/admin-login")
        } catch (error) {
            console.error("Sign out error:", error)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary)]"></div>
                    <p className="mt-4 text-[var(--foreground)]">Loading...</p>
                </div>
            </div>
        )
    }

    if (!authenticated) {
        return null // Router will redirect to login
    }

    return (
        <div className="min-h-screen flex flex-col">
            {/* Admin Header */}
            <header className="bg-[var(--primary)] text-white shadow-md">
                <div className="w-full mx-auto px-7 py-3">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <button
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                className="md:hidden mr-3 text-white focus:outline-none"
                            >
                                {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                            <Link href="/admin-dashboard" className="flex items-center">
                                <span className="text-xl font-bold">Admin Dashboard</span>
                            </Link>
                        </div>
                        <button
                            onClick={handleSignOut}
                            className="flex items-center bg-white text-[var(--primary)] px-3 py-1 rounded-md text-sm font-medium hover:bg-gray-100"
                        >
                            <LogOut size={16} className="mr-1" />
                            Sign Out
                        </button>
                    </div>
                </div>
            </header>

            <div className="flex flex-1">
                {/* Sidebar */}
                <aside
                    className={`bg-white w-64 shadow-md flex-shrink-0 fixed inset-y-0 left-0 z-20 transform md:translate-x-0 transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                        } md:static md:h-auto pt-16 md:pt-0`}
                >
                    <div className="p-4 space-y-2">
                        <Link
                            href="/admin-dashboard"
                            className="flex items-center p-2 rounded-md hover:bg-gray-100 text-[var(--foreground)]"
                        >
                            <Store size={20} className="mr-2 text-[var(--primary)]" />
                            Store Submissions
                        </Link>
                        <Link
                            href="/admin-approved"
                            className="flex items-center p-2 rounded-md hover:bg-gray-100 text-[var(--foreground)]"
                        >
                            <Store size={20} className="mr-2 text-green-500" />
                            Approved Stores
                        </Link>
                        <Link
                            href="/admin-rejected"
                            className="flex items-center p-2 rounded-md hover:bg-gray-100 text-[var(--foreground)]"
                        >
                            <Store size={20} className="mr-2 text-red-500" />
                            Rejected Stores
                        </Link>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-4 md:p-6 bg-gray-50 overflow-auto min-h-screen">
                    {/* Overlay for mobile sidebar */}
                    {isSidebarOpen && (
                        <div
                            className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
                            onClick={() => setIsSidebarOpen(false)}
                        ></div>
                    )}
                    {children}
                </main>
            </div>
        </div>
    )
}
