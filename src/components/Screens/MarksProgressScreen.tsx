import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Award, 
  Target,
  Calendar,
  BookOpen
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface MarksProgressScreenProps {
  onNavigate: (screen: string) => void;
}

interface SubjectMark {
  subject: string;
  marks: number;
  totalMarks: number;
  percentage: number;
  grade: string;
  trend: 'up' | 'down' | 'stable';
  icon: string;
  color: string;
}

const MarksProgressScreen: React.FC<MarksProgressScreenProps> = ({ onNavigate }) => {
  const { state } = useApp();
  const [selectedPeriod, setSelectedPeriod] = useState('current');

  const colors = {
    primary: '#2E7D32',
    accent: '#FFD54F',
    background: '#E3F2FD'
  };

  const subjectMarks: SubjectMark[] = [
    {
      subject: 'Mathematics',
      marks: 87,
      totalMarks: 100,
      percentage: 87,
      grade: 'A',
      trend: 'up',
      icon: '📘',
      color: '#1976D2'
    },
    {
      subject: 'Science',
      marks: 78,
      totalMarks: 100,
      percentage: 78,
      grade: 'B+',
      trend: 'stable',
      icon: '🔬',
      color: '#388E3C'
    },
    {
      subject: 'English',
      marks: 92,
      totalMarks: 100,
      percentage: 92,
      grade: 'A+',
      trend: 'up',
      icon: '📝',
      color: '#F57C00'
    },
    {
      subject: 'Hindi',
      marks: 85,
      totalMarks: 100,
      percentage: 85,
      grade: 'A',
      trend: 'down',
      icon: '📖',
      color: '#7B1FA2'
    },
    {
      subject: 'Social Studies',
      marks: 89,
      totalMarks: 100,
      percentage: 89,
      grade: 'A',
      trend: 'up',
      icon: '🗺️',
      color: '#D32F2F'
    }
  ];

  const overallAverage = Math.round(
    subjectMarks.reduce((sum, subject) => sum + subject.percentage, 0) / subjectMarks.length
  );

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+': return '#4CAF50';
      case 'A': return '#8BC34A';
      case 'B+': return '#FFC107';
      case 'B': return '#FF9800';
      case 'C': return '#FF5722';
      default: return '#9E9E9E';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <TrendingUp className="w-4 h-4 text-red-500 transform rotate-180" />;
      default:
        return <div className="w-4 h-4 bg-gray-400 rounded-full" />;
    }
  };

  const achievements = [
    {
      title: 'Math Excellence',
      description: 'Scored above 85% in Mathematics',
      icon: '🏆',
      color: '#FFD700',
      date: '2 weeks ago'
    },
    {
      title: 'Consistent Performer',
      description: 'Maintained good grades across all subjects',
      icon: '⭐',
      color: '#4CAF50',
      date: '1 month ago'
    },
    {
      title: 'English Star',
      description: 'Top scorer in English essay competition',
      icon: '📚',
      color: '#2196F3',
      date: '3 weeks ago'
    }
  ];

  const progressData = [
    { month: 'Apr', average: 82 },
    { month: 'May', average: 84 },
    { month: 'Jun', average: 83 },
    { month: 'Jul', average: 85 },
    { month: 'Aug', average: overallAverage }
  ];

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
              <h1 className="text-2xl font-bold text-gray-800">Marks & Progress</h1>
              <p className="text-gray-600">{state.user?.class}</p>
            </div>
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${colors.primary}20` }}
            >
              <BarChart3 className="w-6 h-6" style={{ color: colors.primary }} />
            </div>
          </div>

          {/* Overall Performance */}
          <div className="text-center mb-6">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="#E5E7EB"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke={colors.primary}
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${overallAverage * 3.14} 314`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-800">{overallAverage}%</p>
                  <p className="text-xs text-gray-600">Average</p>
                </div>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Overall Performance</h3>
            <p className="text-sm text-gray-600">Excellent work! Keep it up!</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-xl font-bold text-green-600">
                {subjectMarks.filter(s => s.grade.includes('A')).length}
              </p>
              <p className="text-xs text-gray-600">A Grades</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold" style={{ color: colors.accent }}>
                {subjectMarks.filter(s => s.trend === 'up').length}
              </p>
              <p className="text-xs text-gray-600">Improving</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold" style={{ color: colors.primary }}>
                {subjectMarks.length}
              </p>
              <p className="text-xs text-gray-600">Subjects</p>
            </div>
          </div>
        </div>

        {/* Subject-wise Performance */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Subject Performance</h2>
          <div className="space-y-4">
            {subjectMarks.map((subject, index) => (
              <div key={index} className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">{subject.icon}</div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-800">{subject.subject}</h3>
                      <div className="flex items-center space-x-2">
                        {getTrendIcon(subject.trend)}
                        <span 
                          className="px-2 py-1 rounded-full text-xs font-bold text-white"
                          style={{ backgroundColor: getGradeColor(subject.grade) }}
                        >
                          {subject.grade}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">
                        {subject.marks}/{subject.totalMarks}
                      </span>
                      <span className="text-sm font-semibold" style={{ color: subject.color }}>
                        {subject.percentage}%
                      </span>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${subject.percentage}%`,
                          backgroundColor: subject.color
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Chart */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Monthly Progress</h2>
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-end justify-between h-32 mb-4">
              {progressData.map((data, index) => (
                <div key={index} className="flex flex-col items-center space-y-2">
                  <div 
                    className="w-8 rounded-t-lg transition-all duration-300"
                    style={{ 
                      height: `${data.average}%`,
                      backgroundColor: colors.primary,
                      minHeight: '20px'
                    }}
                  />
                  <span className="text-xs text-gray-600">{data.month}</span>
                  <span className="text-xs font-semibold text-gray-800">{data.average}%</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-600 text-center">
              Your performance has been consistently improving over the months!
            </p>
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
            {achievements.map((achievement, index) => (
              <div key={index} className="bg-white rounded-2xl p-4 shadow-sm flex items-center space-x-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                  style={{ backgroundColor: `${achievement.color}20` }}
                >
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 text-sm">{achievement.title}</h3>
                  <p className="text-gray-600 text-xs">{achievement.description}</p>
                  <p className="text-gray-500 text-xs">{achievement.date}</p>
                </div>
                <Award className="w-5 h-5" style={{ color: achievement.color }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarksProgressScreen;