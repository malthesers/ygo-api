import express from 'express'
import DeckModel from '../models/deck'

const decksRouter = express.Router()

decksRouter.get('/:id', async (req, res) => {
  try {
    const deck = await DeckModel.findById(req.params.id).populate([
      'deckType',
      'event',
      'player',
      'decklist.mainDeck.card',
      'decklist.extraDeck.card',
      'decklist.sideDeck.card',
    ])

    if (deck) {
      return res.send(deck)
    } else {
      return res.status(404).send({ message: 'Deck not found' })
    }
  } catch (err) {
    return res.status(500).send(err)
  }
})

export default decksRouter
