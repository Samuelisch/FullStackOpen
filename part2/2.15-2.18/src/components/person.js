import React from 'react'

const Person = ({name, number, toggleDelete}) => {
  return (
    <div>
      {name} {number}
      <button type="button" onClick={toggleDelete}>Delete</button>
    </div>
  )
}

export default Person;