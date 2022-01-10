import React from "react"
import { connect } from 'react-redux'
import { changeFilter } from "../reducers/filterReducer"

const Filter = (props) => {
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter
      <input type="text" onChange={(e) => props.changeFilter(e.target.value)} />
    </div>
  )
}

export default connect(
  null,
  {
    changeFilter
  }
)(Filter)