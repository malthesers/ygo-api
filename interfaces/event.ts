import { Document, Types } from 'mongoose'

export interface IEvent extends Document {
  name: string
  slug: string
  thumbnail: string
  type: EventType
  topcut: TopCut
  year: number
  date: string
  location: string
  attendance: number
  winner: Types.ObjectId
  winner2?: Types.ObjectId
  winner3?: Types.ObjectId
}

export enum TopCut {
  _8 = 8,
  _16 = 16,
  _32 = 32,
  _64 = 64,
  _128 = 128,
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
