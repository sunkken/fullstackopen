import { useEffect, useState } from 'react'
import CountryFilter from './components/CountrySearch'
import countryService from './services/countries'

function App() {
  const [searchName, setSearchName] = useState('')
  const [countries, setCountries] = useState({})

  useEffect(() => {
    countryService
      .getAll()
      //.then(countries => {setCountries(countries)})
  }, [])

  const handleChange = (event) => {
    console.log(event.target.value)
    setSearchName(event.target.value)
  }

  return (
    <div>
      <CountryFilter
        searchName={searchName}
        handleSearchChange={handleChange}
      />
    </div>
  )
}

export default App