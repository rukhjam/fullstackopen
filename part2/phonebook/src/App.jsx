import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'
import personService from './services/persons'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterString, setFilterString] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationClass, setNotificationClass] = useState('')

  useEffect(() => {
    personService.getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleNameSubmit = (event) => {
    event.preventDefault()

    const foundPerson = persons.find(person => person.name === newName)

    if (foundPerson === undefined) {
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService.create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setNotificationMessage(`Added ${returnedPerson.name}`)
          setNotificationClass('message')
          setTimeout(() => {
            setNotificationMessage(null)
            setNotificationClass('')
          }, 5000)
        })
    } else {
      if (window.confirm(`${foundPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        const changedPerson = { ...foundPerson, number: newNumber }
        personService.update(foundPerson.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id === foundPerson.id ? returnedPerson : person))
            setNewName('')
            setNewNumber('')
            setNotificationMessage(`Number of ${returnedPerson.name} changed to ${returnedPerson.number}`)
            setNotificationClass('message')
            setTimeout(() => {
              setNotificationMessage(null)
              setNotificationClass('')
            }, 5000)
          })
      }
    }
  }

  const deletePerson = id => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService.deletePerson(id).then(returnedPerson => {
        setPersons(persons.filter(person => person.id !== id))
        setNotificationMessage(`Information of ${returnedPerson.name} deleted`)
        setNotificationClass('message')
        setTimeout(() => {
          setNotificationMessage(null)
          setNotificationClass('')
        }, 5000)
      })
        .catch(error => {
          setNotificationMessage(`Information of ${person.name} already removed from server`)
          setNotificationClass('error')
          setTimeout(() => {
            setNotificationMessage(null)
            setNotificationClass('')
          }, 5000)
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  const handleNameChange = (event) => setNewName(event.target.value)

  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const handleFilterString = (event) => setFilterString(event.target.value)

  const namesToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filterString.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notificationMessage} notificationClass={notificationClass} />

      <Filter filterString={filterString} handleFilterString={handleFilterString} />

      <h3>Add a new</h3>
      <PersonForm handleNameSubmit={handleNameSubmit}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange} />

      <h3>Numbers</h3>

      {namesToShow.map(person =>
        <Person key={person.id}
          person={person}
          deletePerson={() => deletePerson(person.id)}
        />
      )}
    </div>
  )
}

export default App
