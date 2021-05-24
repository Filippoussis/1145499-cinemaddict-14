const MINUTES_PER_HOUR = 60;

export const getFormattedTime = (time) => {
  const hours = Math.trunc(time/MINUTES_PER_HOUR);

  const humanisedHours = hours > 0 ? `${hours}h` : '';
  const humanisedMinutes = `${time - hours*MINUTES_PER_HOUR}m`;

  return `${humanisedHours} ${humanisedMinutes}`;
};

export const getOnlyNumeralTime = (time) => {
  const hours = Math.trunc(time/MINUTES_PER_HOUR);
  const minutes = time - hours*MINUTES_PER_HOUR;

  return {
    hours,
    minutes,
  };
};
