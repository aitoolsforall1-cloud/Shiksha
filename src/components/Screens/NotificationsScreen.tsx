import React, { useState } from 'react';
import { 
  Bell, 
  BookOpen, 
  Trophy, 
  MessageSquare, 
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
  Trash2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface NotificationsScreenProps {
  onNavigate: (screen: string) => void;
}

interface Notification {
  id: string;
  type: 'homework' | 'competition' | 'marks' | 'announcement' | 'reminder';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
  actionable?: boolean;
  actionText?: string;
  actionScreen?: string;
}

const NotificationsScreen: React.FC<NotificationsScreenProps> = ({ onNavigate }) => {
  const { state } = useApp();
  const [filter, setFilter] = useState<'all' | 'unread' | 'important'>('all');

  const colors = {
    primary: '#37474F',
    accent: '#00B8D4',
    background: '#FAFAFA'
  };

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'homework',
      title: 'New Homework Assigned',
      message: 'Mathematics: Complete Chapter 5 exercises. Due tomorrow.',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      read: false,
      priority: 'high',
      actionable: true,
      actionText: 'View Homework',
      actionScreen: 'homework-view'
    },
    {
      id: '2',
      type: 'competition',
      title: 'Football Match Registration',
      message: 'Inter-School Football Match registration is now open. Register before Aug 18.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      read: false,
      priority: 'medium',
      actionable: true,
      actionText: 'Register Now',
      actionScreen: 'competition-alerts'
    },
    {
      id: '3',
      type: 'marks',
      title: 'Test Results Published',
      message: 'Your Science test results are now available. You scored 78/100.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
      read: true,
      priority: 'medium',
      actionable: true,
      actionText: 'View Marks',
      actionScreen: 'marks-progress'
    },
    {
      id: '4',
      type: 'announcement',
      title: 'School Holiday Notice',
      message: 'School will remain closed on August 15th for Independence Day celebration.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
      read: true,
      priority: 'low'
    },
    {
      id: '5',
      type: 'reminder',
      title: 'Attendance Reminder',
      message: 'Your attendance is 89%. Try to maintain above 90% for better performance.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      read: false,
      priority: 'medium',
      actionable: true,
      actionText: 'View Attendance',
      actionScreen: 'attendance-view'
    },
    {
      id: '6',
      type: 'homework',
      title: 'Homework Submission Reminder',
      message: 'English essay submission deadline is approaching. Submit by tonight.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
      read: true,
      priority: 'high'
    }
  ]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'homework':
        return <BookOpen className="w-5 h-5" />;
      case 'competition':
        return <Trophy className="w-5 h-5" />;
      case 'marks':
        return <CheckCircle className="w-5 h-5" />;
      case 'announcement':
        return <MessageSquare className="w-5 h-5" />;
      case 'reminder':
        return <Clock className="w-5 h-5" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'homework':
        return '#2196F3';
      case 'competition':
        return '#FF9800';
      case 'marks':
        return '#4CAF50';
      case 'announcement':
        return '#9C27B0';
      case 'reminder':
        return '#607D8B';
      default:
        return colors.primary;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return '#F44336';
      case 'medium':
        return '#FF9800';
      case 'low':
        return '#4CAF50';
      default:
        return '#9E9E9E';
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - timestamp.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 60) {
      return `${diffMins} min ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else if (diffDays < 7) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else {
      return timestamp.toLocaleDateString('en-IN', { 
        day: 'numeric', 
        month: 'short' 
      });
    }
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications(prev => 
      prev.filter(notification => notification.id !== notificationId)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.read;
    if (filter === 'important') return notification.priority === 'high';
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;
  const importantCount = notifications.filter(n => n.priority === 'high').length;

  const handleNotificationAction = (notification: Notification) => {
    if (notification.actionable && notification.actionScreen) {
      markAsRead(notification.id);
      onNavigate(notification.actionScreen);
    }
  };

  return (
    <div 
      className="min-h-screen pt-20 pb-24"
      style={{ backgroundColor: colors.background }}
    >
      <div className="p-6">
        {/* Header Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
              <p className="text-gray-600">{notifications.length} total notifications</p>
            </div>
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${colors.primary}20` }}
            >
              <Bell className="w-6 h-6" style={{ color: colors.primary }} />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-800">{notifications.length}</p>
              <p className="text-xs text-gray-600">Total</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{unreadCount}</p>
              <p className="text-xs text-gray-600">Unread</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">{importantCount}</p>
              <p className="text-xs text-gray-600">Important</p>
            </div>
          </div>

          {/* Mark All Read Button */}
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="w-full py-2 px-4 rounded-lg font-medium text-sm transition-colors"
              style={{ 
                backgroundColor: `${colors.primary}20`,
                color: colors.primary
              }}
            >
              Mark All as Read
            </button>
          )}
        </div>

        {/* Filter Buttons */}
        <div className="flex space-x-3 mb-6">
          {[
            { key: 'all', label: 'All' },
            { key: 'unread', label: `Unread (${unreadCount})` },
            { key: 'important', label: `Important (${importantCount})` }
          ].map((filterOption) => (
            <button
              key={filterOption.key}
              onClick={() => setFilter(filterOption.key as any)}
              className={`px-4 py-3 rounded-xl font-medium text-sm transition-colors ${
                filter === filterOption.key
                  ? 'text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
              style={{
                backgroundColor: filter === filterOption.key ? colors.primary : undefined
              }}
            >
              {filterOption.label}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.map((notification) => (
            <div 
              key={notification.id} 
              className={`bg-white rounded-2xl p-4 shadow-sm border-l-4 ${
                !notification.read ? 'bg-blue-50' : ''
              }`}
              style={{ 
                borderLeftColor: getNotificationColor(notification.type)
              }}
            >
              <div className="flex items-start space-x-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ 
                    backgroundColor: `${getNotificationColor(notification.type)}20`,
                    color: getNotificationColor(notification.type)
                  }}
                >
                  {getNotificationIcon(notification.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className={`font-semibold text-gray-800 ${!notification.read ? 'font-bold' : ''}`}>
                      {notification.title}
                    </h3>
                    <div className="flex items-center space-x-2">
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: getPriorityColor(notification.priority) }}
                      />
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {formatTimestamp(notification.timestamp)}
                    </span>
                    
                    <div className="flex items-center space-x-2">
                      {notification.actionable && (
                        <button
                          onClick={() => handleNotificationAction(notification)}
                          className="px-3 py-1 rounded-lg text-xs font-medium text-white transition-colors"
                          style={{ backgroundColor: getNotificationColor(notification.type) }}
                        >
                          {notification.actionText}
                        </button>
                      )}
                      
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                        >
                          <CheckCircle className="w-4 h-4 text-gray-400" />
                        </button>
                      )}
                      
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredNotifications.length === 0 && (
          <div className="text-center py-12">
            <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No notifications</h3>
            <p className="text-gray-500">
              {filter === 'unread' ? 'All caught up! No unread notifications.' :
               filter === 'important' ? 'No important notifications at the moment.' :
               'You have no notifications yet.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsScreen;