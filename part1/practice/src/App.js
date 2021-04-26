import React, { useState } from 'react'

const History = ({allClicks}) => {
  if (!allClicks.length) {
    return (
      <div>
        The app is waiting for a button press
      </div>
    )
  }
  return (
    <div>
      You've clicked on: {allClicks.join(' ')}
    </div>
  )
}

const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleLeftClick = () => {
    setAll(['L'].concat(allClicks))
    setLeft(left + 1)
  }

  const handleRightClick = () => {
    setAll(['R'].concat(allClicks))
    setRight(right + 1)
  }

  const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>
      {text}
    </button>
  )

  return (
    <div>
      {left}{' '}
      <Button handleClick={handleLeftClick} text='left' />
      <Button handleClick={handleRightClick} text='right' />
      {' '}{right}
      <History allClicks = {allClicks}/>
    </div>
  )
}

export default App
