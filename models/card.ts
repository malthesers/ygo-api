import { Schema, model } from 'mongoose'
import {
  Attribute,
  CardType,
  Frame,
  ICard,
  IEffectMonsterCard,
  IFusionMonsterCard,
  ILinkMonsterCard,
  IMonsterCard,
  IMonsterCardBase,
  INormalMonsterCard,
  IRitualMonsterCard,
  ISpellCard,
  ISynchroMonsterCard,
  ITrapCard,
  IXyzMonsterCard,
  MonsterCardType,
  MonsterType,
  Property,
  SpellType,
  TrapType,
} from '../interfaces/card'

function statValidator(value: any) {
  return value === '?' || (!isNaN(Number(value)) && Number(value) >= 0 && Number(value) <= 9999)
}

const baseSchema: Schema = new Schema<ICard>(
  {
    id: { type: String, required: true, minlength: 8, maxlength: 8 },
    name: { type: String, required: true },
    frame: { type: String, required: true, enum: Object.values(Frame) },
    description: { type: String, required: true },
  },
  {
    discriminatorKey: 'cardType',
  }
)

const CardModel = model<ICard>('Card', baseSchema)

const monsterCardSchema: Schema = baseSchema.discriminator(
  'MonsterCard',
  new Schema<IMonsterCardBase>(
    {
      cardType: { type: String, required: true, enum: [CardType.Monster] },
      monsterCardType: { type: String, required: true, enum: Object.values(MonsterCardType) },
      type: { type: String, required: true, enum: Object.values(MonsterType) },
      attribute: { type: String, required: true, enum: Object.values(Attribute) },
      atk: { type: Schema.Types.Mixed, required: true, validate: { validator: statValidator } },
      properties: [{ type: String, enum: Object.values(Property) }],
      pendulum: {
        type: {
          scale: { type: Number, min: 0, max: 13 },
          description: { type: String },
        },
      },
    },
    {
      discriminatorKey: 'monsterCardType',
    }
  )
)

monsterCardSchema.discriminator(
  'StandardMonsterCard',
  new Schema<INormalMonsterCard | IEffectMonsterCard | IFusionMonsterCard | IRitualMonsterCard | ISynchroMonsterCard>({
    def: { type: Schema.Types.Mixed, required: true, validate: { validator: statValidator } },
    level: { type: Number, min: 0, max: 12 },
  })
)

monsterCardSchema.discriminator(
  'XyzMonsterCard',
  new Schema<IXyzMonsterCard>({
    def: { type: Schema.Types.Mixed, required: true, validate: { validator: statValidator } },
    rank: { type: Number, min: 0, max: 13 },
  })
)

monsterCardSchema.discriminator(
  'LinkMonsterCard',
  new Schema<ILinkMonsterCard>({
    rating: { type: Number, min: 1, max: 8 },
    arrows: {
      type: {
        TL: { type: Boolean },
        T: { type: Boolean },
        TR: { type: Boolean },
        L: { type: Boolean },
        R: { type: Boolean },
        BL: { type: Boolean },
        B: { type: Boolean },
        BR: { type: Boolean },
      },
    },
  })
)

baseSchema.discriminator(
  'SpellCard',
  new Schema<ISpellCard>({
    cardType: { type: String, required: true, enum: [CardType.Spell] },
    type: { type: String, required: true, enum: Object.values(SpellType) },
  })
)

baseSchema.discriminator(
  'TrapCard',
  new Schema<ITrapCard>({
    cardType: { type: String, required: true, enum: [CardType.Trap] },
    type: { type: String, required: true, enum: Object.values(TrapType) },
  })
)

export default CardModel
