
import React, { useState, useRef } from 'react';
import Background3D from '@/components/Background3D';
import MicButton from '@/components/MicButton';
import VoiceVisualizer from '@/components/VoiceVisualizer';
import UploadDocs from '@/components/UploadDocs';
import OutputDisplay from '@/components/OutputDisplay';
import { Send, Settings, HelpCircle, Menu, X } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

const Index = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const addMessage = (content: string, type: 'user' | 'bot', isTyping = false) => {
    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      content,
      timestamp: new Date(),
      isTyping
    };
    setMessages(prev => [...prev, newMessage]);
    return newMessage.id;
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    console.log('Recording started');
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    console.log('Recording stopped');
    
    // Simulate voice recognition
    setTimeout(() => {
      const voiceQuery = "What are the key ESG reporting requirements for financial institutions in 2024?";
      handleSubmitQuery(voiceQuery);
    }, 1000);
  };

  const handleSubmitQuery = async (query: string) => {
    if (!query.trim()) return;
    
    addMessage(query, 'user');
    setInputText('');
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      const responses = [
        "Based on current ESG regulations, financial institutions must comply with several key reporting requirements in 2024:\n\n1. **Climate Risk Disclosure**: Under the EU Taxonomy Regulation, institutions must report on green asset ratios and climate-related financial risks.\n\n2. **TCFD Framework**: Implement Task Force on Climate-related Financial Disclosures recommendations including governance, strategy, risk management, and metrics.\n\n3. **SFDR Compliance**: Sustainable Finance Disclosure Regulation requires detailed sustainability risk integration and adverse impact reporting.\n\n4. **Carbon Footprint Reporting**: Scope 1, 2, and 3 emissions tracking with third-party verification.\n\n5. **Social Impact Metrics**: Community investment, financial inclusion, and employee diversity reporting.\n\nWould you like me to elaborate on any specific requirement?",
        
        "For audit compliance, here are the essential procedures:\n\n1. **Risk Assessment**: Identify and evaluate ESG-related business risks\n2. **Internal Controls**: Test effectiveness of ESG data collection and reporting processes\n3. **Third-party Verification**: Engage certified ESG auditors for independent assurance\n4. **Documentation**: Maintain comprehensive audit trails for all ESG metrics\n5. **Continuous Monitoring**: Implement ongoing compliance monitoring systems\n\nThis ensures robust governance and stakeholder confidence in your ESG reporting.",
        
        "Current tax implications for ESG initiatives include:\n\n• **Green Investment Incentives**: Tax credits for renewable energy and sustainable technology investments\n• **Carbon Tax Considerations**: Factor in carbon pricing mechanisms in your jurisdiction\n• **ESG Bond Tax Treatment**: Understanding tax implications of green bonds and sustainability-linked financing\n• **Transfer Pricing**: ESG costs and shared services allocation across entities\n• **Reporting Requirements**: Additional tax disclosures related to sustainability initiatives"
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setIsProcessing(false);
      addMessage(randomResponse, 'bot', true);
    }, 2000);
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmitQuery(inputText);
  };

  const handleFilesUploaded = (files: File[]) => {
    const fileNames = files.map(f => f.name).join(', ');
    addMessage(`I've uploaded ${files.length} document(s): ${fileNames}. Please analyze these for ESG compliance and audit requirements.`, 'user');
    
    setTimeout(() => {
      addMessage(
        `I've successfully processed your uploaded documents. Here's my analysis:\n\n**Document Summary:**\n• ${files.length} files processed\n• Key ESG metrics identified\n• Compliance gaps highlighted\n• Recommendations provided\n\n**Key Findings:**\n1. Environmental impact data needs standardization\n2. Social metrics align with current frameworks\n3. Governance structures meet regulatory requirements\n\nWould you like a detailed breakdown of any specific area?`,
        'bot',
        true
      );
    }, 3000);
  };

  const quickActions = [
    "Explain TCFD requirements",
    "ESG audit checklist",
    "Carbon accounting standards",
    "EU Taxonomy overview"
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Background3D />
      
      {/* Header */}
      <header className="relative z-10 flex items-center justify-between p-6 glass-morphism border-b border-white/20">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl kpmg-gradient flex items-center justify-center transform-style-3d perspective-1000 hover:rotate-12 transition-transform duration-300">
            <span className="text-white font-bold text-xl">K</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-kpmg-navy">ESG/Audit Copilot</h1>
            <p className="text-sm text-kpmg-blue/70">Voice-Activated Compliance Assistant</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-xl glass-morphism border border-white/20 hover:bg-white/10 transition-colors">
            <Settings className="w-5 h-5 text-kpmg-blue" />
          </button>
          <button className="p-2 rounded-xl glass-morphism border border-white/20 hover:bg-white/10 transition-colors">
            <HelpCircle className="w-5 h-5 text-kpmg-blue" />
          </button>
          <button 
            onClick={() => setShowSidebar(!showSidebar)}
            className="p-2 rounded-xl glass-morphism border border-white/20 hover:bg-white/10 transition-colors lg:hidden"
          >
            {showSidebar ? <X className="w-5 h-5 text-kpmg-blue" /> : <Menu className="w-5 h-5 text-kpmg-blue" />}
          </button>
        </div>
      </header>

      <div className="flex h-screen">
        {/* Sidebar */}
        <div className={`
          ${showSidebar ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          fixed lg:relative z-20 w-80 h-full glass-morphism border-r border-white/20 p-6 space-y-6
          transition-transform duration-300 backdrop-blur-lg
        `}>
          {/* Voice Control Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-kpmg-navy">Voice Control</h2>
            
            <div className="flex flex-col items-center space-y-4 p-6 rounded-xl glass-morphism border border-white/20">
              <MicButton
                onStartRecording={handleStartRecording}
                onStopRecording={handleStopRecording}
                isRecording={isRecording}
              />
              
              <VoiceVisualizer 
                isActive={isRecording} 
                audioLevel={audioLevel}
              />
            </div>
          </div>

          {/* Document Upload */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-kpmg-navy">Document Analysis</h2>
            <UploadDocs onFilesUploaded={handleFilesUploaded} />
          </div>

          {/* Quick Actions */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-kmpg-navy">Quick Actions</h2>
            <div className="space-y-2">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => handleSubmitQuery(action)}
                  className="w-full text-left p-3 rounded-lg glass-morphism border border-white/20 hover:bg-white/10 transition-all duration-200 transform hover:scale-105 text-sm text-kpmg-navy"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Display */}
          <div className="flex-1 glass-morphism border border-white/20 m-4 mr-4 rounded-xl overflow-hidden group">
            <OutputDisplay messages={messages} isProcessing={isProcessing} />
          </div>

          {/* Input Area */}
          <div className="p-4">
            <form onSubmit={handleTextSubmit} className="flex space-x-4">
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Ask about ESG regulations, audit procedures, or tax rules..."
                  className="w-full p-4 pr-12 rounded-xl glass-morphism border border-white/20 bg-white/10 text-kmpg-navy placeholder-kpmg-blue/50 focus:outline-none focus:ring-2 focus:ring-kpmg-accent/50 backdrop-blur-sm"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim() || isProcessing}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-lg kmpg-gradient hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {showSidebar && (
        <div 
          className="fixed inset-0 bg-black/20 z-10 lg:hidden backdrop-blur-sm"
          onClick={() => setShowSidebar(false)}
        />
      )}
    </div>
  );
};

export default Index;
