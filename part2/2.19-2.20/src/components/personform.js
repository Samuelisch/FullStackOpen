import React from 'react'

const PersonForm = ({nameChange, numChange, btnClick}) => {
  return (
    <form>
      <div>
          name: <input onChange={nameChange} />
        </div>
        <div>
          number: <input onChange={numChange} />
        </div>
        <div>
          <button type="submit" onClick={btnClick}>add</button>
        </div>
    </form>
  )
}

export default PersonForm;