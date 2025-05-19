import { createClient } from '@supabase/supabase-js'

// Get environment variables from Nuxt config
const supabaseUrl = useRuntimeConfig().public.supabaseUrl;
const supabaseKey = useRuntimeConfig().public.supabaseKey;

if (!supabaseUrl || !supabaseKey) {
  throw createError({
    statusCode: 500,
    statusMessage: 'Missing Supabase environment variables'
  })
}

// Create and export the Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey)
