import AdminLogin from "../src/components/admin-login";
import Head from "next/head";

export default function LoginAdmin() {
    return (
        <>
            <Head>
                <title>Login Admin</title>
                <meta
                    name="description"
                    content="Login page for the admin dashboard of Bogor Clothing Store Finder"
                />
            </Head>
            <AdminLogin />
        </>
    );
}