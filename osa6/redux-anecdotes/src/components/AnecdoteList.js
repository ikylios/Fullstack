import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notifReducer'


const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
//  console.log('anecdotes', anecdotes)
  const dispatch = useDispatch()

  return(
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => {
            dispatch(vote(anecdote)) 
//            dispatch(vote(anecdote), setNotification(`you voted for '${anecdote.content}'`)) 
            dispatch(setNotification(`you voted for '${anecdote.content}'`, 5))
            /*
            setTimeout(() => {
              dispatch(clearMessage())
            }, 5000)
            */
          }}>vote</button>          
        </div>
        </div>
      )}
    </div>
  ) 
}

export default AnecdoteList