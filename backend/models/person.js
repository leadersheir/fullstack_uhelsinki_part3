const mongoose = require("mongoose")

mongoose.set("strictQuery", false)

const dbUri = process.env.MONGODB_URI

console.log("connecting to", dbUri)

mongoose.connect(dbUri).then(result => {
    console.log("connected to MongoDB")
})
    .catch(err => {
        console.log("error connecting to MongoDB", err.message)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: {
        type: String,
        minLength: 9,
        validate: {
            validator: (n) => {
                return /\d{2}-\d*/.test(n) && !/\d{4}-\d*/.test(n) && !/\d*-\d*-/.test(n)
            }
        },
        required: true
    },
})

personSchema.set("toJSON", {
    transform: (doc, returnedObj) => {
        returnedObj.id = returnedObj._id.toString()
        delete returnedObj._id
        delete returnedObj.__v
    }
})

module.exports = mongoose.model("Person", personSchema)