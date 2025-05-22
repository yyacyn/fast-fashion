"use client"

import React from "react"
import { forwardRef } from "react"

// Input component
export const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
    ({ className, ...props }, ref) => {
        return (
            <input
                className={`px-4 py-2 border border-solid border-[var(--input-border)] bg-[var(--input-background)] rounded-[var(--border-radius)] focus:outline-none focus:ring-2 focus:ring-[var(--input-focus-ring)] focus:border-[var(--input-focus)] shadow-sm ${className}`}
                ref={ref}
                {...props}
            />
        )
    },
)
Input.displayName = "Input"

// Button component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "outline" | "ghost" | "secondary"
    size?: "default" | "sm" | "lg" | "icon"
    children: React.ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", size = "default", children, ...props }, ref) => {
        const variantStyles = {
            default: "bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary-hover)] shadow-sm",
            secondary: "bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:bg-[var(--secondary-hover)] shadow-sm",
            outline: "border border-solid border-[var(--border)] bg-transparent hover:bg-[var(--muted)] shadow-sm",
            ghost: "bg-transparent hover:bg-[var(--muted)]",
        }

        const sizeStyles = {
            default: "px-4 py-2 text-sm",
            sm: "px-3 py-1 text-xs",
            lg: "px-6 py-3 text-base",
            icon: "p-2",
        }

        return (
            <button
                className={`inline-flex items-center justify-center rounded-[var(--border-radius)] font-medium transition-all focus:outline-none focus:ring-2 focus:ring-[var(--input-focus-ring)] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
                ref={ref}
                {...props}
            >
                {children}
            </button>
        )
    },
)
Button.displayName = "Button"

// Checkbox component
interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    onCheckedChange?: () => void
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({ className, onCheckedChange, ...props }, ref) => {
    return (
        <input
            type="checkbox"
            className={`h-4 w-4 rounded-sm border-[var(--border)] text-[var(--primary)] focus:ring-[var(--input-focus-ring)] cursor-pointer ${className}`}
            ref={ref}
            onChange={onCheckedChange}
            {...props}
        />
    )
})
Checkbox.displayName = "Checkbox"

// Label component
export const Label = forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
    ({ className, ...props }, ref) => {
        return (
            <label
                className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
                ref={ref}
                {...props}
            />
        )
    },
)
Label.displayName = "Label"

// Card components
export const Card = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={`rounded-[var(--border-radius)] border border-solid border-[var(--border)] bg-[var(--card-background)] text-[var(--card-foreground)] shadow-[var(--card-shadow)] ${className}`}
            {...props}
        />
    )
})
Card.displayName = "Card"

export const CardHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => {
        return <div ref={ref} className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props} />
    },
)
CardHeader.displayName = "CardHeader"

export const CardTitle = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
    ({ className, ...props }, ref) => {
        return <h3 ref={ref} className={`text-xl font-semibold leading-none tracking-tight ${className}`} {...props} />
    },
)
CardTitle.displayName = "CardTitle"

export const CardContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => {
        return <div ref={ref} className={`p-6 pt-0 ${className}`} {...props} />
    },
)
CardContent.displayName = "CardContent"

// Separator component
export const Separator = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => {
        return <div ref={ref} className={`h-[1px] w-full bg-[var(--border)] my-4 ${className}`} {...props} />
    },
)
Separator.displayName = "Separator"

// Badge component
interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "secondary" | "outline" | "success" | "error"
}

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(({ className, variant = "default", ...props }, ref) => {
    const variantStyles = {
        default: "bg-[var(--primary)] text-[var(--primary-foreground)]",
        secondary: "bg-[var(--secondary)] text-[var(--secondary-foreground)]",
        outline: "bg-transparent border border-solid border-[var(--border)] text-[var(--foreground)]",
        success: "bg-[var(--success)] text-white",
        error: "bg-[var(--error)] text-white",
    }

    return (
        <div
            ref={ref}
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors ${variantStyles[variant]} ${className}`}
            {...props}
        />
    )
})
Badge.displayName = "Badge"
