import React from 'react'

const Country = ({ name, setSearch }) => {
  const handleClick = (name) => {
    name = name.toLowerCase()
    setSearch(name)
  }

  return (
    <div>
      {name}
      <button type="button" onClick={() => handleClick(name)}>show</button>
    </div>
  )
}

export default Country;