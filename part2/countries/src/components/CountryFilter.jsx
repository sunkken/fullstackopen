const CountryFilter = ({
    filterName,
    handleFilterChange
}) => (
  <div>
    <li>find countries <input value={filterName} onChange={handleFilterChange} /></li>
  </div>
)

export default CountryFilter