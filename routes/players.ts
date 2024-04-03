import express from 'express'
import PlayerModel from '../models/player'

const playersRouter = express.Router()

playersRouter.get('/', async (req, res) => {
  try {
    const players = await PlayerModel.find({}).limit(10)

    res.send(players)
  } catch (err) {
    res.status(500).send(err)
  }
})

playersRouter.get('/:slug', async (req, res) => {
  try {
    const player = await PlayerModel.findOne({ slug: req.params.slug })

    res.send(player)
  } catch (err) {
    res.status(500).send(err)
  }
})

export default playersRouter
