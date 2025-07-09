
import React from 'react';

const Background3D = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-kpmg-dark via-kpmg-navy to-kpmg-blue opacity-90" />
      
      {/* Floating 3D Shapes */}
      <div className="absolute inset-0 perspective-2000">
        {/* Large Floating Cubes */}
        <div 
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-kpmg-blue to-kpmg-accent opacity-20 transform-style-3d float-slow"
          style={{
            background: 'linear-gradient(45deg, rgba(0, 102, 204, 0.3), rgba(0, 170, 255, 0.3))',
            transform: 'rotateX(45deg) rotateY(45deg)',
            borderRadius: '12px'
          }}
        />
        
        <div 
          className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-kpmg-accent to-blue-400 opacity-25 transform-style-3d float-med"
          style={{
            background: 'linear-gradient(135deg, rgba(0, 170, 255, 0.4), rgba(59, 130, 246, 0.4))',
            transform: 'rotateX(30deg) rotateZ(60deg)',
            borderRadius: '16px'
          }}
        />
        
        <div 
          className="absolute bottom-32 left-1/4 w-20 h-20 bg-gradient-to-tr from-white to-kpmg-light opacity-30 transform-style-3d float-fast"
          style={{
            background: 'linear-gradient(225deg, rgba(255, 255, 255, 0.3), rgba(230, 243, 255, 0.3))',
            transform: 'rotateY(75deg) rotateZ(30deg)',
            borderRadius: '20px'
          }}
        />
        
        {/* Medium Floating Elements */}
        <div 
          className="absolute top-60 left-1/2 w-16 h-16 bg-gradient-to-r from-kpmg-blue to-kpmg-navy opacity-20 transform-style-3d float-slow"
          style={{
            background: 'linear-gradient(90deg, rgba(0, 102, 204, 0.3), rgba(0, 51, 102, 0.3))',
            transform: 'rotateX(60deg) rotateY(120deg)',
            borderRadius: '50%'
          }}
        />
        
        <div 
          className="absolute bottom-20 right-1/3 w-12 h-12 bg-gradient-to-bl from-kpmg-accent to-white opacity-35 transform-style-3d float-med"
          style={{
            background: 'linear-gradient(225deg, rgba(0, 170, 255, 0.4), rgba(255, 255, 255, 0.4))',
            transform: 'rotateX(45deg) rotateZ(90deg)',
            borderRadius: '8px'
          }}
        />
        
        {/* Small Floating Particles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-kpmg-accent opacity-40 transform-style-3d"
            style={{
              left: `${10 + (i * 7)}%`,
              top: `${15 + (i * 6)}%`,
              background: 'radial-gradient(circle, rgba(0, 170, 255, 0.6), rgba(0, 170, 255, 0.2))',
              borderRadius: '50%',
              transform: `rotateX(${i * 30}deg) rotateY(${i * 45}deg)`,
              animation: `float-${i % 3 === 0 ? 'slow' : i % 3 === 1 ? 'med' : 'fast'} ${4 + (i % 3)}s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`
            }}
          />
        ))}
      </div>
      
      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 102, 204, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 102, 204, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />
      
      {/* Radial Glow Effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-kpmg-accent opacity-10 rounded-full filter blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-kpmg-blue opacity-15 rounded-full filter blur-3xl" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white opacity-5 rounded-full filter blur-2xl" />
    </div>
  );
};

export default Background3D;
