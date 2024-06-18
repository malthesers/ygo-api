import express from 'express'
import CardModel from '../models/card'
import DeckModel from '../models/deck'
import getCardsQuery from '../queries/getCardsQuery'

const cardsRouter = express.Router()

cardsRouter.get('/', async (req, res) => {
  const query = getCardsQuery(req)
  const limit = 20
  const page = parseInt(req.query['page'] as string)

  try {
    const cards = await CardModel.find(query)
      .sort({ name: 'asc' })
      .limit(limit)
      .skip(page * limit)

    const response = {
      length: cards.length,
      cards,
    }

    return res.send(response)
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

cardsRouter.get('/:id/decks', async (req, res) => {
  try {
    const card = await CardModel.findOne({ id: req.params.id })

    if (!card) {
      return res.status(404).send({ message: `Card with passcode ${req.params.id} not found` })
    }

    const decks = await DeckModel.find({
      $or: [
        { 'decklist.mainDeck': { $elemMatch: { card: card._id } } },
        { 'decklist.extraDeck': { $elemMatch: { card: card._id } } },
        { 'decklist.sideDeck': { $elemMatch: { card: card._id } } },
      ],
    }).populate(['deckType', 'event', 'player'])

    const response = {
      ...card.toObject(),
      decks,
    }

    return res.send(response)
  } catch (err) {
    return res.status(500).send(err)
  }
})

export default cardsRouter
