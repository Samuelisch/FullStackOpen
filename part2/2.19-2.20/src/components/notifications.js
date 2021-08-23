const Notification = ({ notif }) => {
  if (notif === null) {
    return null
  }
  console.log(notif.type, notif.text)

  return (
    <div className={notif.type}>
      {notif.text}
    </div>
  )
}

export default Notification;