export default defineNuxtRouteMiddleware((to) => {
  const config = useRuntimeConfig()
  const gaId = config.public.gaId

  if (process.env.NODE_ENV === 'production' && gaId) {
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
    document.head.appendChild(script)

    window.dataLayer = window.dataLayer || []
    function gtag() { dataLayer.push(arguments) }
    gtag('js', new Date())
    gtag('config', gaId)

    // Track page view
    gtag('event', 'page_view', {
      page_path: to.fullPath,
      page_title: document.title
    })

    // Track waitlist submissions
    const waitlistForm = document.querySelector('form')
    if (waitlistForm) {
      waitlistForm.addEventListener('submit', (e) => {
        const email = (e.target as HTMLFormElement).elements.namedItem('email') as HTMLInputElement
        if (email && email.value) {
          gtag('event', 'waitlist_submission', {
            event_category: 'Waitlist',
            event_label: 'Email Submission',
            value: 1
          })
        }
      })
    }
  }
})

// Add to nuxt.config.ts
// Add this to your middleware array:
// middleware: ['google-analytics']
