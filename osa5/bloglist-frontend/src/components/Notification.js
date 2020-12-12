import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  
  const notifStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 16,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  const notification = useSelector(state => state.notif)
  
  if (notification.visible) {
    return (
      <div style={notifStyle}>
        {notification.content}
      </div>
    )
  }

  return null

}

export default Notification