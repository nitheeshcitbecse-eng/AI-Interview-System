import React from 'react';
import { motion } from 'framer-motion';

const GradientCard = ({ children, className = '', hover = true }) => {
  return (
    <motion.div
      whileHover={hover ? { y: -5, scale: 1.02 } : {}}
      transition={{ duration: 0.3 }}
      className={`card-base ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default GradientCard;