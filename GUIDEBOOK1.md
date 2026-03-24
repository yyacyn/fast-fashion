# Fast Fashion Store Locator
## A Technical Guidebook

---

## Foreword


The students did a good job of applying GIS concepts to a practical problem. The application combines spatial data management, web-based mapping using Leaflet, and a Supabase backend, which together form a complete and functional system. What stands out is the inclusion of a Volunteered Geographic Information (VGI) model, where members of the public can submit new store data directly through the application. This reflects how modern geographic information systems are increasingly built on community participation rather than centralized data sources.

The admin dashboard and approval workflow also show that the team thought about data quality and system governance, which are important concerns in any GIS application. Overall, this is a solid project that demonstrates both technical skill and practical thinking. I hope this guidebook serves as a useful reference for the team and for anyone else who wants to understand, maintain, or build on top of this system in the future.

*-- Course Lecturer, Geographic Information System*
*Department of Computer Science, IPB University*

---

## Abstract


This guidebook provides a comprehensive technical reference for developers working with the **Fast Fashion**, a web-based Geographic Information System (GIS) application designed to help users discover and navigate fashion retail stores in Bogor, Indonesia. The system addresses a common urban challenge — the difficulty of locating specific types of retail businesses within a city — by combining interactive digital mapping with a community-driven store directory (Longley et al., 2015).

The application is built on a modern full-stack architecture that integrates **Next.js 15** as the frontend framework, **Supabase** as the backend service provider for both database management and file storage, **Leaflet** for interactive map rendering, and **Tailwind CSS** for responsive styling. This combination of technologies reflects current industry practices for building scalable, production-ready web applications.

This guidebook covers the entire technical scope of the project: from system architecture and database design, to the implementation of core features such as the interactive map interface, store submission workflow, and administrative management dashboard. Through detailed explanations, code walkthroughs, and structural diagrams, the guide aims to help developers understand the system deeply enough to maintain, debug, and extend it beyond its current capabilities.

---

## Introduction

The introduction of this guidebook outlines the foundational understanding of the **Fast Fashion Store Locator** like what the system is, the problem context it addresses, and how it was built. This section is structured into three interconnected elements: the definition of the system and its technical components, the background that contextualizes the need for its development, and an account of the development process itself.

### Definition

The **Fast Fashion Store Locator** is a full-stack web application that serves as a geographic information system (GIS) for locating fashion retail stores in Bogor, Indonesia. It operates across three layers: a **public layer** for browsing and submitting stores, an **administrative layer** for reviewing and approving submissions, and a **data layer** powered by Supabase handling database records and file storage. The application is built using **Next.js 15** as the frontend framework with server-side rendering support, **React 19** with **TypeScript** for type-safe UI development, **Tailwind CSS** for responsive styling, **Leaflet** for interactive mapping, and the **Supabase JS** SDK for all backend database and storage operations. The application is deployed on **Vercel**, providing automatic builds and global CDN distribution.

### Background

The fast fashion industry has grown significantly over the past two decades, characterized by rapid production cycles, low prices, and a high volume of retail outlets distributed across urban areas (Barnes & Lea-Greenwood, 2006). As the number of fashion retail stores increases in cities like Bogor, consumers face growing difficulty locating specific stores without reliable, spatially-aware information systems. Web-based mapping platforms have addressed this gap by making geographic information accessible to general users through interactive maps embedded in everyday applications (Haklay & Weber, 2008).

A particularly relevant development in this space is Volunteered Geographic Information (VGI), in which members of the public actively contribute location data through digital platforms (Goodchild, 2007). This project reflects the VGI paradigm, where rather than relying on a centralized authority, the system empowers store owners and community members to submit their own store data. Such community-driven models have been shown to produce geographically rich datasets that complement or surpass traditional data collection methods in both coverage and timeliness (Sui & Goodchild, 2011).

### Development

The application was developed as the 4th semester project at IPB University for the Geographic Information System class, originating from a need to map fashion retail stores across Bogor. Development followed four iterative phases:

**Phase 1 — Setup:** The Next.js project was initialized, Supabase was configured as the backend, and core dependencies (Leaflet, Tailwind CSS) were installed. The `stores` database table and image storage bucket were created in Supabase.

**Phase 2 — Feature Development:** Core features were built one by one — the landing page, interactive map using `react-leaflet`, search and filter system, store submission form with map-based location picker, and the admin dashboard for managing approvals.

**Phase 3 — Data Integration:** Static sample data was replaced with live Supabase queries. Store records were transformed into GeoJSON `FeatureCollection` format for Leaflet compatibility, with a static fallback dataset retained as a safety net.

