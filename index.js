import express, { json } from 'express'
import morgan from 'morgan'
import cors from 'cors'
const app = express()

app.use(express.json())
app.use(cors())

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "40981204981"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "430928420"
    },
    {
        id: 3,
        name: "Richard Pham",
        number: "4093284",
    },
    {
        id: 4,
        name: "Mary Poppendick",
        number: "095843905",
    },
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if(person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
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

app.post('/api/persons', (request, response) => {
    const body = request.body
    if(!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number is missing'
        })
    } else if(persons.find(person => person.name === body.name)) {
        return response.status(400).json({
            error: 'name already exists in the phonebook'
        })
    }
    const person = {
        id: Math.floor(Math.random()*Math.floor(10000)),
        name: body.name,
        number: body.number,
    }
    persons = persons.concat(person)
    response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})