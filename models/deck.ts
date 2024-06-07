import { Schema, model } from 'mongoose'
import { IDeck, IDecklist, IDecklistCard, Placement } from '../interfaces/deck'

const decklistCardSchema: Schema = new Schema<IDecklistCard>(
  {
    count: { type: Number, enum: [1, 2, 3], required: true },
    card: { type: Schema.Types.ObjectId, required: true, ref: 'Card' },
  },
  { _id: false }
)

const decklistSchema: Schema = new Schema<IDecklist>(
  {
    mainDeck: { type: [decklistCardSchema], required: true },
    extraDeck: { type: [decklistCardSchema], required: true },
    sideDeck: { type: [decklistCardSchema], required: true },
  },
  { _id: false }
)

const deckSchema: Schema = new Schema<IDeck>({
  deckType: { type: Schema.Types.ObjectId, required: true, ref: 'DeckType' },
  event: { type: Schema.Types.ObjectId, required: true, ref: 'Event' },
  player: { type: Schema.Types.ObjectId, required: true, ref: 'Player' },
  placement: { type: Number, required: true, enum: Object.values(Placement) },
  decklist: { type: decklistSchema },
})

const DeckModel = model<IDeck>('Deck', deckSchema)

export default DeckModel
