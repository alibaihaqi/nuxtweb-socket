// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'WebRTC alibaihaqi',
    },
  },

  devtools: {
    enabled: true,
  },
  
  image: {
    domains: [
      'avatars0.githubusercontent.com'
    ],
  },
  modules: [
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
  ],

  plugins: [
    '~/plugins/flagsmith.client',
  ],

  runtimeConfig: {
    
    public: {
      apiDomain: '',
      flagsmithConfig: '',
      flagsmithEnableAnalytics: '',
      socketDomain: '',
    }
  },
})
