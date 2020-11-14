
const initialState = 
  { 
    content: null,
    visible: false
  }



const notifReducer = (state = initialState, action) => {
    console.log('notif action.data is', action)

    switch(action.type) {
    case 'NOTIF':
      state = {
        content: action.data.content,
        visible: true
      }
      return state 
    
    case 'CLEAR':
      state = initialState 
      return state 
      
    default: return state
  }

}

export const voteNotif = ( content ) => {
//    console.log('content is', anecdote.content)
  return {
    type: 'VOTE',
    data: { content }
  }
}

export const createNotif = ( content ) => {
//    console.log('content is', anecdote.content)
  return {
    type: 'NEW_ANECDOTE',
    data: { content }
  }
}

export const clearMessage = () => {
  return async dispatch => {
    dispatch({
      type: 'CLEAR',
      data: {}
    })
  }
}

export const setNotification =  (content, time) => {  
//  console.log('content is', content)
  return async dispatch => {
    dispatch({
      type: 'NOTIF',
      data: { content }
    })
  setTimeout(() => {
    dispatch(clearMessage())
  }, time*1000)
  
  }
}

export default notifReducer