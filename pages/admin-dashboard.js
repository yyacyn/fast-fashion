import AdminDashboardPage from "../src/components/admin-dashboard"
import Head from "next/head";

export const metadata = {
    title: "Admin Dashboard - Bogor Clothing Store Finder",
    description: "Admin dashboard for Bogor Clothing Store Finder",
}

export default function AdminDashboard() {
    return (
        <>
            <Head>
                <title>Admin Dashboard - Bogor Clothing Store Finder</title>
                <meta
                    name="description"
                    content="Admin dashboard for Bogor Clothing Store Finder"
                />
            </Head>
            <AdminDashboardPage />
        </>
    );
}