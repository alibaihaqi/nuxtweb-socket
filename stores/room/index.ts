import { defineStore } from 'pinia'
import type { IRoomState, ISetMeetingConfig } from '@/interfaces/room/room'
import { micToggle, videoToggle } from '@/utils/rtc-handler'

export const useRoomStore = defineStore('room', {
  state: (): IRoomState => ({
    roomId: '',
    meetingName: '',
    meetingUsers: [],
    isHostMeeting: false,
    isInitiateRoom: false,
    isMicrophoneActive: false,
    isShowParticipants: false,
    isVideoActive: false,
  }),
  actions: {
    resetToDefaultState() {
      this.roomId = ''
      this.meetingName = ''
      this.meetingUsers = []
      this.isHostMeeting = false
      this.isMicrophoneActive = false
      this.isVideoActive = false
    },
    setIsHostMeeting(value: boolean) {
      this.isHostMeeting = value
    },
    setIsInitiateRoom(value: boolean) {
      this.isInitiateRoom = value
    },
    setIsShowParticipants () {
      this.isShowParticipants = !this.isShowParticipants
    },
    setMeetingConfig({ isHostMeeting, meetingName, meetingId }: ISetMeetingConfig) {
      this.setIsHostMeeting(isHostMeeting)
      this.setMeetingName(meetingName)
      this.setRoomId(meetingId as string)
    },
    setMeetingName(value: string) {
      this.meetingName = value
    },
    setMeetingUsers(value: any) {
      this.meetingUsers = value
    },
    setMicrophone() {
      this.isMicrophoneActive = !this.isMicrophoneActive

      micToggle(this.isMicrophoneActive)
    },
    setRoomId(value: string) {
      this.roomId = value
    },
    setVideo () {
      this.isVideoActive = !this.isVideoActive

      videoToggle(this.isVideoActive)
    },
  },
})