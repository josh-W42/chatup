import { ListItem, Typography, Grid } from "@material-ui/core";

/*
  Helper function for displaying the difference between dates.
*/
export const timeSinceDate = (pastDate: number): string => {
  const currentTime = new Date();
  let timeDiff = millisecondsToSeconds(currentTime.getTime() - pastDate);

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

/*
  Helper Function for adding list elements
  when their is a difference between chat
  message dates.
*/
export const addTimeElement = (
  lastDate: { date: Date },
  lastHour: { hour: number },
  currentDate: Date,
  output: JSX.Element[]
) => {
  if (lastDate.date.toDateString() !== currentDate.toDateString()) {
    lastDate.date = currentDate;
    output.push(
      <ListItem key={`date-${currentDate.getTime()}`}>
        <Grid container justifyContent="center">
          <Typography variant="subtitle2">
            {currentDate.toDateString()}
          </Typography>
        </Grid>
      </ListItem>
    );
  }

  if (lastHour.hour !== currentDate.getHours()) {
    lastHour.hour = currentDate.getHours();
    output.push(
      <ListItem key={`hour-${currentDate.getTime()}`}>
        <Grid container justifyContent="center">
          <Typography variant="subtitle2">
            {currentDate.toLocaleTimeString()}
          </Typography>
        </Grid>
      </ListItem>
    );
  }
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
