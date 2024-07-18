import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Notification {
  type: 'success' | 'error';
  message: string;
}

interface NotificationContextType {
  notifications: Notification[];
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
  removeNotification: (index: number) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const showSuccess = (message: string) => {
    setNotifications([...notifications, { type: 'success', message }]);
  };

  const showError = (message: string) => {
    setNotifications([...notifications, { type: 'error', message }]);
  };

  const removeNotification = (index: number) => {
    setNotifications(notifications.filter((_, i) => i !== index));
  };

  return (
    <NotificationContext.Provider value={{ notifications, showSuccess, showError, removeNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
