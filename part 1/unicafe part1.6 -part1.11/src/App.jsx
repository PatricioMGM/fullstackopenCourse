import { useState } from 'react'

const StatisticLine = ({text, value}) => {
  return(
    <p>{text} {value}</p>
  )
} 

const Statistics = ({good, neutral, bad, all, average, positive}) => {

  if(all != 0){
    return (
      <div>
        <h1>statistics</h1>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={positive} />
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

const Button = ({action, text}) => {
  return(
    <button onClick={action}>{text}</button>
  )
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
      <Button action={handleGoodClick} text="good"/>
      <Button action={handleNeutralClick} text="neutral" />
      <Button action={handleBadClick} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive}/>
    </div>
  )
}

export default App