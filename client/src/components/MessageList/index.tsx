import { useState } from "react";
import { Message } from "../../actions";
import { addTimeElement } from "../../util/time";
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

const MessageList = (): JSX.Element => {
  const [fakeMessages, setFakeMessages] = useState([
    {
      id: Math.floor(Math.random() * 100),
      author: "James",
      authorImageUrl: "broken",
      authorId: Math.floor(Math.random() * 100),
      content: "Hey this is a new post",
      sentGraphic: false,
      createdAt: new Date(),
    },
    {
      id: Math.floor(Math.random() * 100),
      author: "James",
      authorImageUrl: "broken",
      authorId: Math.floor(Math.random() * 100),
      content: "Hey this is a new post",
      sentGraphic: false,
      createdAt: new Date(),
    },
    {
      id: Math.floor(Math.random() * 100),
      author: "James",
      authorImageUrl: "broken",
      authorId: Math.floor(Math.random() * 100),
      content: "Hey this is a new post",
      sentGraphic: false,
      createdAt: new Date(),
    },
    {
      id: Math.floor(Math.random() * 100),
      author: "James",
      authorImageUrl: "broken",
      authorId: Math.floor(Math.random() * 100),
      content: "Hey this is a new post",
      sentGraphic: false,
      createdAt: new Date(),
    },
    {
      id: Math.floor(Math.random() * 100),
      author: "James",
      authorImageUrl: "broken",
      authorId: Math.floor(Math.random() * 100),
      content: "Hey this is a new post",
      sentGraphic: false,
      createdAt: new Date(),
    },
    {
      id: Math.floor(Math.random() * 100),
      author: "James",
      authorImageUrl: "broken",
      authorId: 1,
      content:
        "Hey this is a new post and I w Hey this is a new post and I w Hey this is a new post and I w Hey this is a new post and I w",
      sentGraphic: false,
      createdAt: new Date(),
    },
    {
      id: Math.floor(Math.random() * 100),
      author: "James",
      authorImageUrl: "broken",
      authorId: Math.floor(Math.random() * 100),
      content: "Hey this is a new post",
      sentGraphic: false,
      createdAt: new Date(),
    },
    {
      id: Math.floor(Math.random() * 100),
      author: "James",
      authorImageUrl: "broken",
      authorId: Math.floor(Math.random() * 100),
      content: "Hey this is a new post",
      sentGraphic: false,
      createdAt: new Date(),
    },
    {
      id: Math.floor(Math.random() * 100),
      author: "James",
      authorImageUrl: "broken",
      authorId: 1,
      content: "Hey this is a new post",
      sentGraphic: false,
      createdAt: new Date(),
    },
    {
      id: Math.floor(Math.random() * 100),
      author: "James",
      authorImageUrl: "broken",
      authorId: Math.floor(Math.random() * 100),
      content: "Hey this is a new post",
      sentGraphic: false,
      createdAt: new Date(),
    },
    {
      id: Math.floor(Math.random() * 100),
      author: "James",
      authorImageUrl: "broken",
      authorId: Math.floor(Math.random() * 100),
      content: "Hey this is a new post",
      sentGraphic: false,
      createdAt: new Date(),
    },
    {
      id: Math.floor(Math.random() * 100),
      author: "James",
      authorImageUrl: "broken",
      authorId: Math.floor(Math.random() * 100),
      content:
        "Hey this is a new post and I w Hey this is a new post and I w Hey this is a new post and I w Hey this is a new post and I w",
      sentGraphic: false,
      createdAt: new Date(),
    },
  ]);

  const renderMessages = (): JSX.Element[] => {
    let lastDate = { date: new Date(2000, 10) };
    let lastHour = { hour: lastDate.date.getHours() };
    let output: JSX.Element[] = [];

    for (let message of fakeMessages) {
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
    }
    return output;
  };

  return <List>{renderMessages()}</List>;
};

export default MessageList;
