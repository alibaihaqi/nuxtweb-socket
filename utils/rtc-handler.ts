// @ts-ignore
import Peer from 'simple-peer/simplepeer.min.js'
import type { SimplePeer } from 'simple-peer'
import type { IMeetingConfig } from '@/interfaces/room/room'
import { createNewRoom, joinRoom, signalPeerData } from '@/utils/socket'

const defaultMediaConstraints = {
  audio: true,
  video: { width: 1280, height: 720 },
}

let localStream: null | MediaStream = null
let streams: any = []

export const getLocalPreviewAndRoomConnection = async (config: IMeetingConfig) => {
  try {
    localStream = await navigator.mediaDevices.getUserMedia(defaultMediaConstraints)
    
    showVideoStream(localStream)

    config.isHostMeeting
      ? createNewRoom(config)
      : joinRoom(config)
  } catch (error) {
    console.log(error)
  }
}

export const showVideoStream = (stream: MediaStream, connectedUserSocketId: string = '') => {
  const videosContainer = document.getElementById('videos_container')
  videosContainer?.classList.add('videos_container_styles')

  const videoContainer = document.createElement('div')
  videoContainer.classList.add('video_container_style')
  videoContainer.id = connectedUserSocketId

  const videoElement = document.createElement('video')
  videoElement.autoplay = true
  videoElement.muted = true
  videoElement.srcObject = stream

  if (connectedUserSocketId) {
    videoElement.id = `${connectedUserSocketId}.video`
  }

  videoElement.onloadedmetadata = () => {
    videoElement.play()
  }

  videoContainer.appendChild(videoElement)
  videosContainer?.appendChild(videoContainer)
}

let peers: Record<string, InstanceType<SimplePeer>> = {}

const getConfiguration = () => {
  return {
    iceServers: [
      {
        urls: 'stun:stun.l.google.com:19302'
      }
    ]
  }
}

const addStream = (stream: MediaStream, connectedUserSocketId: string) => {
  showVideoStream(stream, connectedUserSocketId)
}

export const prepareNewPeerConnection = (connectedUserSocketId: string, isInitiator: boolean) => {
  const configuration = getConfiguration()

  peers[connectedUserSocketId] = new Peer({
    initiator: isInitiator,
    config: configuration,
    stream: localStream as MediaStream,
  })

  peers[connectedUserSocketId].on('signal', (data: any) => {
    const signalData = {
      signal: data,
      connectedUserSocketId: connectedUserSocketId,
    }
    signalPeerData(signalData)
  })

  peers[connectedUserSocketId].on('stream', (stream: any) => {
    addStream(stream, connectedUserSocketId)
    streams = [...streams, stream]
  })
}

export const handleSignalingData = (data: any) => {
  peers[data.connectedUserSocketId].signal(data.signal)
}

export const removePeerConnection = (data: any) => {
  const { socketId } = data

  const videoContainer = document.getElementById(socketId)
  const videoElement = document.getElementById(`${socketId}.video`) as any

  if (videoContainer && videoElement) {
    const tracks = videoElement.srcObject?.getTracks()
    tracks.forEach((t: any) => t.stop())

    videoElement.srcObject = null
    videoContainer.removeChild(videoElement)
    videoContainer.parentNode?.removeChild(videoContainer)

    if (peers[socketId]) {
      peers[socketId].destroy()
      delete peers[socketId]
    }
  }
}

export const micToggle = (value: boolean) => {
  if (!localStream) return

  localStream.getAudioTracks()[0].enabled = value
}

export const videoToggle = (value: boolean) => {
  if (!localStream) return

  localStream.getVideoTracks()[0].enabled = value
}
