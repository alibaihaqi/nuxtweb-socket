import type { IMeetingConfig } from '@/interfaces/room/room'

export const useMeetingConfig = () => useState<IMeetingConfig>('meetingConfig', () => ({
  audioToConnect: false,
  meetingId: '',
  meetingName: '',
}))
