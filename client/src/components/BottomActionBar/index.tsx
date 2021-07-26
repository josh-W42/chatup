import {
  Paper,
  TextField,
  Button,
  Grid,
  useTheme,
  Input,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import React, { useState } from "react";
import { Message } from "../../actions";
import { calculateWidth } from "./styles";

interface ActionBarState {
  content: string;
  sentGraphic: boolean;
  graphicUrls: string[];
}

interface ActionBarProps {
  isDrawerOpen: boolean;
}

const BottomActionBar = (props: ActionBarProps) => {
  const [values, setValues] = useState<ActionBarState>({
    content: "",
    sentGraphic: false,
    graphicUrls: [],
  });
  const theme = useTheme();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newMessage: Message = {
      id: Math.floor(Math.random() * 100),
      content: values.content,
      author: "Jersh Wilison",
      authorId: Math.floor(Math.random() * 3),
      authorImageUrl: "https://picsum.photos/200",
      sentGraphic: values.sentGraphic,
      graphicUrls: values.graphicUrls,
      createdAt: new Date(),
    };
  };

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
      <form onSubmit={handleSubmit}>
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
              <Input
                sx={{
                  color: "inherit",
                  cursor: "pointer",
                }}
                disableUnderline={true}
                type="submit"
                value="SEND"
              />
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default BottomActionBar;
