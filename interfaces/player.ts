import { Document } from 'mongoose'

export interface IPlayer extends Document {
  name: string
  nationality: string
}
