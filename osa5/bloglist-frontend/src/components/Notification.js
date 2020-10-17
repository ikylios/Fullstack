import React from 'react'

const Notification = ({ message }) => {
  const notifStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 16,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (message === null) {
    return null
  }

  return (
    <div style={notifStyle}> 
      {message}
    </div>
  )
}

export default Notification 