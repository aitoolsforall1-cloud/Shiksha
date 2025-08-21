import React, { useState } from 'react';
import { 
  Users, 
  Check, 
  X, 
  Clock, 
  Save,
  Search,
  Filter,
  Calendar
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface AttendanceScreenProps {
  onNavigate: (screen: string) => void;
}

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  avatar: string;
  status: 'present' | 'absent' | null;
}

const AttendanceScreen: React.FC<AttendanceScreenProps> = ({ onNavigate }) => {
  const { state } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const colors = {
    primary: '#1E4D92',
    accent: '#F5A623',
    background: '#F3F8F2'
  };

  const [students, setStudents] = useState<Student[]>([
    {
      id: '1',
      name: 'Aarav Sharma',
      rollNumber: '001',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aarav',
      status: null
    },
    {
      id: '2',
      name: 'Diya Patel',
      rollNumber: '002',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Diya',
      status: null
    },
    {
      id: '3',
      name: 'Arjun Kumar',
      rollNumber: '003',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun',
      status: null
    },
    {
      id: '4',
      name: 'Priya Singh',
      rollNumber: '004',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
      status: null
    },
    {
      id: '5',
      name: 'Rohit Verma',
      rollNumber: '005',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rohit',
      status: null
    },
    {
      id: '6',
      name: 'Ananya Gupta',
      rollNumber: '006',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya',
      status: null
    }
  ]);

  const updateAttendance = (studentId: string, status: 'present' | 'absent') => {
    setStudents(prev => 
      prev.map(student => 
        student.id === studentId 
          ? { ...student, status }
          : student
      )
    );
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Save to localStorage (offline support)
    const attendanceData = {
      date: selectedDate,
      class: state.user?.class,
      subject: state.user?.subject,
      students: students.map(s => ({
        id: s.id,
        name: s.name,
        rollNumber: s.rollNumber,
        status: s.status
      }))
    };
    
    const existingData = JSON.parse(localStorage.getItem('attendance') || '[]');
    existingData.push(attendanceData);
    localStorage.setItem('attendance', JSON.stringify(existingData));
    
    setIsSubmitting(false);
    onNavigate('dashboard');
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.rollNumber.includes(searchQuery)
  );

  const presentCount = students.filter(s => s.status === 'present').length;
  const absentCount = students.filter(s => s.status === 'absent').length;
  const totalMarked = presentCount + absentCount;

  const markAllPresent = () => {
    setStudents(prev => prev.map(student => ({ ...student, status: 'present' as const })));
  };

  const markAllAbsent = () => {
    setStudents(prev => prev.map(student => ({ ...student, status: 'absent' as const })));
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
              <h1 className="text-2xl font-bold text-gray-800">Attendance</h1>
              <p className="text-gray-600">{state.user?.subject} • {state.user?.class}</p>
            </div>
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${colors.primary}20` }}
            >
              <Users className="w-6 h-6" style={{ color: colors.primary }} />
            </div>
          </div>

          {/* Date Selection */}
          <div className="flex items-center space-x-3 mb-4">
            <Calendar className="w-5 h-5 text-gray-500" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{presentCount}</p>
              <p className="text-xs text-gray-600">Present</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">{absentCount}</p>
              <p className="text-xs text-gray-600">Absent</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-800">{students.length}</p>
              <p className="text-xs text-gray-600">Total</p>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex space-x-3 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search students..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex space-x-2">
            <button
              onClick={markAllPresent}
              className="px-4 py-3 bg-green-500 text-white rounded-xl font-medium text-sm hover:bg-green-600 transition-colors"
            >
              All Present
            </button>
            <button
              onClick={markAllAbsent}
              className="px-4 py-3 bg-red-500 text-white rounded-xl font-medium text-sm hover:bg-red-600 transition-colors"
            >
              All Absent
            </button>
          </div>
        </div>

        {/* Students List */}
        <div className="bg-white rounded-2xl shadow-sm mb-6">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-gray-800">
                Students ({filteredStudents.length})
              </p>
              <p className="text-sm text-gray-600">
                Marked: {totalMarked}/{students.length}
              </p>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {filteredStudents.map((student) => (
              <div key={student.id} className="p-4 flex items-center space-x-4">
                <img
                  src={student.avatar}
                  alt={student.name}
                  className="w-12 h-12 rounded-full"
                />
                
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{student.name}</h3>
                  <p className="text-sm text-gray-600">Roll No: {student.rollNumber}</p>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => updateAttendance(student.id, 'present')}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      student.status === 'present'
                        ? 'bg-green-500 text-white shadow-lg scale-110'
                        : 'bg-gray-100 text-gray-400 hover:bg-green-100 hover:text-green-500'
                    }`}
                  >
                    <Check className="w-5 h-5" />
                  </button>
                  
                  <button
                    onClick={() => updateAttendance(student.id, 'absent')}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      student.status === 'absent'
                        ? 'bg-red-500 text-white shadow-lg scale-110'
                        : 'bg-gray-100 text-gray-400 hover:bg-red-100 hover:text-red-500'
                    }`}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={totalMarked === 0 || isSubmitting}
          className="w-full py-4 bg-white rounded-2xl shadow-sm border-2 font-semibold text-white flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          style={{ 
            backgroundColor: totalMarked > 0 ? colors.primary : '#9E9E9E',
            borderColor: totalMarked > 0 ? colors.primary : '#9E9E9E'
          }}
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Saving Attendance...</span>
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              <span>Save Attendance ({totalMarked}/{students.length})</span>
            </>
          )}
        </button>

        {!state.isOnline && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-xl">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-yellow-600" />
              <p className="text-sm text-yellow-800">
                Offline mode: Attendance will sync when connection is restored
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceScreen;