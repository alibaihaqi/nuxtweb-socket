import flagsmith from 'flagsmith'

export default defineNuxtPlugin(async () => {
  const config = useRuntimeConfig()

  await flagsmith.init({
    environmentID: config.public.flagsmithConfig as string,
    enableAnalytics: JSON.parse(config.public.flagsmithEnableAnalytics as string),
  })

  return {
    provide: {
      flagsmith: flagsmith
    }
  }
})
