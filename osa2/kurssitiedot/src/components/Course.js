import React from 'react'

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content course={course} />
      <Total parts={course.parts} />
    </div>
  ) 
}

const Header = ({ name }) => { 
  return (
    <h2>{name}</h2>
  )
}

const Total = ({ parts }) => {
  const exes = parts.map(ex => ex.exercises)
  const sum = exes.reduce(function(a, b) {
    return a + b;
  }, 0);
  
  return(
    <b>total of {sum} exercises</b>
  ) 
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>    
  )
}

const Content = ({ course }) => {
  const result = course.parts.map(part => <Part key={part.id} part={part} /> )
  
  return (
    <div>
      {result}
    </div>
  )
}

export default Course