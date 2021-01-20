import mongoose from 'mongoose'


mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
    name: String, 
    number: String,
    date: Date,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length == 2) {
    console.log("phonebook:")
    Person.find({}).then(persons => {
        persons.forEach(person => {
            console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })
} else if (process.argv.length == 4) {
    const name = process.argv[2]
    const number = process.argv[3]
    const person = new Person({
        name: name,
        number: number,
        date: new Date(),
    })
    person.save().then(result => {
        console.log(`added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
    })
} else {
    console.log("Incorrect argument length")
    mongoose.connection.close()
}

