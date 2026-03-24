# Fast Fashion Store Locator

Fast Fashion is a full-stack web application designed as a Geographic Information System (GIS) to map Bogor’s retail landscape. Leveraging a Volunteered Geographic Information (VGI) model, it bridges public discovery via an interactive map with community-driven data submission. This integrated system ensures a dynamic, up-to-date directory of fashion stores through a scalable architecture that connects the community with administrative review.

## Tech Stack
- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Mapping**: Leaflet, React-Leaflet
- **Backend (BaaS)**: Supabase (PostgreSQL, Storage, Row Level Security)
- **Deployment**: Vercel

## Key Features
- **Interactive Store Locator**: A split-panel interface with real-time client-side filtering by category (Thrift, Streetwear, etc.) and GeoJSON-powered map markers.
- **Store Submission System (VGI)**: A community-driven form with an embedded `LocationPicker` that allows users to drop a pin and upload store photos directly to cloud storage.
- **Administrative Dashboard**: A tabbed management interface allowing admins to process "Pending" submissions into "Approved" or "Rejected" states with instant UI updates.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

To run this project locally, you will need to add the following environment variables to your `.env.local` file:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Learn More

To learn more about the architecture and deep technical dives into the codebase, please review the `Technical Guidebook for Fast Fashion.md` included in this repository.
