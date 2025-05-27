import AdminApprovedStoresPage from "../src/components/admin-approved";
import Head from "next/head";

export default function AdminApproved() {
    return (
        <>
            <Head>
                <title>Approve Stores</title>
                <meta
                    name="description"
                    content="Admin dashboard for Bogor Clothing Store Finder"
                />
            </Head>
            <AdminApprovedStoresPage />
        </>
    );
}