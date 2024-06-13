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
    // Group decks by type and sort by amount
    // Replace deckType id with data from deckType model
    const deckTypes: IDeckTypeTop[] = await DeckModel.aggregate([
      { $group: { _id: '$deckType', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $lookup: { from: 'decktypes', localField: '_id', foreignField: '_id', as: 'deckType' } },
      {
        $lookup: {
          from: 'decks',
          let: { deckTypeId: '$_id' },
          pipeline: [
            { $match: { $expr: { $eq: ['$deckType', '$$deckTypeId'] } } },
            { $sort: { placement: 1 } },
            { $limit: 1 },
            { $lookup: { from: 'events', localField: 'event', foreignField: '_id', as: 'event' } },
            { $lookup: { from: 'players', localField: 'player', foreignField: '_id', as: 'player' } },
            { $addFields: { event: { $arrayElemAt: ['$event', 0] }, player: { $arrayElemAt: ['$player', 0] } } },
          ],
          as: 'bestPerformance',
        },
      },
      {
        $project: {
          _id: 0,
          count: 1,
          deckType: { $arrayElemAt: ['$deckType', 0] },
          bestPerformance: { $arrayElemAt: ['$bestPerformance', 0] },
        },
      },
    ])

    if (!deckTypes) {
      res.status(404).send({ message: 'No top deck types found' })
    }

    // Calculate total amount of decks
    const totalDecks: number = deckTypes.reduce((acc, curr) => acc + curr.count, 0)

    // Reformat deck array to include percentage coverage
    const deckTypesCoverage = deckTypes.map((deckType, index) => ({
      ...deckType.deckType,
      rank: index + 1,
      count: deckType.count,
      percentage: Number((deckType.count / totalDecks) * 100).toFixed(2),
      bestPeformance: {
        placement: deckType.bestPerformance.placement,
        player: deckType.bestPerformance.player.name,
        event: deckType.bestPerformance.event.name,
        _id: deckType.bestPerformance._id,
      },
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

deckTypesRouter.get('/:slug/tops', async (req, res) => {
  try {
    const deckType = await DeckTypeModel.findOne({ slug: req.params.slug })

    if (!deckType) {
      res.status(404).send({ message: `Deck type of slug "${req.params.slug}" not found` })
    }

    const decks = await DeckModel.find({ deckType: deckType?._id }).populate('player')

    const response = {
      ...deckType?.toObject(),
      decks,
    }

    res.send(response)
  } catch (err) {
    res.status(500).send(err)
  }
})

export default deckTypesRouter
