import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc'
import connect from './startup/connect'
import setupRoutes from './startup/routes'
import swaggerJSDoc from 'swagger-jsdoc'

const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    info: {
      title: 'YGO API',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.ts'],
}
const swaggerDocs = swaggerJsDoc(swaggerOptions)

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

connect()
setupRoutes(app)

app.get('/', (req, res) => {
  return res.send('YGOApi')
})

export default app
