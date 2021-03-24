import React from 'react'

const Header = (props) => {
  return (
    <div>
      <h1>{props.name}</h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <h2>Contents:</h2>
      <ol>
        <li>{props.one}</li>
        <li>{props.two}</li>
        <li>{props.three}</li>
      </ol>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Total number of exercises: {props.total}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header name={course}/>
      <Content one={part1} two={part2} three={part3}/>
      <Total total={exercises1 + exercises2 + exercises3}/>
    </div>
  )
}

export default App
