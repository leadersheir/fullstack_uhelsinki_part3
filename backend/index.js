const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const Person = require("./models/person.js")

const app = express()


morgan.token("post-content", (req, res) => {
    if (req.method === "POST") return JSON.stringify(req.body)
})

const errorHandler = (err, req, res, next) => {
    console.error(err.message)

    if (err.name === "CastError") {
        return res.status(400).send({ error: "malformatted id" })
    } else if (err.name === "ValidationError") {
        return res.status(400).json({ error: err.message })
    }

    next(err)
}

app.use(express.static("build"))
app.use(cors())
app.use(express.json())
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :post-content"))
// the last middleware must be the error handler

app.get("/", (req, res) => {
    res.send("<h1>Hello World!</h1>")
})

app.get("/api/persons", (req, res) => {
    Person.find({}).then(people => {
        res.json(people)
    })
})

app.get("/api/persons/:id", (req, res, next) => {
    Person.findById(req.params.id).then(person => {
        if (person) {
            res.json(person)
        } else {
            res.status(404).end()
        }
    })
        .catch(err => next(err))
})

app.get("/info", (req, res) => {
    Person.find({}).then(people => {
        const n_people = people.length
        const date = new Date()
        const res_body = `
            <p>Phonebook has info for ${n_people} people</p>
            <p>${date}</p>
        `
        res.send(res_body)
    })
})

app.delete("/api/persons/:id", (req, res, next) => {
    Person.findByIdAndDelete(req.params.id).then(result => {
        res.status(204).end()
    })
        .catch(err => next(err))
})

app.post("/api/persons", (req, res, next) => {

    const name = req.body.name
    const number = req.body.number

    if (!name && !number) {
        return res.status(400).json({
            error: "entry cannot be empty"
        })
    } else if (!name) {
        return res.status(400).json({
            error: "name cannot be empty"
        })
    } else if (!number) {
        return res.status(400).json({
            error: "number cannot be empty"
        })
    }

    const person = new Person({
        name,
        number
    })

    person.save().then(savedPerson => {
        res.json(savedPerson)
    })
        .catch(err => next(err))
})

app.put("/api/persons/:id", (req, res) => {
    const id = req.params.id
    const body = req.body

    Person.findByIdAndUpdate(id, body).then(result => {
        res.json({ id, ...body })
    })
})



app.use(errorHandler)

const PORT = process.env.PORT ||  3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
