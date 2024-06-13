import express from 'express'
import CardModel from '../models/card'

const cardsRouter = express.Router()

cardsRouter.get('/', async (req, res) => {
  try {
    const cards = await CardModel.find({}).limit(10)

    return res.send(cards)
  } catch (err) {
    return res.status(500).send(err)
  }
})

cardsRouter.get('/:id', async (req, res) => {
  try {
    const card = await CardModel.findOne({ id: req.params.id })

    if (card) {
      return res.send(card)
    } else {
      return res.status(404).send({ message: `Card with passcode ${req.params.id} not found` })
    }
  } catch (err) {
    return res.status(500).send(err)
  }
})

export default cardsRouter
