import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, MessageSquare, Trash2 } from 'lucide-react';
import Background3D from '@/components/Background3D';

interface ChatHistory {
  id: string;
  title: string;
  timestamp: Date;
  messageCount: number;
}

const History = () => {
  // Mock data - in real app this would come from state/database
  const chatHistory: ChatHistory[] = [
    {
      id: '1',
      title: 'ESG Reporting Requirements 2024',
      timestamp: new Date('2024-01-09T10:30:00'),
      messageCount: 8
    },
    {
      id: '2', 
      title: 'TCFD Framework Implementation',
      timestamp: new Date('2024-01-08T14:20:00'),
      messageCount: 12
    },
    {
      id: '3',
      title: 'Carbon Accounting Standards',
      timestamp: new Date('2024-01-07T09:15:00'),
      messageCount: 6
    }
  ];

  const handleDeleteChat = (id: string) => {
    // In real app, this would delete from state/database
    console.log('Delete chat:', id);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Background3D />
      
      {/* Header */}
      <header className="relative z-10 flex items-center justify-between p-6 glass-morphism border-b border-white/20">
        <div className="flex items-center space-x-4">
          <Link 
            to="/"
            className="p-2 rounded-xl glass-morphism border border-white/20 hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-primary" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-primary">Chat History</h1>
            <p className="text-sm text-primary/70">Your previous conversations</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="relative z-10 p-6 max-w-4xl mx-auto">
        <div className="space-y-4">
          {chatHistory.length === 0 ? (
            <div className="text-center py-12 glass-morphism rounded-xl border border-white/20">
              <MessageSquare className="w-12 h-12 text-primary/50 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-primary mb-2">No chat history</h3>
              <p className="text-primary/70">Start a conversation to see your history here</p>
            </div>
          ) : (
            chatHistory.map((chat) => (
              <div
                key={chat.id}
                className="glass-morphism border border-white/20 rounded-xl p-6 hover:bg-white/10 transition-all duration-200 group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-primary mb-2 group-hover:text-accent transition-colors">
                      {chat.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-primary/70">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{formatDate(chat.timestamp)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageSquare className="w-4 h-4" />
                        <span>{chat.messageCount} messages</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteChat(chat.id)}
                    className="p-2 rounded-lg border border-white/20 hover:bg-destructive/10 hover:border-destructive/30 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default History;