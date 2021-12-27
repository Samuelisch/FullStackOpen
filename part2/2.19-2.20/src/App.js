import React, { useState, useEffect } from 'react'
import Filter from './components/filter'
import Person from './components/person'
import PersonForm from './components/personform'
import server from './components/server'
import Notification from './components/notifications'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newSearch, setSearch ] = useState('');
  const [ newName, setNewName ] = useState('');
  const [ newNum, setNewNum ] = useState('');
  const [ showAll, setShowAll ] = useState(true);
  const [ notifMsg, setNotifMsg ] = useState(null);

  useEffect(() => {
    server.getAll()
    .then(initialContacts => {
      const people = initialContacts
      setPersons(people)
    })
  }, [])

  const setNotifMsgInfo = (text, type="success") => {
    setNotifMsg({ text, type })
    setTimeout(() => {
      setNotifMsg(null)
    }, 5000)
  }

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
    if (existingPersons) {
      return existingPersons.id
    } else {
      return false
    }
  }

  const updateNum = (person, existingId) => {
    if (window.confirm(`${person.name} is already in this phonebook, replace with new number?`)) {
      const oldPerson = persons.find(person => person.id === existingId)
      person.oldNumber = oldPerson.number
      server.update(existingId, person)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== existingId ? person : returnedPerson))
          setNotifMsgInfo(`Updated ${person.name}'s number to ${person.number}`)
        })
        .catch(err => {
          setNotifMsgInfo(err.response.data.error, 'error')
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
      setNotifMsgInfo(`Field is empty!`, 'error')
      return
    }
    server.create(person)
      .then(returnedContact => {
        setPersons(persons.concat(returnedContact))
        setNotifMsgInfo(`Added ${person.name} to the phonebook`)
      })
      .catch(err => setNotifMsgInfo(err.response.data.error, 'error'))
  }

  const toggleDeletePerson = id => {
    if (window.confirm('Do you really want to delete?')) {
      const personToDelete = persons.find(person => person.id === id)
      server.deletePerson(id)
        .then(deletedContact => {
          setNotifMsgInfo(`${personToDelete.name} has been deleted from the phonebook`)
          setPersons(persons.filter(person => person.id !== id))
      })
        .catch(error => {
          setNotifMsgInfo(`${personToDelete.name} has already been deleted`, 'error')
          setPersons(persons.filter(person => person.id !== id))
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notif={notifMsg} />
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