
import React, { useState, useEffect } from 'react';
import { MessageSquare, User, Bot, Copy, ThumbsUp, ThumbsDown } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

interface OutputDisplayProps {
  messages: Message[];
  isProcessing?: boolean;
}

const OutputDisplay: React.FC<OutputDisplayProps> = ({ 
  messages, 
  isProcessing = false 
}) => {
  const [displayMessages, setDisplayMessages] = useState<Message[]>([]);

  useEffect(() => {
    setDisplayMessages(messages);
  }, [messages]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const TypewriterText: React.FC<{ text: string; speed?: number }> = ({ 
    text, 
    speed = 30 
  }) => {
    const [displayText, setDisplayText] = useState('');

    useEffect(() => {
      let index = 0;
      const timer = setInterval(() => {
        if (index < text.length) {
          setDisplayText(text.slice(0, index + 1));
          index++;
        } else {
          clearInterval(timer);
        }
      }, speed);

      return () => clearInterval(timer);
    }, [text, speed]);

    return <span>{displayText}</span>;
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center space-x-3 p-4 border-b border-white/20 glass-morphism">
        <div className="p-2 rounded-lg bg-kpmg-blue/20">
          <MessageSquare className="w-5 h-5 text-kpmg-blue" />
        </div>
        <div>
          <h3 className="font-semibold text-kpmg-navy">ESG/Audit Assistant</h3>
          <p className="text-xs text-kpmg-blue/70">
            {isProcessing ? 'Processing...' : 'Ready to help'}
          </p>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {displayMessages.length === 0 && !isProcessing && (
          <div className="text-center py-12">
            <div className="w-20 h-20 mx-auto mb-4 p-4 rounded-2xl bg-kpmg-blue/10 glass-morphism">
              <Bot className="w-full h-full text-kpmg-blue" />
            </div>
            <h3 className="text-lg font-medium text-kpmg-navy mb-2">
              Welcome to ESG/Audit Copilot
            </h3>
            <p className="text-sm text-kpmg-blue/70 max-w-md mx-auto">
              Ask me about ESG regulations, audit procedures, tax rules, or upload documents for analysis. 
              Use voice commands for hands-free interaction.
            </p>
          </div>
        )}

        {displayMessages.map((message, index) => (
          <div
            key={message.id}
            className={`
              flex items-start space-x-3 animate-slideUp
              ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}
            `}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Avatar */}
            <div className={`
              p-3 rounded-xl flex-shrink-0 transform-style-3d perspective-1000
              ${message.type === 'user' 
                ? 'bg-kpmg-accent/20 hover:rotate-3' 
                : 'bg-kpmg-blue/20 hover:-rotate-3'
              }
              transition-transform duration-300
            `}>
              {message.type === 'user' ? (
                <User className="w-5 h-5 text-kpmg-accent" />
              ) : (
                <Bot className="w-5 h-5 text-kpmg-blue" />
              )}
            </div>

            {/* Message Content */}
            <div className={`
              flex-1 max-w-3xl
              ${message.type === 'user' ? 'text-right' : ''}
            `}>
              <div className={`
                inline-block p-4 rounded-2xl glass-morphism border backdrop-blur-sm
                ${message.type === 'user' 
                  ? 'bg-kpmg-accent/10 border-kpmg-accent/20 rounded-tr-md' 
                  : 'bg-white/10 border-white/20 rounded-tl-md'
                }
              `}>
                <div className="prose prose-sm max-w-none">
                  {message.isTyping ? (
                    <TypewriterText text={message.content} />
                  ) : (
                    <p className="text-kpmg-navy whitespace-pre-wrap">
                      {message.content}
                    </p>
                  )}
                </div>
              </div>

              {/* Message Actions */}
              {message.type === 'bot' && !message.isTyping && (
                <div className="flex items-center space-x-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => copyToClipboard(message.content)}
                    className="p-1 rounded-lg hover:bg-kpmg-blue/10 text-kpmg-blue/70 hover:text-kpmg-blue transition-colors"
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                  <button className="p-1 rounded-lg hover:bg-green-500/10 text-green-500/70 hover:text-green-500 transition-colors">
                    <ThumbsUp className="w-3 h-3" />
                  </button>
                  <button className="p-1 rounded-lg hover:bg-red-500/10 text-red-500/70 hover:text-red-500 transition-colors">
                    <ThumbsDown className="w-3 h-3" />
                  </button>
                </div>
              )}

              {/* Timestamp */}
              <p className={`
                text-xs text-kpmg-blue/50 mt-1
                ${message.type === 'user' ? 'text-right' : 'text-left'}
              `}>
                {message.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}

        {/* Processing Indicator */}
        {isProcessing && (
          <div className="flex items-start space-x-3 animate-slideUp">
            <div className="p-3 rounded-xl bg-kpmg-blue/20">
              <Bot className="w-5 h-5 text-kpmg-blue" />
            </div>
            <div className="flex-1">
              <div className="inline-block p-4 rounded-2xl bg-white/10 border border-white/20 glass-morphism rounded-tl-md">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-kpmg-blue rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-kpmg-blue rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-kmpg-blue rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  <span className="text-sm text-kpmg-blue/70">Analyzing your query...</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OutputDisplay;
