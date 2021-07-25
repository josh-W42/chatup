import { useState } from "react";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import { DrawerHeader, AppBar, Drawer } from "./styles";
import ChatList from "../ChatList";
import { StoreState } from "../../reducers";
import { connect } from "react-redux";
import { useEffect } from "react";
import { openNewChat, closeNewChat } from "../../actions";

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
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
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
