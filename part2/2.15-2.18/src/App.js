import React, { useState, useEffect } from 'react'
import Filter from './components/filter'
import Person from './components/person'
import PersonForm from './components/personform'
import server from './components/server'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [newSearch, setSearch] = useState('');
  const [ newName, setNewName ] = useState('');
  const [ newNum, setNewNum ] = useState('');
  const [ showAll, setShowAll ] = useState(true);

  useEffect(() => {
    server.getAll()
    .then(initialContacts => {
      const people = initialContacts
      setPersons(people)
    })
  }, [])

  const handleSearchInputChange = (e) => {
    setShowAll(false);
    setSearch(e.target.value);
  }

  const toShow = showAll 
  ? persons 
  : persons.filter(person => person.name.toLowerCase().includes(newSearch))

  const handleNameInputChange = (e) => {
    setNewName(e.target.value);
  }

  const handleNumInputChange = (e) => {
    setNewNum(e.target.value);
  }

  const emptyField = (name, number) => {
    return name === '' || number === ''
  }

  const checkDuplicate = (name) => {
    const existingPersons = persons.find(person => person.name === name)
    return existingPersons.id
  }

  const updateNum = (person, existingId) => {
    if (window.confirm(`${person.name} is already in this phonebook, replace with new number?`)) {
      server.update(existingId, person)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== existingId ? person : returnedPerson))
        })
    }
  }

  const handleClick = (e) => {
    e.preventDefault();
    const person = {name: newName, number: newNum}
    const existingId = checkDuplicate(person.name)
    if (existingId) {
      updateNum(person, existingId)
      return
    }
    if (emptyField(person.name, person.number)) {
      alert(`Field is empty!`)
      return
    }
    setPersons(persons.concat(person))
    server.create(person)
      .then(returnedContact => {
        setPersons(persons.concat(returnedContact))
      })
  }

  const toggleDeletePerson = id => {
    if (window.confirm('Do you really want to delete?')) {
      server.deletePerson(id)
        .then(deletedContact => {
          setPersons(persons.filter(person => person.id !== id))
      })
        .catch(error => {
          alert(`this contact has already been deleted`)
          setPersons(persons.filter(person => person.id !== id))
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchChange={handleSearchInputChange} />
      <h3>Add a new</h3>
      <PersonForm 
        nameChange={handleNameInputChange}
        numChange={handleNumInputChange}
        btnClick={handleClick}
      />
      <h3>Numbers</h3>
      <div>
        {toShow.map(person => {
          return (
            <div key={person.id}>
              <Person 
                name={person.name}
                number={person.number}
                toggleDelete={() => toggleDeletePerson(person.id)}
              />
            </div>
          )
          })}
      </div>
    </div>
  )
}

export default App