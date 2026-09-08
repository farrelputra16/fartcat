import React from 'react';

interface GlitchTextProps {
  children: React.ReactNode;
  className?: string;
}

export const GlitchText: React.FC<GlitchTextProps> = ({ children, className = '' }) => {
  return (
    <span className={`glitch ${className}`}>
      <span className="glitch-layer" aria-hidden="true">{children}</span>
      <span className="glitch-layer" aria-hidden="true">{children}</span>
      {children}
    </span>
  );
};
