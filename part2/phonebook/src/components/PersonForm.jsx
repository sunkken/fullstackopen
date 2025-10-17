const PersonForm = ({
    addPerson,
    newName,
    handleNameChange,
    newNumber,
    handleNumberChange
}) => (
      <form onSubmit={addPerson}>
        <div>
          <li>name: <input value={newName} onChange={handleNameChange} /></li>
          <li>number: <input value={newNumber} onChange={handleNumberChange} /></li>
          <li><button type="submit">add</button></li>
        </div>
      </form>
)

export default PersonForm
