import { Document } from 'mongoose'

export interface IPlayer extends Document {
  name: string
  slug: string
  nationality: string
  socials?: {
    youtube: string
    twitter: string
    twitch: string
  }
}
