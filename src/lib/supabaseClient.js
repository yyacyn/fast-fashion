import { createClient } from "@supabase/supabase-js"

// Supabase configuration
const supabaseUrl = "https://dgdwbozchllukjyhkuoc.supabase.co"
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRnZHdib3pjaGxsdWtqeWhrdW9jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5ODkxMzMsImV4cCI6MjA2MzU2NTEzM30.nzc1uIoy1LRI64bZ99uYynSdNOyhcwjk1YyXLRWg-eE"

export const supabase = createClient(supabaseUrl, supabaseKey)