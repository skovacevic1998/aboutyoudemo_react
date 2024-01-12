import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

export const AnimatedBackground: React.FC = () => {
  const [scrollY, setScrollY] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const blackColor = '#181818';
  const grayColor = '#444444';

  const interpolateColor = (value: number, start: number, end: number, startColor: string, endColor: string) => {
    const percent = Math.min((value - start) / (end - start), 1); // Ensure the percentage is capped at 1
    const r = Math.floor(parseInt(startColor.slice(1, 3), 16) + percent * (parseInt(endColor.slice(1, 3), 16) - parseInt(startColor.slice(1, 3), 16)));
    const g = Math.floor(parseInt(startColor.slice(3, 5), 16) + percent * (parseInt(endColor.slice(3, 5), 16) - parseInt(startColor.slice(3, 5), 16)));
    const b = Math.floor(parseInt(startColor.slice(5, 7), 16) + percent * (parseInt(endColor.slice(5, 7), 16) - parseInt(startColor.slice(5, 7), 16)));
    return `rgb(${r}, ${g}, ${b})`;
  };

  const animatedColor = interpolateColor(scrollY, 100, 3000, blackColor, grayColor);

  const props = useSpring({
    backgroundColor: animatedColor,
  });

  return (
    <animated.div
      className="animated-background"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: '100%',
        zIndex: -1,
        ...props,
      }}
    />
  );
};
