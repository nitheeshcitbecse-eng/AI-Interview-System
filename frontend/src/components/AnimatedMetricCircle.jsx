import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getMetricColor } from '../utils/helpers';

const AnimatedMetricCircle = ({ value, label, size = 'lg' }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      if (current < value) {
        current += value / 20;
        setDisplayValue(Math.min(Math.round(current), value));
      } else {
        clearInterval(interval);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [value]);

  const sizeClasses = {
    sm: 'w-20 h-20',
    md: 'w-32 h-32',
    lg: 'w-48 h-48'
  };

  const radius = size === 'sm' ? 30 : size === 'md' ? 50 : 90;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (displayValue / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`flex flex-col items-center justify-center ${sizeClasses[size]}`}
    >
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
        {/* Background circle */}
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke="rgba(0, 212, 255, 0.1)"
          strokeWidth="8"
        />
        {/* Progress circle */}
        <motion.circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00d4ff" />
            <stop offset="100%" stopColor="#0099ff" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <motion.div
          key={displayValue}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`text-3xl font-bold ${getMetricColor(displayValue)}`}
        >
          {displayValue}%
        </motion.div>
        <p className="text-xs text-slate-400 mt-1 text-center whitespace-nowrap">{label}</p>
      </div>
    </motion.div>
  );
};

export default AnimatedMetricCircle;