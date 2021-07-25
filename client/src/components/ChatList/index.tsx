import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { StyledBadge } from "./styles";
import { useState } from "react";
import { ChatPartial } from "../../actions";
import { StoreState } from "../../reducers";
import { connect } from "react-redux";
import { useEffect } from "react";

interface ChatListProps {
  chatPartials: ChatPartial[];
}

const _ChatList = (props: ChatListProps): JSX.Element => {
  useEffect(() => {
    console.log(props);
  }, [props.chatPartials]);

  const renderChats = (): JSX.Element[] =>
    props.chatPartials.map((chat: ChatPartial) => {
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

const mapStateToProps = ({
  chatPartials,
}: StoreState): { chatPartials: ChatPartial[] } => {
  return { chatPartials };
};

const ChatList = connect(mapStateToProps)(_ChatList);

export default ChatList;
