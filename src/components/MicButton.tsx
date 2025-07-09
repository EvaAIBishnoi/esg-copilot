
import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Square } from 'lucide-react';

interface MicButtonProps {
  onStartRecording: () => void;
  onStopRecording: () => void;
  isRecording: boolean;
  disabled?: boolean;
}

const MicButton: React.FC<MicButtonProps> = ({
  onStartRecording,
  onStopRecording,
  isRecording,
  disabled = false
}) => {
  const [audioLevel, setAudioLevel] = useState(0);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number>();

  const handleToggleRecording = async () => {
    if (disabled) return;
    
    if (isRecording) {
      onStopRecording();
      stopAudioAnalysis();
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        startAudioAnalysis(stream);
        onStartRecording();
      } catch (error) {
        console.error('Error accessing microphone:', error);
      }
    }
  };

  const startAudioAnalysis = (stream: MediaStream) => {
    audioContextRef.current = new AudioContext();
    analyserRef.current = audioContextRef.current.createAnalyser();
    const source = audioContextRef.current.createMediaStreamSource(stream);
    
    analyserRef.current.fftSize = 256;
    source.connect(analyserRef.current);
    
    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    
    const updateAudioLevel = () => {
      if (analyserRef.current) {
        analyserRef.current.getByteFrequencyData(dataArray);
        const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
        setAudioLevel(average / 255);
        animationFrameRef.current = requestAnimationFrame(updateAudioLevel);
      }
    };
    
    updateAudioLevel();
  };

  const stopAudioAnalysis = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
    setAudioLevel(0);
  };

  useEffect(() => {
    return () => {
      stopAudioAnalysis();
    };
  }, []);

  return (
    <div className="relative flex items-center justify-center">
      {/* Audio Level Rings */}
      {isRecording && (
        <>
          <div 
            className="absolute rounded-full border-2 border-kpmg-accent animate-ping"
            style={{
              width: `${80 + audioLevel * 40}px`,
              height: `${80 + audioLevel * 40}px`,
              opacity: audioLevel * 0.6
            }}
          />
          <div 
            className="absolute rounded-full border border-kpmg-blue animate-pulse"
            style={{
              width: `${100 + audioLevel * 60}px`,
              height: `${100 + audioLevel * 60}px`,
              opacity: audioLevel * 0.4
            }}
          />
          <div 
            className="absolute rounded-full border border-white animate-pulse"
            style={{
              width: `${120 + audioLevel * 80}px`,
              height: `${120 + audioLevel * 80}px`,
              opacity: audioLevel * 0.2
            }}
          />
        </>
      )}
      
      {/* Main Button */}
      <button
        onClick={handleToggleRecording}
        disabled={disabled}
        className={`
          relative w-16 h-16 rounded-full flex items-center justify-center
          transform transition-all duration-300 perspective-1000
          ${isRecording 
            ? 'bg-red-500 hover:bg-red-600 scale-110 animate-pulse3d neon-glow' 
            : 'kpmg-gradient hover:scale-105 glass-morphism'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:shadow-2xl'}
          border-2 border-white/30 backdrop-blur-sm
        `}
        style={{
          transform: isRecording 
            ? `scale(1.1) rotateX(${audioLevel * 10}deg) rotateY(${audioLevel * 15}deg)`
            : 'scale(1) rotateX(0deg) rotateY(0deg)',
          boxShadow: isRecording 
            ? `0 0 ${20 + audioLevel * 30}px rgba(239, 68, 68, 0.6)`
            : '0 8px 32px rgba(0, 102, 204, 0.3)'
        }}
      >
        {isRecording ? (
          <Square className="w-6 h-6 text-white" />
        ) : (
          <Mic className="w-6 h-6 text-white" />
        )}
        
        {/* Inner Glow */}
        <div className="absolute inset-1 rounded-full bg-white/10 backdrop-blur-sm" />
      </button>
      
      {/* Status Text */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
        <span className={`
          text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm
          ${isRecording 
            ? 'bg-red-500/20 text-red-200 border border-red-400/30' 
            : 'bg-kpmg-blue/20 text-kpmg-light border border-kpmg-blue/30'
          }
        `}>
          {isRecording ? 'Recording...' : 'Click to Record'}
        </span>
      </div>
    </div>
  );
};

export default MicButton;
