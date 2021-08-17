import React from 'react'
import Info from './countryInfo'
import Country from './country'

const Countries = ({ showing, setSearch }) => {
  if (showing.length > 10) {
    return (
      <div>Too many matches, specify another filter</div>
    )
  }

  if (showing.length === 1) {
    return (
      <>
        {showing.map(selected => {
          return (
            <div key={selected.numericCode}>
              <Info selected={selected} />
            </div>
          )
        })}
      </>
    )
  }

  return (
    <>
      {showing.map(country => {
        return (
          <div key={country.numericCode}>
            <Country name={country.name} setSearch={setSearch} />
          </div>
        )
      })}
    </>
  )
}

export default Countries;