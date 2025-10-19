import { useEffect, useState } from 'react'
import personService from './services/persons'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import PersonFilter from './components/PersonFilter'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  const handleNameChange = (event) => {setNewName(event.target.value)}
  const handleNumberChange = (event) => {setNewNumber(event.target.value)}
  const handleFilterChange = (event) => {setFilterName(event.target.value)}

  const handleAddPerson = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(person =>
      person.name.toLowerCase().trim() === newName.toLowerCase().trim())

    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        console.log('Updating', newName)
        const changedPerson = { ...existingPerson, number: newNumber }

        personService
          .update(existingPerson.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id === returnedPerson.id ? returnedPerson : person))
            setNewName('')
            setNewNumber('')
          })
      }
    } else {
      const personObject = {name: newName, number: newNumber}
      console.log('Adding', newName)

      personService
        .create(personObject)
        .then(addedPerson => {
          setPersons(persons.concat(addedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const handleRemovePerson = (id) => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      console.log('Removing', person.name)

      personService
        .remove(id)
        .then(setPersons(persons.filter(p => p.id !== id)))
    }
  }

  const filteredPersons = persons.filter(
    person => person.name.toLowerCase()
      .includes(filterName.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
        <PersonFilter
          filterName={filterName}
          handleFilterChange={handleFilterChange}
        />
      
      <h3>Add new entry</h3>
        <PersonForm
          addPerson={handleAddPerson}
          newName={newName}
          handleNameChange={handleNameChange}
          newNumber={newNumber}
          handleNumberChange={handleNumberChange}
        />

      <h3>Numbers</h3>
      <table>
        <tbody>
          {filteredPersons.map(person =>
            <Person
              key={person.id}
              person={person}
              removePerson={() => handleRemovePerson(person.id)} />
          )}
        </tbody>
      </table>
    </div>
  )
}

export default App