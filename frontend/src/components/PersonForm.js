import personsService from '../services/persons'

const PersonForm = ({
    newName,
    setNewName,
    newNumber,
    setNewNumber,
    handleNameChange,
    handleNumberChange,
    persons,
    setPersons,
    setShowNotification,
    setNotificationType,
    setDeletionSubject
}) => {

    const clearForm = () => {
        setNewName('')
        setNewNumber('')
    }

    const addNewPerson = e => {
        e.preventDefault()
        const newPersonObject = {
        name : newName,
        number : newNumber
        }

        const duplicateName = persons.filter(person => person.name===newName).length !== 0
        const duplicateNumber = persons.filter(person => person.number===newNumber).length !== 0

        if (!duplicateName && !duplicateNumber) {

            personsService
                .createNewPerson(newPersonObject)
                .then(person => {
                    setPersons([...persons, person])
                    setDeletionSubject(newName)
                    setShowNotification(true)
                    setNotificationType('suc')

                    setTimeout(() => {
                        setDeletionSubject(null)
                        setShowNotification(false)
                        setNotificationType(null)
                        
                        clearForm()
                    }, 5000)
                })
        } else if (duplicateName && !duplicateNumber) {
            const duplicatePerson = persons.filter(person => person.name===newName)[0]
            if (window.confirm(`${duplicatePerson.name} already exists. Replace old number with new one?`)) {
                personsService.updatePerson(duplicatePerson.id, newPersonObject)
                .then(updatedPerson => {
                    setPersons(persons.map(person => person.id!==updatedPerson.id ? person : {...person, number: updatedPerson.number}))
                    clearForm()
                })
            }
        } else if (!duplicateName && duplicateNumber) {
            const duplicatePerson = persons.filter(person => person.number===newNumber)[0]
            if (window.confirm(`${duplicatePerson.number} already exists. Replace old name with new one?`)) {
                personsService.updatePerson(duplicatePerson.id, newPersonObject)
                .then(updatedPerson => {
                    setPersons(persons.map(person => person.id!==updatedPerson.id ? person : {...person, name: updatedPerson.name}))
                    clearForm()
                })
            }
        } else {
            alert(`Contact already exists in phonebook`)
        }
    }

    return (
     <div>
        <h2>add new contact</h2>
        <form onSubmit={addNewPerson}>
            <div>
                name: <input value={newName} onChange={handleNameChange} />
            </div>
            <div>
                number: <input value={newNumber} onChange={handleNumberChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>   
    </div>
    )
}

export default PersonForm