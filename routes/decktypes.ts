import express from 'express'
import DeckTypeModel from '../models/decktype'

const deckTypesRouter = express.Router()

deckTypesRouter.get('/', async (req, res) => {
  try {
    const deckTypes = await DeckTypeModel.find({}).limit(10)

    res.send(deckTypes)
  } catch (err) {
    res.status(500).send(err)
  }
})

deckTypesRouter.get('/:slug', async (req, res) => {
  try {
    const deckType = await DeckTypeModel.findOne({ slug: req.params.slug })

    if (deckType) {
      res.send(deckType)
    } else {
      res.status(404).send({ message: `Deck type of slug "${req.params.slug}" not found` })
    }
  } catch (err) {
    res.status(500).send(err)
  }
})

export default deckTypesRouter
