import express from 'express'
import EventModel from '../models/event'
import DeckModel from '../models/deck'

const eventsRouter = express.Router()

eventsRouter.get('/', async (req, res) => {
  try {
    const events = await EventModel.find({}).limit(10)

    if (!events) {
      return res.status(404).send({ message: 'No events found' })
    }

    return res.send(events)
  } catch (err) {
    return res.status(500).send(err)
  }
})

eventsRouter.get('/type/:slug', async (req, res) => {
  const eventTypes = ['wcq', 'ycs', 'team-ycs', 'remote-ycs']

  if (!eventTypes.includes(req.params.slug)) {
    return res.status(404).send({ message: 'Event type not found' })
  }

  try {
    const events = await EventModel.find({ 'type.slug': req.params.slug })
      .populate(['winner.player', 'winner2.player', 'winner3.player'])
      .populate({ path: 'winner.deck', populate: { path: 'deckType' } })
      .populate({ path: 'winner2.deck', populate: { path: 'deckType' } })
      .populate({ path: 'winner3.deck', populate: { path: 'deckType' } })

    if (!events) {
      return res.status(404).send({ message: `Events of slug "${req.params.slug}" not found` })
    }

    return res.send(events)
  } catch (err) {
    return res.status(500).send(err)
  }
})

eventsRouter.get('/:slug', async (req, res) => {
  try {
    const event = await EventModel.findOne({ slug: req.params.slug })
      .populate(['winner.player', 'winner2.player', 'winner3.player'])
      .populate({ path: 'winner.deck', populate: { path: 'deckType' } })
      .populate({ path: 'winner2.deck', populate: { path: 'deckType' } })
      .populate({ path: 'winner3.deck', populate: { path: 'deckType' } })

    if (!event) {
      return res.status(404).send({ message: `Event of slug "${req.params.slug}" not found` })
    }

    const decks = await DeckModel.find({ event: event?._id }).populate('deckType').populate('player')

    const response = {
      ...event?.toObject(),
      decks,
    }

    return res.send(response)
  } catch (err) {
    return res.status(500).send(err)
  }
})

export default eventsRouter
