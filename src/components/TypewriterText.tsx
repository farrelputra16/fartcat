import React, { useEffect, useRef } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
  className?: string;
  showCursor?: boolean;
  color?: string;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  speed = 60,
  delay = 0,
  onComplete,
  className = '',
  showCursor = true,
  color,
}) => {
  const [displayed, setDisplayed] = React.useState('');
  const completedRef = useRef(false);

  useEffect(() => {
    setDisplayed('');
    completedRef.current = false;
    let timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        if (i <= text.length) {
          setDisplayed(text.slice(0, i));
          i++;
        } else {
          clearInterval(interval);
          if (!completedRef.current && onComplete) {
            completedRef.current = true;
            onComplete();
          }
        }
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, speed, delay]);

  return (
    <span className={className} style={color ? { color } : undefined}>
      {displayed}
      {showCursor && <span className="cursor" />}
    </span>
  );
};
