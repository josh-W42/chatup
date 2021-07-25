import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import { StyledBadge } from "./styles";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { useState } from "react";
import { ChatVisual } from "../../actions/chatVisual";

const ChatList = (): JSX.Element => {
  const [fakeChats, setFakeChats] = useState([]);

  const renderChats = (): JSX.Element[] =>
    fakeChats.map((chat: ChatVisual) => {
      return (
        <ListItem button key={chat.id}>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar alt={chat.name} src={chat.imageUrl} />
          </StyledBadge>
          <Typography sx={{ m: 2 }} variant="h6" component="p">
            {chat.name}
          </Typography>
        </ListItem>
      );
    });

  return <List>{renderChats()}</List>;
};

export default ChatList;
