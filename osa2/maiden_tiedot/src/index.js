import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios'

const Country = ({ country }) => {
//  console.log('arrived in Country', country)
  return(
    <div>
      <h2>{country.name}</h2>
      Capital {country.capital}<br></br> 
      Population {country.population}
      <h3>Languages</h3>
      <ul>
      {country.languages.map(language => <li key={country.id}> {language.name} </li>)}
      </ul>
      <img src={country.flag} height='100'/>  

    </div>
  )
}

const Content = ({ content }) => {

  console.log('content', content)

  const showCountry = (content) => {
    return <Country country={content} />
  }
  
  if (content.length > 10) {
    return 'Too many matches'
  }

  if (content.length === 1) {
    return showCountry(content[0])
  }

  if (content.length <= 10) {
    return content
      .map(country => <p key={country.id}> {country.name} <button>Show</button> </p>)
  }
} 

const App = () => {
  
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => { 
        setCountries(response.data)
      })
  }, [])
  
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const list = countries
    .filter(country => country.name.toLowerCase()
    .includes(filter.toLowerCase()))

  console.log('list', list)

  return (
    <div>
      <form>
        Find countries <input value={filter} onChange={handleFilterChange}/>
      </form>  
      <Content content={list} />
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
