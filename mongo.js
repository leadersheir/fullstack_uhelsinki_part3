const mongoose = require('mongoose')

if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]
const dbName = 'phonebook'

const url = `mongodb+srv://fsuhelsinki:${password}@cluster0.powhqj1.mongodb.net/${dbName}?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

const createPerson = () => {

    const name = process.argv[3]
    const number = process.argv[4]

    const person = new Person({
        name: `${name}`,
        number: `${number}`,
    })

    person.save()
        .then(result => {
            console.log(`added ${name} number ${number} to phonebook`)
            mongoose.connection.close()
        })
}

const retrievePeople = () => {
    Person.find({}).then(result => {
        result.forEach(person => {
            const output = `${person.name} ${person.number}`
            console.log(output)
        })
        mongoose.connection.close()
    })
}

if (process.argv.length == 5) {
    createPerson()
} else if (process.argv.length == 3) {
    retrievePeople()
}