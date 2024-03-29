import { defineStore } from 'pinia'
import type { IChatMessage, IRoomState, ISetMeetingConfig } from '@/interfaces/room/room'
import {
  getDisplayMediaStream,
  micToggle,
  screenShareToogle,
  videoToggle,
} from '@/utils/rtc-handler'

export const useRoomStore = defineStore('room', {
  state: (): IRoomState => ({
    displayStream: null,
    meetingName: '',
    meetingUsers: [],
    messages: [],
    roomId: '',
    socketId: '',
    isConnectOnlyAudio: false,
    isHostMeeting: false,
    isInitiateRoom: false,
    isMicrophoneActive: false,
    isShareScreenActive: false,
    isShowChatRoom: false,
    isShowParticipants: false,
    isVideoActive: false,
  }),
  actions: {
    resetToDefaultState() {
      this.displayStream = null
      this.meetingName = ''
      this.meetingUsers = []
      this.messages = []
      this.roomId = ''
      this.socketId = ''
      this.isConnectOnlyAudio = false
      this.isHostMeeting = false
      this.isInitiateRoom = false
      this.isMicrophoneActive = false
      this.isShareScreenActive = false
      this.isShowChatRoom = false
      this.isShowParticipants = false
      this.isVideoActive = false
    },
    setIsConnectOnlyAudio(value: boolean) {
      this.isConnectOnlyAudio = value
    },
    setIsHostMeeting(value: boolean) {
      this.isHostMeeting = value
    },
    setIsInitiateRoom(value: boolean) {
      this.isInitiateRoom = value
    },
    async setShareScreen() {
      if (!this.isShareScreenActive) {
        const displayMediaStream = await getDisplayMediaStream()
        if (displayMediaStream.success) {
          this.displayStream = displayMediaStream.stream as MediaStream
    
          this.displayStream.getVideoTracks()[0].onended = () => {
            this.setShareScreen()
          }
          screenShareToogle(this.isShareScreenActive, this.displayStream)
          this.isShareScreenActive = true
        }
      } else {
        screenShareToogle(this.isShareScreenActive)
        this.isShareScreenActive = false
    
        // stop screen share stream
        this.displayStream?.getTracks().forEach((t) => t.stop())
        this.displayStream = null
      }
    },
    setIsShowChatRoom() {
      this.isShowChatRoom = !this.isShowChatRoom
    },
    setIsShowParticipants () {
      this.isShowParticipants = !this.isShowParticipants
    },
    setMeetingConfig({ isHostMeeting, meetingName, meetingId, isConnectOnlyAudio }: ISetMeetingConfig) {
      this.setIsHostMeeting(isHostMeeting)
      this.setMeetingName(meetingName)
      this.setRoomId(meetingId as string)
      this.setIsConnectOnlyAudio(isConnectOnlyAudio)
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
    setMessages(messages: IChatMessage[]) {
      this.messages = messages
    },
    setRoomId(value: string) {
      this.roomId = value
    },
    setSocketId(value: string) {
      this.socketId = value
    },
    setVideo () {
      this.isVideoActive = !this.isVideoActive

      videoToggle(this.isVideoActive)
    },
  },
})