import React, { useState } from 'react';
import { ArrowRight, BookOpen, Users, MessageCircle, Trophy, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface OnboardingScreenProps {
  onComplete: () => void;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const { state } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);

  const getColorScheme = () => {
    return {
      primary: '#37474F',
      accent: '#00B8D4',
      background: '#FAFAFA'
    };
  };

  const getRoleColor = () => {
    return state.currentRole === 'teacher' ? '#1E4D92' : '#2E7D32';
  };

  const colors = getColorScheme();

  const teacherSlides = [
    {
      icon: <BookOpen className="w-12 h-12" />,
      title: 'Manage Your Class',
      description: 'Take attendance, record marks, and assign homework all in one place.',
      features: ['📋 Digital Attendance', '📊 Marks Management', '📚 Homework Assignment']
    },
    {
      icon: <MessageCircle className="w-12 h-12" />,
      title: 'Parent Communication',
      description: 'Send voice messages, SMS updates, and announcements to parents instantly.',
      features: ['🔊 Voice Messages', '📱 SMS Updates', '📢 Announcements']
    },
    {
      icon: <Trophy className="w-12 h-12" />,
      title: 'Competitions & Events',
      description: 'Create competitions, track participation, and celebrate student achievements.',
      features: ['🏆 Create Competitions', '📈 Track Progress', '🎉 Celebrate Success']
    }
  ];

  const studentSlides = [
    {
      icon: <BookOpen className="w-12 h-12" />,
      title: 'Track Your Progress',
      description: 'View your homework, marks, attendance, and academic progress in real-time.',
      features: ['📚 View Homework', '📊 Check Marks', '📅 Attendance Record']
    },
    {
      icon: <Trophy className="w-12 h-12" />,
      title: 'Competitions & Achievements',
      description: 'Participate in competitions, earn achievements, and track your success.',
      features: ['🏆 Join Competitions', '🏅 Earn Achievements', '📈 Progress Tracking']
    },
    {
      icon: <MessageCircle className="w-12 h-12" />,
      title: 'Stay Connected',
      description: 'Receive important announcements and communicate with teachers easily.',
      features: ['📢 Get Updates', '💬 Chat with Teachers', '🔔 Important Alerts']
    }
  ];

  const slides = state.currentRole === 'teacher' ? teacherSlides : studentSlides;

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const skipOnboarding = () => {
    onComplete();
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
      {/* Header */}
      <div className="flex justify-between items-center p-4">
        <div className="flex space-x-1">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'w-8' : 'w-2'
              }`}
              style={{
                backgroundColor: index === currentSlide ? getRoleColor() : '#E0E0E0'
              }}
            />
          ))}
        </div>
        <button
          onClick={skipOnboarding}
          className="text-gray-500 text-sm font-medium px-3 py-1 rounded-full hover:bg-gray-100"
        >
          Skip
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center px-6 pb-8">
        <div className="text-center mb-8">
          <div 
            className="w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6"
            style={{ backgroundColor: `${getRoleColor()}20` }}
          >
            <div style={{ color: getRoleColor() }}>
              {slides[currentSlide].icon}
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {slides[currentSlide].title}
          </h2>
          
          <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-sm mx-auto">
            {slides[currentSlide].description}
          </p>
          
          <div className="space-y-3 max-w-xs mx-auto">
            {slides[currentSlide].features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3 text-left">
                <div 
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: getRoleColor() }}
                >
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <div className="w-16">
            {currentSlide > 0 && (
              <button
                onClick={() => setCurrentSlide(currentSlide - 1)}
                className="text-gray-500 text-sm font-medium"
              >
                Back
              </button>
            )}
          </div>
          
          <button
            onClick={nextSlide}
            className="flex items-center space-x-2 px-8 py-4 rounded-full font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300"
            style={{ backgroundColor: getRoleColor() }}
          >
            <span>{currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          
          <div className="w-16"></div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingScreen;