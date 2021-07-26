import { useState } from "react";
import { DrawerHeader, AppBar, Drawer } from "./styles";
import ChatList from "../ChatList";
import { StoreState } from "../../reducers";
import { connect } from "react-redux";
import { openNewChat, closeNewChat } from "../../actions";
import {
  Route,
  Switch,
  useParams,
  useRouteMatch,
  useLocation,
} from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import {
  Box,
  Toolbar,
  Typography,
  Divider,
  IconButton,
  Avatar,
  Button,
  useTheme,
} from "@material-ui/core";
import MessageList from "../MessageList";

interface DrawerProps {
  newChatOpen: boolean;
  openNewChat: typeof openNewChat;
  closeNewChat: typeof closeNewChat;
}

const _ChatDrawer = (props: DrawerProps): JSX.Element => {
  const theme = useTheme();
  const [open, setOpen] = useState(true);

  const handleDrawerTrigger = () => {
    setOpen((prev) => !prev);
  };

  const handleNewChatClick = () => {
    props.openNewChat();
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerTrigger}
            edge="start"
            sx={{
              marginRight: "40px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="h2">
            Chat Name Here
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
          <Typography>UserName</Typography>
          <IconButton onClick={handleDrawerTrigger}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>

        <Button
          sx={{ fontSize: ".75rem", marginY: 1 }}
          size="large"
          variant="contained"
          color="primary"
          onClick={handleNewChatClick}
        >
          New Chat
        </Button>
        <ChatList />
        <Divider />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <DrawerHeader />
        <Switch>
          <Route path="/chats/:id">
            <MessageList />
          </Route>
        </Switch>
      </Box>
    </Box>
  );
};

const mapStateToProps = ({
  newChatOpen,
}: StoreState): { newChatOpen: boolean } => {
  return { newChatOpen };
};

const ChatDrawer = connect(mapStateToProps, { openNewChat, closeNewChat })(
  _ChatDrawer
);

export default ChatDrawer;
