import React, { useEffect } from 'react';
import { useNotification } from '../contexts/NotificationContext';

const Notifications: React.FC = () => {
  const { notifications, removeNotification } = useNotification();

  useEffect(() => {
    const timers = notifications.map((_, index) => setTimeout(() => removeNotification(index), 5000));
    return () => timers.forEach((timer) => clearTimeout(timer));
  }, [notifications, removeNotification]);

  return (
    <div className="fixed top-0 right-0 m-4 z-50">
      {notifications.map((notification, index) => (
        <div
          key={index}
          className={`p-4 mb-4 rounded shadow-lg ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}
        >
          <p>{notification.message}</p>
        </div>
      ))}
    </div>
  );
};

export default Notifications;
