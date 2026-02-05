import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_SUPABASE_URL!
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export const SupabaseAdmin = createClient(supabaseUrl, serviceRoleKey);