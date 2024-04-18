import { Schema, model } from 'mongoose'
import { IEvent, TopCut } from '../interfaces/event'

const eventSchema: Schema = new Schema<IEvent>({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  thumbnail: { type: String, required: true },
  type: {
    name: { type: String, required: true },
    slug: { type: String, required: true },
  },
  topcut: { type: Number, required: true, enum: Object.values(TopCut) },
  year: { type: Number, required: true },
  date: { type: String, required: true },
  location: { type: String, required: true },
  attendance: { type: Number, required: true },
  winner: {
    player: { type: Schema.Types.ObjectId, required: true, ref: 'Player' },
    deck: { type: Schema.Types.ObjectId, required: true, ref: 'DeckType' },
  },
  winner2: {
    player: { type: Schema.Types.ObjectId, ref: 'Player' },
    deck: { type: Schema.Types.ObjectId, ref: 'DeckType' },
  },
  winner3: {
    player: { type: Schema.Types.ObjectId, ref: 'Player' },
    deck: { type: Schema.Types.ObjectId, ref: 'DeckType' },
  },
})

const EventModel = model<IEvent>('Event', eventSchema)

export default EventModel
