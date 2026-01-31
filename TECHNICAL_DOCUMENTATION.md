# Fast Fashion Store Locator - Technical Documentation

## Table of Contents

1. [Introduction](#1-introduction)
2. [Technology Stack](#2-technology-stack)
3. [System Architecture](#3-system-architecture)
4. [Getting Started](#4-getting-started)
5. [Project Structure](#5-project-structure)
6. [Database Schema](#6-database-schema)
7. [Core Features](#7-core-features)
8. [Component Documentation](#8-component-documentation)
9. [API Integration](#9-api-integration)
10. [Deployment Guide](#10-deployment-guide)
11. [Troubleshooting](#11-troubleshooting)

---

## 1. Introduction

### 1.1 Project Overview

The **Fast Fashion Store Locator** is a web-based geographic information system (GIS) application designed to help users discover and locate fashion stores in Bogor, Indonesia. The application provides an interactive map interface, advanced search and filtering capabilities, and a community-driven store submission system with administrative approval workflow.

### 1.2 Key Features

- **Interactive Map Interface**: Browse fashion stores on an interactive Leaflet map
- **Advanced Search & Filtering**: Search by name, address, or filter by store categories
- **Store Submission System**: Allow store owners to submit their stores for listing
- **Admin Dashboard**: Approve or reject store submissions with a dedicated admin panel
- **Responsive Design**: Mobile-first design that works seamlessly across all devices
- **Real-time Data**: Dynamic data fetching from Supabase backend
- **Image Upload**: Store owners can upload store images to enhance listings

### 1.3 Target Audience

This documentation is intended for:
- **Developers** who want to understand, maintain, or extend the application
- **Contributors** looking to add new features or fix bugs
- **System Administrators** responsible for deployment and maintenance
- **Students** learning about full-stack web development and GIS applications

---

## 2. Technology Stack

### 2.1 Frontend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 15.3.2 | React framework for server-side rendering and routing |
| **React** | 19.0.0 | UI component library |
| **TypeScript** | 5.8.3 | Type-safe JavaScript superset |
| **Tailwind CSS** | 4.x | Utility-first CSS framework for styling |
| **Leaflet** | 1.9.4 | Open-source JavaScript library for interactive maps |
| **React Leaflet** | 5.0.0 | React components for Leaflet maps |
| **Lucide React** | 0.511.0 | Icon library |
| **next-themes** | 0.4.6 | Theme management (dark/light mode) |

### 2.2 Backend Technologies

| Technology | Purpose |
|------------|---------|
| **Supabase** | Backend-as-a-Service (BaaS) for database, authentication, and storage |
| **PostgreSQL** | Relational database (via Supabase) |
| **Supabase Storage** | Object storage for store images |

### 2.3 Development Tools

- **Node.js**: JavaScript runtime environment
- **npm**: Package manager
- **Git**: Version control system

---

## 3. System Architecture

### 3.1 Architecture Overview

The application follows a modern **client-server architecture** with a clear separation of concerns:

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Layer                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Landing    │  │    Store     │  │    Admin     │      │
│  │     Page     │  │   Locator    │  │  Dashboard   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Add Store   │  │   Header/    │  │   Reusable   │      │
│  │     Form     │  │    Footer    │  │  Components  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            ↕
                    Next.js API Layer
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                    Supabase Backend                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  PostgreSQL  │  │   Storage    │  │     Auth     │      │
│  │   Database   │  │   (Images)   │  │   (Admin)    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 Data Flow

#### Store Locator Flow
```
User → Search/Filter Input → React State Update → Filter Algorithm → 
Filtered Results → Map Component → Display Markers
```

#### Store Submission Flow
```
Store Owner → Fill Form → Validate Input → Upload Image to Supabase Storage → 
Insert Data to Database (status: pending) → Admin Review → 
Approve/Reject → Update Status → Display on Map (if approved)
```

### 3.3 Component Hierarchy

```
App (layout.tsx)
├── Landing Page (landing-page.js)
│   ├── Header
│   ├── Hero Section
│   ├── Features Section
│   └── Footer
├── Store Locator (store-finder-app.tsx)
│   ├── Header
│   ├── Sidebar (Search & Filters)
│   ├── Map Component (map-component.js)
│   │   └── Store Markers
│   └── Store Details Card
├── Add Store Page (add-store-page.js)
│   ├── Header
│   ├── Store Information Form
│   ├── Category Selection
│   ├── Location Picker (location-picker.js)
│   ├── Image Upload
│   └── Footer
└── Admin Dashboard (admin-dashboard.js)
    ├── Admin Layout
    ├── Pending Stores Tab
    ├── Approved Stores Tab
    └── Rejected Stores Tab
```

---

## 4. Getting Started

### 4.1 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher)
- **Git** (for version control)
- A **Supabase account** (free tier available at [supabase.com](https://supabase.com))
- A modern web browser (Chrome, Firefox, Safari, or Edge)
- A code editor (VS Code recommended)

### 4.2 Installation Steps

#### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd wowzer
```

#### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages listed in `package.json`:
- Next.js and React
- Supabase client library
- Leaflet and React Leaflet
- Tailwind CSS
- All other dependencies

#### Step 3: Set Up Supabase

1. **Create a Supabase Project**:
   - Go to [supabase.com](https://supabase.com)
   - Click "New Project"
   - Fill in project details (name, database password, region)

2. **Get Your Supabase Credentials**:
   - Navigate to Project Settings → API
   - Copy your `Project URL` and `anon/public` API key

3. **Create the Database Table**:

Execute the following SQL in the Supabase SQL Editor:

```sql
-- Create stores table
CREATE TABLE stores (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  phone TEXT NOT NULL,
  website TEXT,
  description TEXT,
  categories TEXT[] DEFAULT '{}',
  location POINT,
  owner_name TEXT NOT NULL,
  owner_email TEXT NOT NULL,
  image TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_stores_status ON stores(status);
CREATE INDEX idx_stores_location ON stores USING GIST(location);

-- Enable Row Level Security (RLS)
ALTER TABLE stores ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access to approved stores
CREATE POLICY "Public can view approved stores" ON stores
  FOR SELECT
  USING (status = 'approved');

-- Create policy to allow anyone to insert stores (they start as pending)
CREATE POLICY "Anyone can submit stores" ON stores
  FOR INSERT
  WITH CHECK (true);
```

4. **Create Storage Bucket**:
   - Go to Storage in Supabase dashboard
   - Create a new bucket named `stores`
   - Set it to **public** (so images can be accessed via URL)

#### Step 4: Configure Environment Variables

Update the Supabase credentials in `src/lib/supabaseClient.js`:

```javascript
const supabaseUrl = "YOUR_SUPABASE_PROJECT_URL"
const supabaseKey = "YOUR_SUPABASE_ANON_KEY"
```

> **Note**: In a production environment, these should be stored in environment variables (`.env.local` file) and not committed to version control.

#### Step 5: Run the Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### 4.3 Build for Production

To create an optimized production build:

```bash
npm run build
npm start
```

---

## 5. Project Structure

### 5.1 Directory Overview

```
wowzer/
├── .next/                    # Next.js build output (auto-generated)
├── node_modules/             # Dependencies (auto-generated)
├── pages/                    # Next.js page routes
│   ├── about.js             # About page
│   ├── add-store.js         # Add store page route
│   ├── admin-approved.js    # Admin approved stores page
│   ├── admin-dashboard.js   # Admin dashboard page
│   ├── admin-login.js       # Admin login page
│   ├── admin-rejected.js    # Admin rejected stores page
│   ├── home.js              # Home page
│   └── locator.js           # Store locator page route
├── public/                   # Static assets
│   └── img/                 # Images
├── src/                      # Source code
│   ├── app/                 # Next.js app directory
│   │   ├── favicon.ico      # Site favicon
│   │   ├── globals.css      # Global styles and CSS variables
│   │   ├── layout.tsx       # Root layout component
│   │   └── page.tsx         # Root page component
│   ├── components/          # React components
│   │   ├── add-store-page.js        # Add store form component
│   │   ├── admin-approved.js        # Admin approved list component
│   │   ├── admin-dashboard.js       # Admin dashboard component
│   │   ├── admin-layout.js          # Admin layout wrapper
│   │   ├── admin-login.js           # Admin login component
│   │   ├── admin-rejected.js        # Admin rejected list component
│   │   ├── credits-page.js          # Credits/about component
│   │   ├── footer.js                # Footer component
│   │   ├── header.js                # Header/navigation component
│   │   ├── landing-page.js          # Landing page component
│   │   ├── location-picker.js       # Map location picker component
│   │   ├── map-component.js         # Main map component
│   │   ├── map-wrapper.js           # Map wrapper for SSR handling
│   │   ├── store-finder-app.tsx     # Store locator main component
│   │   ├── store-map-wrapper.tsx    # Store map wrapper
│   │   ├── store-map.tsx            # Store map component
│   │   ├── theme-provider.tsx       # Theme context provider
│   │   └── ui/                      # Reusable UI components
│   │       └── custom-components.js # Custom UI components
│   ├── data/                # Static data files
│   │   ├── categories.js    # Store category definitions
│   │   └── sample-stores.js # Sample store data (fallback)
│   └── lib/                 # Utility libraries
│       └── supabaseClient.js # Supabase client configuration
├── .gitignore               # Git ignore rules
├── jsconfig.json            # JavaScript configuration
├── next.config.mjs          # Next.js configuration
├── package.json             # Project dependencies and scripts
├── package-lock.json        # Locked dependency versions
├── postcss.config.mjs       # PostCSS configuration
├── README.md                # Project README
├── tailwind.config.js       # Tailwind CSS configuration
└── tsconfig.json            # TypeScript configuration
```

### 5.2 Key Files Explained

#### Configuration Files

- **`package.json`**: Defines project metadata, dependencies, and npm scripts
- **`next.config.mjs`**: Next.js framework configuration
- **`tailwind.config.js`**: Tailwind CSS customization (colors, fonts, etc.)
- **`tsconfig.json`**: TypeScript compiler options

#### Core Application Files

- **`src/app/layout.tsx`**: Root layout that wraps all pages
- **`src/app/globals.css`**: Global CSS variables and Tailwind directives
- **`src/lib/supabaseClient.js`**: Supabase client initialization
- **`src/data/categories.js`**: Store category definitions
- **`src/data/sample-stores.js`**: Sample/fallback store data

---

## 6. Database Schema

### 6.1 Stores Table

The `stores` table is the primary data structure for storing fashion store information.

#### Table Structure

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, AUTO-GENERATED | Unique identifier for each store |
| `name` | TEXT | NOT NULL | Store name |
| `address` | TEXT | NOT NULL | Physical address of the store |
| `phone` | TEXT | NOT NULL | Contact phone number |
| `website` | TEXT | NULLABLE | Store website or social media URL |
| `description` | TEXT | NULLABLE | Store description and specialties |
| `categories` | TEXT[] | DEFAULT '{}' | Array of category IDs (e.g., ["mens", "womens"]) |
| `location` | POINT | NULLABLE | Geographic coordinates (longitude, latitude) |
| `owner_name` | TEXT | NOT NULL | Name of the person who submitted the store |
| `owner_email` | TEXT | NOT NULL | Email of the person who submitted the store |
| `image` | TEXT | NULLABLE | URL to the store image in Supabase Storage |
| `status` | TEXT | DEFAULT 'pending' | Store approval status: 'pending', 'approved', or 'rejected' |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Timestamp when the store was submitted |
| `updated_at` | TIMESTAMP | DEFAULT NOW() | Timestamp when the store was last updated |

#### Example Data

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Fashion Hub Bogor",
  "address": "Jl. Pajajaran No. 45, Bogor",
  "phone": "+62 251 123456",
  "website": "https://fashionhub.com",
  "description": "Premium fashion store offering the latest trends",
  "categories": ["mens", "womens", "accessories"],
  "location": "POINT(106.8019 -6.5971)",
  "owner_name": "John Doe",
  "owner_email": "john@example.com",
  "image": "https://dgdwbozchllukjyhkuoc.supabase.co/storage/v1/object/public/stores/550e8400-e29b-41d4-a716-446655440000.jpg",
  "status": "approved",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-16T14:20:00Z"
}
```

### 6.2 Store Categories

Categories are defined in `src/data/categories.js`:

```javascript
const STORE_CATEGORIES = [
  { id: "mens", label: "Men's Clothing" },
  { id: "womens", label: "Women's Clothing" },
  { id: "childrens", label: "Children's Clothing" },
  { id: "accessories", label: "Accessories" },
  { id: "shoes", label: "Shoes & Footwear" },
  { id: "sportswear", label: "Sportswear" },
  { id: "formal", label: "Formal Wear" },
  { id: "casual", label: "Casual Wear" }
]
```

### 6.3 Data Relationships

```
┌─────────────────┐
│     Stores      │
├─────────────────┤
│ id (PK)         │
│ name            │
│ address         │
│ phone           │
│ website         │
│ description     │
│ categories[]    │──────┐
│ location        │      │
│ owner_name      │      │
│ owner_email     │      │
│ image           │──────┼───→ Supabase Storage (stores bucket)
│ status          │      │
│ created_at      │      │
│ updated_at      │      │
└─────────────────┘      │
                         │
                         ↓
              ┌──────────────────┐
              │   Categories     │
              ├──────────────────┤
              │ mens             │
              │ womens           │
              │ childrens        │
              │ accessories      │
              │ shoes            │
              │ sportswear       │
              │ formal           │
              │ casual           │
              └──────────────────┘
```

---

## 7. Core Features

### 7.1 Interactive Store Locator

#### Overview
The store locator is the main feature of the application, allowing users to browse, search, and filter fashion stores on an interactive map.

#### Key Components
- **Map Display**: Leaflet-based interactive map centered on Bogor
- **Search Bar**: Real-time search by store name or address
- **Category Filters**: Checkbox filters for store categories
- **Store Markers**: Clickable map markers for each store
- **Store Details Card**: Popup card showing detailed store information

#### Implementation Details

**File**: `src/components/store-finder-app.tsx`

**State Management**:
```typescript
const [searchQuery, setSearchQuery] = useState("")
const [selectedCategories, setSelectedCategories] = useState<string[]>([])
const [allStores, setAllStores] = useState(SAMPLE_STORES)
const [filteredStores, setFilteredStores] = useState(SAMPLE_STORES)
const [selectedStore, setSelectedStore] = useState(null)
```

**Filtering Algorithm**:
```typescript
useEffect(() => {
  const filtered = {
    type: "FeatureCollection",
    features: allStores.features.filter((store) => {
      const matchesSearch =
        searchQuery === "" ||
        store.properties.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.properties.address.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategories =
        selectedCategories.length === 0 || 
        selectedCategories.some((cat) => store.properties.categories.includes(cat))

      return matchesSearch && matchesCategories
    }),
  }
  setFilteredStores(filtered)
}, [searchQuery, selectedCategories, allStores])
```

**Data Fetching**:
```typescript
useEffect(() => {
  async function fetchStores() {
    const { data, error } = await supabase
      .from("stores")
      .select("*")
      .eq("status", "approved")

    if (data && data.length > 0) {
      // Convert to GeoJSON format
      const dynamicFeatures = data.map((store) => ({
        type: "Feature",
        properties: { ...store },
        geometry: {
          type: "Point",
          coordinates: store.location || [106.8019, -6.5971]
        }
      }))
      setAllStores({ type: "FeatureCollection", features: dynamicFeatures })
    }
  }
  fetchStores()
}, [])
```

### 7.2 Store Submission System

#### Overview
Allows store owners to submit their stores for listing on the platform. Submissions go through an admin approval process before appearing on the map.

#### Form Fields
1. **Store Information**:
   - Store Name (required)
   - Address (required)
   - Phone Number (required)
   - Website/Social Media (optional)
   - Description (optional)

2. **Categories**: Multi-select checkboxes (required)

3. **Location**: Interactive map picker (required)

4. **Image Upload**: Store photo (optional)

5. **Owner Information**:
   - Your Name (required)
   - Your Email (required)

#### Implementation Details

**File**: `src/components/add-store-page.js`

**Form Validation**:
```javascript
const validateForm = () => {
  const errors = {}
  
  if (!formData.name.trim()) errors.name = "Store name is required"
  if (!formData.address.trim()) errors.address = "Address is required"
  if (!formData.phone.trim()) errors.phone = "Phone number is required"
  if (formData.categories.length === 0) errors.categories = "Please select at least one category"
  if (!formData.location) errors.location = "Please select a location on the map"
  if (!formData.ownerName.trim()) errors.ownerName = "Your name is required"
  if (!formData.ownerEmail.trim()) errors.ownerEmail = "Your email is required"
  else if (!/\S+@\S+\.\S+/.test(formData.ownerEmail)) 
    errors.ownerEmail = "Please enter a valid email address"
  
  return errors
}
```

**Submission Process**:
```javascript
const handleSubmit = async (e) => {
  e.preventDefault()
  
  // 1. Validate form
  const errors = validateForm()
  if (Object.keys(errors).length > 0) {
    setFormErrors(errors)
    return
  }
  
  // 2. Insert store data (status: pending)
  const { data: insertedData, error: insertError } = await supabase
    .from("stores")
    .insert([{
      name: formData.name,
      address: formData.address,
      phone: formData.phone,
      website: formData.website,
      description: formData.description,
      categories: formData.categories,
      location: [formData.location[1], formData.location[0]], // Reverse coordinates
      owner_name: formData.ownerName,
      owner_email: formData.ownerEmail,
    }])
    .select("id")
  
  const newStoreId = insertedData[0].id
  
  // 3. Upload image if provided
  if (formData.image) {
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("stores")
      .upload(`${newStoreId}.jpg`, formData.image, {
        cacheControl: "3600",
        upsert: true,
      })
    
    // 4. Update store with image URL
    const imageUrl = `https://dgdwbozchllukjyhkuoc.supabase.co/storage/v1/object/public/stores/${newStoreId}.jpg`
    await supabase
      .from("stores")
      .update({ image: imageUrl })
      .eq("id", newStoreId)
  }
  
  setIsSubmitted(true)
}
```

### 7.3 Admin Dashboard

#### Overview
Administrative interface for reviewing and managing store submissions.

#### Features
- **Three Tabs**:
  - Pending Stores: Stores awaiting approval
  - Approved Stores: Currently listed stores
  - Rejected Stores: Declined submissions

- **Actions**:
  - Approve store (changes status to "approved")
  - Reject store (changes status to "rejected")
  - View store details
  - Delete store

#### Implementation Details

**File**: `src/components/admin-dashboard.js`

**Approval/Rejection Logic**:
```javascript
const handleApprove = async (storeId) => {
  const { error } = await supabase
    .from("stores")
    .update({ status: "approved", updated_at: new Date() })
    .eq("id", storeId)
  
  if (!error) {
    // Refresh the stores list
    fetchStores()
  }
}

const handleReject = async (storeId) => {
  const { error } = await supabase
    .from("stores")
    .update({ status: "rejected", updated_at: new Date() })
    .eq("id", storeId)
  
  if (!error) {
    fetchStores()
  }
}
```

### 7.4 Map Integration

#### Overview
Interactive map powered by Leaflet, displaying store locations with custom markers.

#### Features
- **Interactive Controls**: Zoom, pan, and navigate the map
- **Custom Markers**: Store locations marked with pins
- **Marker Clustering**: (Can be implemented for better performance with many stores)
- **Popup Information**: Click markers to view store details
- **Geolocation**: Center map on user's location (optional feature)

#### Implementation Details

**File**: `src/components/map-component.js`

**Map Initialization**:
```javascript
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet"

// Custom marker icon
const customIcon = L.icon({
  iconUrl: "/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
})

// Map component
<MapContainer
  center={[-6.5971, 106.8019]} // Bogor coordinates
  zoom={13}
  style={{ height: "100%", width: "100%" }}
>
  <TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  />
  
  {stores.features.map((store) => (
    <Marker
      key={store.properties.id}
      position={[
        store.geometry.coordinates[1],
        store.geometry.coordinates[0]
      ]}
      icon={customIcon}
      eventHandlers={{
        click: () => setSelectedStore(store)
      }}
    >
      <Popup>
        <strong>{store.properties.name}</strong>
        <br />
        {store.properties.address}
      </Popup>
    </Marker>
  ))}
</MapContainer>
```

**Location Picker** (for store submission):

**File**: `src/components/location-picker.js`

```javascript
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet"

function LocationMarker({ onLocationSelect, selectedLocation }) {
  const map = useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng
      onLocationSelect([lng, lat]) // GeoJSON format: [longitude, latitude]
    },
  })

  return selectedLocation ? (
    <Marker position={[selectedLocation[1], selectedLocation[0]]} />
  ) : null
}

export default function LocationPicker({ onLocationSelect, selectedLocation }) {
  return (
    <MapContainer
      center={[-6.5971, 106.8019]}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <LocationMarker 
        onLocationSelect={onLocationSelect}
        selectedLocation={selectedLocation}
      />
    </MapContainer>
  )
}
```

---

## 8. Component Documentation

### 8.1 Page Components

#### LandingPage Component

**File**: `src/components/landing-page.js`

**Purpose**: Main landing page showcasing the application features and call-to-action buttons.

**Sections**:
1. **Hero Section**: Main headline with CTA buttons
2. **Features Section**: Three feature cards (Search & Filter, Interactive Map, Curated Selection)
3. **CTA Section**: Encourages store owners to add their stores

**Props**: None

**Usage**:
```javascript
import LandingPage from "@/components/landing-page"

export default function Home() {
  return <LandingPage />
}
```

#### StoreFinderApp Component

**File**: `src/components/store-finder-app.tsx`

**Purpose**: Main store locator interface with search, filters, and map.

**State**:
- `searchQuery`: Current search text
- `selectedCategories`: Array of selected category IDs
- `allStores`: All stores from database
- `filteredStores`: Stores after applying filters
- `selectedStore`: Currently selected store for details view
- `isMobileFilterOpen`: Mobile filter sidebar visibility

**Props**: None

**Key Functions**:
- `fetchStores()`: Fetches approved stores from Supabase
- `handleCategoryChange(category)`: Toggles category filter
- `clearFilters()`: Resets all filters

**Usage**:
```javascript
import StoreFinderApp from "@/components/store-finder-app"

export default function LocatorPage() {
  return <StoreFinderApp />
}
```

#### AddStorePage Component

**File**: `src/components/add-store-page.js`

**Purpose**: Store submission form for store owners.

**State**:
- `formData`: Object containing all form fields
- `formErrors`: Validation error messages
- `isSubmitting`: Form submission state
- `isSubmitted`: Success state after submission

**Key Functions**:
- `handleInputChange(e)`: Updates form field values
- `handleFileChange(e)`: Handles image file selection
- `validateForm()`: Validates all required fields
- `handleSubmit(e)`: Submits form data to Supabase
- `handleLocationSelect(location)`: Updates selected map location
- `handleCategoryChange(categoryId)`: Toggles category selection

**Usage**:
```javascript
import AddStorePage from "@/components/add-store-page"

export default function AddStore() {
  return <AddStorePage />
}
```

#### AdminDashboard Component

**File**: `src/components/admin-dashboard.js`

**Purpose**: Administrative interface for managing store submissions.

**State**:
- `activeTab`: Current tab (pending/approved/rejected)
- `stores`: Stores for current tab
- `isLoading`: Loading state

**Key Functions**:
- `fetchStores()`: Fetches stores by status
- `handleApprove(storeId)`: Approves a pending store
- `handleReject(storeId)`: Rejects a pending store
- `handleDelete(storeId)`: Deletes a store

**Usage**:
```javascript
import AdminDashboard from "@/components/admin-dashboard"

export default function AdminPage() {
  return <AdminDashboard />
}
```

### 8.2 Reusable UI Components

**File**: `src/components/ui/custom-components.js`

These are custom-built UI components following a consistent design system:

#### Input Component
```javascript
export function Input({ className, ...props }) {
  return (
    <input
      className={`px-3 py-2 border border-[var(--border)] rounded-md 
                  focus:outline-none focus:ring-2 focus:ring-[var(--primary)] 
                  ${className}`}
      {...props}
    />
  )
}
```

#### Button Component
```javascript
export function Button({ 
  children, 
  variant = "default", 
  size = "default", 
  className, 
  ...props 
}) {
  const baseStyles = "rounded-md font-medium transition-colors"
  const variants = {
    default: "bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)]",
    outline: "border border-[var(--border)] hover:bg-[var(--secondary)]",
    ghost: "hover:bg-[var(--secondary)]",
  }
  const sizes = {
    default: "px-4 py-2",
    sm: "px-3 py-1 text-sm",
    lg: "px-6 py-3 text-lg",
    icon: "p-2",
  }
  
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
```

#### Card Components
```javascript
export function Card({ children, className, ...props }) {
  return (
    <div
      className={`bg-[var(--card-background)] border border-[var(--border)] 
                  rounded-lg shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ children, className, ...props }) {
  return (
    <div className={`p-4 border-b border-[var(--border)] ${className}`} {...props}>
      {children}
    </div>
  )
}

export function CardContent({ children, className, ...props }) {
  return (
    <div className={`p-4 ${className}`} {...props}>
      {children}
    </div>
  )
}
```

#### Checkbox Component
```javascript
export function Checkbox({ id, checked, onCheckedChange, ...props }) {
  return (
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={(e) => onCheckedChange(e.target.checked)}
      className="h-4 w-4 text-[var(--primary)] border-[var(--border)] 
                 rounded focus:ring-2 focus:ring-[var(--primary)]"
      {...props}
    />
  )
}
```

#### Badge Component
```javascript
export function Badge({ children, variant = "default", className, ...props }) {
  const variants = {
    default: "bg-[var(--primary)] text-white",
    secondary: "bg-[var(--secondary)] text-[var(--secondary-foreground)]",
    outline: "border border-[var(--border)] bg-transparent",
  }
  
  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded-md text-xs 
                  font-medium ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  )
}
```

### 8.3 Layout Components

#### Header Component

**File**: `src/components/header.js`

**Purpose**: Navigation header with logo and menu links.

**Features**:
- Responsive mobile menu
- Navigation links (Home, Locator, Add Store, About)
- Theme toggle (if implemented)

#### Footer Component

**File**: `src/components/footer.js`

**Purpose**: Site footer with links and information.

**Sections**:
- Quick links
- Contact information
- Social media links
- Copyright notice

---

## 9. API Integration

### 9.1 Supabase Client Setup

**File**: `src/lib/supabaseClient.js`

```javascript
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://dgdwbozchllukjyhkuoc.supabase.co"
const supabaseKey = "YOUR_SUPABASE_ANON_KEY"

export const supabase = createClient(supabaseUrl, supabaseKey)
```

### 9.2 Database Operations

#### Fetching Stores

**Fetch all approved stores**:
```javascript
const { data, error } = await supabase
  .from("stores")
  .select("*")
  .eq("status", "approved")
```

**Fetch stores by status**:
```javascript
const { data, error } = await supabase
  .from("stores")
  .select("*")
  .eq("status", "pending") // or "approved" or "rejected"
  .order("created_at", { ascending: false })
```

**Fetch single store by ID**:
```javascript
const { data, error } = await supabase
  .from("stores")
  .select("*")
  .eq("id", storeId)
  .single()
```

#### Inserting Stores

```javascript
const { data, error } = await supabase
  .from("stores")
  .insert([
    {
      name: "Store Name",
      address: "Store Address",
      phone: "+62 123 456 789",
      website: "https://example.com",
      description: "Store description",
      categories: ["mens", "womens"],
      location: [106.8019, -6.5971], // [longitude, latitude]
      owner_name: "John Doe",
      owner_email: "john@example.com",
      status: "pending"
    }
  ])
  .select("id")
```

#### Updating Stores

**Update store status**:
```javascript
const { error } = await supabase
  .from("stores")
  .update({ 
    status: "approved",
    updated_at: new Date()
  })
  .eq("id", storeId)
```

**Update store image URL**:
```javascript
const { error } = await supabase
  .from("stores")
  .update({ image: imageUrl })
  .eq("id", storeId)
```

#### Deleting Stores

```javascript
const { error } = await supabase
  .from("stores")
  .delete()
  .eq("id", storeId)
```

### 9.3 Storage Operations

#### Upload Image

```javascript
const { data, error } = await supabase.storage
  .from("stores") // bucket name
  .upload(`${storeId}.jpg`, fileObject, {
    cacheControl: "3600",
    upsert: true, // overwrite if exists
  })
```

#### Get Public URL

```javascript
const imageUrl = `https://dgdwbozchllukjyhkuoc.supabase.co/storage/v1/object/public/stores/${storeId}.jpg`
```

#### Delete Image

```javascript
const { error } = await supabase.storage
  .from("stores")
  .remove([`${storeId}.jpg`])
```

### 9.4 Error Handling

Always check for errors when making Supabase calls:

```javascript
const { data, error } = await supabase
  .from("stores")
  .select("*")

if (error) {
  console.error("Error fetching stores:", error.message)
  // Handle error (show user message, retry, etc.)
  return
}

// Use data
console.log("Stores:", data)
```

---

## 10. Deployment Guide

### 10.1 Deployment on Vercel (Recommended)

Vercel is the recommended platform for deploying Next.js applications.

#### Prerequisites
- GitHub account
- Vercel account (free tier available)
- Project pushed to GitHub repository

#### Steps

1. **Push Code to GitHub**:
```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js configuration

3. **Configure Environment Variables**:
   - In Vercel project settings, go to "Environment Variables"
   - Add the following variables:
     ```
     NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

4. **Update Code to Use Environment Variables**:

Update `src/lib/supabaseClient.js`:
```javascript
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)
```

5. **Deploy**:
   - Click "Deploy"
   - Vercel will build and deploy your application
   - You'll receive a production URL (e.g., `your-app.vercel.app`)

6. **Custom Domain (Optional)**:
   - In Vercel project settings, go to "Domains"
   - Add your custom domain
   - Update DNS records as instructed

### 10.2 Deployment on Other Platforms

#### Netlify

1. Connect GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Add environment variables
5. Deploy

#### Self-Hosted (VPS/Cloud Server)

1. **Build the application**:
```bash
npm run build
```

2. **Start the production server**:
```bash
npm start
```

3. **Use PM2 for process management**:
```bash
npm install -g pm2
pm2 start npm --name "wowzer" -- start
pm2 save
pm2 startup
```

4. **Configure Nginx as reverse proxy**:
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 10.3 Post-Deployment Checklist

- [ ] Test all pages and features
- [ ] Verify database connections
- [ ] Test image uploads
- [ ] Check mobile responsiveness
- [ ] Verify map functionality
- [ ] Test form submissions
- [ ] Check admin dashboard
- [ ] Set up monitoring (e.g., Vercel Analytics)
- [ ] Configure custom domain (if applicable)
- [ ] Set up SSL certificate (automatic with Vercel/Netlify)

---

## 11. Troubleshooting

### 11.1 Common Issues and Solutions

#### Issue: Map Not Displaying

**Symptoms**: Blank area where map should be, or "Map container not found" error

**Solutions**:
1. **Check Leaflet CSS import**: Ensure Leaflet CSS is imported in your component or global CSS:
   ```javascript
   import 'leaflet/dist/leaflet.css'
   ```

2. **Dynamic import for SSR**: Leaflet doesn't work with server-side rendering. Use dynamic import:
   ```javascript
   const MapComponent = dynamic(() => import("./map-component"), { ssr: false })
   ```

3. **Container height**: Ensure map container has explicit height:
   ```css
   .map-container {
     height: 500px;
     width: 100%;
   }
   ```

#### Issue: Supabase Connection Errors

**Symptoms**: "Failed to fetch stores", "Invalid API key" errors

**Solutions**:
1. **Verify credentials**: Check that Supabase URL and API key are correct
2. **Check network**: Ensure you have internet connection
3. **CORS issues**: Verify Supabase project allows requests from your domain
4. **RLS policies**: Check Row Level Security policies allow the operation

#### Issue: Image Upload Fails

**Symptoms**: Images not uploading, "Storage bucket not found" error

**Solutions**:
1. **Create storage bucket**: Ensure "stores" bucket exists in Supabase Storage
2. **Set bucket to public**: Make sure bucket is publicly accessible
3. **Check file size**: Verify file is under size limit (default 50MB)
4. **File format**: Ensure file is a supported image format (JPG, PNG, GIF)

#### Issue: Store Submissions Not Appearing

**Symptoms**: Form submits successfully but store doesn't appear on map

**Solutions**:
1. **Check status**: Verify store status is "approved" (not "pending")
2. **Refresh data**: Force refresh the store list in the locator
3. **Check filters**: Ensure no filters are excluding the store
4. **Database query**: Verify the query is fetching approved stores:
   ```javascript
   .eq("status", "approved")
   ```

#### Issue: Build Errors

**Symptoms**: `npm run build` fails with errors

**Solutions**:
1. **Clear cache**:
   ```bash
   rm -rf .next
   npm run build
   ```

2. **Update dependencies**:
   ```bash
   npm update
   ```

3. **Check TypeScript errors**: Fix any TypeScript type errors
4. **Check imports**: Ensure all imports are correct and files exist

#### Issue: Mobile Menu Not Working

**Symptoms**: Mobile hamburger menu doesn't open/close

**Solutions**:
1. **Check state**: Verify `isMenuOpen` state is being updated
2. **Check z-index**: Ensure menu has proper z-index to appear above content
3. **Check event handlers**: Verify onClick handlers are attached correctly

### 11.2 Debugging Tips

#### Enable Verbose Logging

Add console logs to track data flow:
```javascript
useEffect(() => {
  async function fetchStores() {
    console.log("Fetching stores...")
    const { data, error } = await supabase.from("stores").select("*")
    console.log("Fetched data:", data)
    console.log("Error:", error)
  }
  fetchStores()
}, [])
```

#### Use React DevTools

Install React Developer Tools browser extension to:
- Inspect component state
- View props
- Track re-renders
- Debug hooks

#### Check Browser Console

Always check browser console for:
- JavaScript errors
- Network request failures
- Warning messages
- CORS errors

#### Supabase Dashboard

Use Supabase dashboard to:
- View database tables and data
- Check storage bucket contents
- Monitor API usage
- View logs

### 11.3 Performance Optimization

#### Lazy Loading Components

```javascript
const AdminDashboard = dynamic(() => import("@/components/admin-dashboard"), {
  loading: () => <p>Loading...</p>,
})
```

#### Image Optimization

Use Next.js Image component:
```javascript
import Image from "next/image"

<Image
  src={store.image}
  alt={store.name}
  width={300}
  height={200}
  loading="lazy"
/>
```

#### Memoization

Use React.memo for expensive components:
```javascript
const StoreCard = React.memo(({ store }) => {
  return (
    <div>
      <h3>{store.name}</h3>
      <p>{store.address}</p>
    </div>
  )
})
```

#### Database Indexing

Ensure proper indexes on frequently queried columns:
```sql
CREATE INDEX idx_stores_status ON stores(status);
CREATE INDEX idx_stores_categories ON stores USING GIN(categories);
```

---

## Appendix

### A. Glossary

- **GIS**: Geographic Information System - system for capturing, storing, and analyzing spatial data
- **GeoJSON**: JSON format for encoding geographic data structures
- **Leaflet**: Open-source JavaScript library for interactive maps
- **Next.js**: React framework for production-grade applications
- **Supabase**: Open-source Firebase alternative (Backend-as-a-Service)
- **BaaS**: Backend-as-a-Service - cloud computing service model
- **RLS**: Row Level Security - database security feature
- **SSR**: Server-Side Rendering - rendering web pages on the server
- **API**: Application Programming Interface
- **CRUD**: Create, Read, Update, Delete operations

### B. Useful Resources

#### Official Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Supabase Documentation](https://supabase.com/docs)
- [Leaflet Documentation](https://leafletjs.com/reference.html)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

#### Tutorials
- [Next.js Learn Course](https://nextjs.org/learn)
- [Supabase Quickstart](https://supabase.com/docs/guides/getting-started)
- [Leaflet Quick Start](https://leafletjs.com/examples/quick-start/)

#### Community
- [Next.js GitHub Discussions](https://github.com/vercel/next.js/discussions)
- [Supabase Discord](https://discord.supabase.com)
- [Stack Overflow](https://stackoverflow.com)

### C. License

This project is for educational purposes. Please ensure you have proper licenses for all dependencies and third-party services used.

### D. Contributing

If you'd like to contribute to this project:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### E. Contact

For questions or support regarding this project:
- Email: [your-email@example.com]
- GitHub Issues: [repository-url/issues]

---

**Document Version**: 1.0  
**Last Updated**: January 31, 2026  
**Author**: [Your Name]

---

*This documentation was created as part of a technical writing assignment for English class, demonstrating the ability to create comprehensive developer documentation for a full-stack web application.*
