import React from 'react'

const Persons = ({showing}) => {
  return (
    <div>
      {showing.map(person => {
        return (
          <div key={person.id}>{person.name} {person.number}</div>
        )
      })}
    </div>
  )
}

export default Persons;