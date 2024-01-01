import type { IRoomActionButton } from '@/interfaces/room/room-state'

export const MICROPHONE_ICON_SETS: IRoomActionButton[] = [
  {
    isActive: false,
    title: 'Unmute',
    iconPath: '/icons/microphone-off.svg',
  },
  {
    isActive: true,
    title: 'Mute',
    iconPath: '/icons/microphone.svg',
  }
]

export const VIDEO_ICON_SETS: IRoomActionButton[] = [
  {
    isActive: false,
    title: 'Start Video',
    iconPath: '/icons/video-camera-off.svg',
  },
  {
    isActive: true,
    title: 'Stop Video',
    iconPath: '/icons/video-camera.svg',
  }
]

export const PARTICIPANTS_ICON_SETS: IRoomActionButton[] = [
  {
    isActive: false,
    title: 'Participants',
    iconPath: '/icons/people.svg',
  },
  {
    isActive: true,
    title: 'Participants',
    iconPath: '/icons/people.svg',
  }
]