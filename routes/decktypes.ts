import express from 'express'
import DeckTypeModel from '../models/decktype'
import DeckModel from '../models/deck'
import { IDeckTypeTop } from '../interfaces/decktype'

const deckTypesRouter = express.Router()

deckTypesRouter.get('/', async (req, res) => {
  try {
    const deckTypes = await DeckTypeModel.find({}).limit(10)

    return res.send(deckTypes)
  } catch (err) {
    return res.status(500).send(err)
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
          as: 'mostSuccessful',
        },
      },
      {
        $project: {
          _id: 0,
          count: 1,
          deckType: { $arrayElemAt: ['$deckType', 0] },
          mostSuccessful: { $arrayElemAt: ['$mostSuccessful', 0] },
        },
      },
    ])

    if (!deckTypes) {
      return res.status(404).send({ message: 'No top deck types found' })
    }

    // Calculate total amount of decks
    const totalDecks: number = deckTypes.reduce((acc, curr) => acc + curr.count, 0)

    // Reformat deck array to include percentage coverage
    const deckTypesCoverage = deckTypes.map((deckType, index) => ({
      ...deckType.deckType,
      rank: index + 1,
      count: deckType.count,
      percentage: Number((deckType.count / totalDecks) * 100).toFixed(2),
      mostSuccessful: {
        placement: deckType.mostSuccessful.placement,
        player: deckType.mostSuccessful.player.name,
        event: deckType.mostSuccessful.event.name,
        _id: deckType.mostSuccessful._id,
      },
    }))

    const response = {
      totalDecks,
      deckTypes: deckTypesCoverage,
    }

    return res.send(response)
  } catch (err) {
    return res.status(500).send(err)
  }
})

deckTypesRouter.get('/:slug', async (req, res) => {
  try {
    const deckType = await DeckTypeModel.findOne({ slug: req.params.slug })

    if (deckType) {
      return res.send(deckType)
    } else {
      return res.status(404).send({ message: `Deck type of slug "${req.params.slug}" not found` })
    }
  } catch (err) {
    return res.status(500).send(err)
  }
})

deckTypesRouter.get('/:slug/tops', async (req, res) => {
  try {
    const deckType = await DeckTypeModel.findOne({ slug: req.params.slug })

    if (!deckType) {
      return res.status(404).send({ message: `Deck type of slug "${req.params.slug}" not found` })
    }

    const decks = await DeckModel.find({ deckType: deckType?._id }).populate('event').populate('player')

    const response = {
      ...deckType?.toObject(),
      decks,
    }

    return res.send(response)
  } catch (err) {
    return res.status(500).send(err)
  }
})

export default deckTypesRouter
