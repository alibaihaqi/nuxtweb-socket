import type { IMeetingConfig } from '@/interfaces/room/room-state'

export const useMeetingConfig = () => useState<IMeetingConfig>('meetingConfig', () => ({
  audioToConnect: false,
  meetingId: '',
  meetingName: '',
}))
