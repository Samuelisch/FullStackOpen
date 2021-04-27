import React, { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>{text}</button>
)

const Display = props => (
  <div>{props.value}</div>
)

const App = () => {
  const [value, setValue] = useState(10)

  const setToValue = (value) => {
      setValue(value)
    }

  return (
    <div>
      <Display value={value}/>
      <Button handleClick={() => setToValue(value + 1)} text='plus' />
      <Button handleClick={() => setToValue(value - 1)} text='minus' />
      <Button handleClick={() => setToValue(value * 2)} text='times2' />
    </div>
  )
}

export default App
