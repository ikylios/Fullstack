import React, { useState } from 'react'
import ReactDOM from 'react-dom';


const Button = ({ onClick, text }) => {
  return(
    <button onClick={onClick}>{text}</button>
  )
}


const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [mostIndex, setMostIndex] = useState(0)
  const [votes, setVotes] = useState(new Array(6).fill(0)) 
  
  const randomAnecdote = () => {
    var res = Math.random() * 6
    res = Math.floor(res) 
    //console.log(res)
    setSelected(res)
  }

  const vote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
    if (copy[selected] > copy[mostIndex]) {
      setMostIndex(selected) 
    }
  }

  return (
    <div>
      <table>
        <tbody>
          <tr><td><h1>Anecdote of the Day</h1></td></tr>
          <tr><td>{props.anecdotes[selected]}</td></tr>
          <tr><td>Votes: {votes[selected]}</td></tr>
          <tr>
            <td><Button onClick={vote} text="vote"/></td>
            <td><Button onClick={randomAnecdote} text="next anecdote"/></td>
          </tr>
          <tr><td><h1>Anecdote with most votes</h1></td></tr>
          <tr><td>{props.anecdotes[mostIndex]}</td></tr>
          
        </tbody>
      </table>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)