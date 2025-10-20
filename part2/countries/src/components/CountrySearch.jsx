const CountrySearch = ({
    searchName,
    handleSearchChange
}) => (
  <div>
    <li>find countries <input value={searchName} onChange={handleSearchChange} /></li>
  </div>
)

export default CountrySearch