import { useState } from 'react'
import Person from './components/Person'

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
      <div>
        <li>Filter by name: <input value={filterName} onChange={handleFilterChange} /></li>
      </div>
      <h2>Add new entry</h2>
      <form onSubmit={addPerson}>
        <div>
          <li>name: <input value={newName} onChange={handleNameChange} /></li>
          <li>number: <input value={newNumber} onChange={handleNumberChange} /></li>
          <li><button type="submit">add</button></li>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {filteredPersons.map(person =>
          <Person key={person.id} person={person} />
        )}
      </div>
    </div>
  )
}

export default App