
import React, { useEffect, useRef } from 'react';

interface VoiceVisualizerProps {
  isActive: boolean;
  audioLevel?: number;
}

const VoiceVisualizer: React.FC<VoiceVisualizerProps> = ({ 
  isActive, 
  audioLevel = 0 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    
    const draw = () => {
      timeRef.current += 0.1;
      
      // Clear canvas with gradient background
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, 'rgba(0, 51, 102, 0.1)');
      gradient.addColorStop(0.5, 'rgba(0, 102, 204, 0.1)');
      gradient.addColorStop(1, 'rgba(0, 170, 255, 0.1)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      
      if (isActive) {
        // Draw multiple waveforms
        const waves = [
          { freq: 0.02, amplitude: 30, color: 'rgba(0, 170, 255, 0.8)', offset: 0 },
          { freq: 0.03, amplitude: 20, color: 'rgba(0, 102, 204, 0.6)', offset: Math.PI / 3 },
          { freq: 0.025, amplitude: 25, color: 'rgba(255, 255, 255, 0.4)', offset: Math.PI / 2 }
        ];
        
        waves.forEach((wave) => {
          ctx.beginPath();
          ctx.strokeStyle = wave.color;
          ctx.lineWidth = 2;
          
          for (let x = 0; x < width; x++) {
            const y = height / 2 + 
              Math.sin(x * wave.freq + timeRef.current + wave.offset) * 
              wave.amplitude * (0.5 + audioLevel * 1.5);
            
            if (x === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
          
          ctx.stroke();
        });
        
        // Draw particles
        for (let i = 0; i < 20; i++) {
          const x = (timeRef.current * 50 + i * 30) % width;
          const y = height / 2 + Math.sin(x * 0.01 + timeRef.current) * 15 * audioLevel;
          
          ctx.beginPath();
          ctx.arc(x, y, 2 + audioLevel * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 170, 255, ${0.3 + audioLevel * 0.7})`;
          ctx.fill();
        }
      }
      
      animationFrameRef.current = requestAnimationFrame(draw);
    };
    
    draw();
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isActive, audioLevel]);

  return (
    <div className="relative w-full h-24 rounded-lg overflow-hidden glass-morphism border border-white/20">
      <canvas
        ref={canvasRef}
        width={400}
        height={96}
        className="w-full h-full"
      />
      
      {/* Overlay Grid */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}
      />
      
      {/* Status Indicator */}
      <div className="absolute top-2 right-2">
        <div className={`
          w-3 h-3 rounded-full
          ${isActive ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}
        `} />
      </div>
    </div>
  );
};

export default VoiceVisualizer;
