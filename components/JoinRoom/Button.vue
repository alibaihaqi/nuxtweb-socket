<template>
  <div class="flex justify-end">
    <div class="flex gap-4">
      <button
        :class="`
          px-4 py-1 border border-gray-700 rounded-md
          text-gray-700 text-sm hover:brightness-105
          hover:shadow-md
        `"
        @click="router.back()"
      >
        Cancel
      </button>
      
      <button
        :class="`
          px-4 py-1 rounded-md bg-blue-500 disabled:bg-gray-500
          text-white disabled:text-gray-100 text-sm
          hover:brightness-105 hover:shadow-md
        `"
        :disabled="isButtonDisabled"
        @click="onSubmitButtonHandler"
      >
        {{ isHostMeeting ? 'Host' : 'Join' }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoomStore } from '@/stores/room';

const props = defineProps<{
  isButtonDisabled: boolean
  isHostMeeting: boolean
}>()

const meetingConfig = useMeetingConfig()
const meetingStore = useRoomStore()

const config = useRuntimeConfig()
const router = useRouter();

const onSubmitButtonHandler = async () => {
  try {
    if (!props.isHostMeeting) {
      const { data, pending, error } = await useFetch(`${config.public.apiDomain}/rtc/room/${meetingConfig.value.meetingId}`)
      const result = data.value as any

      if (!result.success) {
        // TODO: create modal  
        alert(result.message)
        return
      }
    }

    meetingStore.setMeetingConfig({
      isHostMeeting: props.isHostMeeting,
      meetingName: meetingConfig.value.meetingName,
      meetingId: meetingConfig.value.meetingId,
      isConnectOnlyAudio: meetingConfig.value.isConnectOnlyAudio,
    })

    meetingConfig.value.meetingId = ''
    meetingConfig.value.meetingName = ''
    meetingConfig.value.isConnectOnlyAudio = false
  
    await router.replace('/room')  
  } catch (error) {
    console.log('route error:', error)
  }
}
</script>
