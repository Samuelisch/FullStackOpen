import React from 'react'

const Filter = ({searchChange}) => {
  return (
    <div>
      filter countries: <input onChange={searchChange} />
    </div>
  )
}

export default Filter;