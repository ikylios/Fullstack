import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, combineReducers } from 'redux'
import reducer from './reducers/anecdoteReducer'
import notifReducer from './reducers/notifReducer'
//import anecdoteService from './services/anecdotes'

const genReducer = combineReducers({
  anecdotes: reducer,
  notif: notifReducer
})

const store = createStore(genReducer, composeWithDevTools() )
/*
anecdoteService.getAll().then(anecdotes =>
  store.dispatch(initializeAnecdotes(anecdotes))
)
*/
  
export default store