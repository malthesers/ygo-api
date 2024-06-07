import express from 'express'
import EventModel from '../models/event'

const eventsRouter = express.Router()

eventsRouter.get('/', async (req, res) => {
  try {
    const events = await EventModel.find({}).limit(10)

    res.send(events)
  } catch (err) {
    res.status(500).send(err)
  }
})

eventsRouter.get('/:slug', async (req, res) => {
  try {
    const event = await EventModel.findOne({ slug: req.params.slug })
      .populate('winner.player')
      .populate('winner.deck')
      .populate('winner2.player')
      .populate('winner2.deck')
      .populate('winner3.player')
      .populate('winner3.deck')

    if (event) {
      res.send(event)
    } else {
      res.status(404).send({ message: `Event of slug "${req.params.slug}" not found` })
    }
  } catch (err) {
    res.status(500).send(err)
  }
})

export default eventsRouter
