import React, { useState, useEffect } from 'react';
import { AppProvider } from './context/AppContext';

import SplashScreen from './components/Screens/SplashScreen';
import RoleSelectionScreen from './components/Screens/RoleSelectionScreen';
import LoginScreen from './components/Screens/LoginScreen';
import OnboardingScreen from './components/Screens/OnboardingScreen';

import TeacherDashboard from './components/Screens/TeacherDashboard';
import StudentDashboard from './components/Screens/StudentDashboard';

import AttendanceScreen from './components/Screens/AttendanceScreen';
import ChatScreen from './components/Screens/ChatScreen';
import SettingsScreen from './components/Screens/SettingsScreen';
import HomeworkViewScreen from './components/Screens/HomeworkViewScreen';
import MarksProgressScreen from './components/Screens/MarksProgressScreen';
import AttendanceViewScreen from './components/Screens/AttendanceViewScreen';
import CompetitionAlertsScreen from './components/Screens/CompetitionAlertsScreen';
import AchievementsScreen from './components/Screens/AchievementsScreen';
import NotificationsScreen from './components/Screens/NotificationsScreen';

import Navigation from './components/Layout/Navigation';

type AppScreen =
  | 'splash'
  | 'role-selection'
  | 'login'
  | 'onboarding'
  | 'dashboard'
  | 'attendance'
  | 'marks'
  | 'homework'
  | 'homework-view'
  | 'competitions'
  | 'parent-communication'
  | 'marks-progress'
  | 'attendance-view'
  | 'competition-alerts'
  | 'achievements'
  | 'notifications'
  | 'chat'
  | 'settings';

function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('splash');
  const [navigationHistory, setNavigationHistory] = useState<AppScreen[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);

  // ---------- helpers ----------
  const goToDashboardByRole = () => setCurrentScreen('dashboard');

  const handleNavigate = (screen: AppScreen) => {
    if (currentScreen !== screen) {
      setNavigationHistory(prev => [...prev, currentScreen]);
    }
    setCurrentScreen(screen);
  };

  const handleBack = () => {
    if (navigationHistory.length > 0) {
      const previousScreen = navigationHistory[navigationHistory.length - 1];
      setNavigationHistory(prev => prev.slice(0, -1));
      setCurrentScreen(previousScreen);
    } else {
      // no history -> go to role dashboard
      goToDashboardByRole();
    }
  };

  const handleHome = () => {
    setNavigationHistory([]);
    goToDashboardByRole();
  };

  // ---------- splash / role / auth ----------
  const handleSplashComplete = () => setCurrentScreen('role-selection');

  // IMPORTANT: persist role selection so DashboardRouter can render correct dashboard
  const handleRoleSelect = (role: 'teacher' | 'student') => {
    localStorage.setItem('currentRole', role); // <- persist role
    setCurrentScreen('login');
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    if (!hasSeenOnboarding) {
      setCurrentScreen('onboarding');
    } else {
      goToDashboardByRole();
    }
  };

  const handleOnboardingComplete = () => {
    setHasSeenOnboarding(true);
    goToDashboardByRole();
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setHasSeenOnboarding(false);
    setNavigationHistory([]);
    localStorage.removeItem('currentRole'); // <- clear role on logout
    setCurrentScreen('role-selection');
  };

  // ---------- renderer ----------
  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onComplete={handleSplashComplete} />;

      case 'role-selection':
        return <RoleSelectionScreen onRoleSelect={handleRoleSelect} />;

      case 'login':
        return <LoginScreen onLoginSuccess={handleLoginSuccess} />;

      case 'onboarding':
        return <OnboardingScreen onComplete={handleOnboardingComplete} />;

      case 'dashboard':
        return (
          <AppWithNavigation currentScreen={currentScreen} onBack={handleBack} onHome={handleHome}>
            <DashboardRouter onNavigate={handleNavigate} />
          </AppWithNavigation>
        );

      case 'attendance':
        return (
          <AppWithNavigation currentScreen={currentScreen} onBack={handleBack} onHome={handleHome}>
            <AttendanceScreen onNavigate={handleNavigate} />
          </AppWithNavigation>
        );

      case 'homework-view':
        return (
          <AppWithNavigation currentScreen={currentScreen} onBack={handleBack} onHome={handleHome}>
            <HomeworkViewScreen onNavigate={handleNavigate} />
          </AppWithNavigation>
        );

      case 'marks-progress':
        return (
          <AppWithNavigation currentScreen={currentScreen} onBack={handleBack} onHome={handleHome}>
            <MarksProgressScreen onNavigate={handleNavigate} />
          </AppWithNavigation>
        );

      case 'attendance-view':
        return (
          <AppWithNavigation currentScreen={currentScreen} onBack={handleBack} onHome={handleHome}>
            <AttendanceViewScreen onNavigate={handleNavigate} />
          </AppWithNavigation>
        );

      case 'competition-alerts':
        return (
          <AppWithNavigation currentScreen={currentScreen} onBack={handleBack} onHome={handleHome}>
            <CompetitionAlertsScreen onNavigate={handleNavigate} />
          </AppWithNavigation>
        );

      case 'achievements':
        return (
          <AppWithNavigation currentScreen={currentScreen} onBack={handleBack} onHome={handleHome}>
            <AchievementsScreen onNavigate={handleNavigate} />
          </AppWithNavigation>
        );

      case 'notifications':
        return (
          <AppWithNavigation currentScreen={currentScreen} onBack={handleBack} onHome={handleHome}>
            <NotificationsScreen onNavigate={handleNavigate} />
          </AppWithNavigation>
        );

      case 'chat':
        return (
          <AppWithNavigation currentScreen={currentScreen} onBack={handleBack} onHome={handleHome} showSearch>
            <ChatScreen onNavigate={handleNavigate} />
          </AppWithNavigation>
        );

      case 'settings':
        return (
          <AppWithNavigation currentScreen={currentScreen} onBack={handleBack} onHome={handleHome}>
            <SettingsScreen onNavigate={handleNavigate} onLogout={handleLogout} />
          </AppWithNavigation>
        );

      default:
        return (
          <AppWithNavigation currentScreen={currentScreen} onBack={handleBack} onHome={handleHome}>
            <div className="min-h-screen bg-gray-100 flex items-center justify-center pt-20 pb-24">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                  {currentScreen.charAt(0).toUpperCase() + currentScreen.slice(1).replace('-', ' ')} Screen
                </h1>
                <p className="text-gray-600 mb-8">This screen is coming soon!</p>
                <button
                  onClick={handleHome}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                >
                  Back to Dashboard
                </button>
              </div>
            </div>
          </AppWithNavigation>
        );
    }
  };

  return <AppProvider>{renderScreen()}</AppProvider>;
}

