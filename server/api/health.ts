import { supabase } from '~/server/supabase.config'

export default defineEventHandler(async (event) => {
  try {
    // Test database connection
    const { data, error } = await supabase
      .from('waitlist')
      .select('id')
      .limit(1)

    if (error) {
      console.error('Health check database error:', error)
      return {
        status: 'error',
        message: 'Database connection failed',
        error: error.message
      }
    }

    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      database: data ? 'connected' : 'no data'
    }
  } catch (error) {
    console.error('Health check error:', error)
    return {
      status: 'error',
      message: 'Health check failed',
      error: error.message
    }
  }
})
