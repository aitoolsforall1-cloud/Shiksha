import React, { useState } from 'react';
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Filter,
  Search
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface HomeworkViewScreenProps {
  onNavigate: (screen: string) => void;
}

interface HomeworkTask {
  id: string;
  subject: string;
  title: string;
  description: string;
  dueDate: Date;
  status: 'pending' | 'completed' | 'overdue';
  priority: 'high' | 'medium' | 'low';
  icon: string;
}

const HomeworkViewScreen: React.FC<HomeworkViewScreenProps> = ({ onNavigate }) => {
  const { state } = useApp();
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const colors = {
    primary: '#2E7D32',
    accent: '#FFD54F',
    background: '#E3F2FD'
  };

  const homeworkTasks: HomeworkTask[] = [
    {
      id: '1',
      subject: 'Mathematics',
      title: 'Algebra Practice',
      description: 'Complete exercises 1-15 from Chapter 5: Linear Equations',
      dueDate: new Date('2024-08-12'),
      status: 'pending',
      priority: 'high',
      icon: '📘'
    },
    {
      id: '2',
      subject: 'Science',
      title: 'Water Cycle Diagram',
      description: 'Draw and label the water cycle process with explanations',
      dueDate: new Date('2024-08-14'),
      status: 'pending',
      priority: 'medium',
      icon: '🔬'
    },
    {
      id: '3',
      subject: 'English',
      title: 'Essay on Festivals',
      description: 'Write a 300-word essay on "Festivals of India"',
      dueDate: new Date('2024-08-15'),
      status: 'completed',
      priority: 'low',
      icon: '📝'
    },
    {
      id: '4',
      subject: 'Hindi',
      title: 'Poem Recitation',
      description: 'Learn and practice "Raghupati Raghav Raja Ram"',
      dueDate: new Date('2024-08-10'),
      status: 'overdue',
      priority: 'high',
      icon: '📖'
    },
    {
      id: '5',
      subject: 'Social Studies',
      title: 'Map Work',
      description: 'Mark all Indian states and capitals on the outline map',
      dueDate: new Date('2024-08-18'),
      status: 'pending',
      priority: 'medium',
      icon: '🗺️'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'overdue':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#4CAF50';
      case 'overdue':
        return '#F44336';
      default:
        return '#FF9800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return '#F44336';
      case 'medium':
        return colors.accent;
      case 'low':
        return '#4CAF50';
      default:
        return '#9E9E9E';
    }
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-IN', { 
        day: 'numeric', 
        month: 'short' 
      });
    }
  };

  const filteredTasks = homeworkTasks.filter(task => {
    const matchesFilter = filter === 'all' || task.status === filter;
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: homeworkTasks.length,
    pending: homeworkTasks.filter(t => t.status === 'pending').length,
    completed: homeworkTasks.filter(t => t.status === 'completed').length,
    overdue: homeworkTasks.filter(t => t.status === 'overdue').length
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
              <h1 className="text-2xl font-bold text-gray-800">Homework</h1>
              <p className="text-gray-600">{state.user?.class}</p>
            </div>
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${colors.primary}20` }}
            >
              <BookOpen className="w-6 h-6" style={{ color: colors.primary }} />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
              <p className="text-xs text-gray-600">Total</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              <p className="text-xs text-gray-600">Pending</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
              <p className="text-xs text-gray-600">Done</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">{stats.overdue}</p>
              <p className="text-xs text-gray-600">Overdue</p>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex space-x-3 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search homework..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex space-x-2">
            {['all', 'pending', 'completed'].map((filterOption) => (
              <button
                key={filterOption}
                onClick={() => setFilter(filterOption as any)}
                className={`px-4 py-3 rounded-xl font-medium text-sm transition-colors ${
                  filter === filterOption
                    ? 'text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
                style={{
                  backgroundColor: filter === filterOption ? colors.primary : undefined
                }}
              >
                {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Homework List */}
        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <div key={task.id} className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-start space-x-4">
                <div className="text-2xl">{task.icon}</div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-gray-800">{task.subject}</h3>
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: getPriorityColor(task.priority) }}
                      />
                    </div>
                    {getStatusIcon(task.status)}
                  </div>
                  
                  <h4 className="font-medium text-gray-700 mb-1">{task.title}</h4>
                  <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        Due: {formatDate(task.dueDate)}
                      </span>
                    </div>
                    
                    <span 
                      className="px-3 py-1 rounded-full text-xs font-medium text-white"
                      style={{ backgroundColor: getStatusColor(task.status) }}
                    >
                      {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTasks.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No homework found</h3>
            <p className="text-gray-500">
              {searchQuery ? 'Try adjusting your search terms' : 'No homework matches the selected filter'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeworkViewScreen;