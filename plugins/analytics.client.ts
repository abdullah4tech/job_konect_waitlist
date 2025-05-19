import { defineNuxtPlugin } from '#app'

declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
  }
}

export default defineNuxtPlugin(() => {
  const script = document.createElement('script')
  script.async = true
  script.src = 'https://www.googletagmanager.com/gtag/js?id=G-Z06MQ6EJVV'
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag(...args: any[]) {
    window.dataLayer.push(args)
  }
  window.gtag('js', new Date())
  window.gtag('config', 'G-Z06MQ6EJVV')
})

export const head = {
  script: [
    {
      src: 'https://www.googletagmanager.com/gtag/js?id=G-Z06MQ6EJVV',
      async: true
    }
  ]
}
