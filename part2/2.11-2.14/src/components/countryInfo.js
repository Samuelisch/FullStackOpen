import React from 'react'
import Weather from './weather'

const Info = ({ selected }) => {
  return (
    <div>
      <h3>{selected.name}</h3>
      <p>capital: {selected.capital}</p>
      <p>population: {selected.population}</p>

      <h3>Languages</h3>
      <ul>
        {selected.languages.map(language => {
          return (
            <li key={language.iso639_1}>{language.name}</li>
          )
        })}
      </ul>
      
      <img src={selected.flag} alt="country's flag" width="200px" height="auto"></img>
      <Weather country={selected.name} />
    </div>
  )
}

export default Info;