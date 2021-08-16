import React from 'react'

const Countries = ({showing}) => {
  if (showing.length > 10) {
    return (
      <div>Too many matches, specify another filter</div>
    )
  }

  if (showing.length === 1) {
    return (
      <>
        {showing.map(country => {
          return (
            <div key={country.numericCode}>
              <h3>{country.name}</h3>
              <p>capital: {country.capital}</p>
              <p>population: {country.population}</p>

              <h3>Languages</h3>
              <ul>
                {country.languages.map(language => {
                  return (
                    <li key={language.iso639_1}>{language.name}</li>
                  )
                })}
              </ul>
              
              <img src={country.flag} alt="country's flag" width="200px" height="auto"></img>
            </div>
          )
        })}
      </>
    )
  }

  return (
    <div>
      {showing.map(country => {
        return (
          <div key={country.numericCode}>{country.name}</div>
        )
      })}
    </div>
  )
}

export default Countries;