import React, { useState } from 'react'

//button function to handle all three buttons, and their handle
const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistic = ({text, value}) => {
  return(
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  let all = props.good + props.neutral + props.bad
  if (all === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  return(
    <div>
      <Statistic text='Good' value={props.good} />
      <Statistic text='Neutral' value={props.neutral} />
      <Statistic text='Bad' value={props.bad} />
      <Statistic text='All' value={all} />
      <Statistic text='Average' value={props.points / all}/>
      <Statistic text='Positive' value={props.good / all * 100 + '%'}/>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [points, setPoints] = useState(0)

  return (
    <div>
      <h1>Feedback Form</h1>
      <Button handleClick={() => {setGood(good + 1); setPoints(points + 1)}} text={'Good'}/>
      <Button handleClick={() => setNeutral(neutral + 1)} text={'Neutral'}/>
      <Button handleClick={() => {setBad(bad + 1); setPoints(points - 1)}} text={'Bad'}/>
      <h2>Statistics:</h2>
      <Statistics good={good} bad={bad} neutral={neutral} points={points}/>
    </div>
  )
}

export default App
