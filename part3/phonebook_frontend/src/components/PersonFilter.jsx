const PersonFilter = ({
    filterName,
    handleFilterChange
}) => (
  <div>
    <li>Filter by name: <input value={filterName} onChange={handleFilterChange} /></li>
  </div>
)

export default PersonFilter