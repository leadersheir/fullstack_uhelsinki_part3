import personsService from './services/persons'

import Filter from './components/Filter'
import Notification from './components/Notification'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

import { useState, useEffect } from 'react'

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    personsService
      .getAllPersons()
      .then(persons => setPersons(persons))
  }, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const [filterText, setFilterText] = useState('')

  const [showNotification, setShowNotification] = useState(false)
  const [notificationType, setNotificationType] = useState(null)
  const [deletionSubject, setDeletionSubject] = useState(null)

  const handleNameChange = e => {
    setNewName(e.target.value)
  }
  const handleNumberChange = e => {
    setNewNumber(e.target.value)
  }

  const handleFilterTextChange = e => {
    setFilterText(e.target.value)
  }

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filterText.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      {showNotification ? <Notification name={deletionSubject} type={notificationType}/> : <></>}
      <Filter filterText={filterText} handleFilterTextChange={handleFilterTextChange} />
      <PersonForm 
        newName={newName}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        persons={persons}
        setPersons={setPersons}
        setShowNotification={setShowNotification}
        setNotificationType={setNotificationType}        
        setDeletionSubject={setDeletionSubject}
      />
      <Persons
        persons={filteredPersons}
        setPersons={setPersons}
        setDeletionSubject={setDeletionSubject}
        setShowNotification={setShowNotification}
        setNotificationType={setNotificationType}
      />
    </div>
  )
}

export default App