**Phase 4 — Polish:** The UI was made fully responsive across screen sizes, the sidebar was made collapsible on mobile, and shared components like the header and footer were standardized across all pages.

---

## Discussion

### System Architecture

The application is structured around a **client-to-BaaS** (Backend-as-a-Service) architecture. Rather than maintaining a custom REST API or server-side business logic, all backend operations are delegated to Supabase, which is accessed directly from the React frontend using the Supabase JavaScript SDK (Supabase, 2024). This design eliminates the need for a separately managed backend server, reducing infrastructure overhead while still providing a full-featured database, file storage, and access control layer.

The frontend, built with Next.js, is responsible for all rendering, routing, and user interaction. It communicates with Supabase through the client SDK to perform reads and writes against the PostgreSQL database and to upload or retrieve images from Supabase Storage. There is no intermediary API server — the Next.js pages call Supabase directly.

```
┌──────────────────────────────────────────────────────────┐
│                    Next.js Frontend                       │
│  Landing Page │ Store Locator │ Add Store │ Admin Panel  │
└────────────────────────┬─────────────────────────────────┘
                         │ Supabase JS SDK
                         ▼
┌──────────────────────────────────────────────────────────┐
│                     Supabase                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │  PostgreSQL  │  │   Storage    │  │     RLS      │   │
│  │  (stores)    │  │  (images)    │  │  (policies)  │   │
│  └──────────────┘  └──────────────┘  └──────────────┘   │
└──────────────────────────────────────────────────────────┘
```

Access control is enforced at the database level through Supabase's **Row Level Security (RLS)** policies rather than in application code. Public users are permitted to read approved stores and insert new submissions, while administrative operations — such as updating a store's approval status — require a service role key that is never exposed to the browser.

Next.js's file-based routing maps URLs to page components in the `/pages` directory. Each page imports its corresponding React component from `/src/components` and renders it. This keeps routing thin and delegates all logic to the component layer.

The component hierarchy is organized as follows:

```
pages/
├── home.js           → <LandingPage />
├── locator.js        → <StoreFinderApp />
├── add-store.js      → <AddStorePage />
├── admin-dashboard   → <AdminDashboard />
└── admin-login.js    → <AdminLogin />
```

### Database Design

The `stores` table is the single primary data structure used by the entire application. It stores all information about each fashion store, including metadata collected during submission and the approval status set by admins. The table is intentionally kept flat — there are no related tables or foreign keys — to keep queries simple and reduce the complexity of joins in a single-entity application.

| Column | Type | Required | Description |
|--------|------|----------|-------------|
| `id` | UUID | Auto | Primary key, auto-generated by Supabase |
| `name` | TEXT | ✅ | Store display name |
| `address` | TEXT | ✅ | Full physical address |
| `phone` | TEXT | ✅ | Contact phone number |
| `website` | TEXT | ❌ | Optional website or social media URL |
| `description` | TEXT | ❌ | Optional store description |
| `categories` | TEXT[] | ✅ | Array of category tags (e.g. `["mens", "womens"]`) |
| `location` | POINT | ✅ | Geographic coordinates as `[longitude, latitude]` |
| `owner_name` | TEXT | ✅ | Name of the person who submitted the store |
| `owner_email` | TEXT | ✅ | Email of the submitter for follow-up |
| `image` | TEXT | ❌ | Public URL to the uploaded store image |
| `status` | TEXT | Auto | One of: `pending`, `approved`, `rejected` |
| `created_at` | TIMESTAMP | Auto | Submission timestamp |
| `updated_at` | TIMESTAMP | Auto | Last modification timestamp |

The `location` column uses PostgreSQL's `POINT` type to store geographic coordinates. It is stored in `[longitude, latitude]` order to match the GeoJSON standard, though Leaflet internally uses `[latitude, longitude]` — this reversal is handled explicitly in the data transformation layer before passing coordinates to the map component.

The `status` column drives the entire approval workflow. Every new submission is inserted with a default value of `pending`, making it invisible to public map users until an administrator explicitly sets it to `approved`. A rejected store is also hidden from the public view and can be reviewed or deleted from the admin dashboard.

Row Level Security (RLS) is enabled on the table. Two policies are in place:

- **Public read policy**: Any user can SELECT rows where `status = 'approved'`
- **Insert policy**: Any user can INSERT a new row (all submissions start as `pending`)
- Admin operations (UPDATE, DELETE) are performed using the service role key, restricted to the admin dashboard

Store images are uploaded to a Supabase Storage bucket named `stores`. Each image is stored under a filename matching the store's UUID (e.g., `550e8400-e29b-41d4-a716-446655440000.jpg`), and the resulting public URL is saved back to the `image` column of the corresponding store record.

### Core Features

#### Feature 1: Store Locator with Interactive Map

