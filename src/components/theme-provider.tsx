"use client"

import React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import type { Attribute, ThemeProviderProps as NextThemeProviderProps } from "next-themes"

type Theme = "light" | "dark" | "system"

interface ThemeProviderProps extends NextThemeProviderProps {
    children: React.ReactNode
    defaultTheme?: Theme
    enableSystem?: boolean
    attribute?: Attribute | Attribute[]
    disableTransitionOnChange?: boolean
}

interface ThemeContextType {
    theme: Theme
    setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({
    children,
    defaultTheme = "system",
    enableSystem = true,
    attribute = "class",
    disableTransitionOnChange = false,
}: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>(defaultTheme)

    useEffect(() => {
        // Get stored theme from localStorage or use default
        const storedTheme = localStorage.getItem("theme") as Theme | null
        if (storedTheme) {
            setTheme(storedTheme)
        }
    }, [])

    useEffect(() => {
        const root = window.document.documentElement

        // Remove old theme class
        root.classList.remove("light", "dark")

        // Add new theme class
        if (theme === "system" && enableSystem) {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
            root.classList.add(systemTheme)
            // Store theme in localStorage
            localStorage.setItem("theme", theme)
            return
        }

        root.classList.add(theme)
        // Store theme in localStorage
        localStorage.setItem("theme", theme)
    }, [theme, enableSystem])

    // Listen for system theme changes if system theme is enabled
    useEffect(() => {
        if (!enableSystem) return

        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

        const handleChange = () => {
            if (theme === "system") {
                const root = window.document.documentElement
                root.classList.remove("light", "dark")
                root.classList.add(mediaQuery.matches ? "dark" : "light")
            }
        }

        mediaQuery.addEventListener("change", handleChange)
        return () => mediaQuery.removeEventListener("change", handleChange)
    }, [theme, enableSystem])

    return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
    const context = useContext(ThemeContext)
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider")
    }
    return context
}
