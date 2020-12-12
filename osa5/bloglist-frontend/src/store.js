import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
//import reducer from './reducers/anecdoteReducer'
import notifReducer from './reducers/notifReducer'

const genReducer = combineReducers({
//  anecdotes: reducer,
  notif: notifReducer
})

const store = createStore(
  genReducer, 
  composeWithDevTools(
    applyMiddleware(thunk)) 
)
  
export default store