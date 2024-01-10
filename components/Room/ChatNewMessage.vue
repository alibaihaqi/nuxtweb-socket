<template>
  <section class="flex items-center gap-1 bg-gray-600 p-2 rounded">
    <input
      v-model="message"
      class="w-full px-2 py-1 border rounded-md text-gray-800 text-xs"
      placeholder="Type message here..."
      @keypress="onPressInputHandler"
    />

    <button
      class="p-2 hover:bg-gray-400 hover:cursor-pointer rounded-full"
      @click="onSendMessageHandler"
    >
      <nuxt-img
        alt="Send Message"
        class="w-4"
        src="/icons/send.svg"
      />
    </button>
  </section>
</template>

<script lang="ts" setup>
import { useChatMessage } from '@/composables/room-state'
import type { IChatMessage } from '@/interfaces/room/room'
import { useRoomStore } from '@/stores/room'
import { sendMessageUsingDataChannel } from '@/utils/rtc-handler'

const message = useChatMessage()
const roomStore = useRoomStore()

const onPressInputHandler = (event: KeyboardEvent) => {
  if (event.code !== 'Enter') return

  event.preventDefault()
  onSendMessageHandler()
}

const onSendMessageHandler = () => {
  if (message.value.length === 0) return

  const messageData: IChatMessage = {
    socketId: roomStore.socketId,
    name: roomStore.meetingName,
    content: message.value,
  }

  sendMessageUsingDataChannel(messageData)
  message.value = ''
}
</script>
