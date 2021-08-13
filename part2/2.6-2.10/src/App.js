import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 0 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 1 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 2 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 3 }
  ]) 
  const [newSearch, setSearch] = useState('');
  const [ newName, setNewName ] = useState('');
  const [ newNum, setNewNum ] = useState('');
  const [ showAll, setShowAll ] = useState(true);

  const handleSearchInputChange = (e) => {
    setShowAll(false);
    setSearch(e.target.value);
  }

  const toShow = showAll 
  ? persons 
  : persons.filter(person => person.name.toLowerCase().includes(newSearch));

  const handleNameInputChange = (e) => {
    setNewName(e.target.value);
  }

  const handleNumInputChange = (e) => {
    setNewNum(e.target.value);
  }

  const handleClick = (e) => {
    e.preventDefault();
    const person = {name: newName, number: newNum, id: persons.length};
    const numbers = persons.map(person => person.number);
    const people = persons.map(person => person.name)
    if (people.includes(person.name) || numbers.includes(person.number)) {
      alert(`${person.name} is already added to phonebook`);
      return;
    }
    setPersons(persons.concat(person));
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input onChange={handleSearchInputChange} />
      </div>
      <h3>Add a new</h3>
      <form>
        <div>
          name: <input onChange={handleNameInputChange} />
        </div>
        <div>
          number: <input onChange={handleNumInputChange} />
        </div>
        <div>
          <button type="submit" onClick={handleClick}>add</button>
        </div>
      </form>
      <h3>Numbers</h3>
      {toShow.map(person => {
        return (
          <div key={person.id}>{person.name} {person.number}</div>
        )
      })}
    </div>
  )
}

export default App