The central feature of the application is a split-panel interface with a collapsible filter sidebar on the left and a full-height interactive map on the right. On mount, the `StoreFinderApp` component fetches all approved stores from Supabase and transforms them into a GeoJSON `FeatureCollection` for Leaflet to render as map markers. A static fallback dataset is merged in to ensure the map is never empty if the database returns no results.

Filtering is handled entirely on the client side using a `useEffect` hook that recomputes the visible markers whenever the search query or selected categories change. The filtered collection is passed as a prop to the `MapComponent`, which re-renders the markers accordingly. Because Leaflet relies on browser-only APIs, the map is loaded with Next.js dynamic imports with SSR disabled (`{ ssr: false }`).

```javascript
// Fetch approved stores and convert to GeoJSON
useEffect(() => {
    async function fetchStores() {
        setIsLoading(true)
        try {
            const { data, error } = await supabase.from("stores").select("*").eq("status", "approved")
            if (error) { console.error("Error fetching stores:", error); return }
            if (data && data.length > 0) {
                const dynamicFeatures = data.map((store) => ({
                    type: "Feature",
                    properties: {
                        id: store.id, name: store.name, address: store.address,
                        categories: store.categories || [], phone: store.phone,
                        web: store.website, image: store.image, description: store.description,
                    },
                    geometry: { type: "Point", coordinates: store.location || [106.8019, -6.5971] },
                }))
                const combinedStores = { type: "FeatureCollection", features: [...SAMPLE_STORES.features, ...dynamicFeatures] }
                setAllStores(combinedStores)
                setFilteredStores(combinedStores)
            }
        } catch (error) {
            console.error("Unexpected error fetching stores:", error)
        } finally {
            setIsLoading(false)
        }
    }
    fetchStores()
}, [])

// Filter stores based on search query and selected categories
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

#### Feature 2: Store Submission System

The Add Store page allows any user to submit a fashion store for review. Before submitting, the form is validated client-side to check that all required fields are filled and that the email format is valid. On submission, the process runs three sequential Supabase operations: inserting the store record with `status: "pending"`, uploading the image to Supabase Storage under the new store's UUID, and updating the record with the resulting public image URL.

One key detail is coordinate handling. The embedded `LocationPicker` map lets users drop a pin to set the store's location. Leaflet returns coordinates as `[lat, lng]`, but GeoJSON and Supabase expect `[lng, lat]`, so the values are reversed before being stored.

```javascript
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
    const errors = validateForm();
    if (Object.keys(errors).length > 0) { setFormErrors(errors); return; }
    try {
        setIsSubmitting(true);
        const reversedLocation = formData.location ? [formData.location[1], formData.location[0]] : null;
        const { data: insertedData, error: insertError } = await supabase.from("stores").insert([{
            name: formData.name, address: formData.address, phone: formData.phone,
            website: formData.website, description: formData.description,
            categories: formData.categories, location: reversedLocation,
            owner_name: formData.ownerName, owner_email: formData.ownerEmail,
        }]).select("id");
        if (insertError) { console.error("Error inserting data:", insertError.message); return; }
        const newStoreId = insertedData[0].id;
        if (formData.image) {
            await supabase.storage.from("stores").upload(`${newStoreId}.jpg`, formData.image, { upsert: true });
            const imageUrl = `https://dgdwbozchllukjyhkuoc.supabase.co/storage/v1/object/public/stores/${newStoreId}.jpg`;
            await supabase.from("stores").update({ image: imageUrl }).eq("id", newStoreId);
        }
        setIsSubmitted(true);
    } catch (error) {
        console.error("Unexpected error:", error);
    } finally {
        setIsSubmitting(false);
    }
};

// Handle location selection
const handleLocationSelect = (location) => {setFormData((prev) => ({...prev,location,}))
    // Clear error for location
    if (formErrors.location) {
        setFormErrors((prev) => ({...prev,location: null,}))
    }
}
```

#### Feature 3: Administrative Dashboard

The admin dashboard is a tabbed interface where administrators can review store submissions grouped by status: Pending, Approved, and Rejected. Each store card shows the store name, address, phone, categories, submission date, and image. Admins can approve or reject any submission directly from the detail panel. Both actions call `updateStoreStatus` from the admin auth library and then remove the processed store from the local list, so the UI updates immediately without a full page reload.

```javascript
// Approve store
const handleApprove = async (storeId) => {
    if (processingId) return
    setProcessingId(storeId)
    try {
        await updateStoreStatus(storeId, "approved")
        setStores(stores.filter((store) => store.id !== storeId))
        if (selectedStore && selectedStore.id === storeId) setSelectedStore(null)
    } catch (error) {
        alert("Failed to approve store. Please try again.")
    } finally {
        setProcessingId(null)
    }
}

