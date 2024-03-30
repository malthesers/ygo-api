import { Schema, model } from 'mongoose'
import {
  Attribute,
  CardType,
  Frame,
  ICard,
  IMonsterCard,
  ISpellCard,
  ITrapCard,
  MonsterType,
  SpellType,
  TrapType,
} from '../interfaces/card'

const monsterCardSchema: Schema = new Schema<IMonsterCard>({
  id: { type: String, required: true, minlength: 8, maxlength: 8 },
  name: { type: String, required: true },
  frame: { type: String, required: true, enum: Object.values(Frame) },
  description: { type: String, required: true },
  cardType: { type: String, required: true, enum: [CardType.Monster] },
  type: { type: String, required: true, enum: Object.values(MonsterType) },
  attribute: { type: String, required: true, enum: Object.values(Attribute) },
  atk: {
    type: Schema.Types.Mixed,
    required: true,
    validate: {
      validator: (value: any) => {
        return value === '?' || (!isNaN(Number(value)) && Number(value) >= 0 && Number(value) <= 9999)
      },
    },
  },
  def: {
    type: Schema.Types.Mixed,
    required: true,
    validate: {
      validator: (value: any) => {
        return value === '?' || (!isNaN(Number(value)) && Number(value) >= 0 && Number(value) <= 9999)
      },
    },
  },
  level: { type: Number, min: 0, max: 12 },
})

const spellCardSchema: Schema = new Schema<ISpellCard>({
  id: { type: String, required: true, minlength: 8, maxlength: 8 },
  name: { type: String, required: true },
  frame: { type: String, required: true, enum: [Frame.Spell] },
  description: { type: String, required: true },
  cardType: { type: String, required: true, enum: [CardType.Spell] },
  type: { type: String, required: true, enum: Object.values(SpellType) },
})

const trapCardSchema: Schema = new Schema<ITrapCard>({
  id: { type: String, required: true, minlength: 8, maxlength: 8 },
  name: { type: String, required: true },
  frame: { type: String, required: true, enum: [Frame.Trap] },
  description: { type: String, required: true },
  cardType: { type: String, required: true, enum: [CardType.Trap] },
  type: { type: String, required: true, enum: Object.values(TrapType) },
})

const discriminatorKey = 'cardType'

const CardModel = model<ICard>('Card', new Schema({}, { discriminatorKey }))

CardModel.discriminator(CardType.Monster, monsterCardSchema)
CardModel.discriminator(CardType.Spell, spellCardSchema)
CardModel.discriminator(CardType.Trap, trapCardSchema)

export default CardModel
