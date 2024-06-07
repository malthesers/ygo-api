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

    if (player) {
      res.send(player)
    } else {
      res.status(404).send({ message: `Player of slug "${req.params.slug}" not found` })
    }
  } catch (err) {
    res.status(500).send(err)
  }
})

export default playersRouter
