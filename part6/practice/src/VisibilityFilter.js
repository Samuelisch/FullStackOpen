import React from "react"
import { filterChange } from "./reducers/filterReducer"
import { useDispatch } from "react-redux"

const VisibilityFilter = () => {
  const dispatch = useDispatch()

  return (
    <div>
        all
        <input 
          type="radio" 
          name="filter" 
          onChange={() => dispatch(filterChange('ALL'))}
          defaultChecked
        />
        liked
        <input 
          type="radio" 
          name="filter"
          onChange={() => dispatch(filterChange('LIKED'))} 
        />
        nonliked
        <input 
          type="radio" 
          name="filter"
          onChange={() => dispatch(filterChange('NONLIKED'))} 
        />
      </div>
  )
}

export default VisibilityFilter