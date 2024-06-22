import mongoose from 'mongoose'

export default () => {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGO_URI is not defined')
  }

  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error(err))
}
