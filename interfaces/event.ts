import { Document, Types } from 'mongoose'

export interface IEvent extends Document {
  name: string
  slug: string
  thumbnail: string
  type: EventType
  topcut: TopCut
  startDate: Date
  endDate: Date
  location: string
  attendance: number
  winner: IWinner
  winner2?: IWinner
  winner3?: IWinner
}

export enum TopCut {
  _8 = 8,
  _16 = 16,
  _32 = 32,
  _64 = 64,
  _128 = 128,
  _256 = 256,
}

export type WinnerStr = 'winner' | 'winner2' | 'winner3'

interface IWinner {
  player: Types.ObjectId
  deck: Types.ObjectId
}

type EventType = IEventTypeWCQ | IEventTypeYCS | IEventTypeTeamYCS | IEventTypeRemoteYCS

interface IEventTypeWCQ {
  name: 'WCQ'
  slug: 'wcq'
}

interface IEventTypeYCS {
  name: 'YCS'
  slug: 'ycs'
}

interface IEventTypeTeamYCS {
  name: 'TEAM YCS'
  slug: 'team-ycs'
}

interface IEventTypeRemoteYCS {
  name: 'Remote YCS'
  slug: 'remote-ycs'
}
