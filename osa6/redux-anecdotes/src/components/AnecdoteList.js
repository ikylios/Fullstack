import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { voteNotif, clearMessage } from '../reducers/notifReducer'


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
            dispatch(vote(anecdote), voteNotif(anecdote)) 
            setTimeout(() => {
              dispatch(clearMessage())
            }, 5000)
          }}>vote</button>          
        </div>
        </div>
      )}
    </div>
  ) 
}

export default AnecdoteList