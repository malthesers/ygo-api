import { Document } from 'mongoose'

export type ICard = IMonsterCard | ISpellCard | ITrapCard

export interface ICardBase extends Document {
  id: string
  name: string
  frame: Frame
  description: string
  cardType: CardType
}

export enum CardType {
  Monster = 'Monster',
  Spell = 'Spell',
  Trap = 'Trap',
}

export type IMonsterCard =
  | INormalMonsterCard
  | IEffectMonsterCard
  | IFusionMonsterCard
  | IRitualMonsterCard
  | ISynchroMonsterCard
  | IXyzMonsterCard
  | ILinkMonsterCard

export interface IMonsterCardBase extends ICardBase {
  cardType: CardType.Monster
  monsterCardType: MonsterCardType
  type: MonsterType
  attribute: Attribute
  atk: Atk
  properties?: Property[]
  pendulum?: Pendulum
}

export interface INormalMonsterCard extends IMonsterCardBase {
  monsterCardType: MonsterCardType.Normal
  frame: Frame.Normal
  level: Level
  def: Def
}

export interface IEffectMonsterCard extends IMonsterCardBase {
  monsterCardType: MonsterCardType.Effect
  frame: Frame.Effect
  level: Level
  def: Def
}

export interface IFusionMonsterCard extends IMonsterCardBase {
  monsterCardType: MonsterCardType.Fusion
  frame: Frame.Fusion
  level: Level
  def: Def
}

export interface IRitualMonsterCard extends IMonsterCardBase {
  monsterCardType: MonsterCardType.Ritual
  frame: Frame.Ritual
  level: Level
  def: Def
}

export interface ISynchroMonsterCard extends IMonsterCardBase {
  monsterCardType: MonsterCardType.Synchro
  frame: Frame.Synchro
  level: Level
  def: Def
}

export interface IXyzMonsterCard extends IMonsterCardBase {
  monsterCardType: MonsterCardType.Xyz
  frame: Frame.Xyz
  rank: Rank
  def: Def
}

export interface ILinkMonsterCard extends IMonsterCardBase {
  monsterCardType: MonsterCardType.Link
  frame: Frame.Link
  rating: Rating
  arrows: LinkArrows
}

export interface Pendulum {
  scale: Scale
  description: string
}

export interface LinkArrows {
  TL?: boolean
  T?: boolean
  TR?: boolean
  L?: boolean
  R?: boolean
  BL?: boolean
  B?: boolean
  BR?: boolean
}

export type Atk = '?' | number

export type Def = '?' | number

export type Rating = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

export type Level = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export type Rank = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13

export type Scale = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13

export type Type = MonsterCardType | SpellType | TrapType

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

export interface ISpellCard extends ICardBase {
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

export interface ITrapCard extends ICardBase {
  cardType: CardType.Trap
  type: TrapType
  frame: Frame.Trap
}
export enum TrapType {
  Normal = 'Normal',
  Continuous = 'Continuous',
  Counter = 'Counter',
}
