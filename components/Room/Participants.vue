<template>
  <div class="hidden sm:inline-flex sm:w-52 md:w-80 flex flex-col flex-1 bg-gray-700">
    <InfoHeader
      :title="`Participants (${roomStore.meetingUsers.length })`"
      :btn-action="roomStore.setIsShowParticipants"
    />

    <section class="flex-1 border-2 border-blue-800 p-2">
      <div
        v-for="participant in roomStore.meetingUsers"
        :key="participant.userId"
        class="px-2 py-2 border-b border-white hover:bg-gray-600"
      >
        <p class="text-sm">
          {{ participant?.name }}
        </p>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import InfoHeader from '@/components/Room/InfoHeader.vue'
import { useRoomStore } from '@/stores/room'

const roomStore = useRoomStore()
</script>
