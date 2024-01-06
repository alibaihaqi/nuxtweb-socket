<template>
  <div class="hidden sm:inline-flex sm:w-52 md:w-80 flex flex-col flex-1 bg-gray-700 border-t border-white">
    <section class="flex items-center py-2 px-4">
      <p class="flex-1 text-gray-100 text-sm text-center">
        Chats
      </p>

      <button
        class="py-1 px-4 bg-red-600 text-xs rounded-md"
        @click="roomStore.setIsShowChatRoom"
      >
        Close
      </button>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { useRoomStore } from '@/stores/room'

const roomStore = useRoomStore()
</script>
