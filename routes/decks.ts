import express from 'express'
import DeckModel from '../models/deck'

const decksRouter = express.Router()

decksRouter.get('/:id', async (req, res) => {
  try {
    const deck = await DeckModel.findById(req.params.id)
      .populate('deckType')
      .populate('event')
      .populate('player')
      .populate('decklist.mainDeck.card')
      .populate('decklist.extraDeck.card')
      .populate('decklist.sideDeck.card')

    if (deck) {
      res.send(deck)
    } else {
      res.status(404).send({ message: 'Deck not found' })
    }
  } catch (err) {
    res.status(500).send(err)
  }
})

export default decksRouter
