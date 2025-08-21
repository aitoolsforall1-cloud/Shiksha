import React, { useState } from 'react';
import { Smartphone, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface LoginScreenProps {
  onLoginSuccess: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const { state, dispatch } = useApp();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [isLoading, setIsLoading] = useState(false);

  const getColorScheme = () => {
    return {
      primary: '#37474F',
      accent: '#00B8D4',
      background: '#FAFAFA'
    };
  };

  const colors = getColorScheme();

  const handleSendOTP = async () => {
    if (phoneNumber.length !== 10) return;
    
    setIsLoading(true);
    dispatch({ type: 'SET_LOADING', payload: true });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setStep('otp');
    setIsLoading(false);
    dispatch({ type: 'SET_LOADING', payload: false });
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 4) return;
    
    setIsLoading(true);
    dispatch({ type: 'SET_LOADING', payload: true });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Set mock user data based on role
    const mockUser = {
      id: '1',
      name: state.currentRole === 'teacher' ? 'Priya Sharma' : 'Rahul Kumar',
      role: state.currentRole!,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${state.currentRole}`,
      ...(state.currentRole === 'teacher' 
        ? { subject: 'Mathematics', class: 'Class 8A' }
        : { class: 'Class 8A' }
      )
    };
    
    dispatch({ type: 'SET_USER', payload: mockUser });
    setIsLoading(false);
    dispatch({ type: 'SET_LOADING', payload: false });
    onLoginSuccess();
  };

  const getRoleTitle = () => {
    return state.currentRole === 'teacher' ? 'Teacher Login' : 'Student/Parent Login';
  };

  const getRoleColor = () => {
    return state.currentRole === 'teacher' ? '#1E4D92' : '#2E7D32';
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="flex items-center justify-between p-4">
          <div className="w-8"></div>
          <h1 className="text-xl font-semibold" style={{ color: getRoleColor() }}>
            {getRoleTitle()}
          </h1>
          <div className="w-8"></div>
        </div>
      </div>

      <div className="p-6 pt-12">
        <div className="max-w-md mx-auto">
          {/* Icon */}
          <div className="text-center mb-8">
            <div 
              className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4"
              style={{ backgroundColor: `${getRoleColor()}20` }}
            >
              <Smartphone className="w-10 h-10" style={{ color: getRoleColor() }} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {step === 'phone' ? 'Enter Mobile Number' : 'Enter OTP'}
            </h2>
            <p className="text-gray-600">
              {step === 'phone' 
                ? 'We will send you a 4-digit OTP for verification' 
                : `OTP sent to +91 ${phoneNumber}`
              }
            </p>
          </div>

          {step === 'phone' ? (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    +91
                  </span>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    placeholder="Enter 10-digit mobile number"
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
                    style={{ minHeight: '56px' }}
                  />
                </div>
              </div>

              <button
                onClick={handleSendOTP}
                disabled={phoneNumber.length !== 10 || isLoading}
                className="w-full py-4 rounded-xl font-semibold text-white flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                style={{ 
                  backgroundColor: phoneNumber.length === 10 ? getRoleColor() : '#9E9E9E',
                  minHeight: '56px'
                }}
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Send OTP</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  4-Digit OTP
                </label>
                <input
                  type="tel"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  placeholder="Enter OTP"
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-lg text-center tracking-widest"
                  style={{ minHeight: '56px' }}
                />
              </div>

              <button
                onClick={handleVerifyOTP}
                disabled={otp.length !== 4 || isLoading}
                className="w-full py-4 rounded-xl font-semibold text-white flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                style={{ 
                  backgroundColor: otp.length === 4 ? getRoleColor() : '#9E9E9E',
                  minHeight: '56px'
                }}
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Verify & Login</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

              <div className="text-center">
                <button
                  onClick={() => setStep('phone')}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Change mobile number
                </button>
                <span className="mx-2 text-gray-300">•</span>
                <button
                  onClick={handleSendOTP}
                  className="text-sm hover:text-gray-700"
                  style={{ color: getRoleColor() }}
                >
                  Resend OTP
                </button>
              </div>
            </div>
          )}

          {/* Demo credentials */}
          <div className="mt-8 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
            <p className="text-sm font-medium text-yellow-800 mb-2">Demo Credentials:</p>
            <p className="text-xs text-yellow-700">
              Mobile: Any 10 digits • OTP: Any 4 digits
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;