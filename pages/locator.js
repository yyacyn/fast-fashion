import LocatorPage from "../src/components/store-finder-app";
import Head from "next/head";

export default function Locator() {
    return (
        <>
            <Head>
                <title>Find Stores</title>
                <meta
                    name="description"
                    content="Find clothing stores in Bogor"
                />
            </Head>
            <LocatorPage />
        </>
    );
}