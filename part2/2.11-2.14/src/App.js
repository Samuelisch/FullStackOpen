import React, { useState, useEffect } from 'react'
import Filter from './components/filter'
import Countries from './components/countries'
import axios from 'axios'

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [newSearch, setSearch] = useState('');

  useEffect(() => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountries(response.data)
    })
  }, [])

  const handleSearchInputChange = (e) => {
    const input = e.target.value.toLowerCase()
    setSearch(input);
  }

  const toShow = countries.filter(country => country.name.toLowerCase().includes(newSearch));

  return (
    <div>
      <Filter searchChange={handleSearchInputChange} />
      <Countries showing={toShow} setSearch={setSearch} />
    </div>
  )
}

export default App