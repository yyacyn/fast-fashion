import AddStorePage from "../src/components/add-store-page";
import Head from "next/head";

export default function AddStore() {
    return (
        <>
            <Head>
                <title>Add Stores</title>
                <meta
                    name="description"
                    content="Add new stores to the Bogor Clothing Store Finder"
                />
            </Head>
            <AddStorePage />
        </>
    );
}