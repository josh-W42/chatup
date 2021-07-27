import { useState } from "react";
import { DrawerHeader, AppBar, Drawer } from "./styles";
import ChatList from "../ChatList";
import { StoreState } from "../../reducers";
import { connect } from "react-redux";
import { openNewChat, closeNewChat, Chat, User } from "../../actions";
import { Route, Switch } from "react-router-dom";
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
import BottomActionBar from "../BottomActionBar";
import { useEffect } from "react";

interface DrawerProps {
  newChatOpen: boolean;
  openNewChat: typeof openNewChat;
  closeNewChat: typeof closeNewChat;
  chat: Chat;
  user: User;
}

const _ChatDrawer = (props: DrawerProps): JSX.Element => {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [chatUpdated, setChatUpdated] = useState(false);

  useEffect(() => {
    if (chatUpdated) {
      setChatUpdated(false);
    }
  }, [chatUpdated]);

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
            {props.chat.name}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Avatar alt={props.user.username} src={props.user.imageUrl} />
          <Typography>{props.user.username}</Typography>
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
      <Box component="main" sx={{ width: "100%" }}>
        <DrawerHeader />
        <Switch>
          <Route path="/chats/:id">
            <MessageList />
            <BottomActionBar chatUpdated={setChatUpdated} isDrawerOpen={open} />
          </Route>
        </Switch>
        <DrawerHeader />
      </Box>
    </Box>
  );
};

const mapStateToProps = ({
  newChatOpen,
  chat,
  user,
}: StoreState): { newChatOpen: boolean; chat: Chat; user: User } => {
  return { newChatOpen, chat, user };
};

const ChatDrawer = connect(mapStateToProps, { openNewChat, closeNewChat })(
  _ChatDrawer
);

export default ChatDrawer;
