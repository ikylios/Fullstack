import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios'

const Country = ({ country }) => {
  return(
    <div>
      <h2>{country.name}</h2>
      Capital {country.capital}
      Population {country.population}
      <h3>Languages</h3>
      {country.languages.map(language => language.name)}
    </div>
  )
}

const App = () => {
  
  const [ filter, setFilter ] = useState('')
  const [ countries, setCountries ] = useState([])
  
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
  
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => { 
        console.log('servulta saatu', response.data)
        setCountries(response.data)
      })
  }, [])


  const [content, setContent] = useState('Too many matches')
//  console.log('countries', countries)
  const list = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))
          .map(country => <p key={country.id}> {country.name} 
          <button onClick={() => showCountry(country.id)}>Show</button> </p>
          )
  console.log('list', list)
//  setContent(countries) 
//  setContent
  console.log('content', content)

/*  
  if (content.length === 1) {
    setContent(<Country country={content[0]} />)
  }

  if (list.length <= 10) {
      console.log('length', content)

      setContent(list)
/*
      setContent(
        list
          .filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))
          .map(country => <p key={country.id}> {country.name} 
          <button onClick={() => showCountry(country.id)}>Show</button> </p>
          )
      )
  }
  */

  const showCountry = (id) => {
    setContent(<Country country={content[id]} />)
  }
  
  return (
    <div>
      <form>
        Find countries <input value={filter} onChange={handleFilterChange}/>
      </form>  
      {list}
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
