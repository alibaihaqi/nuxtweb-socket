<template>
  <div class="flex flex-1 bg-gray-800 text-white">
    <section class="flex flex-col flex-1">
      <div class="self-center py-1 px-8 mt-1 bg-gray-700 rounded-md">
        <p class="text-sm">Room ID: <span class="hover:text-blue-400 hover:cursor-pointer" @click="onClickCopyRoomId">{{ roomStore.roomId }}</span></p>
      </div>

      <section id="videos_container" class="flex-1" />
    </section>

    <section class="flex flex-col">
      <Participants v-if="roomStore.isShowParticipants" />
      <ChatRoom v-if="roomStore.isShowChatRoom" />
    </section>
  </div>
</template>

<script lang="ts" setup>
import ChatRoom from '@/components/Room/ChatRoom.vue'
import Participants from '@/components/Room/Participants.vue'

import { useRoomStore } from '@/stores/room';

const roomStore = useRoomStore()

const onClickCopyRoomId = async () => {
  await navigator.clipboard.writeText(roomStore.roomId)
}
</script>

<style scoped>
.videos_container_styles {
  @apply flex flex-wrap w-[95%] mx-auto py-2 gap-2 justify-center;
}

.video_container_style {
  @apply flex-1;
}

</style>