import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Countries({ countries, handleShowButton }) {
  if(countries.length === 0){
    return(
      <p>Introduce the name of a country</p>
    )
  }else if (countries.length === 1) {
    return (
      <div>
        <p>{countries[0].capital}</p>
        <p>{countries[0].area}</p>
        <ul>
          {Object.values(countries[0].languages).map((language, index) => (
            <li key={index}>{language}</li>
          ))}
        </ul>
        <img src={countries[0].flags.png} alt={countries[0].flags.alt} />
      </div>
    );
  } else if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else {
    return (
      <div>
        {countries.map((country) => (
          <div key={country.name.common}>
            <p>{country.name.common}</p>
            <button onClick={() => handleShowButton(country.name.common)}>show</button>
          </div>
        ))}
      </div>
    );
  }
}

function App() {
  const [states, setStates] = useState([]);
  const [input, setInput] = useState('');
  const [result, setResult] = useState([]);

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all').then((response) => setStates(response.data));
  }, []);

  useEffect(() => {
    if (input !== '') {
      setResult(states.filter(state => state.name.common.toLowerCase().includes(input.toLowerCase())));
    } else {
      setResult([]);
    }
  }, [input, states]);

  const handleShowButton = (value) => {
    setInput(value);
  };

  return (
    <>
      <h1>Countries</h1>
      <input type="text" value={input} onInput={(event) => setInput(event.target.value)} />
      <Countries countries={result} handleShowButton={handleShowButton} />
    </>
  );
}

export default App;