//Reject store
const handleReject = async (storeId) => {
    if (processingId) return
    setProcessingId(storeId)
    try {
        await updateStoreStatus(storeId, "rejected")
        setStores(stores.filter((store) => store.id !== storeId))
        if (selectedStore && selectedStore.id === storeId) setSelectedStore(null)
    } catch (error) {
        alert("Failed to reject store. Please try again.")
    } finally {
        setProcessingId(null)
    }
}
```


### Component Architecture

The project is organized so that each page in the `/pages` directory is a thin wrapper that simply imports and renders a component from `/src/components`. All actual logic, state, and UI lives within the component files. This separation keeps the routing layer clean and makes each feature independently testable. Shared components (`Header`, `Footer`) are imported across multiple pages to maintain visual consistency throughout the application.

The main components and their responsibilities are as follows:

- **`StoreFinderApp`** — the store locator page; manages fetch, filter state, and map/sidebar interaction
- **`AddStorePage`** — the submission form; handles validation, image upload, and the three-step Supabase flow
- **`AdminDashboardPage`** — the pending review interface; manages approve/reject actions and store list state
- **`MapComponent`** — a Leaflet map wrapper loaded dynamically with SSR disabled; renders markers and handles click events
- **`LocationPicker`** — a secondary map embedded in the Add Store form; captures click coordinates for the location field

Reusable primitive UI elements — `Button`, `Input`, `Card`, `Badge`, `Checkbox`, `Label`, `Separator` — are defined in `src/components/ui/custom-components.js`. These components accept props for variants and sizes, and apply corresponding Tailwind classes internally. This creates a lightweight in-house component system that keeps the UI consistent without introducing a full external design library.

The global design tokens (colors, spacing, typography) are defined as CSS custom properties in `src/app/globals.css`:

```css
:root {
  --primary: #FFA09B;
  --primary-hover: #ff8a84;
  --foreground: #1a1a2e;
  --background: #ffffff;
  --border: #e5e7eb;
  --muted-foreground: #6b7280;
  --accent: #FFF5EB;
  --secondary: #f3f4f6;
}
```

This approach allows colors to be updated globally by changing a single value, and also enables dark mode support through theme overrides.


### Deployment

The application is deployed on **Vercel**, which integrates directly with the project's GitHub repository. Every push to the main branch triggers an automatic build and deployment, so the live version is always up to date with the latest code. Vercel handles the Next.js build process, static asset optimization, and CDN distribution without any additional configuration.

Environment variables are managed through the Vercel project settings and are injected at build time. The two critical variables are the Supabase project URL and the anonymous public key, which are used to initialize the Supabase client in the frontend:

```javascript
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)
```

The `NEXT_PUBLIC_` prefix makes these variables available in the browser. The service role key, which bypasses RLS and is only used for admin operations, is kept as a server-side variable without the `NEXT_PUBLIC_` prefix to prevent it from being exposed to the client. The project's `next.config.js` does not require any special configuration for the deployment to work, as Vercel detects the Next.js framework automatically.

---

## Conclusion

The Fast Fashion Store Locator demonstrates how Next.js, Supabase, and Leaflet can be combined into a practical, full-stack GIS application. It covers the full workflow from public store discovery and community-driven submission to administrative approval, reflecting the VGI paradigm where geographic data is contributed by the community rather than a centralized authority.

The application currently has some notable limitations. It lacks a proper authentication system, leaving the admin dashboard accessible to anyone who knows the URL, and client-side-only filtering may become a performance bottleneck as the store database grows. Future development should prioritize adding Supabase Auth to secure the admin panel, moving filtering to server-side PostGIS queries for better scalability, and adding features such as email notifications, store ratings, and eventually a React Native mobile app to extend the platform's reach.




---

## References

Barnes, L., & Lea-Greenwood, G. (2006). Fast fashioning the supply chain: Shaping the research agenda. *Journal of Fashion Marketing and Management, 10*(3), 259–271. https://doi.org/10.1108/13612020610679259

Goodchild, M. F. (2007). Citizens as sensors: The world of volunteered geography. *GeoJournal, 69*(4), 211–221. https://doi.org/10.1007/s10708-007-9111-y

Haklay, M., & Weber, P. (2008). OpenStreetMap: User-generated street maps. *IEEE Pervasive Computing, 7*(4), 12–18. https://doi.org/10.1109/MPRV.2008.80

Sui, D., & Goodchild, M. (2011). The convergence of GIS and social media: Challenges for GIScience. *International Journal of Geographical Information Science, 25*(11), 1737–1748. https://doi.org/10.1080/13658816.2011.612882
