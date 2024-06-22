import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connect from './startup/connect'
import setupRoutes from './startup/routes'

const app = express()

app.use(cors())
app.use(express.json())

// connect()
setupRoutes(app)

app.get('/', (req, res) => {
  return res.send('YGOApi')
})

export default app
