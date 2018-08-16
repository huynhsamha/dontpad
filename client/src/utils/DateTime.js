export const getLastTimeString = (lasted_time) => {
  const lasted = new Date(lasted_time).getTime();
  const current = Date.now();
  const duration = current - lasted;
  const seconds = Math.floor(duration / 1000);
  if (seconds === 0) {
    return 'Welcome to dontpad';
  }
  if (seconds < 60) {
    return `Last edit was in ${seconds} second${seconds > 1 ? 's' : ''} ago`;
  }
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `Last edit was in ${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  }
  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `Last edit was in ${hours} hour${hours > 1 ? 's' : ''} ago`;
  }
  return `Last edit was at ${new Date(lasted).toLocaleDateString()}`;
};
