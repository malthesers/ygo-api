import express from 'express'
import CardModel from '../models/card'

const cardsRouter = express.Router()

cardsRouter.get('/', async (req, res) => {
  try {
    const cards = await CardModel.find({}).limit(10)

    res.send(cards)
  } catch (err) {
    res.status(500).send(err)
  }
})

cardsRouter.get('/:id', async (req, res) => {
  try {
    const card = await CardModel.findOne({ id: req.params.id })

    res.send(card)
  } catch (err) {
    res.status(500).send(err)
  }
})

export default cardsRouter
