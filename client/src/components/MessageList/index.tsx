import { useState } from "react";
import { Message } from "../../actions";
import {
  Avatar,
  List,
  ListItem,
  Card,
  CardContent,
  Typography,
  Grid,
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

  const renderMessages = (): JSX.Element[] =>
    fakeMessages.map((message: Message) => {
      return (
        <ListItem
          sx={{
            justifyContent: message.authorId === 1 ? "flex-end" : "flex-start",
          }}
        >
          <Grid
            container
            direction={message.authorId === 1 ? "row-reverse" : "row"}
          >
            <Avatar alt={message.author} src={message.authorImageUrl} />
            <Card sx={{ maxWidth: 275, marginX: 1 }} elevation={4}>
              <CardContent>
                <Typography variant="body2">{message.content}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </ListItem>
      );
    });

  return <List>{renderMessages()}</List>;
};

export default MessageList;
