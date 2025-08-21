import React, { useState } from 'react';
import { 
  Award, 
  Trophy, 
  Medal, 
  Star, 
  Target,
  Calendar,
  TrendingUp,
  BookOpen
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface AchievementsScreenProps {
  onNavigate: (screen: string) => void;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  category: 'academic' | 'attendance' | 'behavior' | 'sports' | 'special';
  date: Date;
  points: number;
  icon: string;
  color: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

const AchievementsScreen: React.FC<AchievementsScreenProps> = ({ onNavigate }) => {
  const { state } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const colors = {
    primary: '#2E7D32',
    accent: '#FFD54F',
    background: '#E3F2FD'
  };

  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'Perfect Attendance',
      description: 'Attended all classes for a full month',
      category: 'attendance',
      date: new Date('2024-08-01'),
      points: 100,
      icon: '📅',
      color: '#4CAF50',
      rarity: 'rare'
    },
    {
      id: '2',
      title: 'Math Champion',
      description: 'Scored 95% or above in Mathematics test',
      category: 'academic',
      date: new Date('2024-07-25'),
      points: 150,
      icon: '🧮',
      color: '#2196F3',
      rarity: 'epic'
    },
    {
      id: '3',
      title: 'Homework Hero',
      description: 'Submitted all homework on time for 2 weeks',
      category: 'behavior',
      date: new Date('2024-07-20'),
      points: 75,
      icon: '📚',
      color: '#FF9800',
      rarity: 'common'
    },
    {
      id: '4',
      title: 'Science Star',
      description: 'Won first place in Science Fair',
      category: 'academic',
      date: new Date('2024-07-15'),
      points: 200,
      icon: '🔬',
      color: '#9C27B0',
      rarity: 'legendary'
    },
    {
      id: '5',
      title: 'Team Player',
      description: 'Participated in Inter-School Football Match',
      category: 'sports',
      date: new Date('2024-07-10'),
      points: 125,
      icon: '⚽',
      color: '#4CAF50',
      rarity: 'rare'
    },
    {
      id: '6',
      title: 'Reading Enthusiast',
      description: 'Read 5 books from the library this month',
      category: 'academic',
      date: new Date('2024-07-05'),
      points: 100,
      icon: '📖',
      color: '#795548',
      rarity: 'rare'
    },
    {
      id: '7',
      title: 'Helping Hand',
      description: 'Helped classmates with their studies',
      category: 'behavior',
      date: new Date('2024-06-30'),
      points: 50,
      icon: '🤝',
      color: '#607D8B',
      rarity: 'common'
    },
    {
      id: '8',
      title: 'English Excellence',
      description: 'Top scorer in English essay competition',
      category: 'academic',
      date: new Date('2024-06-25'),
      points: 175,
      icon: '✍️',
      color: '#E91E63',
      rarity: 'epic'
    }
  ];

  const categories = [
    { key: 'all', label: 'All', icon: <Award className="w-4 h-4" /> },
    { key: 'academic', label: 'Academic', icon: <BookOpen className="w-4 h-4" /> },
    { key: 'attendance', label: 'Attendance', icon: <Calendar className="w-4 h-4" /> },
    { key: 'behavior', label: 'Behavior', icon: <Star className="w-4 h-4" /> },
    { key: 'sports', label: 'Sports', icon: <Trophy className="w-4 h-4" /> }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary':
        return '#FFD700';
      case 'epic':
        return '#9C27B0';
      case 'rare':
        return '#2196F3';
      case 'common':
        return '#4CAF50';
      default:
        return '#9E9E9E';
    }
  };

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case 'legendary':
        return 'border-yellow-400 shadow-yellow-200';
      case 'epic':
        return 'border-purple-400 shadow-purple-200';
      case 'rare':
        return 'border-blue-400 shadow-blue-200';
      case 'common':
        return 'border-green-400 shadow-green-200';
      default:
        return 'border-gray-400 shadow-gray-200';
    }
  };

  const filteredAchievements = achievements.filter(achievement => 
    selectedCategory === 'all' || achievement.category === selectedCategory
  );

  const totalPoints = achievements.reduce((sum, achievement) => sum + achievement.points, 0);
  const totalAchievements = achievements.length;
  const recentAchievements = achievements.filter(a => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return a.date >= weekAgo;
  }).length;

  const categoryStats = categories.slice(1).map(category => ({
    ...category,
    count: achievements.filter(a => a.category === category.key).length
  }));

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
              <h1 className="text-2xl font-bold text-gray-800">Achievements</h1>
              <p className="text-gray-600">{state.user?.name}</p>
            </div>
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${colors.primary}20` }}
            >
              <Award className="w-6 h-6" style={{ color: colors.primary }} />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <p className="text-2xl font-bold" style={{ color: colors.primary }}>
                {totalPoints}
              </p>
              <p className="text-xs text-gray-600">Total Points</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">{totalAchievements}</p>
              <p className="text-xs text-gray-600">Achievements</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{recentAchievements}</p>
              <p className="text-xs text-gray-600">This Week</p>
            </div>
          </div>

          {/* Progress Level */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Achievement Level</span>
              <span className="text-sm font-bold" style={{ color: colors.primary }}>
                Level {Math.floor(totalPoints / 100) + 1}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="h-3 rounded-full transition-all duration-300"
                style={{ 
                  width: `${(totalPoints % 100)}%`,
                  backgroundColor: colors.primary
                }}
              />
            </div>
            <p className="text-xs text-gray-600 mt-1">
              {100 - (totalPoints % 100)} points to next level
            </p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setSelectedCategory(category.key)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-medium text-sm whitespace-nowrap transition-colors ${
                selectedCategory === category.key
                  ? 'text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
              style={{
                backgroundColor: selectedCategory === category.key ? colors.primary : undefined
              }}
            >
              {category.icon}
              <span>{category.label}</span>
              {category.key !== 'all' && (
                <span className="bg-white/20 text-xs px-2 py-1 rounded-full">
                  {categoryStats.find(s => s.key === category.key)?.count || 0}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 gap-4">
          {filteredAchievements.map((achievement) => (
            <div 
              key={achievement.id} 
              className={`bg-white rounded-2xl p-4 shadow-sm border-2 ${getRarityBorder(achievement.rarity)}`}
            >
              <div className="flex items-start space-x-4">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                  style={{ backgroundColor: `${achievement.color}20` }}
                >
                  {achievement.icon}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-800">{achievement.title}</h3>
                    <div className="flex items-center space-x-2">
                      <span 
                        className="px-2 py-1 rounded-full text-xs font-bold text-white"
                        style={{ backgroundColor: getRarityColor(achievement.rarity) }}
                      >
                        {achievement.rarity.toUpperCase()}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm font-bold text-gray-700">
                          {achievement.points}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span 
                      className="px-3 py-1 rounded-full text-xs font-medium capitalize"
                      style={{ 
                        backgroundColor: `${achievement.color}20`,
                        color: achievement.color
                      }}
                    >
                      {achievement.category}
                    </span>
                    
                    <span className="text-xs text-gray-500">
                      {achievement.date.toLocaleDateString('en-IN', { 
                        day: 'numeric', 
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAchievements.length === 0 && (
          <div className="text-center py-12">
            <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No achievements found</h3>
            <p className="text-gray-500">
              {selectedCategory === 'all' 
                ? 'Start participating in activities to earn achievements!' 
                : `No achievements in ${selectedCategory} category yet.`
              }
            </p>
          </div>
        )}

        {/* Motivational Message */}
        {totalAchievements > 0 && (
          <div className="mt-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-6 text-white">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Keep Going!</h3>
                <p className="text-sm opacity-90">
                  You're doing amazing! Continue participating in activities to unlock more achievements.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AchievementsScreen;