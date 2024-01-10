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
    isConnectOnlyAudio: meetingStore.isConnectOnlyAudio,
    meetingId: meetingStore.roomId,
    meetingName: meetingStore.meetingName,
    isHostMeeting: meetingStore.isHostMeeting,
  }, meetingStore.socketId)

  meetingStore.setIsInitiateRoom(false)
  meetingStore.setMicrophone()
  if (!meetingStore.isConnectOnlyAudio) meetingStore.setVideo()
}
</script>