import React, { useEffect } from 'react';
import { BookOpen } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-green-600 flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8 relative">
          <div className="w-24 h-24 mx-auto bg-white rounded-full flex items-center justify-center shadow-2xl animate-pulse">
            <BookOpen className="w-12 h-12 text-blue-600" />
          </div>
          <div className="absolute inset-0 w-24 h-24 mx-auto border-4 border-white/30 rounded-full animate-spin"></div>
        </div>
        
        <h1 className="text-4xl font-bold text-white mb-4 animate-fade-in">
          Shiksha Sathi
        </h1>
        
        <p className="text-xl text-white/90 mb-8 animate-fade-in-delay">
          शिक्षा साथी
        </p>
        
        <div className="flex space-x-2 justify-center">
          <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;