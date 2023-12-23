<script lang="ts" setup>
defineProps<{
  title: string
  btnType?: string
}>()
</script>

<template>
  <NuxtLink
    to="/room/join"
    :class="`
      py-2 rounded-md font-bold text-center
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