import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  console.log('name in useCountry:', name)
/*
  const nameIsDefined = () => {
    if (name === "") {
      return false
    }
    return true 
  }
*/  

  useEffect(() => {
  console.log('name in useEffect:', name)
  if (name) {
    axios
      .get(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`)
      .then(response => {
          setCountry({...response, found: true })
      })
      .catch(error => {
        if (name) {
          setCountry({ found: false })
        }
      })
  }
  }, [name])


  console.log('countryaftersearch:', country)

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div> 
      <img src={country.data.flag} height='100' alt={`flag of ${country.data.name}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState(null)
  const country = useCountry(name)

  console.log('country in app:', country)

  const fetch = (e) => {
    e.preventDefault()
    console.log('nameInput:', nameInput)
    setName(nameInput.value)
    console.log('name:', name)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App