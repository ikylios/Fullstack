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
  console.log(persons)
  return (
    <div>
      {persons
        .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
        .map(person => <p key={person.name}> {person.name} {person.number} <button onClick={() => handleDeletePerson(person.id)}>Delete</button> </p>)
      }
    </div>
  )
}

const Notification = ({ message }) => {
  const notifStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 16,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (message === null) {
    return null
  }

  return (
    <div style={notifStyle}> 
      {message}
    </div>
  )
}


const App = () => {

  const [ persons, setPersons ] = useState([]) 
  const [ errorMessage, setErrorMessage ] = useState(null)
  
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  const notif = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 6000)
  }
  
  useEffect(() => {
    personService
      .getAll()
      .then(response => setPersons(response))
  }, [])

  const handleNewPerson = (event) => {
    event.preventDefault()
    var foundPerson = persons.find(person => person.name === newName)
    if (foundPerson) {
      if (window.confirm(`${foundPerson.name} is already added to phonebook. Replace the old number with a new one?`)) {
        const changedPerson = {...foundPerson, number: newNumber}
        handleUpdate(foundPerson.id, changedPerson)
      }
    } else {
      const newPerson = 
        { name: newName, number: newNumber }
      personService
        .create(newPerson)
        .then(response => {
          setPersons(persons.concat(response))
          notif(`Added ${newName}!`)
        })
        .catch(error => {
          notif(error.response.data.error)
        })
    }
  }

  const handleUpdate = (id, changedPerson) => {
    personService
      .update(id, changedPerson)
      .then(response => {
        setPersons(persons.map(person => person.id !== id ? person: response))
      })
      .catch(error => {
        console.log('error')
//        notif(`Information of ${changedPerson.name} has already been removed from server`)
      })
      notif(`Changed number of ${changedPerson.name}!`)
  }

  const handleDeletePerson = (id) => {
    const name = persons.find(person => person.id === id).name
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .deletePerson(id)
      setPersons(persons.filter(p => p.id !== id))
      notif(`Deleted ${name}`)
    } 
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
      <Notification message={errorMessage} />
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