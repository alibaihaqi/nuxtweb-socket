// @ts-ignore
import Peer from 'simple-peer/simplepeer.min.js'
import type { SimplePeer } from 'simple-peer'

import type { IChatMessage, IGetDisplayMedia, IMeetingConfig } from '@/interfaces/room/room'
import { useRoomStore } from '@/stores/room'
import { createNewRoom, joinRoom, signalPeerData } from '@/utils/socket'

const defaultDisplayMediaConstraints = {
  audio: false,
  video: true,
}

const getMediaConstraints = (connectOnlyAudio: boolean): MediaStreamConstraints => {
  return {
    audio: true,
    video: !connectOnlyAudio,
  }
}

let localStream: null | MediaStream = null
let streams: any = []

export const getLocalPreviewAndRoomConnection = async (config: IMeetingConfig, socketId: string) => {
  try {
    const mediaConstraints = getMediaConstraints(config.isConnectOnlyAudio)
    localStream = await navigator.mediaDevices.getUserMedia(mediaConstraints)

    showVideoStream(localStream, socketId)

    config.isHostMeeting
      ? createNewRoom(config)
      : joinRoom(config)
  } catch (error) {
    console.log(error)
  }
}

export const removeLocalStream = () => {
  localStream?.getAudioTracks()[0].stop()
  localStream?.getVideoTracks()[0].stop()
  localStream = null
}

export const showVideoStream = (stream: MediaStream, connectedUserSocketId: string = '') => {
  const videosContainer = document.getElementById('videos_container')
  videosContainer?.classList.add('videos_container_styles')

  const videoContainer = document.createElement('div')
  videoContainer.classList.add('video_container_style')
  videoContainer.id = connectedUserSocketId

  const videoElement = document.createElement('video')
  videoElement.autoplay = true
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

  peers[connectedUserSocketId].on('data', (data: string) => {
    const messageData = JSON.parse(data)
    concatNewMessage(messageData)
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

export const getDisplayMediaStream = async (): Promise<IGetDisplayMedia> => {
  let stream = null;
  try {
    stream = await navigator.mediaDevices.getDisplayMedia(defaultDisplayMediaConstraints);

    return {
      success: true,
      stream
    }
  } catch (err) {
    const message = `Error occurred when get an access to screen share: ${err}`
    console.log(message);

    return {
      success: false,
      errorMessage: message,
    }
  }
}

export const screenShareToogle = (
  isScreenSharingActive: boolean,
  screenSharingStream: MediaStream | null = null,
) => {
  if (isScreenSharingActive) {
    switchVideoTracks(localStream);
  } else {
    switchVideoTracks(screenSharingStream);
  }
};

const switchVideoTracks = (stream: MediaStream | null) => {
  for (let socket_id in peers) {
    for (let peerIdTrack in peers[socket_id].streams[0].getTracks()) {
      for (let track in stream?.getTracks() as MediaStreamTrack[]) {
        if (
          peers[socket_id].streams[0].getTracks()[peerIdTrack].kind ===
          stream?.getTracks()[track].kind
        ) {
          peers[socket_id].replaceTrack(
            peers[socket_id].streams[0].getTracks()[peerIdTrack],
            stream?.getTracks()[track],
            peers[socket_id].streams[0]
          );
          break;
        }
      }
    }
  }
}

export const concatNewMessage = (message: IChatMessage) => {
  const roomStore = useRoomStore()
  roomStore.setMessages([...roomStore.messages, message])
}

export const sendMessageUsingDataChannel = (message: IChatMessage) => {
  concatNewMessage(message)

  const stringifyMessage = JSON.stringify(message)
  for (let socketId in peers) {
    peers[socketId].send(stringifyMessage)
  }
}