import { useEffect } from "react";
import { Chat, fetchChat, Message, User, joinChat } from "../../actions";
import { addTimeElement } from "../../util/time";
import { Redirect, useRouteMatch } from "react-router-dom";
import {
  Avatar,
  List,
  ListItem,
  Card,
  CardContent,
  Typography,
  Grid,
  Tooltip,
} from "@material-ui/core";
import { StoreState } from "../../reducers";
import { connect } from "react-redux";
import { useState } from "react";

interface URLParams {
  id?: string;
}

interface MessageListProps {
  fetchChat: Function;
  chat: Chat;
  user: User;
  joinChat: typeof joinChat;
}

const _MessageList = (props: MessageListProps): JSX.Element => {
  const [redirect, setRedirect] = useState(false);

  const params: URLParams = useRouteMatch<URLParams>().params;

  useEffect(() => {
    if (params.id && params.id !== props.chat.id) {
      props.fetchChat(params.id, onFetchError, onFetchSuccess);
    }
  }, [params.id]);

  useEffect(() => {
    /*
      TODO, update for real-time
    */
    const el = document.querySelector("#scrollTarget");
    if (el) {
      el.scrollIntoView();
    }
  }, [props.chat.messages.length]);

  const onFetchError = () => {
    // Trigger redirect and trigger warning notification
    setRedirect(true);
  };

  const onFetchSuccess = (id: string) => {
    props.joinChat(id);
  };

  const renderMessages = (): JSX.Element[] => {
    let lastDate = { date: new Date(2000, 10) };
    let lastHour = { hour: -1 };
    let output: JSX.Element[] = [];

    props.chat.messages.forEach((message: Message) => {
      addTimeElement(lastDate, lastHour, new Date(message.createdAt), output);
      output.push(
        <ListItem
          key={message.id}
          sx={{
            p: 1,
            justifyContent:
              message.authorId === props.user.id ? "flex-end" : "flex-start",
          }}
        >
          <Grid
            container
            direction={
              message.authorId === props.user.id ? "row-reverse" : "row"
            }
          >
            <Tooltip title={message.author} arrow>
              <Avatar alt={message.author} src={message.authorImageUrl} />
            </Tooltip>
            <Tooltip
              arrow
              placement={message.authorId === props.user.id ? "left" : "right"}
              title={new Date(message.createdAt).toLocaleTimeString()}
            >
              <Card
                sx={{ maxWidth: 250, marginX: 1, wordWrap: "break-word" }}
                elevation={4}
              >
                <CardContent>
                  <Typography variant="body2">{message.content}</Typography>
                </CardContent>
              </Card>
            </Tooltip>
          </Grid>
        </ListItem>
      );
    });
    return output;
  };

  if (redirect) {
    return <Redirect to="/chats" />;
  }

  return (
    <List>
      {renderMessages()}
      <div id="scrollTarget"></div>
    </List>
  );
};

const mapStateToProps = ({
  chat,
  user,
}: StoreState): { chat: Chat; user: User } => {
  return { chat, user };
};

const MessageList = connect(mapStateToProps, {
  fetchChat,
  joinChat,
})(_MessageList);

export default MessageList;
