import React, { useState } from 'react';
import { 
  Send, 
  Paperclip, 
  Mic, 
  Search, 
  Phone,
  Video,
  MoreVertical,
  Plus,
  Users,
  User,
  Megaphone,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface ChatScreenProps {
  onNavigate: (screen: string) => void;
}

interface ChatThread {
  id: string;
  name: string;
  type: 'parent' | 'staff' | 'teacher' | 'announcement';
  lastMessage: string;
  timestamp: Date;
  unreadCount: number;
  avatar: string;
  isOnline?: boolean;
}

interface Message {
  id: string;
  sender: 'me' | 'other';
  message: string;
  timestamp: Date;
  type: 'text' | 'voice' | 'image' | 'announcement';
  status: 'queued' | 'sent' | 'delivered' | 'read';
  duration?: number;
}

const ChatScreen: React.FC<ChatScreenProps> = ({ onNavigate }) => {
  const { state } = useApp();
  const [activeView, setActiveView] = useState<'list' | 'conversation'>('list');
  const [selectedThread, setSelectedThread] = useState<ChatThread | null>(null);
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [teacherFilter, setTeacherFilter] = useState<'all' | 'parents' | 'staff'>('all');

  const colors = {
    primary: '#37474F',
    accent: '#00B8D4',
    background: '#FAFAFA'
  };

  const roleColors = {
    teacher: '#1E4D92',
    student: '#2E7D32'
  };

  // Mock chat threads for teachers
  const teacherThreads: ChatThread[] = [
    {
      id: '1',
      name: 'Priya\'s Mother',
      type: 'parent',
      lastMessage: 'Thank you for the homework update',
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      unreadCount: 0,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya-mom',
      isOnline: true
    },
    {
      id: '2',
      name: 'Class 8A Parents',
      type: 'parent',
      lastMessage: 'Sports day announcement sent',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      unreadCount: 3,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=class8a',
      isOnline: false
    },
    {
      id: '3',
      name: 'Principal',
      type: 'staff',
      lastMessage: 'Meeting scheduled for tomorrow',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
      unreadCount: 1,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=principal',
      isOnline: true
    },
    {
      id: '4',
      name: 'Rahul\'s Father',
      type: 'parent',
      lastMessage: 'Can we schedule a parent meeting?',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
      unreadCount: 2,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rahul-dad',
      isOnline: false
    }
  ];

  // Mock chat threads for students/parents
  const studentThreads: ChatThread[] = [
    {
      id: '1',
      name: 'School Announcements',
      type: 'announcement',
      lastMessage: 'Sports Day celebration on August 25th',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      unreadCount: 1,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=school',
      isOnline: false
    },
    {
      id: '2',
      name: 'Ms. Sharma (Class Teacher)',
      type: 'teacher',
      lastMessage: 'Homework for tomorrow has been updated',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      unreadCount: 0,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sharma',
      isOnline: true
    },
    {
      id: '3',
      name: 'Mr. Kumar (Math)',
      type: 'teacher',
      lastMessage: 'Great work on the algebra test!',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
      unreadCount: 0,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=kumar',
      isOnline: false
    },
    {
      id: '4',
      name: 'Dr. Patel (Science)',
      type: 'teacher',
      lastMessage: 'Lab report submission deadline extended',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      unreadCount: 1,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=patel',
      isOnline: true
    }
  ];

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'other',
      message: 'Hello! How can I help you today?',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      type: 'text',
      status: 'read'
    },
    {
      id: '2',
      sender: 'me',
      message: 'I wanted to ask about the homework assignment.',
      timestamp: new Date(Date.now() - 1000 * 60 * 25),
      type: 'text',
      status: 'delivered'
    },
    {
      id: '3',
      sender: 'other',
      message: 'Sure! The assignment is due next week. Please check the homework section for details.',
      timestamp: new Date(Date.now() - 1000 * 60 * 20),
      type: 'text',
      status: 'read'
    }
  ]);

  const threads = state.currentRole === 'teacher' ? teacherThreads : studentThreads;
  const filteredThreads = state.currentRole === 'teacher' 
    ? threads.filter(thread => teacherFilter === 'all' || thread.type === teacherFilter || (teacherFilter === 'parents' && thread.type === 'parent'))
    : threads;

  const sendMessage = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'me',
      message: message.trim(),
      timestamp: new Date(),
      type: 'text',
      status: state.isOnline ? 'sent' : 'queued'
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');

    // Simulate message status updates
    if (state.isOnline) {
      setTimeout(() => {
        setMessages(prev => prev.map(msg => 
          msg.id === newMessage.id ? { ...msg, status: 'delivered' } : msg
        ));
      }, 1000);

      setTimeout(() => {
        setMessages(prev => prev.map(msg => 
          msg.id === newMessage.id ? { ...msg, status: 'read' } : msg
        ));
      }, 3000);
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      const voiceMessage: Message = {
        id: Date.now().toString(),
        sender: 'me',
        message: 'Voice message',
        timestamp: new Date(),
        type: 'voice',
        status: state.isOnline ? 'sent' : 'queued',
        duration: 3
      };
      setMessages(prev => [...prev, voiceMessage]);
    }, 3000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const getMessageStatusIcon = (status: string) => {
    switch (status) {
      case 'queued':
        return <Clock className="w-3 h-3 text-gray-400" />;
      case 'sent':
        return <CheckCircle className="w-3 h-3 text-gray-400" />;
      case 'delivered':
        return <CheckCircle className="w-3 h-3 text-blue-500" />;
      case 'read':
        return <CheckCircle className="w-3 h-3 text-green-500" />;
      default:
        return null;
    }
  };

  const getMessageBubbleColor = (sender: 'me' | 'other') => {
    if (sender === 'me') {
      return state.currentRole === 'teacher' ? roleColors.teacher : roleColors.student;
    }
    return '#E0E0E0';
  };

  const getMessageTextColor = (sender: 'me' | 'other') => {
    return sender === 'me' ? '#FFFFFF' : '#000000';
  };

  const openThread = (thread: ChatThread) => {
    setSelectedThread(thread);
    setActiveView('conversation');
  };

  const backToList = () => {
    setActiveView('list');
    setSelectedThread(null);
  };

  const quickReplies = ['Received', 'Thank you', 'Understood', 'Will do', 'Noted'];

  const sendQuickReply = (reply: string) => {
    setMessage(reply);
    sendMessage();
  };

  if (activeView === 'conversation' && selectedThread) {
    return (
      <div 
        className="min-h-screen pt-16"
        style={{ backgroundColor: colors.background }}
      >
        {/* Conversation Header */}
        <div className="bg-white border-b border-gray-200 p-4 flex items-center space-x-3">
          <button 
            onClick={backToList}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            ←
          </button>
          
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            <img 
              src={selectedThread.avatar} 
              alt={selectedThread.name}
              className="w-8 h-8 rounded-full"
            />
          </div>
          
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800 flex items-center space-x-2">
              {selectedThread.type === 'announcement' && <Megaphone className="w-4 h-4 text-orange-500" />}
              <span>{selectedThread.name}</span>
            </h3>
            <p className="text-sm text-gray-500">
              {selectedThread.isOnline ? 'Online' : 'Last seen recently'}
            </p>
          </div>

          <div className="flex space-x-2">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Phone className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Video className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 space-y-4 max-h-screen overflow-y-auto pb-32">
          {selectedThread.type === 'announcement' && (
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-4">
              <div className="flex items-center space-x-2 mb-2">
                <Megaphone className="w-5 h-5 text-orange-600" />
                <span className="font-semibold text-orange-800">Announcement</span>
              </div>
              <p className="text-sm text-orange-700">
                This is a read-only announcement thread. You cannot reply to announcements.
              </p>
            </div>
          )}

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                  msg.sender === 'me' ? 'rounded-tr-md' : 'rounded-tl-md'
                }`}
                style={{
                  backgroundColor: getMessageBubbleColor(msg.sender),
                  color: getMessageTextColor(msg.sender)
                }}
              >
                {msg.type === 'voice' ? (
                  <div className="flex items-center space-x-2">
                    <Mic className="w-4 h-4" />
                    <div className="flex-1 h-2 bg-white/30 rounded-full">
                      <div className="h-2 bg-white rounded-full w-3/4"></div>
                    </div>
                    <span className="text-xs">{msg.duration}s</span>
                  </div>
                ) : (
                  <p className="text-sm">{msg.message}</p>
                )}
                
                <div className="flex items-center justify-between mt-1">
                  <p 
                    className="text-xs"
                    style={{ 
                      color: msg.sender === 'me' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.5)' 
                    }}
                  >
                    {formatTime(msg.timestamp)}
                  </p>
                  {msg.sender === 'me' && getMessageStatusIcon(msg.status)}
                </div>
              </div>
            </div>
          ))}

          {isRecording && (
            <div className="flex justify-end">
              <div
                className="max-w-xs px-4 py-3 rounded-2xl rounded-tr-md"
                style={{
                  backgroundColor: getMessageBubbleColor('me'),
                  color: getMessageTextColor('me')
                }}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-sm">Recording...</span>
                  <Mic className="w-4 h-4" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Replies */}
        {selectedThread.type !== 'announcement' && (
          <div className="bg-white border-t border-gray-200 p-2">
            <div className="flex space-x-2 overflow-x-auto">
              {quickReplies.map((reply) => (
                <button
                  key={reply}
                  onClick={() => sendQuickReply(reply)}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm whitespace-nowrap hover:bg-gray-200 transition-colors"
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Message Input */}
        {selectedThread.type !== 'announcement' && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Paperclip className="w-5 h-5 text-gray-600" />
              </button>
              
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type a message..."
                  className="w-full px-4 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {message.trim() ? (
                <button
                  onClick={sendMessage}
                  className="p-3 rounded-full text-white transition-colors"
                  style={{ backgroundColor: state.currentRole === 'teacher' ? roleColors.teacher : roleColors.student }}
                >
                  <Send className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={startRecording}
                  disabled={isRecording}
                  className={`p-3 rounded-full text-white transition-colors ${
                    isRecording ? 'animate-pulse' : ''
                  }`}
                  style={{ 
                    backgroundColor: isRecording 
                      ? '#FF5722' 
                      : (state.currentRole === 'teacher' ? roleColors.teacher : roleColors.student)
                  }}
                >
                  <Mic className="w-5 h-5" />
                </button>
              )}
            </div>

            {!state.isOnline && (
              <div className="mt-2 flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-orange-500" />
                <span className="text-sm text-orange-600">
                  Messages will be sent when connection is restored
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen pt-16"
      style={{ backgroundColor: colors.background }}
    >
      {/* Chat List Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold text-gray-800">Messages</h1>
          {state.currentRole === 'teacher' && (
            <button className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors">
              <Plus className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Teacher Filters */}
        {state.currentRole === 'teacher' && (
          <div className="flex space-x-2">
            {[
              { key: 'all', label: 'All', icon: <Users className="w-4 h-4" /> },
              { key: 'parents', label: 'Parents', icon: <User className="w-4 h-4" /> },
              { key: 'staff', label: 'Staff', icon: <Users className="w-4 h-4" /> }
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => setTeacherFilter(filter.key as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  teacherFilter === filter.key
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter.icon}
                <span>{filter.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Student/Parent Sections */}
        {state.currentRole === 'student' && (
          <div className="text-sm text-gray-600">
            <p>📢 Announcements • 👩‍🏫 Teachers • 📚 Class Updates</p>
          </div>
        )}
      </div>

      {/* Chat Threads */}
      <div className="divide-y divide-gray-100">
        {filteredThreads.map((thread) => (
          <button
            key={thread.id}
            onClick={() => openThread(thread)}
            className="w-full p-4 bg-white hover:bg-gray-50 transition-colors text-left"
          >
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src={thread.avatar}
                  alt={thread.name}
                  className="w-12 h-12 rounded-full"
                />
                {thread.isOnline && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-gray-800 flex items-center space-x-2">
                    {thread.type === 'announcement' && <Megaphone className="w-4 h-4 text-orange-500" />}
                    <span className="truncate">{thread.name}</span>
                  </h3>
                  <span className="text-xs text-gray-500">
                    {formatTime(thread.timestamp)}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 truncate">{thread.lastMessage}</p>
                  {thread.unreadCount > 0 && (
                    <span className="ml-2 px-2 py-1 bg-blue-500 text-white text-xs rounded-full min-w-[20px] text-center">
                      {thread.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {filteredThreads.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No conversations</h3>
          <p className="text-gray-500">
            {state.currentRole === 'teacher' 
              ? 'Start a conversation with parents or staff members'
              : 'No messages from teachers or announcements yet'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default ChatScreen;