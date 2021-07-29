import { StyledBadge } from "./styles";
import { ChatPartial, User } from "../../actions";
import { StoreState } from "../../reducers";
import { connect } from "react-redux";
import { timeSinceDate } from "../../util/time";
import { Link } from "react-router-dom";
import { ListItem, List, Avatar, Typography, Grid } from "@material-ui/core";

interface ChatListProps {
  user: User;
}

const _ChatList = (props: ChatListProps): JSX.Element => {
  const renderChats = (): JSX.Element[] => {
    return props.user.chats.map((chat: ChatPartial) => {
      return (
        <Link
          style={{ color: "inherit", textDecoration: "none" }}
          to={`/chats/${chat.id}`}
        >
          <ListItem
            button
            key={chat.id}
            tabIndex={-1}
            sx={{ overflow: "revert" }}
          >
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar alt={chat.name} src={chat.imageUrl} />
            </StyledBadge>
            <Grid sx={{ marginLeft: 3 }} container direction="column">
              <Typography variant="h6" component="span">
                {chat.name}
              </Typography>
              <Typography variant="caption" component="span">
                {timeSinceDate(new Date(chat.lastUpdated))}
              </Typography>
            </Grid>
          </ListItem>
        </Link>
      );
    });
  };

  return <List>{renderChats()}</List>;
};

const mapStateToProps = ({ user }: StoreState): { user: User } => {
  return { user };
};

const ChatList = connect(mapStateToProps)(_ChatList);

export default ChatList;
