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
    const nameExists = persons.some(person =>
      person.name.toLowerCase().trim() === newName.toLowerCase().trim())

    if (nameExists) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }

      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const handleRemovePerson = (id) => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      console.log('Deleting', id)
      
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