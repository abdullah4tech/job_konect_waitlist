import { createClient } from '@supabase/supabase-js'

// Get environment variables from Nuxt config
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw createError({
    statusCode: 500,
    statusMessage: 'Missing Supabase environment variables'
  })
}

// Create and export the Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey)
