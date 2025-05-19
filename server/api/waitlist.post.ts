import { supabase } from '~/server/supabase.config'
import type { WaitlistResponse } from '~/server/types/waitlist'
import { handleWaitlistError } from '~/server/types/waitlist'

export default defineEventHandler(async (event): Promise<WaitlistResponse> => {
  try {
    console.log('Received request body:', await readBody(event))
    
    const body = await readBody(event)
    const { email } = body

    if (!email) {
      console.log('No email provided in request')
      throw handleWaitlistError({
        message: 'No email provided',
        statusCode: 400
      })
    }

    // Validate email
    if (!email.includes('@')) {
      console.log('Invalid email format:', email)
      throw handleWaitlistError({
        message: 'Invalid email format',
        statusCode: 400
      })
    }

    console.log('Checking if email exists:', email)
    
    // Check if email already exists
    const { data: existingUsers, error: fetchError } = await supabase
      .from('waitlist')
      .select('id')
      .eq('email', email)

    if (fetchError) {
      console.error('Database error:', fetchError)
      // Handle table not existing error
      if (fetchError.message.includes('relation "waitlist" does not exist')) {
        throw handleWaitlistError({
          message: 'Database table not found. Please create the waitlist table in Supabase.',
          statusCode: 500
        })
      }
      throw handleWaitlistError(fetchError)
    }

    if (existingUsers && existingUsers.length > 0) {
      console.log('Email already exists:', email)
      throw handleWaitlistError({
        message: 'Email already registered',
        statusCode: 400
      })
    }

    console.log('Inserting email into waitlist:', email)
    // Insert new waitlist entry
    const { error: insertError, data: insertedData } = await supabase
      .from('waitlist')
      .insert({
        email,
        created_at: new Date().toISOString()
      })
      .select()

    if (insertError) {
      console.error('Insert error:', insertError)
      throw handleWaitlistError(insertError)
    }

    console.log('Successfully added to waitlist:', insertedData)
    return {
      success: true,
      message: 'Successfully added to waitlist'
    }
  } catch (error) {
    console.error('API Error:', error)
    throw handleWaitlistError(error)
  }
})
