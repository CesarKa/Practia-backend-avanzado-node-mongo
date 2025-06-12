import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

export default function connectMongoose() {
  return mongoose.connect(process.env.MONGODB_URI)
    .then(mongoose => mongoose.connection)
}

