"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js"; // Import Supabase client
import { Menu, X, Plus, Store, MapPin, Phone, Tag, Info, Upload, Building, Mail, User } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import "../app/globals.css";
import Header from "./header";
import Footer from "./footer";
import STORE_CATEGORIES from "../data/categories"

// Supabase configuration
const supabaseUrl = "https://dgdwbozchllukjyhkuoc.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRnZHdib3pjaGxsdWtqeWhrdW9jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5ODkxMzMsImV4cCI6MjA2MzU2NTEzM30.nzc1uIoy1LRI64bZ99uYynSdNOyhcwjk1YyXLRWg-eE";
const supabase = createClient(supabaseUrl, supabaseKey);

// Dynamically import the Map component to avoid SSR issues
const LocationPicker = dynamic(() => import("./location-picker"), {
    ssr: false,
    loading: () => (
        <div className="h-72 bg-[var(--secondary)] animate-pulse rounded-md flex items-center justify-center">
            <p className="text-[var(--secondary-foreground)]">Loading map...</p>
        </div>
    ),
});

export default function AddStorePage() {
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
        image: null, // Add image field
        status: "pending", // Set default status to pending
    });
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        if (formErrors[name]) {
            setFormErrors((prev) => ({
                ...prev,
                [name]: null,
            }));
        }
    };

    // Handle file input for image
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setFormData((prev) => ({
                ...prev,
                image: file,
                imagePreview: previewUrl, // Add this line
            }));
        }
    };

    // Validate form
    const validateForm = () => {
        const errors = {};

        if (!formData.name.trim()) errors.name = "Store name is required";
        if (!formData.address.trim()) errors.address = "Address is required";
        if (!formData.phone.trim()) errors.phone = "Phone number is required";
        if (formData.categories.length === 0) errors.categories = "Please select at least one category";
        if (!formData.location) errors.location = "Please select a location on the map";
        if (!formData.ownerName.trim()) errors.ownerName = "Your name is required";
        if (!formData.ownerEmail.trim()) errors.ownerEmail = "Your email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.ownerEmail)) errors.ownerEmail = "Please enter a valid email address";

        return errors;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Validate form
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }
    
        try {
            setIsSubmitting(true);
    
            // Reverse the location coordinates (latitude and longitude)
            const reversedLocation = formData.location
                ? [formData.location[1], formData.location[0]]
                : null;
    
            // Insert data into Supabase and get the new store ID
            const { data: insertedData, error: insertError } = await supabase.from("stores").insert([
                {
                    name: formData.name,
                    address: formData.address,
                    phone: formData.phone,
                    website: formData.website,
                    description: formData.description,
                    categories: formData.categories,
                    location: reversedLocation, // Use reversed location here
                    owner_name: formData.ownerName,
                    owner_email: formData.ownerEmail,
                },
            ]).select("id");
    
            if (insertError) {
                console.error("Error inserting data:", insertError.message);
                setIsSubmitting(false);
                return;
            }
    
            const newStoreId = insertedData[0].id;
    
            // Upload image to Supabase storage and save the image URL
            let imageUrl = null;
            if (formData.image) {
                const { data: uploadData, error: uploadError } = await supabase.storage
                    .from("stores") // Replace with your Supabase storage bucket name
                    .upload(`${newStoreId}.jpg`, formData.image, {
                        cacheControl: "3600",
                        upsert: true,
                    });
    
                if (uploadError) {
                    console.error("Error uploading image:", uploadError.message);
                    setIsSubmitting(false);
                    return;
                }
    
                // Construct the public URL for the uploaded image
                imageUrl = `https://dgdwbozchllukjyhkuoc.supabase.co/storage/v1/object/public/stores/${newStoreId}.jpg`;
    
                // Update the store record with the image URL
                const { error: updateError } = await supabase.from("stores").update({
                    image: imageUrl,
                }).eq("id", newStoreId);
    
                if (updateError) {
                    console.error("Error updating image URL:", updateError.message);
                    setIsSubmitting(false);
                    return;
                }
            }
    
            console.log("Data inserted and image uploaded successfully!");
            setIsSubmitted(true);
    
            // Reset form
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
                image: null,
            });
        } catch (error) {
            console.error("Error submitting the form:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

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

    return (
        <div className="min-h-screen flex flex-col">
            {/* Navigation */}
            <Header />

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
                                            Website/Social Media (Optional)
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
                                            onClick={() => document.getElementById("image").click()}
                                        >
                                            <label htmlFor="image">Store Image</label>
                                            <input
                                                type="file"
                                                id="image"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                                className="block w-full mt-2"
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
            <Footer />
        </div>
    )
}
