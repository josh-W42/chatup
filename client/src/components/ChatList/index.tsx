import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { StyledBadge } from "./styles";
import { ChatPartial } from "../../actions";
import { StoreState } from "../../reducers";
import { connect } from "react-redux";
import { timeSinceDate } from "../../util/time";

interface ChatListProps {
  chatPartials: ChatPartial[];
}

const _ChatList = (props: ChatListProps): JSX.Element => {
  const renderChats = (): JSX.Element[] =>
    props.chatPartials.map((chat: ChatPartial) => {
      return (
        <ListItem button key={chat.id} sx={{ overflow: "revert" }}>
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
              {timeSinceDate(chat.lastUpdated)}
            </Typography>
          </Grid>
          <Grid container direction="row" justifyContent="space-between">
            <div></div>
          </Grid>
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
