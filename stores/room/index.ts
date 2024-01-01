import { defineStore } from 'pinia'
import type { IRoomState, ISetMeetingConfig } from '@/interfaces/room/room-state'

export const useRoomStore = defineStore('room', {
  state: (): IRoomState => ({
    roomId: '',
    meetingName: '',
    meetingUsers: [],
    isHostMeeting: false,
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
    setIsShowParticipants () {
      this.isShowParticipants = !this.isShowParticipants
    },
    setMeetingConfig({ isHostMeeting, meetingName }: ISetMeetingConfig) {
      this.setIsHostMeeting(isHostMeeting)
      this.setMeetingName(meetingName)
    },
    setMeetingName(value: string) {
      this.meetingName = value
    },
    setMeetingUsers(value: any) {
      this.meetingUsers = value
    },
    setMicrophone() {
      this.isMicrophoneActive = !this.isMicrophoneActive
    },
    setRoomId(value: string) {
      this.roomId = value
    },
    setVideo () {
      this.isVideoActive = !this.isVideoActive
    },
  },
})