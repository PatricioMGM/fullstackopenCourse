import { useState } from 'react'

const Statistics = (props) => {

  if(props.all != 0){
    return (
      <div>
        <h1>statistics</h1>
        <p>good {props.good}</p>
        <p>neutral {props.neutral}</p>
        <p>bad {props.bad}</p>
        <p>all {props.all}</p>
        <p>average {props.average}</p>
        <p>positive {props.positive}</p>
      </div>
    )
  } else {
    return(
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
}

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + neutral + bad;

  let average = (good - bad) / all ;

  if(isNaN(average)){
    average = "No reviews yet."
  }

  let positive = 100 / (good + neutral + bad) * good;

  if(isNaN(positive)){
    positive = "No reviews yet."
  } else {
    positive += "%"
  }

  const handleGoodClick = () => {
    setGood(good + 1);
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  }

  const handleBadClick = () => {
    setBad(bad + 1);
  }

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive}/>
    </div>
  )
}

export default App