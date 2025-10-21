import { useEffect, useState } from 'react'
import CountryFilter from './components/CountryFilter'
import CountryName from './components/CountryName'
import countryService from './services/countries'

function App() {
  const [allCountries, setAllCountries] = useState([])
  const [filterName, setFilterName] = useState('')
  const [countryDetails, setCountryDetails] = useState(null);

  const filteredCountries = allCountries.filter(
    c => c.toLowerCase()
    .includes(filterName.toLowerCase())
  )
  const country = filteredCountries.length === 1
    ? filteredCountries[0]
    : null

  useEffect(() => {
    countryService
      .getAll()
      .then(countries => {setAllCountries(countries)})
  }, [])

  useEffect(() => {
    if (!country) {
      setCountryDetails(null);
      return;
    }

    countryService
      .getCountry(country)
      .then(data => {
        console.log('Fetched country data:', data);
        setCountryDetails(data);
      })
      .catch(error => {
        console.error('Error fetching country data:', error);
      });
  }, [country])

  const handleFilterChange = (event) => {setFilterName(event.target.value)}

  return (
    <div>
      <CountryFilter filterName={filterName} handleFilterChange={handleFilterChange} />

      {filteredCountries.length > 10 && (
        <li>Too many matches, specify another filter.</li>
      )}
      {filteredCountries.length > 1 && filteredCountries.length <= 10 && (
        filteredCountries.map(countryName =>
          <CountryName key={countryName} name={countryName} />
        )
      )}

      {filteredCountries.length === 1 && (
        //code to setCo
        <h2>{filteredCountries[0]}</h2>
      )}

      {filteredCountries.length === 0 && (
        <li>No match found.</li>
      )}
    </div>
  )
}

export default App