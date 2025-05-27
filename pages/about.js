import AboutPage from "../src/components/credits-page";
import Head from "next/head";

export default function About() {
    return (
        <>
            <Head>
                <title>About</title>
                <meta
                    name="description"
                    content="About this project"
                />
            </Head>
            <AboutPage />
        </>
    );
}