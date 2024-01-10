import type { IMeetingConfig } from '@/interfaces/room/room'

export const useMeetingConfig = () => useState<IMeetingConfig>('meetingConfig', () => ({
  isConnectOnlyAudio: false,
  meetingId: '',
  meetingName: '',
}))

export const useChatMessage = () => useState<string>('chat-message', () => '')
