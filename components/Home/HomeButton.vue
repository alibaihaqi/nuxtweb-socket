<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{
  title: string
  btnType?: string
  isHost?: boolean
  route?: string
}>()

const generateRoute = computed(() => {
  if (props.route === 'room') {
    return '/room'
  }

  const isHostMeeting = props.isHost ? '?host=true': ''
  return `/room/join${isHostMeeting}`
})
</script>

<template>
  <NuxtLink
    :to="generateRoute"
    :class="`
      py-2 rounded-md font-bold text-center hover:brightness-105
      hover:shadow-md
      ${ btnType ? `btn-${btnType}` : 'btn-primary' }
    `"
  >
    {{ title }}
  </NuxtLink>
</template>

<style scoped>
.btn-primary {
  @apply bg-blue-500 text-white;
}

.btn-secondary {
  @apply bg-white text-blue-500 border border-blue-500;
}
</style>