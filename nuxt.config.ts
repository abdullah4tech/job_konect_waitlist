import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/fonts'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
    build: {
      rollupOptions: {
        external: ['@supabase/supabase-js'],
        output: {
          globals: {
            '@supabase/supabase-js': 'supabase'
          }
        }
      }
    }
  },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'Job-Konect - Smarter Connections, Better Careers',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Discover intelligent hiring and seamless job matching. Job-Konect links top talent with top employers—fast and efficiently.' },
        { name: 'keywords', content: 'job matching, hiring platform, career opportunities, job search, talent acquisition, employment opportunities' },
        { name: 'author', content: 'DropX Ltd' },
        { name: 'robots', content: 'index, follow' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'canonical', href: 'https://job-konect.com' }
      ]
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  runtimeConfig: {
    public: {
      gaId: process.env.NUXT_PUBLIC_GA_ID || ''
    }
  }
})