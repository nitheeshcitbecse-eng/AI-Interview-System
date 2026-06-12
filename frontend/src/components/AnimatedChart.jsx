import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AnimatedChart = ({ data, type = 'line', color = '#00d4ff', height = 300 }) => {
  const chartVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div
      variants={chartVariants}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      <ResponsiveContainer width="100%" height={height}>
        {type === 'line' ? (
          <LineChart data={data}>
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                <stop offset="95%" stopColor={color} stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 212, 255, 0.1)" />
            <XAxis stroke="rgba(148, 163, 184, 0.5)" />
            <YAxis stroke="rgba(148, 163, 184, 0.5)" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(15, 23, 42, 0.8)',
                border: '1px solid rgba(0, 212, 255, 0.3)',
                borderRadius: '8px',
                boxShadow: '0 0 20px rgba(0, 212, 255, 0.2)'
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={3}
              dot={false}
              isAnimationActive={true}
            />
          </LineChart>
        ) : (
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                <stop offset="95%" stopColor={color} stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 212, 255, 0.1)" />
            <XAxis stroke="rgba(148, 163, 184, 0.5)" />
            <YAxis stroke="rgba(148, 163, 184, 0.5)" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(15, 23, 42, 0.8)',
                border: '1px solid rgba(0, 212, 255, 0.3)',
                borderRadius: '8px'
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={color}
              fill="url(#colorArea)"
              isAnimationActive={true}
            />
          </AreaChart>
        )}
      </ResponsiveContainer>
    </motion.div>
  );
};

export default AnimatedChart;