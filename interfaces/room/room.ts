export interface IActionSetValue {
  key: 'isHostMeeting' | 'meetingId' | 'meetingName'
  value: string
}

export interface ISetMeetingConfig {
  meetingId?: string
  meetingName: string
  isHostMeeting: boolean
}

export interface IMeetingConfig {
  isConnectOnlyAudio: boolean
  meetingId: string
  meetingName: string
  isHostMeeting?: boolean
}

export interface IRoomActionButton {
  isActive: boolean
  title: string
  iconPath: string
}

export type TActionButton = 'setMicrophone' | 'setVideo' | 'setIsShowParticipants' | 'setIsShowChatRoom' | 'setShareScreen'

export interface IUser {
  userId?: string;
  name: string;
  roomId: string;
  createdAt?: string;
  updatedAt?: string;
  socketId: string;
}

export interface IChatMessage {
  socketId: string;
  name: string;
  content: string;
}

export interface IRoomState {
  displayStream: MediaStream | null;
  meetingName: string;
  meetingUsers: IUser[];
  messages: IChatMessage[];
  roomId: string;
  socketId: string;
  isHostMeeting: boolean;
  isInitiateRoom: boolean;
  isMicrophoneActive: boolean;
  isShowChatRoom: boolean;
  isShareScreenActive: boolean;
  isShowParticipants: boolean;
  isVideoActive: boolean;
}

export interface IGetDisplayMedia {
  success: boolean;
  stream?: MediaStream | null;
  errorMessage?: string;
}
