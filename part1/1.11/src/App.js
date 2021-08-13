import React, { useState } from 'react'

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const StatText = ({value, text}) => {
  return (
    <tr>
      <td>{text}:</td> 
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({stats}) => {
  if (stats.all) {
    return (
      <table>
        <tbody>
          <StatText value={stats.good} text="Good" />
          <StatText value={stats.neutral} text="Neutral" />
          <StatText value={stats.bad} text="Bad" />
          <StatText value={stats.all} text="All" />
          <StatText value={stats.average} text="Average" />
          <StatText value={`${stats.positive} %`} text="Positive" />
        </tbody>
      </table>
    )
  } else {
    return (
      <div>No feedback given</div>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [stats, setStats] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
    all: 0,
    average: 0,
    positive: 0
  });

  const updateStatistics = (obj) => {
    obj.all += 1;
    obj.average = (obj.good - obj.bad) / obj.all;
    obj.positive = (obj.good / obj.all) * 100;
  }

  const clickHandler = (type) => {
    const update = {...stats};
    if (type === 'good') {
      update.good += 1;
    } else if (type === 'bad') {
      update.bad += 1;
    } else {
      update.neutral += 1;
    }
    //update statistics
    updateStatistics(update);
    setStats(update);
    //update statistics
  }

  return (
    <div>
      <h2>Feedback buttons</h2>
      <Button handleClick={() => clickHandler('good')} text='Good' />
      <Button handleClick={() => clickHandler('neutral')} text='Neutral' />      
      <Button handleClick={() => clickHandler('bad')} text='Bad' />
      <h2>Statistics</h2>
      <Statistics stats={stats} />
    </div>
  )
}

export default App