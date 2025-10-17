const Person = ({ person }) => {
  return <li>{person.name} {person.number}</li>
}

const Persons = ({ filteredPersons }) => (
  <div>
    {filteredPersons.map(person =>
     <Person key={person.id} person={person} />
    )}
  </div>
)

export default Persons