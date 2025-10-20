import { useEffect, useState } from 'react'
import CountryFilter from './components/CountryFilter'
import CountryName from './components/CountryName'
import countryService from './services/countries'

function App() {
  const [allCountries, setAllCountries] = useState([])
  const [filterName, setFilterName] = useState('')
  const [country, setCountry] = useState(null)

  useEffect(() => {
    countryService
      .getAll()
      .then(countries => {setAllCountries(countries)})
  }, [])

  useEffect(() => {
    console.log('effect run, country is now', country)
    if (country) {
      //code to get country info if search result list is length 1
    }
  }, [country])

  const handleFilterChange = (event) => {setFilterName(event.target.value)}

  const filteredCountries = allCountries.filter(
    c => c.toLowerCase()
    .includes(filterName.toLowerCase())
  )

  return (
    <div>
      <CountryFilter filterName={filterName} handleFilterChange={handleFilterChange} />
      {filteredCountries.map(countryName =>
        <CountryName key={countryName} name={countryName} />
      )}
    </div>
  )
}

export default App