const express = require('express')
const app = express()

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
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
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
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})

app.use(express.json())

const genId = () => {
    const id = Math.floor(Math.random()*1000000)

    return id
}

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

    const duplicateName = persons.find(person => person.name === body.name)
    const duplicateNumber = persons.find(person => person.number === body.number)

    if (duplicateName && duplicateNumber) {
        return res.status(400).json({
            error: 'entry already in contacts'
        })
    } else if (duplicateName) {
        return res.status(400).json({
            error: 'name already in contacts'
        })
    } else if (duplicateNumber) {
        return res.status(400).json({
            error: 'number already in contacts'
        })
    }

    let person = {
        id: genId(),
        name: body.name,
        number: body.number
    }

    persons = [...persons, person]

    res.json(person)
})



const PORT = 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))