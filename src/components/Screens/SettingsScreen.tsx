import React from 'react';
import { 
  User, 
  Bell, 
  Globe, 
  Shield, 
  HelpCircle, 
  LogOut, 
  ChevronRight,
  Smartphone,
  Database,
  Palette
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface SettingsScreenProps {
  onNavigate: (screen: string) => void;
  onLogout: () => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ onNavigate, onLogout }) => {
  const { state, dispatch } = useApp();

  const colors = {
    primary: '#37474F',
    accent: '#00B8D4',
    background: '#FAFAFA'
  };

  const settingsSections = [
    {
      title: 'Account',
      items: [
        {
          id: 'profile',
          icon: <User className="w-5 h-5" />,
          label: 'Profile Settings',
          subtitle: 'Edit your personal information',
          action: () => console.log('Profile settings')
        },
        {
          id: 'role',
          icon: <Palette className="w-5 h-5" />,
          label: 'Switch Role',
          subtitle: `Currently: ${state.currentRole === 'teacher' ? 'Teacher' : 'Student/Parent'}`,
          action: () => onNavigate('role-selection')
        }
      ]
    },
    {
      title: 'Preferences',
      items: [
        {
          id: 'notifications',
          icon: <Bell className="w-5 h-5" />,
          label: 'Notifications',
          subtitle: 'Manage notification preferences',
          action: () => console.log('Notifications')
        },
        {
          id: 'language',
          icon: <Globe className="w-5 h-5" />,
          label: 'Language',
          subtitle: `${state.language === 'en' ? 'English' : 'हिंदी'}`,
          action: () => {
            dispatch({ type: 'SET_LANGUAGE', payload: state.language === 'en' ? 'hi' : 'en' });
          }
        },
        {
          id: 'sync',
          icon: <Database className="w-5 h-5" />,
          label: 'Sync Data',
          subtitle: getSyncStatusText().text,
          action: () => {
            dispatch({ type: 'SET_SYNC_STATUS', payload: 'syncing' });
            setTimeout(() => {
              dispatch({ type: 'SET_SYNC_STATUS', payload: 'synced' });
            }, 1500);
          }
        }
      ]
    },
    {
      title: 'Data & Privacy',
      items: [
        {
          id: 'privacy',
          icon: <Shield className="w-5 h-5" />,
          label: 'Privacy & Security',
          subtitle: 'Manage your privacy settings',
          action: () => console.log('Privacy')
        },
        {
          id: 'offline',
          icon: <Database className="w-5 h-5" />,
          label: 'Offline Data',
          subtitle: 'Manage cached data',
          action: () => console.log('Offline data')
        }
      ]
    },
    {
      title: 'Support',
      items: [
        {
          id: 'help',
          icon: <HelpCircle className="w-5 h-5" />,
          label: 'Help & Support',
          subtitle: 'Get help and contact support',
          action: () => console.log('Help')
        },
        {
          id: 'about',
          icon: <Smartphone className="w-5 h-5" />,
          label: 'About App',
          subtitle: 'Version 1.0.0',
          action: () => console.log('About')
        }
      ]
    }
  ];

  const getSyncStatusText = () => {
    switch (state.syncStatus) {
      case 'synced':
        return { text: 'All data synced', color: '#4CAF50' };
      case 'syncing':
        return { text: 'Syncing data...', color: colors.accent };
      case 'error':
        return { text: 'Sync failed', color: '#F44336' };
      default:
        return { text: 'Ready to sync', color: '#9E9E9E' };
    }
  };

  const syncStatus = getSyncStatusText();

  return (
    <div 
      className="min-h-screen pt-16 pb-8"
      style={{ backgroundColor: colors.background }}
    >
      <div className="p-6">
        {/* User Profile Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <div className="flex items-center space-x-4 mb-4">
            <img
              src={state.user?.avatar}
              alt="Profile"
              className="w-16 h-16 rounded-full"
            />
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-800">{state.user?.name}</h2>
              <p className="text-gray-600">
                {state.currentRole === 'teacher' 
                  ? `${state.user?.subject} Teacher • ${state.user?.class}`
                  : `Student • ${state.user?.class}`
                }
              </p>
            </div>
          </div>

          {/* Connection Status */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
            <div className="flex items-center space-x-3">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: state.isOnline ? '#4CAF50' : '#F44336' }}
              />
              <div>
                <p className="text-sm font-medium text-gray-800">
                  {state.isOnline ? 'Online' : 'Offline'}
                </p>
                <p className="text-xs" style={{ color: syncStatus.color }}>
                  {syncStatus.text}
                </p>
              </div>
            </div>
            {state.syncStatus === 'syncing' && (
              <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
            )}
          </div>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {settingsSections.map((section) => (
            <div key={section.title} className="bg-white rounded-2xl shadow-sm">
              <div className="p-4 border-b border-gray-100">
                <h3 className="font-semibold text-gray-800">{section.title}</h3>
              </div>
              
              <div className="divide-y divide-gray-100">
                {section.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={item.action}
                    className="w-full p-4 flex items-center space-x-3 hover:bg-gray-50 transition-colors text-left"
                  >
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${colors.primary}20` }}
                    >
                      <div style={{ color: colors.primary }}>
                        {item.icon}
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-800">{item.label}</h4>
                      <p className="text-sm text-gray-600 truncate">{item.subtitle}</p>
                    </div>
                    
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Logout Button */}
        <div className="mt-8">
          <button
            onClick={onLogout}
            className="w-full bg-white rounded-2xl p-4 shadow-sm flex items-center justify-center space-x-3 text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>

        {/* App Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">Shiksha Sathi</p>
          <p className="text-xs text-gray-400">Version 1.0.0 • Made with ❤️ for Education</p>
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;