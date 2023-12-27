export const useAudioToConnect = () => useState<boolean>('audioToConnect', () => false)
export const useMeetingId = () => useState<string>('meetingId', () => '')
export const useMeetingName = () => useState<string>('meetingName', () => '')
