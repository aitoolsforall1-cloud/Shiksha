import React from 'react';
import { Users, BookOpen, Home } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface RoleSelectionScreenProps {
  onRoleSelect: (role: 'teacher' | 'student') => void;
}

const RoleSelectionScreen: React.FC<RoleSelectionScreenProps> = ({ onRoleSelect }) => {
  const { dispatch } = useApp();

  const handleRoleSelect = (role: 'teacher' | 'student') => {
    dispatch({ type: 'SET_ROLE', payload: role });
    onRoleSelect(role);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="flex items-center justify-between p-4">
          <div className="w-8"></div>
          <h1 className="text-xl font-semibold text-gray-800">Welcome to Shiksha Sathi</h1>
          <Home className="w-6 h-6 text-gray-400" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 flex flex-col justify-center">
        <div className="text-center mb-12">
          <div className="w-20 h-20 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
            <BookOpen className="w-10 h-10 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Choose Your Role</h2>
          <p className="text-gray-600 max-w-sm mx-auto">
            Select whether you are a teacher managing your class or a student/parent accessing information.
          </p>
        </div>

        <div className="space-y-4 max-w-md mx-auto w-full">
          {/* Teacher Role */}
          <button
            onClick={() => handleRoleSelect('teacher')}
            className="w-full bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-2 border-transparent hover:border-blue-200"
          >
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-xl font-semibold text-gray-800 mb-1">Teacher</h3>
                <p className="text-gray-600 text-sm">
                  Manage attendance, marks, homework, and communicate with parents
                </p>
                <div className="flex flex-wrap gap-1 mt-2">
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">📋 Attendance</span>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">📊 Marks</span>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">📚 Homework</span>
                </div>
              </div>
            </div>
          </button>

          {/* Student/Parent Role */}
          <button
            onClick={() => handleRoleSelect('student')}
            className="w-full bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-2 border-transparent hover:border-green-200"
          >
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-green-600" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-xl font-semibold text-gray-800 mb-1">Student / Parent</h3>
                <p className="text-gray-600 text-sm">
                  View homework, marks, attendance, and track achievements
                </p>
                <div className="flex flex-wrap gap-1 mt-2">
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">📚 Homework</span>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">🏅 Progress</span>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">🏆 Awards</span>
                </div>
              </div>
            </div>
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            You can switch roles anytime from Settings
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoleSelectionScreen;