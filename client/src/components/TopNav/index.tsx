import { Box, AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const TopNav = (): JSX.Element => {
  return (
    <Box sx={{ flexGrow: 1, marginBottom: 5 }}>
      <AppBar position="static">
        <Toolbar>
          <Link
            to="/"
            style={{ color: "inherit", textDecoration: "none", flexGrow: 1 }}
          >
            <Typography variant="h6" component="div">
              ChatUp
            </Typography>
          </Link>
          <Link
            to="/auth/login"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <Button color="inherit">Login</Button>
          </Link>
          <Link
            to="/auth/signup"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <Button color="inherit">SignUp</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default TopNav;
