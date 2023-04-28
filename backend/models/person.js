const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const dbUri = process.env.MONGODB_URI

console.log('connecting to', dbUri)

mongoose.connect(dbUri).then(result => {
    console.log('connected to MongoDB')
})
.catch(err => {
    console.log('error connecting to MongoDB', err.message)
})

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

personSchema.set('toJSON', {
    transform: (doc, returnedObj) => {
        returnedObj.id = returnedObj._id.toString()
        delete returnedObj._id
        delete returnedObj.__v
    }
})

module.exports = mongoose.model('Person', personSchema)