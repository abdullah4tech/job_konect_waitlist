<script setup lang="ts">
import { ref } from 'vue'
import { useHead } from '@vueuse/head'

const email = ref('')
const isSubmitting = ref(false)
const isSuccess = ref(false)
const isError = ref(false)
const errorMessage = ref('')

// Add SEO meta tags
useHead({
  title: 'Join Job-Konect Waitlist - Get Early Access to Intelligent Hiring Platform',
  meta: [
    { name: 'description', content: 'Join the waitlist for Job-Konect, the intelligent hiring platform that matches top talent with top employers. Get early access to our innovative job matching technology.' },
    { name: 'keywords', content: 'job waitlist, hiring platform preview, career opportunities, job matching technology, early access program' },
    { property: 'og:title', content: 'Join Job-Konect Waitlist - Get Early Access' },
    { property: 'og:description', content: 'Join the waitlist for Job-Konect, the intelligent hiring platform that matches top talent with top employers. Get early access to our innovative job matching technology.' },
    { property: 'og:image', content: '/business_abstract_illuestration.png' },
    { name: 'twitter:title', content: 'Join Job-Konect Waitlist - Get Early Access' },
    { name: 'twitter:description', content: 'Join the waitlist for Job-Konect, the intelligent hiring platform that matches top talent with top employers. Get early access to our innovative job matching technology.' },
    { name: 'twitter:image', content: '/business_abstract_illuestration.png' }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Waitlist',
        name: 'Job-Konect Early Access Program',
        description: 'Join the waitlist for Job-Konect, the intelligent hiring platform that matches top talent with top employers.',
        url: 'https://job-konect.com',
        startDate: '2025-05-29',
        endDate: '2025-06-29',
        availability: 'https://schema.org/InStock'
      })
    }
  ]
})

