import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  console.log(1) 
  useEffect(() => {
    console.log(2)	
    setTimeout(()=>{
      console.log(3)
    }, 1000)
    console.log(4) 
  })
  console.log(5) 
  return (<div>hello</div>)
}


/*
const Component = () => { console.log('hello') }

const App = () => {
  const t = [{v:1}, {v:2}, {v:3}] 

  return ( 
    <div> 
      {t.map(o => o.v).reduce((s, o) => s + o.v, 0)}
    </div> 
  )
}
/*
const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.parts[0]} />
      <Part part={props.parts[1]} />
      <Part part={props.parts[2]} />
    </div>
  )
}

const Part = (props) => {
  return (
    <p>{props.part.name} {props.part.exercises}</p>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
  )
}

const Exam = ({ olio }) => {
  console.log(olio)

  return (
    <div>
      {olio.name} +  
    </div>
  )
}


const App = () => {
  const olio = {name: 'juu', age: 2}
  console.log(olio.name)
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts}  />
      <Total parts={course.parts} />

      <Exam olio={olio} />
    </div>
  )
}
*/
ReactDOM.render(<App />, document.getElementById('root'))