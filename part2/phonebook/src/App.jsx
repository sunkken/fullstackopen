import { useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import PersonFilter from './components/PersonFilter'

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  const handleNameChange = (event) => {setNewName(event.target.value)}
  const handleNumberChange = (event) => {setNewNumber(event.target.value)}
  const handleFilterChange = (event) => {setFilterName(event.target.value)}

  const addPerson = (event) => {
    event.preventDefault()
    //console.log(persons)
    //console.log(newName)
    //Currently trying to hinder all name conflicts.
      const nameExists = persons.some(person =>
        person.name.toLowerCase().trim() === newName.toLowerCase().trim())

    if (nameExists) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }

      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
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
          addPerson={addPerson}
          newName={newName}
          handleNameChange={handleNameChange}
          newNumber={newNumber}
          handleNumberChange={handleNumberChange}
        />

      <h3>Numbers</h3>
        <Persons filteredPersons={filteredPersons} />
    </div>
  )
}

export default App