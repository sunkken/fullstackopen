const CountryFilter = ({
    filterName,
    handleFilterChange
}) => (
  <div>
    <p>find countries <input value={filterName} onChange={handleFilterChange} /></p>
  </div>
)

export default CountryFilter