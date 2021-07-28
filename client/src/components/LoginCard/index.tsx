import { useState } from "react";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import {
  Box,
  Grid,
  Card,
  CardActions,
  CardContent,
  Button,
  Input,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import { Credentials, loginUser, authorizeUser } from "../../actions";
import { StoreState } from "../../reducers";
import { connect } from "react-redux";

interface LoginState {
  userName: string;
  password: string;
  showPassword: boolean;
  redirect: boolean;
}

interface LoginCardProps {
  isAuth: boolean;
  loginUser: Function;
  authorizeUser: typeof authorizeUser;
}

const _LoginCard = (props: LoginCardProps): JSX.Element => {
  const [values, setValues] = useState<LoginState>({
    userName: "",
    password: "",
    showPassword: false,
    redirect: false,
  });

  const handleChange =
    (prop: keyof LoginState) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const userCredentials: Credentials = {
      userName: values.userName,
      passWord: values.password,
    };

    props.loginUser(userCredentials, onLoginSuccess);
    redirect();
  };

  const onLoginSuccess = (): void => {
    props.authorizeUser();
  };

  const redirect = () => {
    setValues({
      userName: "",
      showPassword: false,
      password: "",
      redirect: true,
    });
  };

  if (values.redirect) {
    return <Redirect to="/chats" />;
  }

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={6} md={5}>
            <Card elevation={4} sx={{ maxWidth: 600, minWidth: 100 }}>
              <CardContent>
                <h2>Login</h2>
                <FormControl sx={{ m: 2, width: "90%" }} variant="standard">
                  <InputLabel htmlFor="userName">Username</InputLabel>
                  <Input
                    required
                    aria-required
                    id="userName"
                    type="text"
                    value={values.userName}
                    onChange={handleChange("userName")}
                  />
                </FormControl>
                <FormControl sx={{ m: 2, width: "90%" }} variant="standard">
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input
                    id="password"
                    required
                    aria-required
                    type={values.showPassword ? "text" : "password"}
                    value={values.password}
                    onChange={handleChange("password")}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton onClick={handleShowPassword}>
                          {values.showPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </CardContent>
              <CardActions>
                <Grid container justifyContent="space-around">
                  <Button
                    tabIndex={-1}
                    fullWidth
                    sx={{ marginX: 2 }}
                    color="primary"
                    size="large"
                    variant="contained"
                  >
                    <Input
                      sx={{
                        color: "inherit",
                        cursor: "pointer",
                      }}
                      fullWidth
                      color="primary"
                      size="medium"
                      disableUnderline={true}
                      type="submit"
                      value="LOGIN"
                    />
                  </Button>
                  <Link
                    to="/auth/signup"
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    <Button tabIndex={-1} sx={{ marginY: 5 }} variant="text">
                      Need An Account?
                    </Button>
                  </Link>
                </Grid>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

const mapStateToProps = ({ isAuth }: StoreState): { isAuth: boolean } => {
  return { isAuth };
};

const LoginCard = connect(mapStateToProps, {
  loginUser,
  authorizeUser,
})(_LoginCard);

export default LoginCard;
