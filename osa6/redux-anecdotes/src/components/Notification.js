import React from 'react'
import { useSelector } from 'react-redux'


const Notification = () => {
  const notification = useSelector(state => state.notif)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (notification.visible) {
    return (
    <div style={style}>
      {notification.message} {notification.content}
    </div>
    )
  }

  return null 
  
}

export default Notification