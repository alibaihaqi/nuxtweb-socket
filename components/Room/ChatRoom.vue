<template>
  <div class="hidden sm:inline-flex sm:w-52 md:w-80 flex flex-col flex-1 bg-gray-700 border-t border-white">
    <InfoHeader
      title="Chats"
      :btn-action="roomStore.setIsShowChatRoom"
    />

    <ChatMessages
      :messages="roomStore.messages"
      :author-socket-id="roomStore.socketId"
    />

    <section class="bg-gray-600 p-2 rounded">
      <textarea
        class="w-full px-2 py-1 border rounded-md text-gray-800"

      />
    </section>
  </div>
</template>

<script lang="ts" setup>
import InfoHeader from '@/components/Room/InfoHeader.vue'
import ChatMessages from '@/components/Room/ChatMessages.vue'
import { useRoomStore } from '@/stores/room'

const roomStore = useRoomStore()
</script>
