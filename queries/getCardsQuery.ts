import { Request } from 'express'
import {
  Atk,
  Attribute,
  CardType,
  Def,
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

interface ICardsQueryParams {
  id?: string
  name?: MongooseRegexQuery
  description?: MongooseRegexQuery
  cardType?: CardType
  type?: Type
  monsterCardType?: MonsterCardType
  attribute?: Attribute
  atk?: Atk
  def?: Def
  level?: Level
  rank?: Rank
  rating?: Rating
  arrows?: LinkArrows
  properties?: MongooseAllQuery
  pendulum?: MongooseExistsQuery
  'pendulum.scale'?: Scale
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
  }

  if (req.query['def']) {
    query.def = req.query.def === '?' ? '?' : parseInt(req.query.def as string)
  }

  if (req.query['level']) {
    query.level = parseInt(req.query.level as string) as Level
  }

  if (req.query['rank']) {
    query.rank = parseInt(req.query.rank as string) as Rank
  }

  if (req.query['rating']) {
    query.rating = parseInt(req.query.rating as string) as Rating
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
  }

  if (req.query['pendulumDescription']) {
    query['pendulum.description'] = { $regex: req.query['pendulumDescription'] as string, $options: 'i' }
  }

  return query
}
