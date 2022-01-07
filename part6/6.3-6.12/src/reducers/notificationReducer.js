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

export const displayNotification = (content) => {
  return {
    type: 'DISPLAY',
    data: content
  }
}

export const hideNotification = () => {
  return {
    type: 'HIDE',
    data: null
  }
}

export default notificationReducer