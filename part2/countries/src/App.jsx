import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Display from './components/Display'
import SingleCountryDisplay from './components/SingleCountryDisplay'

function App() {

  const [countries, setCountries] = useState([])
  const [filterString, setFilterString] = useState('')
  const [showSpecific, setShowSpecific] = useState(null)

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => setCountries(response.data))
  }, [])

  const handleFilterString = (event) => {
    setFilterString(event.target.value)
    setShowSpecific(null)
  }
  const handleShow = (country) => setShowSpecific(country)

  const namesToShow = filterString.length === 0 ? [] : countries.filter(country =>
    country.name.common.toLowerCase().includes(filterString.toLowerCase()))

  return (
    <div>
      <Filter filterString={filterString} handleFilterString={handleFilterString} />

      {namesToShow.length > 10
        ? <div>Too many matches, specify another filter</div>
        : namesToShow.length === 1
          ? <SingleCountryDisplay country={namesToShow[0]} />
          : <Display countries={namesToShow} handleShow={handleShow} />
      }
      
      {showSpecific !== null && namesToShow.length !== 1
        ? <SingleCountryDisplay country={showSpecific} />
        : <div></div>
      }
    </div>
  )
}

export default App
