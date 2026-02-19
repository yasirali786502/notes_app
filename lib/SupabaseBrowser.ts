import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_SUPABASE_URL!
const AnonKey = process.env.NEXT_SUPABASE_ANON_KEY!

export const SupabaseBrowser = createClient(supabaseUrl, AnonKey);