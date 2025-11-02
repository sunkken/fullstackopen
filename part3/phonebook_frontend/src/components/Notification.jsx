const Notification = ({ content }) => {
  if (!content || content.message === null) {
    return null
  }

  const notificationClass = content.isError
    ? 'notification error'
    : 'notification'

  return (
    <div className={notificationClass}>
      {content.message}
    </div>
  )
}

export default Notification