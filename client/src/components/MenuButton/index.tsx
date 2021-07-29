import * as React from "react";
import {
  Box,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  IconButton,
  Typography,
  Tooltip,
} from "@material-ui/core";
import ControlPointIcon from "@material-ui/icons/ControlPoint";
import { Logout } from "@material-ui/icons";
import { connect } from "react-redux";
import { StoreState } from "../../reducers";
import { User, unAuthorizeUser } from "../../actions";
import setAuthToken from "../../util/setAuthToken";
import { Link } from "react-router-dom";

interface MenuProps {
  unAuthorizeUser: typeof unAuthorizeUser;
  user: User;
}

const _MenuButton = (props: MenuProps): JSX.Element => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    setAuthToken(null);
    props.unAuthorizeUser();
  };

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account Menu">
          <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
            <Avatar
              src={props.user.imageUrl}
              alt={props.user.userName}
              sx={{ width: 32, height: 32 }}
            ></Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <Link
            to="/chats"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <ListItemIcon>
              <ControlPointIcon fontSize="small" />
            </ListItemIcon>
            Add More Chats
          </Link>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

const mapStateToProps = ({ user }: StoreState): { user: User } => {
  return { user };
};

const MenuButton = connect(mapStateToProps, {
  unAuthorizeUser,
})(_MenuButton);

export default MenuButton;
