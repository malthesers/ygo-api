import express from 'express'
import cardsRouter from '../routes/cards'

function setupRoutes(app: express.Application) {
  app.use('/cards', cardsRouter)
}

export default setupRoutes
