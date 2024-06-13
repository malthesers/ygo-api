import { Document, Types } from 'mongoose'

export interface IDeck extends Document {
  deckType: Types.ObjectId
  event: Types.ObjectId
  player: Types.ObjectId
  placement: Placement
  decklist?: IDecklist
}

export enum Placement {
  _1 = 1,
  _2 = 2,
  _4 = 4,
  _8 = 8,
  _16 = 16,
  _32 = 32,
  _64 = 64,
  _128 = 128,
  _256 = 256,
}

export interface IDecklist {
  mainDeck: IDecklistCard[]
  extraDeck: IDecklistCard[]
  sideDeck: IDecklistCard[]
}

export interface IDecklistCard {
  count: 1 | 2 | 3
  card: Types.ObjectId
}
