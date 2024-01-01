<template>
  <main class="h-screen flex flex-col">
    <RoomContent />
    <RoomFooter />
  </main>
</template>

<script lang="ts" setup>
import RoomContent from '@/components/Room/Content.vue'
import RoomFooter from '@/components/Room/Footer.vue'
import { useRoomStore } from '@/stores/room';

const meetingStore = useRoomStore()

onMounted(() => {
  initiateRoom()
})

const initiateRoom = async () => {
  meetingStore.setIsInitiateRoom(true)

  await getLocalPreviewAndRoomConnection({
    audioToConnect: meetingStore.isMicrophoneActive,
    meetingId: meetingStore.roomId,
    meetingName: meetingStore.meetingName,
    isHostMeeting: meetingStore.isHostMeeting,
  })

  meetingStore.setIsInitiateRoom(false)
}
</script>