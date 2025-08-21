import React from 'react';
import { 
  ArrowLeft, 
  Home, 
  MessageCircle, 
  Globe, 
  RefreshCw, 
  Settings,
  Search
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface NavigationProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
  onBack: () => void;
  onHome: () => void;
  showSearch?: boolean;
  title?: string;
}

const Navigation: React.FC<NavigationProps> = ({ 
  currentScreen, 
  onNavigate, 
  onBack,
  onHome,
  showSearch = false,
  title 
}) => {
  const { state, dispatch } = useApp();

  const getColorScheme = () => {
    if (currentScreen === 'chat' || currentScreen === 'settings' || currentScreen === 'notifications') {
      return {
        primary: '#37474F',
        accent: '#00B8D4',
        background: '#FAFAFA'
      };
    }
    
    if (state.currentRole === 'teacher') {
      return {
        primary: '#1E4D92',
        accent: '#F5A623',
        background: '#F3F8F2'
      };
    }
    
    return {
      primary: '#2E7D32',
      accent: '#FFD54F',
      background: '#E3F2FD'
    };
  };

  const colors = getColorScheme();

  const getRoleLabel = () => {
    if (currentScreen === 'chat' || currentScreen === 'settings' || currentScreen === 'notifications') {
      return title || 'Shiksha Sathi';
    }
    return state.currentRole === 'teacher' ? 'Teacher Mode' : 'Student Mode';
  };

  const handleSync = () => {
    dispatch({ type: 'SET_SYNC_STATUS', payload: 'syncing' });
    setTimeout(() => {
      dispatch({ type: 'SET_SYNC_STATUS', payload: 'synced' });
    }, 1500);
  };

  const toggleLanguage = () => {
    dispatch({ type: 'SET_LANGUAGE', payload: state.language === 'en' ? 'hi' : 'en' });
  };

  const getSyncIcon = () => {
    if (state.syncStatus === 'syncing') {
      return <RefreshCw className="w-5 h-5 animate-spin" />;
    }
    return <RefreshCw className="w-5 h-5" />;
  };

  const getSyncColor = () => {
    if (state.syncStatus === 'synced') return '#4CAF50';
    if (state.syncStatus === 'error') return '#F44336';
    if (state.syncStatus === 'syncing') return colors.accent;
    return '#9E9E9E';
  };

  // Special navigation for Chat and Settings screens
  if (currentScreen === 'chat') {
    return (
      <div className="fixed top-0 left-0 right-0 z-50" style={{ backgroundColor: colors.background }}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <button 
            onClick={onBack}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" style={{ color: colors.primary }} />
          </button>
          
          {showSearch ? (
            <div className="flex-1 mx-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search messages..."
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          ) : (
            <h1 className="text-lg font-semibold" style={{ color: colors.primary }}>
              {getRoleLabel()}
            </h1>
          )}
          
          <button 
            onClick={onHome}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Home className="w-6 h-6" style={{ color: colors.primary }} />
          </button>
        </div>
      </div>
    );
  }

  if (currentScreen === 'settings') {
    return (
      <div className="fixed top-0 left-0 right-0 z-50" style={{ backgroundColor: colors.background }}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <button 
            onClick={onBack}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" style={{ color: colors.primary }} />
          </button>
          
          <h1 className="text-lg font-semibold" style={{ color: colors.primary }}>
            Settings
          </h1>
          
          <button 
            onClick={onHome}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Home className="w-6 h-6" style={{ color: colors.primary }} />
          </button>
        </div>
      </div>
    );
  }

  // Standard navigation for other screens
  return (
    <>
      {/* Top Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50" style={{ backgroundColor: colors.background }}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <button 
            onClick={onBack}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" style={{ color: colors.primary }} />
          </button>
          
          <h1 className="text-lg font-semibold" style={{ color: colors.primary }}>
            {getRoleLabel()}
          </h1>
          
          <button 
            onClick={onHome}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Home className="w-6 h-6" style={{ color: colors.primary }} />
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50" style={{ backgroundColor: colors.background }}>
        <div className="flex items-center justify-between p-4 border-t border-gray-200">
          <button 
            onClick={() => onNavigate('chat')}
            className="p-3 rounded-full hover:bg-gray-100 transition-colors"
          >
            <MessageCircle className="w-6 h-6" style={{ color: colors.primary }} />
          </button>
          
          <button 
            onClick={() => onNavigate('settings')}
            className="p-3 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Settings className="w-6 h-6" style={{ color: colors.primary }} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Navigation;