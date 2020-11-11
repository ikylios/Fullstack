import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, combineReducers } from 'redux'
import reducer from './reducers/anecdoteReducer'
import notifReducer from './reducers/notifReducer'

const genReducer = combineReducers({
  anecdotes: reducer,
  notif: notifReducer
})

const store = createStore(genReducer, composeWithDevTools() )
  
export default store