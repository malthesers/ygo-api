import { Document } from 'mongoose'

export interface IDeckType extends Document {
  name: string
  slug: string
  engines: string[]
  thumbnail: string
}
