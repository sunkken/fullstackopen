import { useEffect, useState } from 'react'
import CountryFilter from './components/CountryFilter'
import CountryName from './components/CountryName'
import countryService from './services/countries'
import weatherService from './services/weather'

function App() {
  const weather_api_key = import.meta.env.VITE_WEATHER_API_KEY
  const weather_icon_base_url = "https://openweathermap.org/img/wn/"
  const [allCountries, setAllCountries] = useState([])
  const [filterName, setFilterName] = useState('')
  const [countryDetails, setCountryDetails] = useState(null)
  const [weather, setWeather] = useState(null)

  const handleFilterChange = (event) => {setFilterName(event.target.value)}

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
        console.log('Fetched country data:', data)
        setCountryDetails(data)
      })
      .catch(error => {
        console.error('Error fetching country data:', error)
      })
  }, [country])

  useEffect(() => {
    if (!countryDetails) return

    const [lat, lng] = countryDetails.latlng

    weatherService
      .getWeather(lat, lng, weather_api_key)
      .then(data => {
        console.log('Fetched weather data:', data)
        setWeather(data)
      })
      .catch(error => {
        console.error('Error fetching weather data:', error)
      })
  }, [countryDetails])

  return (
    <div>
      <CountryFilter filterName={filterName} handleFilterChange={handleFilterChange} />

      {filteredCountries.length > 10 && (
        <p>Too many matches, specify another filter.</p>
      )}
      {filteredCountries.length > 1 && filteredCountries.length <= 10 && (
        filteredCountries.map(countryName =>
          <CountryName key={countryName} name={countryName} showInfo={() => setFilterName(countryName)} />
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

                <h2>Weather in {countryDetails.capital}</h2>
                  {weather && (
                    <div>
                      <p>Temperature {weather.main.temp} Celcius</p>
                      <img src={`${weather_icon_base_url}${weather.weather[0].icon}@2x.png`} />
                      <p>Wind {weather.wind.speed} m/s</p>
                    </div>
                  )}
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