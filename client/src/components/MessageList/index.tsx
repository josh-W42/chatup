import { useState } from "react";
import { List, ListItem } from "@material-ui/core";

const MessageList = (): JSX.Element => {
  const [fakeMessages, setFakeMessages] = useState([]);

  const renderMessages = (): JSX.Element[] =>
    fakeMessages.map((message) => {
      return <ListItem></ListItem>;
    });

  return <List></List>;
};

export default MessageList;
