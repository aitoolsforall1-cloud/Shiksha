import React, { useState } from 'react';
import {
  BookOpen,
  ClipboardCheck,
  ClipboardList,
  Calendar,
  Trophy,
  Bell,
  ChevronDown
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface TeacherDashboardProps {
  onNavigate: (screen: string) => void;
}

const classes = ['Class 8A', 'Class 8B', 'Class 9A'];

const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ onNavigate }) => {
  const { state } = useApp();
  const [currentClass, setCurrentClass] = useState<string>(classes[0]);

  // Mock stats per class
  const classStats: Record<string, { attendance: number; hwCompletion: number; achievements: number }> = {
    'Class 8A': { attendance: 92, hwCompletion: 80, achievements: 12 },
    'Class 8B': { attendance: 88, hwCompletion: 72, achievements: 9 },
    'Class 9A': { attendance: 90, hwCompletion: 76, achievements: 10 },
  };
  const stats = classStats[currentClass];

  // Quick actions for teachers
  const quickActions = [
    {
      id: 'assign-hw',
      title: 'Assign Homework',
      subtitle: `Create for ${currentClass}`,
      icon: <BookOpen className="w-6 h-6" />,
      color: '#1E4D92',
      screen: 'assign-homework',
    },
    {
      id: 'grade',
      title: 'Grade Submissions',
      subtitle: '5 pending across subjects',
      icon: <ClipboardList className="w-6 h-6" />,
      color: '#6A1B9A',
      screen: 'grade-submissions',
    },
    {
      id: 'attendance',
      title: 'Take Attendance',
      subtitle: `Today • ${currentClass}`,
      icon: <ClipboardCheck className="w-6 h-6" />,
      color: '#2E7D32',
      screen: 'attendance',
    },
    {
      id: 'events',
      title: 'Manage Events',
      subtitle: 'Sports & Olympiads',
      icon: <Trophy className="w-6 h-6" />,
      color: '#F57C00',
      screen: 'manage-events',
    },
  ];

  // Upcoming tasks for this class
  const upcomingTasks = [
    { title: `${currentClass} • Algebra – Ch 5`, when: 'Tomorrow 9:00 AM', tone: 'red' },
    { title: `${currentClass} • Physics – Motion`, when: 'Day after tomorrow', tone: 'yellow' },
  ];

  // Pending reviews by subject
  const pendingReviews = [
    { subject: 'Math', count: 3 },
    { subject: 'Science', count: 5 },
    { subject: 'English', count: 2 },
  ];

  // Student highlights
  const highlights = [
    { title: 'Ravi – 95% in Science', tag: 'Top Performer' },
    { title: 'Aisha – +15% attendance', tag: 'Most Improved' },
  ];

  return (
    <div className="min-h-screen pt-20 pb-24" style={{ backgroundColor: '#F7F9FC' }}>
      <div className="p-6">
        {/* ===== Header / Hero with Class Selector ===== */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: '#E8F1FF' }}>
                <img
                  src={state.user?.avatar}
                  alt="Profile"
                  className="w-12 h-12 rounded-full"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  Welcome, {state.user?.name || 'Teacher'}
                </h1>
                <p className="text-gray-600">Teacher Mode</p>
              </div>
            </div>

            <button
              onClick={() => onNavigate('notifications')}
              className="relative p-3 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
            </button>
          </div>

          {/* Class selector + stats */}
          <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Class selector */}
            <div className="inline-flex items-center gap-2">
              <span className="text-sm text-gray-600">Class:</span>
              <div className="relative">
                <select
                  value={currentClass}
                  onChange={(e) => setCurrentClass(e.target.value)}
                  className="appearance-none pr-8 pl-3 py-2 rounded-full border border-blue-200 bg-white text-sm font-medium text-gray-800"
                >
                  {classes.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-gray-500 absolute right-2 top-2.5 pointer-events-none" />
              </div>
            </div>

            {/* Class stats */}
            <div className="grid grid-cols-3 gap-4">
              <StatPill label="Attendance" value={`${stats.attendance}%`} color="#2E7D32" icon={<Calendar className="w-5 h-5" />} />
              <StatPill label="Homework" value={`${stats.hwCompletion}%`} color="#F5A623" icon={<BookOpen className="w-5 h-5" />} />
              <StatPill label="Achievements" value={`${stats.achievements}`} color="#FF5722" icon={<Trophy className="w-5 h-5" />} />
            </div>
          </div>
        </div>

        {/* ===== Quick Actions ===== */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action) => (
              <button
                key={action.id}
                onClick={() => onNavigate(action.screen)}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 text-left"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${action.color}20` }}
                >
                  <div style={{ color: action.color }}>{action.icon}</div>
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">{action.title}</h3>
                <p className="text-sm text-gray-600">{action.subtitle}</p>
              </button>
            ))}
          </div>
        </div>

        {/* ===== Upcoming Tasks ===== */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Upcoming Tasks</h2>
            <button
              onClick={() => onNavigate('lesson-plans')}
              className="text-sm font-medium text-blue-700"
            >
              View All
            </button>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3">
            {upcomingTasks.map((t, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-gray-50 border-l-4"
                style={{ borderLeftColor: t.tone === 'red' ? '#e74c3c' : t.tone === 'yellow' ? '#f1c40f' : '#2ecc71' }}
              >
                <div className="font-semibold text-gray-800 text-sm">{t.title}</div>
                <div className="text-xs text-gray-600">{t.when}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== Pending Reviews ===== */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Pending Reviews</h2>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {pendingReviews.map((p) => (
              <div key={p.subject} className="min-w-[160px] bg-white rounded-2xl p-4 shadow-sm">
                <div className="font-semibold text-gray-800">{p.subject}</div>
                <div className="text-gray-600 text-sm">{p.count} to review</div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== Student Highlights ===== */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Student Highlights</h2>
          <div className="space-y-3">
            {highlights.map((h, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="font-semibold text-gray-800">{h.title}</div>
                <div className="text-xs text-gray-600">{h.tag}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

function StatPill({
  label,
  value,
  color,
  icon
}: {
  label: string;
  value: string | number;
  color: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="text-center">
      <div
        className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2"
        style={{ backgroundColor: `${color}20` }}
      >
        <div style={{ color }}>{icon}</div>
      </div>
      <p className="text-xl font-bold text-gray-800">{value}</p>
      <p className="text-xs text-gray-600">{label}</p>
    </div>
  );
}

export default TeacherDashboard;