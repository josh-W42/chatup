import { Paper, TextField, Button, Grid, useTheme } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import React, { useState } from "react";
import { calculateWidth } from "./styles";

interface ActionBarState {
  content: string;
}

interface ActionBarProps {
  isDrawerOpen: boolean;
}

const BottomActionBar = (props: ActionBarProps) => {
  const [values, setValues] = useState<ActionBarState>({
    content: "",
  });

  const theme = useTheme();

  console.log(theme);

  const handleChange =
    (prop: keyof ActionBarState) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        width: calculateWidth(props.isDrawerOpen, theme),
      }}
      elevation={3}
    >
      <Grid container justifyContent="flex-start">
        <TextField
          sx={{ flexGrow: 1 }}
          autoFocus
          variant="outlined"
          value={values.content}
          onChange={handleChange("content")}
          multiline
          label="Start Typing"
        />
        <Grid item>
          <Button
            sx={{
              height: "56px",
            }}
            variant="contained"
            endIcon={<SendIcon />}
          >
            Send
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default BottomActionBar;
