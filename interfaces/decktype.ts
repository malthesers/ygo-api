import { Document } from 'mongoose'
import { IDeck, Placement } from './deck'
import { IEvent } from './event'
import { IPlayer } from './player'

export interface IDeckType extends Document {
  name: string
  slug: string
  engines: string[]
  thumbnail: string
}

export interface IDeckTypeTop {
  rank: number
  count: number
  deckType: IDeckType
  bestPerformance: {
    placement: Placement
    player: IPlayer
    event: IEvent
  }
}
