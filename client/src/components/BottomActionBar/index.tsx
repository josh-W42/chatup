import { Paper, TextField, Button } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import React, { useState } from "react";

interface ActionBarState {
  content: string;
}

const BottomActionBar = () => {
  const [values, setValues] = useState<ActionBarState>({
    content: "",
  });

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
        width: "100%",
      }}
      elevation={3}
    >
      <TextField
        sx={{ width: "55%" }}
        autoFocus
        variant="outlined"
        value={values.content}
        onChange={handleChange("content")}
        multiline
        label="Start Typing"
      />
      <Button
        sx={{
          height: "60px",
        }}
        variant="contained"
        endIcon={<SendIcon />}
      >
        Send
      </Button>
    </Paper>
  );
};

export default BottomActionBar;
