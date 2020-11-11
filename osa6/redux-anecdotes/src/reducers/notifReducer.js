
const initialState = 
    { 
        message: null,
        content: null,
        visible: false
    }



const notifReducer = (state = initialState, action) => {
//    console.log('action.data is now', action.data)

  switch(action.type) {
    case 'VOTE':
      state = { 
          message: 'you voted for',
          content: `'${action.data.content}'`,
          visible: true
      }
      return state 
  
    case 'CLEAR':
      state = initialState 
      return state 

    case 'NEW_ANEC':
      state = {
        message: 'created new anecdote',
        content: `'${action.data.content}'`,
        visible: true
      }
      return state 
      
    default: return state
  }

}

export const voteNotif = ({ content }) => {
//    console.log('content is', anecdote.content)
  return {
    type: 'VOTE',
    data: { content }
  }
}

export const createNotif = ({ content }) => {
//    console.log('content is', anecdote.content)
  return {
    type: 'NEW_ANEC',
    data: { content }
  }
}

export const clearMessage = () => {
  return {
    type: 'CLEAR',
    data: {}
  }
}

export default notifReducer