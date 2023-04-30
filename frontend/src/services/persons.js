import axios from 'axios'
const baseUrl = '/api/persons'

const createNewPerson = newPersonObject => (
    axios
        .post(baseUrl, newPersonObject)
        .then(res => res.data)
        .catch(err => Promise.reject(err))
)

const getAllPersons = () => (
    axios
        .get(baseUrl)
        .then(res => res.data)
)

const updatePerson = (id, newPersonObject) => (
    axios
        .put(`${baseUrl}/${id}`, newPersonObject)
        .then(res => res.data)
)

const deletePerson = id => (
    axios
        .delete(`${baseUrl}/${id}`)
)

const personsService = {
    createNewPerson,
    getAllPersons,
    updatePerson,
    deletePerson
}

export default personsService