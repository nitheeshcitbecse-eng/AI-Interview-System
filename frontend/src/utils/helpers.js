export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m ${secs}s`;
};

export const getMetricColor = (value) => {
  if (value >= 80) return 'text-green-400';
  if (value >= 60) return 'text-yellow-400';
  return 'text-red-400';
};

export const getMetricBgColor = (value) => {
  if (value >= 80) return 'bg-green-500/20';
  if (value >= 60) return 'bg-yellow-500/20';
  return 'bg-red-500/20';
};

export const getPerformanceLabel = (score) => {
  if (score >= 85) return 'Excellent';
  if (score >= 70) return 'Very Good';
  if (score >= 55) return 'Good';
  if (score >= 40) return 'Fair';
  return 'Needs Improvement';
};