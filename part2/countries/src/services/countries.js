import axios from "axios"
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = () => {
    console.log(`fetching countries from ${baseUrl}/all`)
    const request = axios.get(`${baseUrl}/all`)
    return request.then(response => response.data.map(country => country.name.common))
}

const getCountry = (name) => {
    console.log(`fetching country from ${baseUrl}/name/${name}`)
    const request = axios.get(`${baseUrl}/name/${name}`)
    return request.then(response => response.data)
}

export default {getAll, getCountry}