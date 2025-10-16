import { useState } from 'react'
import Person from './components/Person'

const App = () => {

  const [persons, setPersons] = useState([
    {name: 'Arto Hellas', number: '040-1234567'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = (event) => {setNewName(event.target.value)}
  const handleNumberChange = (event) => {setNewNumber(event.target.value)}

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
      const personObject = {name: newName, number: newNumber}
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          <li>name: <input value={newName} onChange={handleNameChange} /></li>
          <li>number: <input value={newNumber} onChange={handleNumberChange} /></li>
          <li><button type="submit">add</button></li>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person =>
          <Person key={person.name} person={person} />
        )}
      </div>
    </div>
  )
}

export default App