import express from 'express'
import cardsRouter from '../routes/cards'
import playersRouter from '../routes/players'

function setupRoutes(app: express.Application) {
  app.use('/cards', cardsRouter)
  app.use('/players', playersRouter)
}

export default setupRoutes
