import express from 'express'
import cardsRouter from '../routes/cards'
import playersRouter from '../routes/players'
import deckTypesRouter from '../routes/decktypes'
import eventsRouter from '../routes/events'

function setupRoutes(app: express.Application) {
  app.use('/cards', cardsRouter)
  app.use('/players', playersRouter)
  app.use('/decks', deckTypesRouter)
  app.use('/events', eventsRouter)
}

export default setupRoutes
