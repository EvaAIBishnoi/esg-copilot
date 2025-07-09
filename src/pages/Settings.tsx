import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, User, Mic, Volume2, Globe, Shield, Bell } from 'lucide-react';
import Background3D from '@/components/Background3D';
import { Switch } from '@/components/ui/switch';

const Settings = () => {
  const [settings, setSettings] = useState({
    voiceEnabled: true,
    soundEnabled: true,
    notifications: true,
    autoSave: true,
    darkMode: false,
    language: 'en'
  });

  const handleSettingChange = (key: string, value: boolean | string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const settingSections = [
    {
      title: 'Voice & Audio',
      icon: Mic,
      settings: [
        {
          key: 'voiceEnabled',
          label: 'Voice Recognition',
          description: 'Enable voice input for queries',
          type: 'switch' as const
        },
        {
          key: 'soundEnabled', 
          label: 'Sound Effects',
          description: 'Play sound effects and audio feedback',
          type: 'switch' as const
        }
      ]
    },
    {
      title: 'Preferences',
      icon: User,
      settings: [
        {
          key: 'notifications',
          label: 'Notifications',
          description: 'Receive notifications for important updates',
          type: 'switch' as const
        },
        {
          key: 'autoSave',
          label: 'Auto-save Chat',
          description: 'Automatically save chat history',
          type: 'switch' as const
        }
      ]
    },
    {
      title: 'Language & Region',
      icon: Globe,
      settings: [
        {
          key: 'language',
          label: 'Language',
          description: 'Choose your preferred language',
          type: 'select' as const,
          options: [
            { value: 'en', label: 'English' },
            { value: 'es', label: 'Spanish' },
            { value: 'fr', label: 'French' },
            { value: 'de', label: 'German' }
          ]
        }
      ]
    }
  ];

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
            <h1 className="text-2xl font-bold text-primary">Settings</h1>
            <p className="text-sm text-primary/70">Customize your experience</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="relative z-10 p-6 max-w-4xl mx-auto">
        <div className="space-y-6">
          {settingSections.map((section) => (
            <div
              key={section.title}
              className="glass-morphism border border-white/20 rounded-xl p-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <section.icon className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-semibold text-primary">{section.title}</h2>
              </div>
              
              <div className="space-y-4">
                {section.settings.map((setting) => (
                  <div key={setting.key} className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-primary">{setting.label}</h3>
                      <p className="text-sm text-primary/70">{setting.description}</p>
                    </div>
                    
                    <div className="ml-4">
                      {setting.type === 'switch' && (
                        <Switch
                          checked={settings[setting.key as keyof typeof settings] as boolean}
                          onCheckedChange={(checked) => handleSettingChange(setting.key, checked)}
                        />
                      )}
                      
                      {setting.type === 'select' && setting.options && (
                        <select
                          value={settings[setting.key as keyof typeof settings] as string}
                          onChange={(e) => handleSettingChange(setting.key, e.target.value)}
                          className="px-3 py-2 rounded-lg glass-morphism border border-white/20 bg-white/10 text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                        >
                          {setting.options.map((option) => (
                            <option key={option.value} value={option.value} className="bg-white text-black">
                              {option.label}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          {/* Danger Zone */}
          <div className="glass-morphism border border-destructive/20 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="w-5 h-5 text-destructive" />
              <h2 className="text-lg font-semibold text-destructive">Danger Zone</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-destructive">Clear All Chat History</h3>
                  <p className="text-sm text-destructive/70">Permanently delete all saved conversations</p>
                </div>
                <button className="px-4 py-2 rounded-lg border border-destructive hover:bg-destructive/10 text-destructive transition-colors">
                  Clear History
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;