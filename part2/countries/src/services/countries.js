import axios from "axios";
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = () => {
    console.log(`fetching countries from ${baseUrl}/all`)
    return null
}

const getCountry = () => {
    console.log(`fetching country from ${baseUrl}/name/{name}`)
    return null
}

export default {getAll, getCountry}