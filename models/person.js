import mongoose from 'mongoose'
import 'mongoose-unique-validator'

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })


const personSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true,
    }, 
    number: {
      type: String,
      required: true,
    },
    date: Date,
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })


const Person = mongoose.model('Person', personSchema)

export default Person