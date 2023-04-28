const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person.js')

const app = express()


morgan.token('post-content', (req, res) => {
    if (req.method === 'POST') return JSON.stringify(req.body)
})

app.use(express.static('build'))
app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-content'))

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
    Person.find({}).then(people => {
        res.json(people)
    })
})

app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id).then(person => {
        res.json(person)
    })
    .catch(err => {
        res.status(404).end()
    })
})

app.get('/info', (req, res) => {
    const n_persons = persons.length
    const date = new Date()

    res_body = `
        <p>Phonebook has info for ${n_persons} people</p>
        <p>${date}</p>
    `

    res.send(res_body)
})

app.delete('/api/persons/:id', (req, res) => {
    Person.findByIdAndDelete(req.params.id).then(res => {
        res.status(204).end()
    })
})

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (!body.name && !body.number) {
        return res.status(400).json({
            error: 'entry cannot be empty'
        })
    } else if (!body.name) {
        return res.status(400).json({
            error: 'name cannot be empty'
        })
    } else if (!body.number) {
        return res.status(400).json({
            error: 'number cannot be empty'
        })
    }

    // const duplicateName = persons.find(person => person.name === body.name)
    // const duplicateNumber = persons.find(person => person.number === body.number)

    // if (duplicateName && duplicateNumber) {
    //     return res.status(400).json({
    //         error: 'entry already in contacts'
    //     })
    // } else if (duplicateName) {
    //     return res.status(400).json({
    //         error: 'name already in contacts'
    //     })
    // } else if (duplicateNumber) {
    //     return res.status(400).json({
    //         error: 'number already in contacts'
    //     })
    // }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save().then(savedPerson => {
        res.json(savedPerson)
    })
})





const PORT = process.env.PORT ||  3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
