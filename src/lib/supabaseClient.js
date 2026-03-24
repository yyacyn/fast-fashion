import { createClient } from "@supabase/supabase-js"

// Supabase configuration
const supabaseUrl = "https://cgflbhriqujrlsfdsvcw.supabase.co"
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnZmxiaHJpcXVqcmxzZmRzdmN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIxNjcwMzksImV4cCI6MjA4Nzc0MzAzOX0.nLr4RVPO-UthyJMbXc9w5SCvgO5skoj5WfkxrMfCYCw"

export const supabase = createClient(supabaseUrl, supabaseKey)