import { useState, useEffect } from "react";
import { Chat, fetchChat, Message } from "../../actions";
import { addTimeElement } from "../../util/time";
import { useRouteMatch } from "react-router-dom";
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

interface URLParams {
  id?: string;
}

interface MessageListProps {
  fetchChat: typeof fetchChat;
  chat: Chat;
}

const _MessageList = (props: MessageListProps): JSX.Element => {
  const params: URLParams = useRouteMatch<URLParams>().params;

  useEffect(() => {
    if (params.id && parseInt(params.id) !== props.chat.id) {
      props.fetchChat(parseInt(params.id));
    }
  }, [params.id]);

  const renderMessages = (): JSX.Element[] => {
    let lastDate = { date: new Date(2000, 10) };
    let lastHour = { hour: lastDate.date.getHours() };
    let output: JSX.Element[] = [];

    props.chat.messages.forEach((message: Message) => {
      addTimeElement(lastDate, lastHour, message.createdAt, output);
      output.push(
        <ListItem
          key={message.id}
          sx={{
            p: 1,
            justifyContent: message.authorId === 1 ? "flex-end" : "flex-start",
          }}
        >
          <Grid
            container
            direction={message.authorId === 1 ? "row-reverse" : "row"}
          >
            <Tooltip title={message.author} arrow>
              <Avatar alt={message.author} src={message.authorImageUrl} />
            </Tooltip>
            <Tooltip
              arrow
              placement={message.authorId === 1 ? "left" : "right"}
              title={message.createdAt.toLocaleTimeString()}
            >
              <Card sx={{ maxWidth: 250, marginX: 1 }} elevation={4}>
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

  return <List>{renderMessages()}</List>;
};

const mapStateToProps = ({ chat }: StoreState): { chat: Chat } => {
  return { chat };
};

const MessageList = connect(mapStateToProps, {
  fetchChat,
})(_MessageList);

export default MessageList;
