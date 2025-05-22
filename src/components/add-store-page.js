"use client"

import { useState } from "react"
import { Menu, X, Plus, Store, MapPin, Phone, Tag, Info, Upload, Building, Mail, User } from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"
import '../app/globals.css';
import Header from "./header";
import Head from "next/head"

// Import store categories
const STORE_CATEGORIES = [
    { id: "men", label: "Men's Clothing" },
    { id: "women", label: "Women's Clothing" },
    { id: "unisex", label: "Unisex" },
    { id: "children", label: "Children's Clothing" },
    { id: "accessories", label: "Accessories" },
    { id: "shoes", label: "Shoes" },
]

// Dynamically import the Map component to avoid SSR issues
const LocationPicker = dynamic(() => import("./location-picker"), {
    ssr: false,
    loading: () => (
        <div className="h-72 bg-[var(--secondary)] animate-pulse rounded-md flex items-center justify-center">
            <p className="text-[var(--secondary-foreground)]">Loading map...</p>
        </div>
    ),
})

export default function AddStorePage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        phone: "",
        website: "",
        description: "",
        categories: [],
        location: null,
        ownerName: "",
        ownerEmail: "",
    })
    const [formErrors, setFormErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null)

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
        // Clear error for this field when user starts typing
        if (formErrors[name]) {
            setFormErrors((prev) => ({
                ...prev,
                [name]: null,
            }))
        }
    }

    // Handle category selection
    const handleCategoryChange = (categoryId) => {
        setFormData((prev) => {
            const newCategories = prev.categories.includes(categoryId)
                ? prev.categories.filter((id) => id !== categoryId)
                : [...prev.categories, categoryId]

            return {
                ...prev,
                categories: newCategories,
            }
        })
        // Clear error for categories
        if (formErrors.categories) {
            setFormErrors((prev) => ({
                ...prev,
                categories: null,
            }))
        }
    }

    // Handle location selection
    const handleLocationSelect = (location) => {
        setFormData((prev) => ({
            ...prev,
            location,
        }))
        // Clear error for location
        if (formErrors.location) {
            setFormErrors((prev) => ({
                ...prev,
                location: null,
            }))
        }
    }

    // Handle image selection
    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setSelectedImage(file)
            // Create a preview URL
            const reader = new FileReader()
            reader.onloadend = () => {
                setFormData((prev) => ({
                    ...prev,
                    imagePreview: reader.result,
                }))
            }
            reader.readAsDataURL(file)
        }
    }

    // Validate form
    const validateForm = () => {
        const errors = {}

        if (!formData.name.trim()) errors.name = "Store name is required"
        if (!formData.address.trim()) errors.address = "Address is required"
        if (!formData.phone.trim()) errors.phone = "Phone number is required"
        if (formData.categories.length === 0) errors.categories = "Please select at least one category"
        if (!formData.location) errors.location = "Please select a location on the map"
        if (!formData.ownerName.trim()) errors.ownerName = "Your name is required"
        if (!formData.ownerEmail.trim()) errors.ownerEmail = "Your email is required"
        else if (!/\S+@\S+\.\S+/.test(formData.ownerEmail)) errors.ownerEmail = "Please enter a valid email address"

        return errors
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Validate form
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            // Scroll to the first error
            const firstErrorField = document.querySelector(`[name="${Object.keys(errors)[0]}"]`);
            if (firstErrorField) {
                firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" });
            }
            return;
        }
    
        // Prepare form data for submission
        const formDataToSubmit = new FormData();
        formDataToSubmit.append("name", formData.name);
        formDataToSubmit.append("address", formData.address);
        formDataToSubmit.append("phone", formData.phone);
        formDataToSubmit.append("website", formData.website);
        formDataToSubmit.append("description", formData.description);
        formDataToSubmit.append("categories", formData.categories.join(", "));
        formDataToSubmit.append("location", JSON.stringify(formData.location));
        formDataToSubmit.append("ownerName", formData.ownerName);
        formDataToSubmit.append("ownerEmail", formData.ownerEmail);
    
        if (selectedImage) {
            formDataToSubmit.append("image", selectedImage);
        }
    
        try {
            setIsSubmitting(true);
    
            // Send data to Getform.io
            const response = await fetch("https://getform.io/f/bqomngpb", {
                method: "POST",
                body: formDataToSubmit,
            });
    
            if (response.ok) {
                setIsSubmitting(false);
                setIsSubmitted(true);
    
                // Reset form after submission
                setFormData({
                    name: "",
                    address: "",
                    phone: "",
                    website: "",
                    description: "",
                    categories: [],
                    location: null,
                    ownerName: "",
                    ownerEmail: "",
                    imagePreview: null,
                });
                setSelectedImage(null);
    
                // Scroll to top
                window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
                console.error("Failed to submit the form.");
                setIsSubmitting(false);
            }
        } catch (error) {
            console.error("Error submitting the form:", error);
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* Navigation */}
            <Header/>

            {/* Page Header */}
            <div className="bg-gradient-to-b from-[#FFF5EB] to-white py-12 md:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-[var(--foreground)]">
                        Add Your{" "}
                        <span className="bg-gradient-to-r from-[#FFA09B] to-[#FFE6C9] text-transparent bg-clip-text">
                            Fashion Store
                        </span>
                    </h1>
                    <p className="mt-4 text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto">
                        Fill out the form below to add your fashion store to our directory. It's free and only takes a few minutes.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-grow bg-white py-12">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Success Message */}
                    {isSubmitted && (
                        <div className="bg-[var(--success)] bg-opacity-10 border border-[var(--success)] rounded-lg p-6 mb-8">
                            <h2 className="text-[var(--success)] font-semibold text-lg flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 mr-2"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Store Submitted Successfully!
                            </h2>
                            <p className="mt-2 text-[var(--foreground)]">
                                Thank you for adding your store to our directory. Your submission has been received and is being
                                reviewed. It will be visible on our map soon.
                            </p>
                            <div className="mt-4 flex space-x-4">
                                <Link
                                    href="/locator"
                                    className="bg-[var(--success)] text-white px-4 py-2 rounded-md text-sm font-medium inline-block"
                                >
                                    View Map
                                </Link>
                                <button
                                    onClick={() => setIsSubmitted(false)}
                                    className="bg-white border border-[var(--border)] text-[var(--foreground)] px-4 py-2 rounded-md text-sm font-medium inline-block"
                                >
                                    Add Another Store
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Form */}
                    {!isSubmitted && (
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Store Information */}
                            <div className="bg-[var(--accent)] rounded-lg p-6 border border-[var(--border)]">
                                <div className="flex items-center mb-6">
                                    <div className="bg-[var(--primary)] p-2 rounded-md mr-3">
                                        <Store size={24} className="text-white" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-[var(--foreground)]">Store Information</h2>
                                </div>

                                <div className="space-y-6">
                                    {/* Store Name */}
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-[var(--foreground)] mb-1">
                                            Store Name <span className="text-[var(--error)]">*</span>
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                className={`w-full px-4 py-2 rounded-md border ${formErrors.name ? "border-[var(--error)]" : "border-[var(--border)]"
                                                    } focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] bg-white`}
                                                placeholder="Enter store name"
                                            />
                                            <Building className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--muted-foreground)] h-5 w-5" />
                                        </div>
                                        {formErrors.name && <p className="mt-1 text-[var(--error)] text-sm">{formErrors.name}</p>}
                                    </div>

                                    {/* Store Address */}
                                    <div>
                                        <label htmlFor="address" className="block text-sm font-medium text-[var(--foreground)] mb-1">
                                            Address <span className="text-[var(--error)]">*</span>
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                id="address"
                                                name="address"
                                                value={formData.address}
                                                onChange={handleInputChange}
                                                className={`w-full px-4 py-2 rounded-md border ${formErrors.address ? "border-[var(--error)]" : "border-[var(--border)]"
                                                    } focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] bg-white`}
                                                placeholder="Enter store address"
                                            />
                                            <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--muted-foreground)] h-5 w-5" />
                                        </div>
                                        {formErrors.address && <p className="mt-1 text-[var(--error)] text-sm">{formErrors.address}</p>}
                                    </div>

                                    {/* Store Phone */}
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-[var(--foreground)] mb-1">
                                            Phone Number <span className="text-[var(--error)]">*</span>
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className={`w-full px-4 py-2 rounded-md border ${formErrors.phone ? "border-[var(--error)]" : "border-[var(--border)]"
                                                    } focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] bg-white`}
                                                placeholder="Enter phone number"
                                            />
                                            <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--muted-foreground)] h-5 w-5" />
                                        </div>
                                        {formErrors.phone && <p className="mt-1 text-[var(--error)] text-sm">{formErrors.phone}</p>}
                                    </div>

                                    {/* Store Website */}
                                    <div>
                                        <label htmlFor="website" className="block text-sm font-medium text-[var(--foreground)] mb-1">
                                            Website (Optional)
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="url"
                                                id="website"
                                                name="website"
                                                value={formData.website}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2 rounded-md border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] bg-white"
                                                placeholder="https://example.com"
                                            />
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--muted-foreground)] h-5 w-5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                                                />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Store Description */}
                                    <div>
                                        <label htmlFor="description" className="block text-sm font-medium text-[var(--foreground)] mb-1">
                                            Description (Optional)
                                        </label>
                                        <textarea
                                            id="description"
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            rows={4}
                                            className="w-full px-4 py-2 rounded-md border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] bg-white"
                                            placeholder="Describe your store, products, and specialties..."
                                        ></textarea>
                                    </div>
                                </div>
                            </div>

                            {/* Store Categories */}
                            <div className="bg-[var(--accent)] rounded-lg p-6 border border-[var(--border)]">
                                <div className="flex items-center mb-6">
                                    <div className="bg-[var(--primary)] p-2 rounded-md mr-3">
                                        <Tag size={24} className="text-white" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-[var(--foreground)]">Store Categories</h2>
                                </div>

                                <p className="text-sm text-[var(--muted-foreground)] mb-4">
                                    Select all categories that apply to your store <span className="text-[var(--error)]">*</span>
                                </p>

                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {STORE_CATEGORIES.map((category) => (
                                        <div
                                            key={category.id}
                                            className={`p-3 rounded-md cursor-pointer transition-colors ${formData.categories.includes(category.id)
                                                    ? "bg-[var(--primary)] bg-opacity-10 border border-[var(--primary)]"
                                                    : "bg-white border border-[var(--border)] hover:bg-[var(--secondary)] hover:bg-opacity-50"
                                                }`}
                                            onClick={() => handleCategoryChange(category.id)}
                                        >
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    id={`category-${category.id}`}
                                                    checked={formData.categories.includes(category.id)}
                                                    onChange={() => { }}
                                                    className="h-4 w-4 text-[var(--primary)] focus:ring-[var(--primary)]"
                                                />
                                                <label
                                                    htmlFor={`category-${category.id}`}
                                                    className="ml-2 block text-sm font-medium text-[var(--foreground)]"
                                                >
                                                    {category.label}
                                                </label>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {formErrors.categories && <p className="mt-2 text-[var(--error)] text-sm">{formErrors.categories}</p>}
                            </div>

                            {/* Store Location */}
                            <div className="bg-[var(--accent)] rounded-lg p-6 border border-[var(--border)]">
                                <div className="flex items-center mb-6">
                                    <div className="bg-[var(--primary)] p-2 rounded-md mr-3">
                                        <MapPin size={24} className="text-white" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-[var(--foreground)]">Store Location</h2>
                                </div>

                                <p className="text-sm text-[var(--muted-foreground)] mb-4">
                                    Click on the map to select your store's location <span className="text-[var(--error)]">*</span>
                                </p>

                                <div
                                    className={`border ${formErrors.location ? "border-[var(--error)]" : "border-[var(--border)]"
                                        } rounded-md overflow-hidden h-72`}
                                >
                                    <LocationPicker onLocationSelect={handleLocationSelect} selectedLocation={formData.location} />
                                </div>

                                {formErrors.location && <p className="mt-2 text-[var(--error)] text-sm">{formErrors.location}</p>}

                                {formData.location && (
                                    <div className="mt-2 text-sm text-[var(--foreground)]">
                                        Selected coordinates: {formData.location[0].toFixed(6)}, {formData.location[1].toFixed(6)}
                                    </div>
                                )}
                            </div>

                            {/* Store Image */}
                            <div className="bg-[var(--accent)] rounded-lg p-6 border border-[var(--border)]">
                                <div className="flex items-center mb-6">
                                    <div className="bg-[var(--primary)] p-2 rounded-md mr-3">
                                        <Upload size={24} className="text-white" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-[var(--foreground)]">Store Image</h2>
                                </div>

                                <p className="text-sm text-[var(--muted-foreground)] mb-4">Upload a photo of your store (Optional)</p>

                                <div className="flex flex-col md:flex-row md:space-x-4">
                                    <div className="md:w-1/2 mb-4 md:mb-0">
                                        <div
                                            className={`border-2 border-dashed border-[var(--border)] rounded-md p-6 text-center hover:border-[var(--primary)] transition-colors cursor-pointer`}
                                            onClick={() => document.getElementById("store-image").click()}
                                        >
                                            <input
                                                type="file"
                                                id="store-image"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={handleImageChange}
                                            />
                                            <Upload className="mx-auto h-12 w-12 text-[var(--muted-foreground)]" />
                                            <p className="mt-2 text-sm font-medium text-[var(--foreground)]">Click to upload</p>
                                            <p className="text-xs text-[var(--muted-foreground)]">PNG, JPG, GIF up to 5MB</p>
                                        </div>
                                    </div>
                                    <div className="md:w-1/2">
                                        <div className="border border-[var(--border)] rounded-md overflow-hidden h-40">
                                            {formData.imagePreview ? (
                                                <img
                                                    src={formData.imagePreview || "/placeholder.svg"}
                                                    alt="Store preview"
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-[var(--secondary)] bg-opacity-30">
                                                    <p className="text-sm text-[var(--muted-foreground)]">Preview will appear here</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Information */}
                            <div className="bg-[var(--accent)] rounded-lg p-6 border border-[var(--border)]">
                                <div className="flex items-center mb-6">
                                    <div className="bg-[var(--primary)] p-2 rounded-md mr-3">
                                        <Info size={24} className="text-white" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-[var(--foreground)]">Your Information</h2>
                                </div>

                                <p className="text-sm text-[var(--muted-foreground)] mb-4">
                                    We'll use this to contact you regarding your submission
                                </p>

                                <div className="space-y-6">
                                    {/* Owner Name */}
                                    <div>
                                        <label htmlFor="ownerName" className="block text-sm font-medium text-[var(--foreground)] mb-1">
                                            Your Name <span className="text-[var(--error)]">*</span>
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                id="ownerName"
                                                name="ownerName"
                                                value={formData.ownerName}
                                                onChange={handleInputChange}
                                                className={`w-full px-4 py-2 rounded-md border ${formErrors.ownerName ? "border-[var(--error)]" : "border-[var(--border)]"
                                                    } focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] bg-white`}
                                                placeholder="Enter your name"
                                            />
                                            <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--muted-foreground)] h-5 w-5" />
                                        </div>
                                        {formErrors.ownerName && <p className="mt-1 text-[var(--error)] text-sm">{formErrors.ownerName}</p>}
                                    </div>

                                    {/* Owner Email */}
                                    <div>
                                        <label htmlFor="ownerEmail" className="block text-sm font-medium text-[var(--foreground)] mb-1">
                                            Your Email <span className="text-[var(--error)]">*</span>
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="email"
                                                id="ownerEmail"
                                                name="ownerEmail"
                                                value={formData.ownerEmail}
                                                onChange={handleInputChange}
                                                className={`w-full px-4 py-2 rounded-md border ${formErrors.ownerEmail ? "border-[var(--error)]" : "border-[var(--border)]"
                                                    } focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] bg-white`}
                                                placeholder="Enter your email"
                                            />
                                            <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--muted-foreground)] h-5 w-5" />
                                        </div>
                                        {formErrors.ownerEmail && (
                                            <p className="mt-1 text-[var(--error)] text-sm">{formErrors.ownerEmail}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full md:w-auto px-8 py-3 bg-[var(--primary)] text-white rounded-md font-medium ${isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-[var(--primary-hover)]"
                                        } transition-colors shadow-md flex items-center justify-center`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg
                                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            <Plus size={20} className="mr-2" /> Add Store
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-[var(--border)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="md:flex md:justify-between">
                        <div className="mb-8 md:mb-0">
                            <Link href="/" className="flex items-center">
                                <span className="text-2xl font-bold bg-gradient-to-r from-[#FFA09B] to-[#FFE6C9] text-transparent bg-clip-text">
                                    Fast Fashion
                                </span>
                                <span className="ml-1 text-sm text-gray-500">by Pedidi</span>
                            </Link>
                            <p className="mt-2 text-sm text-[var(--muted-foreground)] max-w-md">
                                Discover the best fashion stores in Bogor with our interactive map and comprehensive directory.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
                            <div>
                                <h3 className="text-sm font-semibold text-[var(--foreground)] tracking-wider uppercase mb-4">
                                    Navigation
                                </h3>
                                <ul className="space-y-2">
                                    <li>
                                        <Link href="/" className="text-[var(--muted-foreground)] hover:text-[var(--primary)]">
                                            Home
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/locator" className="text-[var(--muted-foreground)] hover:text-[var(--primary)]">
                                            Locator
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/credits" className="text-[var(--muted-foreground)] hover:text-[var(--primary)]">
                                            Credits
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/add-store" className="text-[var(--muted-foreground)] hover:text-[var(--primary)]">
                                            Add Store
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-[var(--foreground)] tracking-wider uppercase mb-4">
                                    Categories
                                </h3>
                                <ul className="space-y-2">
                                    <li>
                                        <Link
                                            href="/locator?category=men"
                                            className="text-[var(--muted-foreground)] hover:text-[var(--primary)]"
                                        >
                                            Men's Clothing
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/locator?category=women"
                                            className="text-[var(--muted-foreground)] hover:text-[var(--primary)]"
                                        >
                                            Women's Clothing
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/locator?category=children"
                                            className="text-[var(--muted-foreground)] hover:text-[var(--primary)]"
                                        >
                                            Children's Clothing
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/locator?category=accessories"
                                            className="text-[var(--muted-foreground)] hover:text-[var(--primary)]"
                                        >
                                            Accessories
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-[var(--foreground)] tracking-wider uppercase mb-4">
                                    Contact
                                </h3>
                                <ul className="space-y-2">
                                    <li className="text-[var(--muted-foreground)]">Bogor, Indonesia</li>
                                    <li className="text-[var(--muted-foreground)]">info@pedidi.com</li>
                                    <li className="text-[var(--muted-foreground)]">+62 123 456 7890</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-[var(--border)] flex flex-col md:flex-row justify-between items-center">
                        <p className="text-sm text-[var(--muted-foreground)]">
                            &copy; {new Date().getFullYear()} Fast Fashion by Pedidi. All rights reserved.
                        </p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <a href="#" className="text-[var(--muted-foreground)] hover:text-[var(--primary)]">
                                <span className="sr-only">Facebook</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path
                                        fillRule="evenodd"
                                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </a>
                            <a href="#" className="text-[var(--muted-foreground)] hover:text-[var(--primary)]">
                                <span className="sr-only">Instagram</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path
                                        fillRule="evenodd"
                                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </a>
                            <a href="#" className="text-[var(--muted-foreground)] hover:text-[var(--primary)]">
                                <span className="sr-only">Twitter</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
