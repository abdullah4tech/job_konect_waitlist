<script setup lang="ts">
import { ref } from 'vue'
import { useLazyFetch } from '#app'
import { createError } from 'h3'

interface AnalyticsData {
  users: Array<{
    id: number
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

const { data, pending, error } = useLazyFetch<AnalyticsData>('/api/analytics', {
  method: 'GET',
  initialCache: false,
  server: false
})

// Initialize with default values
const initialData = {
  users: [],
  stats: {
    totalSubscribers: 0,
    todaySubscribers: 0,
    thisWeekSubscribers: 0,
    thisMonthSubscribers: 0,
    emailDomains: {},
    growthRate: 0
  }
}

// Ensure we have valid data
const validData = computed(() => {
  if (!data.value) return initialData
  return data.value
})
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Waitlist Analytics Dashboard</h1>

    <div v-if="pending" class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
    </div>

    <div v-else-if="error" class="rounded-md bg-red-50 p-4 mb-8">
      <div class="flex">
        <div class="ml-3">
          <h3 class="text-sm font-medium text-red-800">Error</h3>
          <div class="mt-2 text-sm text-red-700">
            <p>{{ error }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="space-y-8">
      <!-- Statistics Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Total Subscribers</h3>
          <p class="text-3xl font-bold text-indigo-600">{{ validData.stats.totalSubscribers }}</p>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Today's Subscribers</h3>
          <p class="text-3xl font-bold text-indigo-600">{{ validData.stats.todaySubscribers }}</p>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-2">This Week's Growth</h3>
          <p class="text-3xl font-bold text-indigo-600">{{ validData.stats.thisWeekSubscribers }}</p>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-2">This Month's Subscribers</h3>
          <p class="text-3xl font-bold text-indigo-600">{{ validData.stats.thisMonthSubscribers }}</p>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Growth Rate</h3>
          <p class="text-3xl font-bold text-indigo-600">{{ validData.stats.growthRate.toFixed(1) }}%</p>
        </div>
      </div>

      <!-- Email Domain Distribution -->
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Email Domain Distribution</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="(count, domain) in validData.stats.emailDomains" :key="domain" class="bg-gray-100 rounded-lg p-4">
            <p class="text-indigo-600 font-semibold">{{ domain }}</p>
            <p class="text-gray-600">{{ count }} subscribers</p>
          </div>
        </div>
      </div>

      <!-- Users Table -->
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">Recent Subscribers</h3>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="user in validData.users" :key="user.id">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ user.email }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ new Date(user.created_at).toLocaleDateString() }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
