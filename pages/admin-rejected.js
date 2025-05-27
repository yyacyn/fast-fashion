import AdminRejectedStoresPage from "../src/components/admin-rejected";
import Head from "next/head";

export default function AdminRejected() {
    return (
        <>
            <Head>
                <title>Rejected Stores</title>
                <meta
                    name="description"
                    content="Admin dashboard for Bogor Clothing Store Finder - Rejected Stores"
                />
            </Head>
            <AdminRejectedStoresPage />
        </>
    );
}