"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { signInWithEmail, isAuthenticated } from "../lib/adminAuth"
import { Lock, AlertCircle, ArrowRight } from "lucide-react"
import Link from "next/link"
import "../app/globals.css"

export default function AdminLoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [checkingAuth, setCheckingAuth] = useState(true)
    const router = useRouter()

    useEffect(() => {
        async function checkAuth() {
            try {
                const authed = await isAuthenticated()
                if (authed) {
                    router.push("/admin-dashboard")
                }
            } catch (error) {
                console.error("Auth check error:", error)
            } finally {
                setCheckingAuth(false)
            }
        }

        checkAuth()
    }, [router])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            await signInWithEmail(email, password)
            router.push("/admin-dashboard")
        } catch (error) {
            console.error("Login error:", error)
            setError("Invalid email or password. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    if (checkingAuth) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary)]"></div>
                    <p className="mt-4 text-[var(--foreground)]">Checking authentication...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <div className="text-center mb-6">
                    <div className="flex justify-center mb-2">
                        <div className="p-3 bg-[var(--primary)] rounded-full">
                            <Lock className="h-6 w-6 text-white" />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-[var(--foreground)]">Admin Login</h1>
                    <p className="text-sm text-[var(--muted-foreground)]">Sign in to access the admin dashboard</p>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-start">
                        <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-red-600">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-[var(--foreground)] mb-1">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                            placeholder="admin@example.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-[var(--foreground)] mb-1">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-[var(--primary)] text-white py-2 px-4 rounded-md font-medium flex items-center justify-center ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-[var(--primary-hover)]"
                            }`}
                    >
                        {loading ? (
                            <>
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                Signing in...
                            </>
                        ) : (
                            <>
                                Sign In <ArrowRight className="ml-2 h-4 w-4" />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <Link href="/" className="text-sm text-[var(--primary)] hover:underline">
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    )
}
