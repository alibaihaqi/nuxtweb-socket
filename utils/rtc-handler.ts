const defaultMediaConstraints = {
  audio: true,
  video: true,
}

let localStream: null | MediaStream = null

export const getLocalPreviewAndRoomConnection = async () => {
  try {
    localStream = await navigator.mediaDevices.getUserMedia(defaultMediaConstraints)
    
    
  } catch (error) {
    console.log(error)
  }
}