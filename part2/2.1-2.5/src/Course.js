import React from 'react'

const Course = ({name, parts}) => {
  return(
    <div>
      <h2>{name}</h2>
      {parts.map(part => 
      <div key={part.id}>
        <Part name={part.name} exercises={part.exercises} />
      </div>
      )}
      <Total parts={parts} />
    </div>
  )
}

const Part = ({name, exercises}) => {
  return (
      <p>{name} {exercises}</p>
  )
}

const Total = ({parts}) => {
  //create object total where exercises = sum of iteration of exercises in modules
  const total = parts.reduce((curr, next) => ({exercises: curr.exercises + next.exercises}));
  return (
    <div>
      <p><b>Total of {total.exercises} exercises</b></p>
    </div>
  )
}

export default Course
