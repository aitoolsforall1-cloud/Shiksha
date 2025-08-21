import React, { useState } from 'react';
import { 
  Calendar, 
  CheckCircle, 
  XCircle, 
  Clock,
  TrendingUp,
  Award
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface AttendanceViewScreenProps {
  onNavigate: (screen: string) => void;
}

interface AttendanceRecord {
  date: Date;
  status: 'present' | 'absent' | 'late';
  subject?: string;
}

const AttendanceViewScreen: React.FC<AttendanceViewScreenProps> = ({ onNavigate }) => {
  const { state } = useApp();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const colors = {
    primary: '#2E7D32',
    accent: '#FFD54F',
    background: '#E3F2FD'
  };

  // Mock attendance data
  const attendanceRecords: AttendanceRecord[] = [
    { date: new Date(2024, 7, 1), status: 'present' },
    { date: new Date(2024, 7, 2), status: 'present' },
    { date: new Date(2024, 7, 3), status: 'absent' },
    { date: new Date(2024, 7, 5), status: 'present' },
    { date: new Date(2024, 7, 6), status: 'late' },
    { date: new Date(2024, 7, 7), status: 'present' },
    { date: new Date(2024, 7, 8), status: 'present' },
    { date: new Date(2024, 7, 9), status: 'present' },
    { date: new Date(2024, 7, 10), status: 'present' },
    { date: new Date(2024, 7, 12), status: 'present' },
    { date: new Date(2024, 7, 13), status: 'present' },
    { date: new Date(2024, 7, 14), status: 'absent' },
    { date: new Date(2024, 7, 15), status: 'present' },
    { date: new Date(2024, 7, 16), status: 'present' },
    { date: new Date(2024, 7, 17), status: 'present' },
    { date: new Date(2024, 7, 19), status: 'present' },
    { date: new Date(2024, 7, 20), status: 'present' },
    { date: new Date(2024, 7, 21), status: 'present' },
    { date: new Date(2024, 7, 22), status: 'present' },
    { date: new Date(2024, 7, 23), status: 'present' },
    { date: new Date(2024, 7, 24), status: 'present' },
    { date: new Date(2024, 7, 26), status: 'present' },
    { date: new Date(2024, 7, 27), status: 'present' },
    { date: new Date(2024, 7, 28), status: 'present' },
    { date: new Date(2024, 7, 29), status: 'present' }
  ];

  const totalDays = attendanceRecords.length;
  const presentDays = attendanceRecords.filter(r => r.status === 'present').length;
  const absentDays = attendanceRecords.filter(r => r.status === 'absent').length;
  const lateDays = attendanceRecords.filter(r => r.status === 'late').length;
  const attendancePercentage = Math.round((presentDays / totalDays) * 100);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'absent':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'late':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return '#4CAF50';
      case 'absent':
        return '#F44336';
      case 'late':
        return '#FF9800';
      default:
        return '#E0E0E0';
    }
  };

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
    const firstDay = getFirstDayOfMonth(selectedMonth, selectedYear);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(selectedYear, selectedMonth, day);
      const record = attendanceRecords.find(r => 
        r.date.getDate() === day && 
        r.date.getMonth() === selectedMonth &&
        r.date.getFullYear() === selectedYear
      );
      
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      const isToday = date.toDateString() === new Date().toDateString();

      days.push(
        <div
          key={day}
          className={`h-10 flex items-center justify-center rounded-lg text-sm font-medium relative ${
            isToday ? 'ring-2 ring-blue-500' : ''
          } ${isWeekend ? 'bg-gray-100 text-gray-400' : 'text-gray-700'}`}
        >
          <span>{day}</span>
          {record && !isWeekend && (
            <div 
              className="absolute bottom-0 right-0 w-2 h-2 rounded-full"
              style={{ backgroundColor: getStatusColor(record.status) }}
            />
          )}
        </div>
      );
    }

    return days;
  };

  const monthlyStats = [
    {
      label: 'Present',
      value: presentDays,
      total: totalDays,
      color: '#4CAF50',
      icon: <CheckCircle className="w-5 h-5" />
    },
    {
      label: 'Absent',
      value: absentDays,
      total: totalDays,
      color: '#F44336',
      icon: <XCircle className="w-5 h-5" />
    },
    {
      label: 'Late',
      value: lateDays,
      total: totalDays,
      color: '#FF9800',
      icon: <Clock className="w-5 h-5" />
    }
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
              <h1 className="text-2xl font-bold text-gray-800">Attendance</h1>
              <p className="text-gray-600">{state.user?.class}</p>
            </div>
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${colors.primary}20` }}
            >
              <Calendar className="w-6 h-6" style={{ color: colors.primary }} />
            </div>
          </div>

          {/* Attendance Percentage Circle */}
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
                  strokeDasharray={`${attendancePercentage * 3.14} 314`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-800">{attendancePercentage}%</p>
                  <p className="text-xs text-gray-600">This Month</p>
                </div>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              {presentDays} out of {totalDays} days present
            </h3>
            <p className="text-sm text-gray-600">
              {attendancePercentage >= 90 ? 'Excellent attendance!' : 
               attendancePercentage >= 75 ? 'Good attendance' : 'Needs improvement'}
            </p>
          </div>

          {/* Monthly Stats */}
          <div className="grid grid-cols-3 gap-4">
            {monthlyStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div 
                  className="w-10 h-10 mx-auto rounded-full flex items-center justify-center mb-2"
                  style={{ backgroundColor: `${stat.color}20` }}
                >
                  <div style={{ color: stat.color }}>
                    {stat.icon}
                  </div>
                </div>
                <p className="text-xl font-bold" style={{ color: stat.color }}>
                  {stat.value}
                </p>
                <p className="text-xs text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Month Selector */}
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                if (selectedMonth === 0) {
                  setSelectedMonth(11);
                  setSelectedYear(selectedYear - 1);
                } else {
                  setSelectedMonth(selectedMonth - 1);
                }
              }}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              ←
            </button>
            
            <h2 className="text-lg font-semibold text-gray-800">
              {monthNames[selectedMonth]} {selectedYear}
            </h2>
            
            <button
              onClick={() => {
                if (selectedMonth === 11) {
                  setSelectedMonth(0);
                  setSelectedYear(selectedYear + 1);
                } else {
                  setSelectedMonth(selectedMonth + 1);
                }
              }}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              →
            </button>
          </div>
        </div>

        {/* Calendar */}
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
          <div className="grid grid-cols-7 gap-1 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="h-8 flex items-center justify-center text-xs font-semibold text-gray-600">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {renderCalendar()}
          </div>
          
          {/* Legend */}
          <div className="flex justify-center space-x-6 mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-xs text-gray-600">Present</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-xs text-gray-600">Absent</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span className="text-xs text-gray-600">Late</span>
            </div>
          </div>
        </div>

        {/* Achievement Badge */}
        {attendancePercentage >= 90 && (
          <div className="bg-gradient-to-r from-green-400 to-green-600 rounded-2xl p-6 shadow-sm text-white">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Perfect Attendance!</h3>
                <p className="text-sm opacity-90">
                  You've maintained excellent attendance this month. Keep it up!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceViewScreen;