import express from 'express'
import DeckTypeModel from '../models/decktype'
import DeckModel from '../models/deck'
import { IDeckTypeTop } from '../interfaces/decktype'

const deckTypesRouter = express.Router()

deckTypesRouter.get('/', async (req, res) => {
  try {
    const deckTypes = await DeckTypeModel.find({}).limit(10)

    res.send(deckTypes)
  } catch (err) {
    res.status(500).send(err)
  }
})

deckTypesRouter.get('/top', async (req, res) => {
  try {
    const deckTypes: IDeckTypeTop[] = await DeckModel.aggregate([
      { $group: { _id: '$deckType', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $lookup: { from: 'decktypes', localField: '_id', foreignField: '_id', as: 'deckType' } },
      { $project: { _id: 0, count: 1, deckType: { $arrayElemAt: ['$deckType', 0] } } },
    ])

    if (!deckTypes) {
      res.status(404).send({ message: 'No top deck types found' })
    }

    const totalDecks: number = deckTypes.reduce((acc, curr) => acc + curr.count, 0)

    const deckTypesCoverage = deckTypes.map((deckType) => ({
      ...deckType.deckType,
      count: deckType.count,
      percentage: Number((deckType.count / totalDecks) * 100).toFixed(2),
    }))

    const response = {
      totalDecks,
      deckTypes: deckTypesCoverage,
    }

    res.send(response)
  } catch (err) {
    res.status(500).send(err)
  }
})

deckTypesRouter.get('/:slug', async (req, res) => {
  try {
    const deckType = await DeckTypeModel.findOne({ slug: req.params.slug })

    if (deckType) {
      res.send(deckType)
    } else {
      res.status(404).send({ message: `Deck type of slug "${req.params.slug}" not found` })
    }
  } catch (err) {
    res.status(500).send(err)
  }
})

export default deckTypesRouter
