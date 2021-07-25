export const timeSinceDate = (pastDate: Date): string => {
  const currentTime = new Date();

  let timeDiff = millisecondsToSeconds(
    currentTime.getTime() - pastDate.getTime()
  );

  if (timeDiff === 0) return "<1s ago";

  if (timeDiff < 60) return `${timeDiff}s ago`;
  timeDiff = secondsToMinutes(timeDiff);

  if (timeDiff < 60) return `${timeDiff}min(s) ago`;
  timeDiff = minutesToHours(timeDiff);

  if (timeDiff < 24) return `${timeDiff}hr(s) ago`;
  timeDiff = hoursToDays(timeDiff);

  if (timeDiff < 7) return `${timeDiff}day(s) ago`;
  timeDiff = daysToWeeks(timeDiff);

  return `${timeDiff}week(s) ago`;
};

const millisecondsToSeconds = (x: number): number => {
  return Math.floor(x / 1000);
};

const secondsToMinutes = (x: number): number => {
  return Math.floor(x / 60);
};

const minutesToHours = (x: number): number => {
  return Math.floor(x / 60);
};

const hoursToDays = (x: number): number => {
  return Math.floor(x / 24);
};

const daysToWeeks = (x: number): number => {
  return Math.floor(x / 7);
};
