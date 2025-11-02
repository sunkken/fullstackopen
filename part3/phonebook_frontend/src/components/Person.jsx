const Person = ({ person, removePerson }) => {
  return (
    <tr>
      <td>{person.name}</td>
      <td>{person.number}</td>
      <td><button onClick={removePerson}>delete</button></td>
    </tr>
  )}

export default Person