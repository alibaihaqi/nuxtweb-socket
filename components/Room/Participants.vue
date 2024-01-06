<template>
  <div class="hidden sm:inline-flex sm:w-52 md:w-80 flex flex-col flex-1 bg-gray-700">
    <section class="flex items-center py-2 px-4">
      <p class="flex-1 text-gray-100 text-sm text-center">
        Participants ({{ roomStore.meetingUsers.length }})
      </p>

      <button
        class="py-1 px-4 bg-red-600 text-xs rounded-md"
        @click="roomStore.setIsShowParticipants"
      >
        Close
      </button>
    </section>

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
import { useRoomStore } from '@/stores/room'

const roomStore = useRoomStore()
</script>
