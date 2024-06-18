import { Request } from 'express'
import {
  Atk,
  Attribute,
  CardType,
  Def,
  ICard,
  Level,
  LinkArrows,
  MonsterCardType,
  Property,
  Rank,
  Rating,
  Scale,
  Type,
} from '../interfaces/card'

interface MongooseRegexQuery {
  $regex: string
  $options: string
}

interface MongooseAllQuery {
  $all: Property[]
}

interface MongooseExistsQuery {
  $exists: boolean
}

interface MongooseRangeQuery {
  $gte: number
  $lte: number
}

interface ICardsQueryParams {
  id?: string
  name?: MongooseRegexQuery
  description?: MongooseRegexQuery
  cardType?: CardType
  type?: Type
  monsterCardType?: MonsterCardType
  attribute?: Attribute
  atk?: Atk | MongooseRangeQuery
  def?: Def | MongooseRangeQuery
  level?: Level | MongooseRangeQuery
  rank?: Rank | MongooseRangeQuery
  rating?: Rating | MongooseRangeQuery
  arrows?: LinkArrows
  properties?: MongooseAllQuery
  pendulum?: MongooseExistsQuery
  'pendulum.scale'?: Scale | MongooseRangeQuery
  'pendulum.description'?: MongooseRegexQuery
}

export default function getCardsQuery(req: Request) {
  const linkArrows: (keyof LinkArrows)[] = ['TL', 'T', 'TR', 'L', 'R', 'BL', 'B', 'BR']
  const query: ICardsQueryParams = {}

  if (req.query['id']) {
    query.id = req.query.id as string
  }

  if (req.query['name']) {
    query.name = { $regex: req.query.name as string, $options: 'i' }
  }

  if (req.query['description']) {
    query.description = { $regex: req.query.description as string, $options: 'i' }
  }

  if (req.query['cardType']) {
    query.cardType = req.query.cardType as CardType
  }

  if (req.query['type']) {
    query.type = req.query.type as Type
  }

  if (req.query['monsterCardType']) {
    query.monsterCardType = req.query.monsterCardType as MonsterCardType
  }

  if (req.query['attribute']) {
    query.attribute = req.query.attribute as Attribute
  }

  if (req.query['atk']) {
    query.atk = req.query.atk === '?' ? '?' : parseInt(req.query.atk as string)
  } else if (req.query['atkMin'] || req.query['atkMax']) {
    query.atk = { $gte: 0, $lte: 10000 }

    if (req.query['atkMin']) query.atk.$gte = parseInt(req.query.atkMin as string)
    if (req.query['atkMax']) query.atk.$lte = parseInt(req.query.atkMax as string)
  }

  if (req.query['def']) {
    query.def = req.query.def === '?' ? '?' : parseInt(req.query.def as string)
  } else if (req.query['defMin'] || req.query['defMax']) {
    query.def = { $gte: 0, $lte: 10000 }

    if (req.query['defMin']) query.def.$gte = parseInt(req.query.defMin as string)
    if (req.query['defMax']) query.def.$lte = parseInt(req.query.defMax as string)
  }

  if (req.query['level']) {
    query.level = parseInt(req.query.level as string) as Level
  } else if (req.query['levelMin'] || req.query['levelMax']) {
    query.level = { $gte: 0, $lte: 12 }

    if (req.query['levelMin']) query.level.$gte = parseInt(req.query.levelMin as string) as Level
    if (req.query['levelMax']) query.level.$lte = parseInt(req.query.levelMax as string) as Level
  }

  if (req.query['rank']) {
    query.rank = parseInt(req.query.rank as string) as Rank
  } else if (req.query['rankMin'] || req.query['levelMax']) {
    query.rank = { $gte: 0, $lte: 13 }

    if (req.query['rankMin']) query.rank.$gte = parseInt(req.query.rankMin as string) as Rank
    if (req.query['rankMax']) query.rank.$lte = parseInt(req.query.rankMax as string) as Rank
  }

  if (req.query['rating']) {
    query.rating = parseInt(req.query.rating as string) as Rating
  } else if (req.query['ratingMin'] || req.query['ratingMax']) {
    query.rating = { $gte: 1, $lte: 8 }

    if (req.query['ratingMin']) query.rating.$gte = parseInt(req.query.ratingMin as string) as Rating
    if (req.query['ratingMax']) query.rating.$lte = parseInt(req.query.ratingMax as string) as Rating
  }

  linkArrows.forEach((arrow) => {
    if (req.query[arrow]) {
      if (!query.arrows) {
        query.arrows = {}
      }

      query.arrows[arrow] = true
    }
  })

  if (req.query['properties']) {
    const queryProperties: string[] = (req.query.properties as string).split(',')

    query.properties = { $all: queryProperties.map((property) => property as Property) }
  }

  if (req.query['pendulum']) {
    query.pendulum = { $exists: req.query.pendulum === 'true' }
  }

  if (req.query['pendulumScale']) {
    query['pendulum.scale'] = parseInt(req.query.pendulumScale as string) as Scale
  } else if (req.query['pendulumScaleMin'] || req.query['pendulumScaleMax']) {
    query['pendulum.scale'] = { $gte: 0, $lte: 13 }

    if (req.query['pendulumScaleMin'])
      query['pendulum.scale'].$gte = parseInt(req.query['pendulumScaleMin'] as string) as Scale
    if (req.query['pendulumScaleMax'])
      query['pendulum.scale'].$lte = parseInt(req.query['pendulumScaleMax'] as string) as Scale
  }

  if (req.query['pendulumDescription']) {
    query['pendulum.description'] = { $regex: req.query['pendulumDescription'] as string, $options: 'i' }
  }

  return query
}
