import io, { Socket } from 'socket.io-client'
import type { IMeetingConfig } from '@/interfaces/room/room-state'
import { useRoomStore } from '@/stores/room'
import { handleSignalingData, prepareNewPeerConnection } from '@/utils/rtc-handler'

let socket: Socket | null = null

export const connectSocketIoServer = (socketServer: string) => {
  const roomStore = useRoomStore()
  socket = io(socketServer)

  socket.on('connect', () => {
    console.log('socket id', socket?.id)
  })

  socket?.volatile.on('room-id', (data: any) => {
    roomStore.setRoomId(data.roomId)
  })

  socket?.volatile.on('room-users', (data: any) => {
    roomStore.setMeetingUsers(data.connectedUsers)
  })

  socket?.volatile.on('connection-prepare', (data: any) => {
    prepareNewPeerConnection(data.connectedUserSocketId, false)

    socket?.volatile.emit('connection-init', { connectedUserSocketId: data.connectedUserSocketId })
  })

  socket?.volatile.on('connection-signal', (data: any) => {
    handleSignalingData(data)
  })

  socket?.volatile.on('connection-init', (data: any) => {
    prepareNewPeerConnection(data.connectedUserSocketId, true)
  })
}

export const disconnectSocketIoServer = () => {
  socket?.volatile.disconnect()
}

export const createNewRoom = (meetingConfig: IMeetingConfig) => {
  const data = {
    meetingName: meetingConfig.meetingName,
    isHostMeeting: meetingConfig.isHostMeeting,
  }

  socket?.volatile.emit('create-new-room', data)
}

export const joinRoom = (meetingConfig: IMeetingConfig) => {
  const data = {
    meetingId: meetingConfig.meetingId,
    meetingName: meetingConfig.meetingName,
  }

  socket?.volatile.emit('join-room', data)
}

export const signalPeerData = (data: any) => {
  socket?.volatile.emit('connection-signal', data)
}