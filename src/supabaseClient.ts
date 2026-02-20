import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

/**
 * If Supabase env vars aren't set we still create a client
 * pointed at a placeholder URL so the app boots in "demo" mode
 * without crashing. API calls will silently fail.
 */
export const supabase: SupabaseClient = createClient(
    supabaseUrl || "https://placeholder.supabase.co",
    supabaseAnonKey || "placeholder-anon-key"
);