// ---------- Navigation wrapper ----------
const AppWithNavigation: React.FC<{
  children: React.ReactNode;
  currentScreen: AppScreen;
  onBack: () => void;
  onHome: () => void;
  showSearch?: boolean;
  title?: string;
}> = ({ children, currentScreen, onBack, onHome, showSearch = false, title }) => {
  return (
    <>
      <Navigation
        currentScreen={currentScreen}
        onBack={onBack}
        onHome={onHome}
        onNavigate={(screen) => {
          // bubble navigation to App via CustomEvent
          window.dispatchEvent(new CustomEvent('navigate', { detail: screen }));
        }}
        showSearch={showSearch}
        title={title}
      />
      {children}
    </>
  );
};

// ---------- Dashboard router chooses Teacher or Student based on persisted role ----------
const DashboardRouter: React.FC<{ onNavigate: (screen: AppScreen) => void }> = ({ onNavigate }) => {
  const [currentRole, setCurrentRole] = React.useState<'teacher' | 'student' | null>(null);

  useEffect(() => {
    const role = (localStorage.getItem('currentRole') as 'teacher' | 'student' | null) || null;
    setCurrentRole(role);
  }, []);

  useEffect(() => {
    const handleNavigate = (event: any) => onNavigate(event.detail as AppScreen);
    window.addEventListener('navigate', handleNavigate);
    return () => window.removeEventListener('navigate', handleNavigate);
  }, [onNavigate]);

  if (currentRole === null) {
    // If no role yet, fall back to role selection
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-700 mb-4">No role selected.</p>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'role-selection' }))}
          >
            Choose Role
          </button>
        </div>
      </div>
    );
  }

  if (currentRole === 'teacher') {
    return <TeacherDashboard onNavigate={onNavigate} />;
  }

  return <StudentDashboard onNavigate={onNavigate} />;
};

export default App;