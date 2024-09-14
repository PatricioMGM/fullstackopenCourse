const Notification = ({ notification }) => {
  if (!notification) {
    return null;
  }

  return (
    <div className={notification.severity}>
      {notification.message}
    </div>
  );
};

export default Notification;
