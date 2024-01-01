<template>
  <main class="h-screen flex flex-col">
    <RoomContent />
    <RoomFooter />
  </main>
</template>

<script lang="ts" setup>
import RoomContent from '@/components/Room/Content.vue'
import RoomFooter from '@/components/Room/Footer.vue'
</script>