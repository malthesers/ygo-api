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

playersRouter.get('/:id', async (req, res) => {
  try {
    const player = await PlayerModel.findById(req.params.id)

    res.send(player)
  } catch (err) {
    res.status(500).send(err)
  }
})

export default playersRouter
