import { createError } from 'h3'
import { supabase } from '../supabase.config'

interface AnalyticsData {
  users: Array<{
    id: string
    email: string
    created_at: string
  }>
  stats: {
    totalSubscribers: number
    todaySubscribers: number
    thisWeekSubscribers: number
    thisMonthSubscribers: number
    emailDomains: Record<string, number>
    growthRate: number
  }
}

export default defineEventHandler(async () => {
  try {
    // Fetch all waitlist entries from Supabase
    const { data: users, error: fetchError } = await supabase
      .from('waitlist')
      .select('*')
      .order('created_at', { ascending: false })

    if (fetchError) {
      console.error('Error fetching waitlist data:', fetchError)
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch waitlist data'
      })
    }

    // Calculate statistics
    const stats = {
      totalSubscribers: users.length,
      todaySubscribers: users.filter(u => 
        new Date(u.created_at).toDateString() === new Date().toDateString()
      ).length,
      thisWeekSubscribers: users.filter(u => 
        new Date(u.created_at) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      ).length,
      thisMonthSubscribers: users.filter(u => 
        new Date(u.created_at) >= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      ).length,
      emailDomains: users.reduce((acc, user) => {
        const domain = user.email.split('@')[1]
        acc[domain] = (acc[domain] || 0) + 1
        return acc
      }, {}) as Record<string, number>,
      growthRate: users.length > 0 ? (users.length - 1) / users.length * 100 : 0
    }

    return {
      users,
      stats
    }
  } catch (error) {
    console.error('Error fetching analytics:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch analytics data'
    })
  }
})
