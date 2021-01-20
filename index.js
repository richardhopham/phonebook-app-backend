import './config.js'
import express from 'express'
import cors from 'cors'
import Person from './models/person.js'
const app = express()
app.use(express.static('build'))
app.use(express.json())
app.use(cors())

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id).then(person => {
        if(person) {
            response.json(person)
        } else {
            response.status(404).end()
        }
    })
    .catch(error => next(error)) 
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
    .then(result => {
        response.status(204).end()
    })
    .catch(error => next(error))
})

app.get('/info', (request, response) => {
    const now = new Date
    response.send(
        `<div>Phonebook has info for ${persons.length} people</div>
         <br>
         <div>${now}</div>
        `
    )

})

app.post('/api/persons', (request, response, next) => {
    const body = request.body
    const person = new Person({
        name: body.name,
        number: body.number,
    })
    person.save().then(savedPerson => { savedPerson.toJSON() })
    .then(savedFormattedPerson => {
        response.json(savedFormattedPerson)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.log(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if(error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    } 
    
    next(error)   
}

app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})