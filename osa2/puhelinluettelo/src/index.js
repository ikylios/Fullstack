import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const FilterForm = ({ handleFilterChange, filter }) => {
  return (
    <form>
      <div>
      Filter shown with <input value={filter} onChange={handleFilterChange}/>
      </div>
    </form>  
  )
}

const PersonForm = ({ newName, handleNameChange, newNumber, handleNumberChange, handleNewPerson }) => {
  return (
    <form>
      <div>
        Name: <input value={newName} onChange={handleNameChange}/>
      </div>
      <div>
        Number: <input value={newNumber} onChange={handleNumberChange}/>
      </div>
      <div>
        <button type="submit" onClick={handleNewPerson}>Add</button>
      </div>
    </form>
  )
}

const PersonList = ({ persons, filter, handleDeletePerson }) => {
  console.log('drawing persons')
  return (
    <div>
      {persons
        .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
        .map(person => <p key={person.name}> {person.name} {person.number} <button onClick={() => handleDeletePerson(person.id)}>Delete</button> </p>)
      }
    </div>
  )
}

const App = () => {

  const [ persons, setPersons ] = useState([]) 

  useEffect(() => {
    console.log('effectin')
    personService
      .getAll()
      .then(response => setPersons(response))
  }, [])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  const handleNewPerson = (event) => {
    event.preventDefault()
    var foundPerson = persons.map(person => person.name).find(name => name === newName)
    if (foundPerson) {
      window.alert(`${foundPerson} is already added to phonebook`)
    } else {
      const newPerson = 
        { name: newName, number: newNumber }
      personService
        .create(newPerson)
        .then(response => setPersons(persons.concat(response)))
    }
  }

  const handleDeletePerson = (id) => {
    personService
      .deletePerson(id)
      .then(response => setPersons(response))
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange  = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <FilterForm handleFilterChange={handleFilterChange} filter={filter} />
      <h2>Phonebook</h2>
      <PersonForm handleNameChange={handleNameChange} newName={newName} handleNumberChange={handleNumberChange} newNumber={newNumber} handleNewPerson={handleNewPerson}/> 
      <h2>Numbers</h2>
      <PersonList persons={persons} filter={filter} handleDeletePerson={handleDeletePerson} />
    </div>
  )
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
)