import express from 'express'
import cardsRouter from '../routes/cards'
import playersRouter from '../routes/players'
import deckTypesRouter from '../routes/decktypes'

function setupRoutes(app: express.Application) {
  app.use('/cards', cardsRouter)
  app.use('/players', playersRouter)
  app.use('/decks', deckTypesRouter)
}

export default setupRoutes
