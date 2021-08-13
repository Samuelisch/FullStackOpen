import React from 'react'

const Filter = ({searchChange}) => {
  return (
    <div>
      filter shown with <input onChange={searchChange} />
    </div>
  )
}

export default Filter;