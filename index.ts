import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connect from './startup/connect'
import setupRoutes from './startup/routes'

const PORT = process.env.PORT || 3001
const app = express()

app.use(cors())
app.use(express.json())

connect()
setupRoutes(app)

app.get('/', (req, res) => {
  return res.send('YGOApi')
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
