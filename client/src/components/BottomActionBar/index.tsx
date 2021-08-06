import {
  Paper,
  TextField,
  Button,
  Grid,
  useTheme,
  Input,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import React, { SetStateAction, useState } from "react";
import { connect } from "react-redux";
import {
  Chat,
  Message,
  addMessage,
  User,
  NewContentPayload,
} from "../../actions";
import { MessagePayload, postMessage } from "../../adapters";
import { StoreState } from "../../reducers";
import { emitSocketEvent } from "../SocketAdapter";
import { calculateWidth } from "./styles";

interface ActionBarState {
  content: string;
  sentGraphic: boolean;
  graphicUrls: string[];
}

interface ActionBarProps {
  isDrawerOpen: boolean;
  addMessage: typeof addMessage;
  chatUpdated: React.Dispatch<SetStateAction<boolean>>;
  chat: Chat;
  user: User;
}

const _BottomActionBar = (props: ActionBarProps) => {
  const [values, setValues] = useState<ActionBarState>({
    content: "",
    sentGraphic: false,
    graphicUrls: [],
  });

  const handleChange =
    (prop: keyof ActionBarState) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const theme = useTheme();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.code === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (values.sentGraphic || values.content !== "") {
      const newMessage: MessagePayload = {
        chatId: props.chat.id,
        content: values.content,
        sentGraphic: values.sentGraphic,
      };
      postMessage(newMessage, onPostError, onPostSuccess);
      reset();
    }
  };

  const onPostError = () => {
    // trigger warning notification
  };

  const onPostSuccess = (newMessage: Message) => {
    props.addMessage(newMessage, props.chat.id);
    const payload: NewContentPayload = {
      message: newMessage,
      chatId: props.chat.id,
    };
    emitSocketEvent("new message", payload);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage();
  };

  const reset = () => {
    setValues({
      content: "",
      sentGraphic: false,
      graphicUrls: [],
    });
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
            onKeyDown={handleKeyDown}
          />
          <Grid item>
            <Button
              tabIndex={-1}
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

const mapStateToProps = ({
  chat,
  user,
}: StoreState): { chat: Chat; user: User } => {
  return { chat, user };
};

const BottomActionBar = connect(mapStateToProps, {
  addMessage,
})(_BottomActionBar);

export default BottomActionBar;
