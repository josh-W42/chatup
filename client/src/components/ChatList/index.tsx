import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import { StyledBadge } from "./styles";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

const ChatList = (): JSX.Element => {
  return (
    <List>
      <ListItem button>
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </StyledBadge>
        <Typography sx={{ m: 2 }} variant="h6" component="p">
          Chat Item 1
        </Typography>
      </ListItem>
      <ListItem button>
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
          invisible={true}
        >
          <Avatar alt="Sharp" src="/static/images/avatar/1.jpg" />
        </StyledBadge>
        <Typography sx={{ m: 2 }} variant="h6" component="p">
          Chat Item 1
        </Typography>
      </ListItem>
    </List>
  );
};

export default ChatList;
