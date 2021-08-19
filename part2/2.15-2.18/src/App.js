import React, { useState, useEffect } from 'react'
import Filter from './components/filter'
import Persons from './components/persons'
import PersonForm from './components/personform'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [newSearch, setSearch] = useState('');
  const [ newName, setNewName ] = useState('');
  const [ newNum, setNewNum ] = useState('');
  const [ showAll, setShowAll ] = useState(true);

  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      const people = response.data
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

  const checkDuplicate = (name, number) => {
    const numbers = persons.map(person => person.number)
    return numbers.includes(number)
  }

  const handleClick = (e) => {
    e.preventDefault();
    const person = {name: newName, number: newNum}
    if (checkDuplicate(person.number)) {
      alert(`Number ${person.number} is already in this phonebook`)
      return
    }
    if (emptyField(person.name, person.number)) {
      alert(`Field is empty!`)
      return
    }
    setPersons(persons.concat(person))
    axios
      .post(`http://localhost:3001/persons`, person)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNum('')
      })
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
      <Persons showing={toShow}/>
    </div>
  )
}

export default App