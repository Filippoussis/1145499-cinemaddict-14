const MINUTES_PER_HOUR = 60;

export const getFormattedTime = (time) => {
  const hours = Math.trunc(time/MINUTES_PER_HOUR);
  const minutes = time - hours*MINUTES_PER_HOUR;

  return `${hours}h ${minutes}m`;
};
