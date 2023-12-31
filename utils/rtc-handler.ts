// @ts-ignore
import Peer from 'simple-peer/simplepeer.min.js'
import type { SimplePeer } from 'simple-peer'
import type { IMeetingConfig } from '@/interfaces/room/room-state'
import { createNewRoom, joinRoom, signalPeerData } from '@/utils/socket'

const defaultMediaConstraints = {
  audio: true,
  video: true,
}

let localStream: null | MediaStream = null
let streams: any = []

export const getLocalPreviewAndRoomConnection = async (config: IMeetingConfig) => {
  try {
    localStream = await navigator.mediaDevices.getUserMedia(defaultMediaConstraints)
    
    showLocalVideoPreview(localStream)

    config.isHostMeeting
      ? createNewRoom(config)
      : joinRoom(config)
  } catch (error) {
    console.log(error)
  }
}

export const getTurnOffRoomConnection = async () => {
}

export const showLocalVideoPreview = (stream: MediaStream) => {
  const videosContainer = document.getElementById('videos_container')
  videosContainer?.classList.add('videos_container_styles')

  const videoContainer = document.createElement('div')
  videoContainer.classList.add('video_container_style')

  const videoElement = document.createElement('video')
  videoElement.autoplay = true
  videoElement.muted = true
  videoElement.srcObject = stream

  videoElement.onloadedmetadata = () => {
    videoElement.play()
  }

  videoContainer.appendChild(videoElement)
  console.log('videoContainer', videoContainer)
  videosContainer?.appendChild(videoContainer)
  console.log('videosContainer', videosContainer)
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

const addStream = (stream: any, connectedUserSocketId: string) => {

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
    console.log('new stream came')

    addStream(stream, connectedUserSocketId)
    streams = [...streams, stream]
  })
}

export const handleSignalingData = (data: any) => {
  peers[data.connectedUserSocketId].signal(data.signal)
}