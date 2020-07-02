import ReactDOM from 'react-dom';
import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' ,
      number: '040-1231244' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const handleNewPerson = (event) => {
    event.preventDefault()
    var foundPerson = persons.map(person => person.name).find(name => name === newName)
//    console.log('foundperson:', foundPerson)
    if (foundPerson) {
      window.alert(`${foundPerson} is already added to phonebook`)
    } else {
      const newPerson = 
        { name: newName ,
          number: newNumber }
      
      setPersons(persons.concat(newPerson))
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
V      <form>
        <div>
          Name: <input value={newName} onChange={handleNameChange}/>
        </div>
V        <div>
          Number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit" onClick={handleNewPerson}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
  {persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
    </div>
  )
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
)