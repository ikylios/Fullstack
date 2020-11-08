const initialState = {
  good: 0,
  ok: 0,
  bad: 0,
  all: 0,
  avg: 0,
  pos: 0
}

const counterReducer = (state = initialState, action) => {
//  console.log('action', action)
//  console.log('state', state)
    var pos = 100 
    if (state.good !== state.all) {
      pos = ((state.good) / (state.all+1)) * 100
    }
  switch (action.type) {
    case 'GOOD':

      return {
        good:state.good+1, 
        ok:state.ok, 
        bad:state.bad,
        all:state.all+1,
        avg: ((state.good+1)*1 + (state.bad)*(-1))/ (state.all+1),
        pos: (state.good) 
      }

    case 'OK':
      return {
        good:state.good,
        ok:state.ok+1,
        bad:state.bad,
        all:state.all+1,
        avg: ((state.good)*1 + (state.bad)*(-1))/ (state.all+1),
        pos: pos
      }

    case 'BAD':
      return {
        good:state.good,
        ok:state.ok,
        bad:state.bad+1,
        all:state.all+1,
        avg: ((state.good)*1 + (state.bad+1)*(-1))/ (state.all+1),
        pos: pos 
      }

    case 'ZERO':
      return initialState
    default: return state
  }
  
}

export default counterReducer