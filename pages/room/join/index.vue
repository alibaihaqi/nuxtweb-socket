<template>
  <main class="min-h-screen flex justify-center items-center">
    <section :class="`
        flex flex-col gap-8 w-3/4 h-96
        max-w-md border border-blue-500 rounded-lg shadow-sm p-8
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
          <p class="text-sm">
            Meeting ID
          </p>

          <input
          v-model="state.meetingId"
            class="border border-blue-500 px-4 py-2 rounded-md"
            placeholder="Enter meeting ID"
            type="text"
          />
        </div>

        <div class="flex flex-col gap-2">
          <p class="text-sm">
            Meeting Name
          </p>

          <input
            v-model="state.meetingName"
            class="border border-blue-500 px-4 py-2 rounded-md"
            placeholder="Enter your name"
            type="text"
          />
        </div>
        
      </div>
    </section>
  </main>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const route = useRoute()
const state = useState('meeting-room', () => shallowRef({ meetingId: '', meetingName: '' }))

const isHostMeeting = computed(() => route.query?.host === 'true')

const generateTitle = computed(() => {
  return isHostMeeting ? 'Host Meeting' : 'Join Meeting'
})
</script>