const handleSubmit = async (e: Event) => {
  e.preventDefault()
  isSuccess.value = false
  isError.value = false
  errorMessage.value = ''

  if (!email.value.trim()) {
    isError.value = true
    errorMessage.value = 'Email is required.'
    return
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.value)) {
    isError.value = true
    errorMessage.value = 'Please enter a valid email.'
    return
  }

  isSubmitting.value = true

  try {
    const response = await $fetch('/api/waitlist', {
      method: 'POST',
      body: { email: email.value }
    })

    if (response.success) {
      isSuccess.value = true
      email.value = ''
    } else {
      throw new Error(response.message)
    }
  } catch (error: any) {
    isError.value = true
    errorMessage.value = error.message || 'Something went wrong.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex flex-col md:flex-row bg-white">
    <!-- Left Panel -->
    <div class="bg-[#f8fafc] h-screen md:w-1/2 w-full flex flex-col justify-center items-center px-6 py-12 md:py-24 text-center md:text-left relative">
      
      <div class="absolute top-6 left-6 md:top-8 md:left-8">
        <img src="/job-konect.png" alt="Job-Konect Logo" class="w-36 md:w-40" />
      </div>

      <!-- Badge -->
      <div class="bg-[#e0ecff] text-[#003c88] text-xs font-semibold px-3 py-1 rounded-full mb-6 md:mb-4 uppercase tracking-wider mt-20 md:mt-20">
        🚀 Launching May 29th, 2025
      </div>

      <div>
        <!-- Heading -->
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
          Smarter Connections, <br class="hidden sm:inline" /> Better Careers
        </h1>
  
        <!-- Description -->
        <p class="text-base text-gray-600 max-w-md mb-6">
          Discover intelligent hiring and seamless job matching. Job-Konect links top talent with top employers—fast and efficiently.
        </p>
        <!-- Form -->
        <form class="w-full max-w-md space-y-4" @submit="handleSubmit">
          <input
            v-model="email"
            type="email"
            required
            placeholder="Enter your email"
            class="w-full px-5 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-[#3e8eff] transition duration-200 outline-none text-sm"
            :disabled="isSubmitting"
          />
  
          <button
            type="submit"
            class="flex items-center justify-center w-full py-3 bg-[#006aff] border-[5px] border-[#c0dfff] text-white gap-1 rounded-full cursor-pointer transition-all hover:border-[#b1d8ff] hover:bg-[#1b7aff] active:scale-[0.98] group relative overflow-visible"
            :disabled="isSubmitting || !email"
            :class="{
              'active:border-[#b1d8ff]': !isSubmitting,
              'opacity-50 cursor-not-allowed': isSubmitting || !email
            }">
            <span v-if="!isSubmitting" class="text-[1em] font-semibold tracking-wide">Join the Waitlist</span>
            <span v-else class="text-[1em] font-semibold tracking-wide">Submitting...</span>
            <span class="h-full w-fit">
              <svg
                v-if="!isSubmitting"
                xmlns="http://www.w3.org/2000/svg"
                class="w-8 h-5 transform origin-left group-hover:animate-jello"
                viewBox="0 0 38 15"
                fill="none"
              >
                <path
                  fill="white"
                  d="M10 7.519l-.939-.344h0l.939.344zm14.386-1.205l-.981-.192.981.192zm1.276 5.509l.537.843.148-.094.107-.139-.792-.611zm4.819-4.304l-.385-.923h0l.385.923zm7.227.707a1 1 0 0 0 0-1.414L31.343.448a1 1 0 0 0-1.414 0 1 1 0 0 0 0 1.414l5.657 5.657-5.657 5.657a1 1 0 0 0 1.414 1.414l6.364-6.364zM1 7.519l.554.833.029-.019.094-.061.361-.23 1.277-.77c1.054-.609 2.397-1.32 3.629-1.787.617-.234 1.17-.392 1.623-.455.477-.066.707-.008.788.034.025.013.031.021.039.034a.56.56 0 0 1 .058.235c.029.327-.047.906-.39 1.842l1.878.689c.383-1.044.571-1.949.505-2.705-.072-.815-.45-1.493-1.16-1.865-.627-.329-1.358-.332-1.993-.244-.659.092-1.367.305-2.056.566-1.381.523-2.833 1.297-3.921 1.925l-1.341.808-.385.245-.104.068-.028.018c-.011.007-.011.007.543.84zm8.061-.344c-.198.54-.328 1.038-.36 1.484-.032.441.024.94.325 1.364.319.45.786.64 1.21.697.403.054.824-.001 1.21-.09.775-.179 1.694-.566 2.633-1.014l3.023-1.554c2.115-1.122 4.107-2.168 5.476-2.524.329-.086.573-.117.742-.115s.195.038.161.014c-.15-.105.085-.139-.076.685l1.963.384c.192-.98.152-2.083-.74-2.707-.405-.283-.868-.37-1.28-.376s-.849.069-1.274.179c-1.65.43-3.888 1.621-5.909 2.693l-2.948 1.517c-.92.439-1.673.743-2.221.87-.276.064-.429.065-.492.057-.043-.006.066.003.155.127.07.099.024.131.038-.063.014-.187.078-.49.243-.94l-1.878-.689zm14.343-1.053c-.361 1.844-.474 3.185-.413 4.161.059.95.294 1.72.811 2.215.567.544 1.242.546 1.664.459a2.34 2.34 0 0 0 .502-.167l.15-.076.049-.028.018-.011c.013-.008.013-.008-.524-.852l-.536-.844.019-.012c-.038.018-.064.027-.084.032-.037.008.053-.013.125.056.021.02-.151-.135-.198-.895-.046-.734.034-1.887.38-3.652l-1.963-.384zm2.257 5.701l.791.611.024-.031.08-.101.311-.377 1.093-1.213c.922-.954 2.005-1.894 2.904-2.27l-.771-1.846c-1.31.547-2.637 1.758-3.572 2.725l-1.184 1.314-.341.414-.093.117-.025.032c-.01.013-.01.013.781.624zm5.204-3.381c.989-.413 1.791-.42 2.697-.307.871.108 2.083.385 3.437.385v-2c-1.197 0-2.041-.226-3.19-.369-1.114-.139-2.297-.146-3.715.447l.771 1.846z"
                />
              </svg>
            </span>
          </button>
        </form>
      </div>


      <!-- Feedback -->
      <div v-if="isSuccess" class="mt-4 px-4 py-3 bg-green-100 text-green-700 text-sm rounded-lg">
        🎉 You’re on the list! We’ll keep you posted.
      </div>
      <div v-if="isError" class="mt-4 px-4 py-3 bg-red-100 text-red-700 text-sm rounded-lg">
        ⚠️ {{ errorMessage }}
      </div>

      <!-- Footer -->
      <footer class="text-xs text-gray-400 mt-5">
        &copy; 2025 Job-Konect. Crafted by <a href="#" class="underline hover:text-black">DropX Ltd</a>.
      </footer>
    </div>

    <!-- Right Panel -->
    <div class="md:w-1/2 hidden md:flex justify-center items-center p-10">
      <img src="/business_abstract_illuestration.png" alt="Business Illustration" class="w-4/5 max-w-full" />
    </div>
  </div>
</template>
