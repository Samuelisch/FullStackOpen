import React, { useState, useEffect } from 'react'
import Filter from './components/filter'
import Countries from './components/countries'
import Info from './components/countryInfo'
import axios from 'axios'

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [newSearch, setSearch] = useState('');

  const hook = () => {
    axios.get('https://restcountries.eu/rest/v2/all').then(response => {
      setCountries(response.data)
    })
  }

  useEffect(hook, [])

  const handleSearchInputChange = (e) => {
    setSearch(e.target.value);
  }

  const toShow = countries.filter(country => country.name.toLowerCase().includes(newSearch));

  return (
    <div>
      <Filter searchChange={handleSearchInputChange} />
      <Countries showing={toShow}/>
    </div>
  )
}

export default App