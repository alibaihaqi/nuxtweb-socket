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
  audioToConnect: boolean
  meetingId: string
  meetingName: string
  isHostMeeting?: boolean
}

export interface IRoomActionButton {
  isActive: boolean
  title: string
  iconPath: string
}

export type TActionButton = 'setMicrophone' | 'setVideo' | 'setIsShowParticipants'

export interface IUser {
  userId?: string;
  name: string;
  roomId: string;
  createdAt?: string;
  updatedAt?: string;
  socketId: string;
}

export interface IRoomState {
  roomId: string;
  meetingName: string;
  meetingUsers: IUser[];
  isHostMeeting: boolean;
  isInitiateRoom: boolean;
  isMicrophoneActive: boolean;
  isShowParticipants: boolean;
  isVideoActive: boolean;
}
