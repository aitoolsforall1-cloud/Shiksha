import React from 'react';
import { 
  BookOpen, 
  BarChart3, 
  Calendar, 
  Trophy, 
  Medal, 
  Bell,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface StudentDashboardProps {
  onNavigate: (screen: string) => void;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ onNavigate }) => {
  const { state } = useApp();

  const colors = {
    primary: '#2E7D32',
    accent: '#FFD54F',
    background: '#E3F2FD'
  };

  const quickStats = [
    { label: 'Attendance', value: '92%', color: colors.primary, icon: <Calendar className="w-5 h-5" /> },
    { label: 'Homework', value: '8/10', color: colors.accent, icon: <BookOpen className="w-5 h-5" /> },
    { label: 'Achievements', value: '12', color: '#FF5722', icon: <Trophy className="w-5 h-5" /> }
  ];

  const upcomingTasks = [
    {
      subject: 'Mathematics',
      task: 'Chapter 5 Exercises',
      dueDate: 'Tomorrow',
      status: 'pending',
      priority: 'high'
    },
    {
      subject: 'Science',
      task: 'Lab Report Submission',
      dueDate: 'Day after tomorrow',
      status: 'in-progress',
      priority: 'medium'
    },
    {
      subject: 'English',
      task: 'Essay Writing',
      dueDate: 'Next week',
      status: 'not-started',
      priority: 'low'
    }
  ];

  const recentAchievements = [
    {
      title: 'Perfect Attendance',
      description: 'Attended all classes this month',
      icon: <Calendar className="w-5 h-5" />,
      color: colors.primary,
      date: '2 days ago'
    },
    {
      title: 'Math Champion',
      description: 'Scored 95% in monthly test',
      icon: <Trophy className="w-5 h-5" />,
      color: colors.accent,
      date: '1 week ago'
    }
  ];

  const quickActions = [
    {
      id: 'homework',
      title: 'View Homework',
      subtitle: '3 pending tasks',
      icon: <BookOpen className="w-6 h-6" />,
      color: colors.primary,
      screen: 'homework-view'
    },
    {
      id: 'marks',
      title: 'Marks & Progress',
      subtitle: 'Check your scores',
      icon: <BarChart3 className="w-6 h-6" />,
      color: colors.accent,
      screen: 'marks-progress'
    },
    {
      id: 'attendance',
      title: 'Attendance',
      subtitle: '92% this month',
      icon: <Calendar className="w-6 h-6" />,
      color: '#4CAF50',
      screen: 'attendance-view'
    },
    {
      id: 'competitions',
      title: 'Competitions',
      subtitle: '2 upcoming events',
      icon: <Trophy className="w-6 h-6" />,
      color: '#FF5722',
      screen: 'competition-alerts'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'in-progress':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return '#FF5722';
      case 'medium':
        return colors.accent;
      case 'low':
        return '#4CAF50';
      default:
        return '#9E9E9E';
    }
  };

  return (
    <div 
      className="min-h-screen pt-20 pb-24"
      style={{ backgroundColor: colors.background }}
    >
      <div className="p-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center space-x-4 mb-6">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${colors.primary}20` }}
              >
                <img 
                  src={state.user?.avatar} 
                  alt="Profile"
                  className="w-12 h-12 rounded-full"
                />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-800">
                  Hello, {state.user?.name}
                </h1>
                <p className="text-gray-600">{state.user?.class}</p>
              </div>
              <button
                onClick={() => onNavigate('notifications')}
                className="relative p-3 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <Bell className="w-5 h-5 text-gray-600" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              {quickStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div 
                    className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2"
                    style={{ backgroundColor: `${stat.color}20` }}
                  >
                    <div style={{ color: stat.color }}>
                      {stat.icon}
                    </div>
                  </div>
                  <p className="text-xl font-bold text-gray-800">{stat.value}</p>
                  <p className="text-xs text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action) => (
              <button
                key={action.id}
                onClick={() => onNavigate(action.screen)}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
              >
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${action.color}20` }}
                >
                  <div style={{ color: action.color }}>
                    {action.icon}
                  </div>
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">{action.title}</h3>
                <p className="text-sm text-gray-600">{action.subtitle}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Upcoming Tasks</h2>
            <button
              onClick={() => onNavigate('homework-view')}
              className="text-sm font-medium"
              style={{ color: colors.primary }}
            >
              View All
            </button>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="space-y-4">
              {upcomingTasks.map((task, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 rounded-xl bg-gray-50">
                  <div className="flex-shrink-0">
                    {getStatusIcon(task.status)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <p className="font-semibold text-gray-800 text-sm">{task.subject}</p>
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: getPriorityColor(task.priority) }}
                      />
                    </div>
                    <p className="text-gray-600 text-sm">{task.task}</p>
                    <p className="text-xs text-gray-500">Due: {task.dueDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Achievements */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Recent Achievements</h2>
            <button
              onClick={() => onNavigate('achievements')}
              className="text-sm font-medium"
              style={{ color: colors.primary }}
            >
              View All
            </button>
          </div>
          <div className="space-y-3">
            {recentAchievements.map((achievement, index) => (
              <div key={index} className="bg-white rounded-2xl p-4 shadow-sm flex items-center space-x-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${achievement.color}20` }}
                >
                  <div style={{ color: achievement.color }}>
                    {achievement.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 text-sm">{achievement.title}</h3>
                  <p className="text-gray-600 text-xs">{achievement.description}</p>
                  <p className="text-gray-500 text-xs">{achievement.date}</p>
                </div>
                <Medal className="w-5 h-5 text-yellow-500" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;