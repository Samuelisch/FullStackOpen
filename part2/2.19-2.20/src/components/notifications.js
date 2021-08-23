const Notification = ({ notif, error }) => {
  if (notif === '' && error === '') {
    return null
  }

  if (!error) {
    return (
      <div className="notif msg">
        {notif}
      </div>
    ) 
  } else {
    return (
      <div className="error msg">
        {error}
      </div>
    )
  }
}

export default Notification;