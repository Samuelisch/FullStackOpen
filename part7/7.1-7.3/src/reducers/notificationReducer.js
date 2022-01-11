const notificationReducer = (state=null, action) => {
  switch(action.type) {
    case 'DISPLAY': 
      return action.data
    case 'HIDE':
      return action.data
    default:
      return state
  }
}

let timeout

export const displayNotification = (content, time) => {
  clearTimeout(timeout)
  return dispatch => {
    dispatch ({
      type: 'DISPLAY',
      data: content
    })
    
    timeout = setTimeout(() => {
      dispatch ({
        type: 'HIDE',
        data: null
      })
    }, time * 1000)
  }
}

export default notificationReducer