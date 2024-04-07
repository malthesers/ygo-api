import { Schema, model } from 'mongoose'
import { IDeckType } from '../interfaces/decktype'

const deckTypeSchema: Schema = new Schema<IDeckType>({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  engines: [{ type: String, required: true }],
  thumbnail: { type: String, required: true },
})

const DeckTypeModel = model<IDeckType>('DeckType', deckTypeSchema)

export default DeckTypeModel
