import { useState, useEffect } from 'react'
import axios from 'axios'

const Countries = ({countries}) =>{
  if(countries.length === 0){
    return (
      <p>Introduce the name of a country</p>
    )
  }else if(countries.length === 1){
    return(
      <div>   
        <p>{countries[0].name.common}</p>
        <p>{countries[0].capital}</p>
        <p>{countries[0].area}</p>
        <ul>
          {Object.values(countries[0].languages).map((language, index) => (
            <li key={index}>{language}</li>
          ))}
        </ul>
        <img src={countries[0].flags.png} alt={countries[0].flags.alt} />
      </div>
    )
  }else if(countries.length > 10){
    return(
      <p>Too many matches, specify another filter</p>
    )
  }else{
    return(
      <div>
        {countries.map((country)=>{
          return(
            <p key={country.name.common}>{country.name.common}</p>
          )
        })}
      </div>
    )
  }
}

function App() {
  const [states, setStates] = useState([]);
  const [input, setInput] = useState('');
  useEffect(()=>{
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all').then((response)=>setStates(response.data));
  }, [])
  let result = []
  input != '' ? result = states.filter(state => state.name.common.toLowerCase().includes(input)) : null
  
  return (
    <>
      <h1>Countries</h1>
      <input type="text" onInput={(event)=>setInput(event.target.value)} />
      <Countries countries={result} />
    </>
  )
}

export default App
