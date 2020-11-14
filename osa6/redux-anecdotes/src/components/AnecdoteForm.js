import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notifReducer'
import anecdoteService from '../services/anecdotes'


const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnec = async (event) => {
    event.preventDefault()
    const content = event.target.anec.value
    event.target.anec.value = ''
//    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(content))
//    dispatch(createAnecdote(content), setNotification(`created '${content}'`))
    dispatch(setNotification(`created '${content}'`, 5))
  }

  return(
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnec}>
        <div><input name="anec" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm

