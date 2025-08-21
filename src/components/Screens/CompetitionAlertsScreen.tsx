import React, { useState } from 'react';
import { 
  Trophy, 
  Calendar, 
  MapPin, 
  Users, 
  Clock,
  CheckCircle,
  AlertCircle,
  Star
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface CompetitionAlertsScreenProps {
  onNavigate: (screen: string) => void;
}

interface Competition {
  id: string;
  title: string;
  type: 'sports' | 'academic' | 'cultural' | 'science';
  date: Date;
  location: string;
  description: string;
  participants: number;
  maxParticipants?: number;
  status: 'upcoming' | 'ongoing' | 'completed';
  registered: boolean;
  prize: string;
  icon: string;
  color: string;
}

const CompetitionAlertsScreen: React.FC<CompetitionAlertsScreenProps> = ({ onNavigate }) => {
  const { state } = useApp();
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'registered'>('all');

  const colors = {
    primary: '#2E7D32',
    accent: '#FFD54F',
    background: '#E3F2FD'
  };

  const competitions: Competition[] = [
    {
      id: '1',
      title: 'Inter-School Football Match',
      type: 'sports',
      date: new Date('2024-08-20'),
      location: 'School Ground',
      description: 'Annual inter-school football tournament. Show your team spirit!',
      participants: 45,
      maxParticipants: 50,
      status: 'upcoming',
      registered: false,
      prize: 'Trophy + Certificates',
      icon: '⚽',
      color: '#4CAF50'
    },
    {
      id: '2',
      title: 'Math Olympiad',
      type: 'academic',
      date: new Date('2024-08-25'),
      location: 'Main Auditorium',
      description: 'Test your mathematical skills in this challenging competition.',
      participants: 120,
      maxParticipants: 150,
      status: 'upcoming',
      registered: true,
      prize: 'Gold/Silver/Bronze Medals',
      icon: '🧮',
      color: '#2196F3'
    },
    {
      id: '3',
      title: 'Science Fair',
      type: 'science',
      date: new Date('2024-09-05'),
      location: 'Science Lab',
      description: 'Present your innovative science projects and experiments.',
      participants: 35,
      maxParticipants: 40,
      status: 'upcoming',
      registered: false,
      prize: 'Science Kit + Certificate',
      icon: '🔬',
      color: '#FF9800'
    },
    {
      id: '4',
      title: 'Cultural Dance Competition',
      type: 'cultural',
      date: new Date('2024-09-15'),
      location: 'School Auditorium',
      description: 'Showcase traditional and modern dance forms.',
      participants: 28,
      maxParticipants: 30,
      status: 'upcoming',
      registered: true,
      prize: 'Trophy + Cash Prize',
      icon: '💃',
      color: '#E91E63'
    },
    {
      id: '5',
      title: 'Essay Writing Contest',
      type: 'academic',
      date: new Date('2024-08-15'),
      location: 'Classroom 5A',
      description: 'Express your thoughts on "Future of Education".',
      participants: 67,
      status: 'completed',
      registered: true,
      prize: 'Books + Certificate',
      icon: '✍️',
      color: '#9C27B0'
    }
  ];

  const getStatusIcon = (status: string, registered: boolean) => {
    if (status === 'completed') {
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
    if (registered) {
      return <CheckCircle className="w-5 h-5 text-blue-500" />;
    }
    return <AlertCircle className="w-5 h-5 text-orange-500" />;
  };

  const getStatusText = (status: string, registered: boolean) => {
    if (status === 'completed') return 'Completed';
    if (registered) return 'Registered';
    return 'Register Now';
  };

  const getStatusColor = (status: string, registered: boolean) => {
    if (status === 'completed') return '#4CAF50';
    if (registered) return '#2196F3';
    return '#FF9800';
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays > 0) return `In ${diffDays} days`;
    return 'Past event';
  };

  const filteredCompetitions = competitions.filter(comp => {
    if (filter === 'upcoming') return comp.status === 'upcoming';
    if (filter === 'registered') return comp.registered;
    return true;
  });

  const upcomingCount = competitions.filter(c => c.status === 'upcoming').length;
  const registeredCount = competitions.filter(c => c.registered).length;

  const handleRegister = (competitionId: string) => {
    // In a real app, this would make an API call
    console.log(`Registering for competition: ${competitionId}`);
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
              <h1 className="text-2xl font-bold text-gray-800">Competitions</h1>
              <p className="text-gray-600">{state.user?.class}</p>
            </div>
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${colors.primary}20` }}
            >
              <Trophy className="w-6 h-6" style={{ color: colors.primary }} />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-800">{competitions.length}</p>
              <p className="text-xs text-gray-600">Total Events</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">{upcomingCount}</p>
              <p className="text-xs text-gray-600">Upcoming</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{registeredCount}</p>
              <p className="text-xs text-gray-600">Registered</p>
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex space-x-3 mb-6">
          {[
            { key: 'all', label: 'All Events' },
            { key: 'upcoming', label: 'Upcoming' },
            { key: 'registered', label: 'My Events' }
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

        {/* Competitions List */}
        <div className="space-y-4">
          {filteredCompetitions.map((competition) => (
            <div key={competition.id} className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-start space-x-4">
                <div className="text-3xl">{competition.icon}</div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-800">{competition.title}</h3>
                    {getStatusIcon(competition.status, competition.registered)}
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{competition.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {competition.date.toLocaleDateString('en-IN', { 
                          weekday: 'short', 
                          day: 'numeric', 
                          month: 'short' 
                        })}
                      </span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                        {formatDate(competition.date)}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{competition.location}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {competition.participants} participants
                        {competition.maxParticipants && ` (${competition.maxParticipants} max)`}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Prize: {competition.prize}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span 
                      className="px-3 py-1 rounded-full text-xs font-medium capitalize"
                      style={{ 
                        backgroundColor: `${competition.color}20`,
                        color: competition.color
                      }}
                    >
                      {competition.type}
                    </span>
                    
                    {competition.status === 'upcoming' && !competition.registered && (
                      <button
                        onClick={() => handleRegister(competition.id)}
                        className="px-4 py-2 rounded-lg font-medium text-sm text-white transition-colors"
                        style={{ backgroundColor: colors.primary }}
                      >
                        Register Now
                      </button>
                    )}
                    
                    {competition.registered && competition.status === 'upcoming' && (
                      <span 
                        className="px-4 py-2 rounded-lg text-sm font-medium"
                        style={{ 
                          backgroundColor: `${getStatusColor(competition.status, competition.registered)}20`,
                          color: getStatusColor(competition.status, competition.registered)
                        }}
                      >
                        ✓ Registered
                      </span>
                    )}
                    
                    {competition.status === 'completed' && (
                      <span className="px-4 py-2 rounded-lg text-sm font-medium bg-green-100 text-green-700">
                        Completed
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCompetitions.length === 0 && (
          <div className="text-center py-12">
            <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No competitions found</h3>
            <p className="text-gray-500">
              {filter === 'upcoming' ? 'No upcoming competitions at the moment' :
               filter === 'registered' ? 'You haven\'t registered for any competitions yet' :
               'No competitions available'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompetitionAlertsScreen;