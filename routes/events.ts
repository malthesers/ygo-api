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
      .populate('winner')
      .populate('winner2')
      .populate('winner3')

    res.send(event)
  } catch (err) {
    res.status(500).send(err)
  }
})

export default eventsRouter
