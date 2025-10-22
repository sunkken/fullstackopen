import { useEffect, useState } from 'react'
import CountryFilter from './components/CountryFilter'
import CountryName from './components/CountryName'
import countryService from './services/countries'

function App() {
  const [allCountries, setAllCountries] = useState([])
  const [countryDetails, setCountryDetails] = useState(null)
  const [filterName, setFilterName] = useState('')

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
      setCountryDetails(null)
      return
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
        <p>Too many matches, specify another filter.</p>
      )}
      {filteredCountries.length > 1 && filteredCountries.length <= 10 && (
        filteredCountries.map(countryName =>
          <CountryName key={countryName} name={countryName} />
        )
      )}

      {filteredCountries.length === 1 && (
        <div>
          <h1>{filteredCountries[0]}</h1>
            {countryDetails && (
              <div>
                <li>Capital: {countryDetails.capital}</li>
                <li>Area: {countryDetails.area}</li>

                <h2>Languages</h2>
                <ul>
                  {Object.values(countryDetails.languages).map(lang => (
                    <li key={lang}>{lang}</li>
                  ))}
                </ul>

                <img src={countryDetails.flags.png} width="200" />
              </div>
            )}
        </div>   
      )}

      {filteredCountries.length === 0 && (
        <p>No match found.</p>
      )}
    </div>
  )
}

export default App