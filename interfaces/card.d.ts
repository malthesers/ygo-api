import { Document } from 'mongoose'

export type ICard = IMonsterCard | ISpellCard | ITrapCard

interface ICardBase extends Document {
  id: string
  name: string
  frame: Frame
  description: string
  cardType: CardType
  type: MonsterType | SpellType | TrapType
}

export enum CardType {
  Monster = 'Monster',
  Spell = 'Spell',
  Trap = 'Trap',
}

type IMonsterCard =
  | INormalMonsterCard
  | IEffectMonsterCard
  | IFusionMonsterCard
  | IRitualMonsterCard
  | ISynchroMonsterCard
  | IXyzMonsterCard
  | ILinkMonsterCard

interface IMonsterCardBase extends ICardBase {
  cardType: CardType.Monster
  monsterCardType: MonsterCardType
  type: MonsterType
  attribute: Attribute
  atk: Atk
  def: Def
  level: Level
  properties?: Property[]
  pendulum?: Pendulum
}

interface INormalMonsterCard extends IMonsterCardBase {
  monsterCardType: MonsterCardType.Normal
  frame: Frame.Normal
}

interface IEffectMonsterCard extends IMonsterCardBase {
  monsterCardType: MonsterCardType.Effect
  frame: Frame.Effect
}

interface IFusionMonsterCard extends IMonsterCardBase {
  monsterCardType: MonsterCardType.Fusion
  frame: Frame.Fusion
}

interface IRitualMonsterCard extends IMonsterCardBase {
  monsterCardType: MonsterCardType.Ritual
  frame: Frame.Ritual
}

interface ISynchroMonsterCard extends IMonsterCardBase {
  monsterCardType: MonsterCardType.Synchro
  frame: Frame.Synchro
}

interface IXyzMonsterCard extends Omit<IMonsterCardBase, 'level'> {
  monsterCardType: MonsterCardType.Xyz
  frame: Frame.Xyz
  rank: Rank
}

interface ILinkMonsterCard extends Omit<IMonsterCardBase, 'level' | 'def'> {
  monsterCardType: MonsterCardType.Link
  frame: Frame.Link
  rating: Rating
  arrows: LinkArrows
}

interface Pendulum {
  scale: Scale
  description: string
}

interface LinkArrows {
  TL?: boolean
  T?: boolean
  TR?: boolean
  L?: boolean
  R?: boolean
  BL?: boolean
  B?: boolean
  BR?: boolean
}

type Atk = '?' | number

type Def = '?' | number

type Rating = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

type Level = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

type Rank = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13

type Scale = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13

export enum MonsterCardType {
  Normal = 'Normal',
  Effect = 'Effect',
  Fusion = 'Fusion',
  Ritual = 'Ritual',
  Synchro = 'Synchro',
  Xyz = 'Xyz',
  Link = 'Link',
}

export enum Frame {
  Normal = 'normal',
  Effect = 'effect',
  Fusion = 'fusion',
  Ritual = 'ritual',
  Synchro = 'synchro',
  Xyz = 'xyz',
  Link = 'link',
  Spell = 'spell',
  Trap = 'trap',
}

export enum Property {
  Tuner = 'Tuner',
  Spirit = 'Spirit',
  Gemini = 'Gemini',
  Toon = 'Toon',
  Flip = 'Flip',
  Union = 'Union',
}

export enum Attribute {
  DARK = 'DARK',
  LIGHT = 'LIGHT',
  EARTH = 'EARTH',
  WIND = 'WIND',
  WATER = 'WATER',
  FIRE = 'FIRE',
  DIVINE = 'DIVINE',
}

export enum MonsterType {
  Aqua = 'Aqua',
  Beast = 'Beast',
  BeastWarrior = 'Beast-Warrior',
  CreatorGod = 'Creator-God',
  Cyberse = 'Cyberse',
  Dinosaur = 'Dinosaur',
  DivineBeast = 'Divine-Beast',
  Dragon = 'Dragon',
  Fairy = 'Fairy',
  Fiend = 'Fiend',
  Fish = 'Fish',
  Insect = 'Insect',
  Illusion = 'Illusion',
  Machine = 'Machine',
  Plant = 'Plant',
  Psychic = 'Psychic',
  Pyro = 'Pyro',
  Reptile = 'Reptile',
  Rock = 'Rock',
  SeaSerpent = 'Sea Serpent',
  Spellcaster = 'Spellcaster',
  Thunder = 'Thunder',
  Warrior = 'Warrior',
  WingedBeast = 'Winged Beast',
  Wyrm = 'Wyrm',
  Zombie = 'Zombie',
}

interface ISpellCard extends ICardBase {
  cardType: CardType.Spell
  type: SpellType
  frame: Frame.Spell
}

export enum SpellType {
  Normal = 'Normal',
  Continuous = 'Continuous',
  Equip = 'Equip',
  QuickPlay = 'Quick-Play',
  Field = 'Field',
  Ritual = 'Ritual',
}

interface ITrapCard extends ICardBase {
  cardType: CardType.Trap
  type: TrapType
  frame: Frame.Trap
}
export enum TrapType {
  Normal = 'Normal',
  Continuous = 'Continuous',
  Counter = 'Counter',
}
