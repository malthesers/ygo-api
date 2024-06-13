import express from 'express'
import PlayerModel from '../models/player'
import DeckModel from '../models/deck'

const playersRouter = express.Router()

playersRouter.get('/', async (req, res) => {
  try {
    const players = await PlayerModel.find({}).limit(10)

    return res.send(players)
  } catch (err) {
    return res.status(500).send(err)
  }
})

playersRouter.get('/:slug', async (req, res) => {
  try {
    const player = await PlayerModel.findOne({ slug: req.params.slug })

    if (!player) {
      return res.status(404).send({ message: `Player of slug "${req.params.slug}" not found` })
    }

    const decks = await DeckModel.find({ player: player?._id }).populate('deckType').populate('event')

    const response = {
      ...player?.toObject(),
      decks,
    }

    return res.send(response)
  } catch (err) {
    return res.status(500).send(err)
  }
})

export default playersRouter
