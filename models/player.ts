import { Schema, model } from 'mongoose'
import { IPlayer } from '../interfaces/player'

const playerSchema: Schema = new Schema<IPlayer>({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  nationality: { type: String, required: true },
  socials: {
    youtube: { type: String },
    twitter: { type: String },
    twitch: { type: String },
  },
})

const PlayerModel = model<IPlayer>('Player', playerSchema)

export default PlayerModel
