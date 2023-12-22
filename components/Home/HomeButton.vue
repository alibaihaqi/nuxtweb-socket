<script lang="ts" setup>
defineProps<{
  title: string
  btnType?: string
}>()
</script>

<template>
  <button
    :class="`
      py-2 rounded font-bold
      ${ btnType ? `btn-${btnType}` : 'btn-primary' }
    `"
  >
    {{ title }}
  </button>
</template>

<style scoped>
.btn-primary {
  @apply bg-blue-500 text-white;
}

.btn-secondary {
  @apply bg-white text-gray-600 border border-gray-600;
}
</style>