<template>
  <div class="flex flex-1 bg-gray-800 text-white">
    <section class="flex flex-col flex-1">
      <div class="self-center py-1 px-4 sm:px-8 mt-2 bg-gray-700 rounded-md">
        <p class="text-sm">
          Room ID: <span class="hover:text-blue-400 hover:cursor-pointer" @click="onClickCopyRoomId">{{ roomStore.roomId }}</span>
        </p>
      </div>

      <section id="videos_container" />
    </section>

    <section class="flex flex-col">
      <Participants
        v-if="roomStore.isShowParticipants"
        :class="isOpenContentChatParticipants ? 'max-h-[50%]': 'max-h-full'"
      />
      <ChatRoom
        v-if="roomStore.isShowChatRoom"
        :class="isOpenContentChatParticipants ? 'max-h-[50%]': 'max-h-full'"
      />
    </section>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import ChatRoom from '@/components/Room/ChatRoom.vue'
import Participants from '@/components/Room/Participants.vue'

import { useRoomStore } from '@/stores/room';

const roomStore = useRoomStore()

const onClickCopyRoomId = async () => {
  await navigator.clipboard.writeText(roomStore.roomId)
}

const isOpenContentChatParticipants = computed(() => {
  return roomStore.isShowParticipants && roomStore.isShowChatRoom
})
</script>

<style>
.videos_container_styles {
  @apply flex flex-col sm:flex-row flex-wrap flex-1 w-[95%] mx-auto py-2 gap-2 justify-center;
}

.video_container_style {
  @apply flex flex-1;
}

</style>