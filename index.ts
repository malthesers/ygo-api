import 'dotenv/config'
import setupRoutes from './startup/routes'
import connect from './startup/connect'
import express from 'express'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './swagger/swagger.json'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

connect()
setupRoutes(app)

app.get('/', (req, res) => {
  return res.send('YGOApi')
})

export default app
