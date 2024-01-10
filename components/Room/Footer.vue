<template>
  <footer class="flex justify-around sm:justify-between items-center bg-gray-900 pt-1">
    <section class="flex gap-1 sm:gap-2">
      <ActionButton
        :isActive="roomStore.isMicrophoneActive"
        :sources="MICROPHONE_ICON_SETS"
        @onClickHandler="onClickHandler('setMicrophone')"
      />

      <ActionButton
        v-if="!roomStore.isConnectOnlyAudio"
        :isActive="roomStore.isVideoActive"
        :sources="VIDEO_ICON_SETS"
        @onClickHandler="onClickHandler('setVideo')"
      />
    </section>

    <section class="flex">
      <ActionButton
        class="hidden sm:inline-flex"
        :isActive="roomStore.isShowParticipants"
        :sources="PARTICIPANTS_ICON_SETS"
        @onClickHandler="onClickHandler('setIsShowParticipants')"
      />
      <ActionButton
        :isActive="roomStore.isShareScreenActive"
        :sources="SHARE_SCREEN_ICON_SETS"
        @onClickHandler="onClickHandler('setShareScreen')"
      />
      <ActionButton
        class="hidden sm:inline-flex"
        :isActive="roomStore.isShowChatRoom"
        :sources="CHAT_ICON_SETS"
        @onClickHandler="onClickHandler('setIsShowChatRoom')"
      />
    </section>

    <section class="px-2">
      <button
        class="bg-red-500 text-sm text-white px-4 py-1 rounded-md"
        @click="onLeaveMeetingRoom"
      >
        End
      </button>
    </section>
  </footer>
</template>

<script lang="ts" setup>
import ActionButton from '@/components/Room/ActionButton.vue'
import {
  CHAT_ICON_SETS,
  MICROPHONE_ICON_SETS,
  PARTICIPANTS_ICON_SETS,
  SHARE_SCREEN_ICON_SETS,
  VIDEO_ICON_SETS,
} from '@/constants/room/icon'

import type { TActionButton } from '@/interfaces/room/room'
import { useRoomStore } from '@/stores/room'
import { disconnectSocketIoServer } from '@/utils/socket'

const router = useRouter()
const roomStore = useRoomStore()

const onClickHandler = (action: TActionButton) => {
  roomStore[action]()
}

const onLeaveMeetingRoom = async () => {
  disconnectSocketIoServer()

  try {
    roomStore.resetToDefaultState()
    await router.replace('/')
  } catch (error) {
    console.log('Log Error:', error)
  }
}
</script>
