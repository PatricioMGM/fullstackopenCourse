import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Countries({ countries, handleShowButton, weather }) {
  if (countries.length === 0) {
    return <p>Introduce the name of a country</p>;
  } else if (countries.length === 1) {
    return (
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
        {weather && weather.main && weather.weather && weather.wind && (
          <div>
            <h3>Weather in {countries[0].capital}</h3>
            <p>Temperature: {weather.main.temp} °C</p>
            <p>Weather: {weather.weather[0].description}</p>
            <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="weather icon" />
            <p>Wind: {weather.wind.speed} m/s</p>
          </div>
        )}
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
  const [weather, setWeather] = useState(null);

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

  useEffect(() => {
    if (result.length === 1) {
      const capital = result[0].capital;
      const apiKey = import.meta.env.VITE_SOME_KEY;
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`)
        .then((response) => setWeather(response.data));
    } else {
      setWeather(null);
    }
  }, [result]);

  const handleShowButton = (value) => {
    setInput(value);
  };

  return (
    <>
      <h1>Countries</h1>
      <input type="text" value={input} onInput={(event) => setInput(event.target.value)} />
      <Countries countries={result} handleShowButton={handleShowButton} weather={weather} />
    </>
  );
}

export default App;