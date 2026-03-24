# Fast Fashion Store Locator
## A Technical Guidebook

---

## Abstract

This guidebook provides a technical reference for developers working with the Fast Fashion Store Locator, a web-based application designed to help users discover fashion stores in Bogor, Indonesia. The guide covers the system's architecture, core features, and technical implementation, including the interactive map interface, store submission workflow, and administrative management system. Built with Next.js, Supabase, and Leaflet, the application demonstrates a practical integration of modern web technologies and geographic information systems. This documentation aims to help developers understand, maintain, and extend the application effectively.

---

## Introduction

### Definition

The Fast Fashion Store Locator is a full-stack web application that functions as a geographic information system (GIS) for locating fashion retail stores. It provides an interactive map interface where users can search, filter, and discover stores based on their location and preferences. The system also includes a store submission portal for business owners and an administrative dashboard for managing submissions.

The application is built using the following core technologies:

| Technology | Role |
|------------|------|
| **Next.js 15** | Frontend framework and server-side rendering |
| **React 19** | UI component library |
| **Supabase** | Backend database and file storage |
| **Leaflet** | Interactive map rendering |
| **Tailwind CSS** | Styling and responsive design |

### Background

*(to be filled)*

### Development

The application was developed following a component-based architecture using Next.js, with pages structured under the `/pages` directory and UI logic encapsulated in reusable components under `/src/components`. The backend is powered entirely by Supabase, which handles database operations, file storage for store images, and row-level security policies.

The development process involved three main phases:

1. **Setup & Configuration** — Initializing the Next.js project, connecting to Supabase, and defining the database schema for the `stores` table with fields for name, address, location coordinates, categories, images, and approval status.

2. **Feature Development** — Building the core features: the interactive map with Leaflet, the store search and filter system, the store submission form with image upload, and the admin dashboard with approval/rejection workflow.

3. **Integration & Deployment** — Integrating all components into a cohesive user experience, handling server-side rendering limitations for map components using dynamic imports, and deploying the application to a production environment via Vercel.

---

## Discussion

### System Architecture

The application follows a client-server model where the Next.js frontend communicates directly with the Supabase backend using the Supabase JavaScript client. There is no custom API layer — all database queries and storage operations are performed through Supabase's SDK.

```
User → Next.js Frontend → Supabase (Database + Storage)
```

The routing is handled by Next.js's file-based routing system:

- `/` — Landing page
- `/locator` — Interactive store map
- `/add-store` — Store submission form
- `/admin-dashboard` — Admin management panel

### Core Features

#### 1. Interactive Store Map
The store locator uses **Leaflet** via `react-leaflet` to render an interactive map centered on Bogor. Approved stores are fetched from Supabase and displayed as clickable markers. When a marker is clicked, a detail card appears showing the store's name, address, phone number, categories, and image (if available).

To avoid server-side rendering issues, the map component is loaded dynamically:
```javascript
const MapComponent = dynamic(() => import("./map-component"), { ssr: false })
```

#### 2. Search and Filter System
Users can filter stores in real time using two mechanisms:
- **Text search** — matches store name or address
- **Category checkboxes** — filters by clothing categories (Men's, Women's, Children's, Accessories, etc.)

Filtering is handled client-side using a `useEffect` hook that listens for changes in the search query and selected categories, then updates the list of visible markers on the map accordingly.

#### 3. Store Submission Form
Store owners can submit their business through a multi-section form that collects:
- Store name, address, phone, website, and description
- Store categories (multi-select)
- Geographic location via an interactive map picker
- A store image (uploaded to Supabase Storage)
- Owner name and email

All submissions are saved to the database with a default status of `pending`, making them invisible to public users until approved by an admin.

#### 4. Admin Dashboard
The admin dashboard provides a tabbed interface for managing store submissions across three status categories: **Pending**, **Approved**, and **Rejected**. Admins can:
- Approve a store (status → `approved`, appears on the public map)
- Reject a store (status → `rejected`, removed from public view)
- Delete a store entry entirely

Status updates are performed using Supabase's `.update()` method targeting a specific store by its UUID.

### Database Schema

The `stores` table in Supabase is the core data structure of the application:

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key, auto-generated |
| `name` | TEXT | Store name |
| `address` | TEXT | Physical address |
| `phone` | TEXT | Contact number |
| `website` | TEXT | Optional website URL |
| `description` | TEXT | Store description |
| `categories` | TEXT[] | Array of category IDs |
| `location` | POINT | Geographic coordinates |
| `owner_name` | TEXT | Submitter's name |
| `owner_email` | TEXT | Submitter's email |
| `image` | TEXT | URL to store image |
| `status` | TEXT | `pending`, `approved`, or `rejected` |
| `created_at` | TIMESTAMP | Submission date |

---

## Conclusion

### Summary

The Fast Fashion Store Locator successfully demonstrates how modern web technologies can be combined to build a practical, full-stack geographic information system. By integrating Next.js for the frontend, Supabase for backend data management and storage, and Leaflet for interactive mapping, the application delivers a complete end-to-end workflow — from public store discovery to community-driven submission and administrative approval. The project's component-based architecture and clean separation of concerns make it a solid foundation for a real-world web application that is both functional and maintainable.

### Limitations

Despite its core functionality, the application has several notable limitations in its current state. There is no user authentication system, meaning any visitor can submit a store or access the admin dashboard if they know the URL. The filtering system operates entirely on the client side, which may become inefficient as the number of store listings grows significantly. Additionally, the coordinate system handling requires manual reversal between Leaflet's `[lat, lng]` format and GeoJSON's `[lng, lat]` format, which is a potential source of bugs. The application also lacks real-time updates, so changes made in the admin dashboard are only reflected after a manual page refresh.

### Recommendations

To improve and scale the application, several enhancements are recommended. Implementing proper authentication — such as Supabase Auth — would secure the admin dashboard and allow store owners to manage their own submissions. Moving the filtering logic to server-side Supabase queries would improve performance as data grows. Adding a store review and rating system would increase the platform's value to end users. Further improvements could include email notifications for submission status updates, a distance-based radius filter using geospatial queries, and eventually a mobile application built with React Native to bring GPS-based store discovery to smartphone users.

---

## References

*(to be filled)*
