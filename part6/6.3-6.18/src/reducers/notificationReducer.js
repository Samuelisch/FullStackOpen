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

export const displayNotification = (content, time) => {
  return dispatch => {
    dispatch ({
      type: 'DISPLAY',
      data: content
    })
    
    setTimeout(() => {
      dispatch ({
        type: 'HIDE',
        data: null
      })
    }, time * 1000)
  }
}

export default notificationReducer