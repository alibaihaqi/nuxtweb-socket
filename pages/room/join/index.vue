<template>
  <CommonLayout>
    <section
      :class="`
        flex flex-col gap-8 w-3/4 min-h-96 max-w-md p-8
        border border-blue-500 rounded-lg shadow-md
      `"
    >
      <h1 class="font-bold text-3xl text-blue-500">
        {{ generateTitle }}
      </h1>

      <div class="flex flex-col gap-4 w-full">
        <div
          v-if="!isHostMeeting"
          class="flex flex-col gap-2"
        >
          <p class="text-sm text-gray-700">
            Meeting ID
          </p>

          <input
            v-model="meetingConfig.meetingId"
            class="border border-blue-500 px-4 py-2 rounded-md"
            placeholder="Enter meeting ID"
            type="text"
          />
        </div>

        <div class="flex flex-col gap-2">
          <p class="text-sm text-gray-700">
            Meeting Name
          </p>

          <input
            v-model="meetingConfig.meetingName"
            class="border border-blue-500 px-4 py-2 rounded-md"
            placeholder="Enter your name"
            type="text"
          />
        </div>
      </div>

      <div class="flex items-center">
        <input
          v-model="meetingConfig.audioToConnect"
          id="audio-checkbox"
          :class="`
            w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded
            focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800
            focus:ring-1 dark:bg-gray-700 dark:border-gray-600
          `"
          type="checkbox"
        >
        <label
          for="audio-checkbox"
          class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-700"
        >
          Connect only audio
        </label>
      </div>

      <ActionButton
        :isButtonDisabled="isButtonDisabled"
        :isHostMeeting="isHostMeeting"
      />
    </section>
  </CommonLayout>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

import ActionButton from '@/components/JoinRoom/Button.vue'
import CommonLayout from '@/components/Layout/CommonLayout.vue'
import { connectSocketIoServer } from '@/utils/socket'

const runtimeConfig = useRuntimeConfig()
const SOCKET_SERVER = runtimeConfig.public.socketServer

const meetingConfig = useMeetingConfig()
const route = useRoute()

const isHostMeeting = computed(() => route.query?.host === 'true')

const generateTitle = computed(() => {
  return isHostMeeting.value ? 'Host Meeting' : 'Join Meeting'
})

const isButtonDisabled = computed(() => {
  return !isHostMeeting.value && !meetingConfig.value?.meetingId
})

onMounted(() => {
  connectSocketIoServer(SOCKET_SERVER as string)
})
</script>

