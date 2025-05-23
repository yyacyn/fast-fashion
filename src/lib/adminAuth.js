import { supabase } from "./supabaseClient"

// Check if user is authenticated
export async function isAuthenticated() {
    const {
        data: { session },
        error,
    } = await supabase.auth.getSession()
    return !!session
}

// Sign in with email and password
export async function signInWithEmail(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) throw error
    return data
}

// Sign out
export async function signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
}

// Get current user
export async function getCurrentUser() {
    const {
        data: { user },
        error,
    } = await supabase.auth.getUser()
    if (error) throw error
    return user
}

// Get store submissions with status
export async function getStoreSubmissions(status = "pending") {
    const { data, error } = await supabase
        .from("stores")
        .select("*")
        .eq("status", status)
        .order("created_at", { ascending: false })

    if (error) throw error
    return data
}

// Update store status
export async function updateStoreStatus(storeId, status) {
    const { data, error } = await supabase.from("stores").update({ status }).eq("id", storeId).select()

    if (error) throw error
    return data
}
