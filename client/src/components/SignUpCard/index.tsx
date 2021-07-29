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
  Avatar,
  Typography,
} from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import { createUser, Credentials, authorizeUser } from "../../actions/";
import { StoreState } from "../../reducers";
import { connect } from "react-redux";

interface SignUpState {
  userName: string;
  passWord: string;
  confirmPassword: string;
  showPassword: boolean;
  imageUrl: string;
  redirect: boolean;
}

interface SignUpCardProps {
  createUser: Function;
  isAuth: boolean;
  authorizeUser: typeof authorizeUser;
}

const _SignUpCard = (props: SignUpCardProps): JSX.Element => {
  const [values, setValues] = useState<SignUpState>({
    userName: "",
    passWord: "",
    confirmPassword: "",
    showPassword: false,
    imageUrl: "",
    redirect: false,
  });

  const handleChange =
    (prop: keyof SignUpState) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      setValues({ ...values, imageUrl: URL.createObjectURL(fileList[0]) });
    }
  };

  const getImageUpload = (): Blob => {
    const inputEl: HTMLInputElement | null =
      document.querySelector("#profileImage");
    if (inputEl && inputEl.files) {
      return inputEl.files[0] as Blob;
    }
    return new Blob();
  };

  const redirect = () => {
    setValues({
      userName: "",
      passWord: "",
      confirmPassword: "",
      showPassword: false,
      imageUrl: "",
      redirect: true,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newUser: Credentials = {
      userName: values.userName,
      passWord: values.passWord,
    };

    if (values.imageUrl !== "") {
      props.createUser(
        newUser,
        onSignUpError,
        onSignUpSuccess,
        new FormData().append("imageUrl", getImageUpload())
      );
    } else {
      props.createUser(newUser, onSignUpError, onSignUpSuccess);
    }

    redirect();
  };

  const onSignUpError = (): void => {
    // trigger notification with warning message
  };

  const onSignUpSuccess = (): void => {
    props.authorizeUser();
  };

  if (values.redirect) {
    return <Redirect to="/chats" />;
  }

  return (
    <Box>
      <form id="signInForm" onSubmit={handleSubmit}>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={6} md={5}>
            <Card elevation={4} sx={{ maxWidth: 600, minWidth: 100 }}>
              <CardContent>
                <h2>Sign Up</h2>
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
                  <InputLabel htmlFor="passWord">Password</InputLabel>
                  <Input
                    id="passWord"
                    required
                    aria-required
                    type={values.showPassword ? "text" : "passWord"}
                    value={values.passWord}
                    onChange={handleChange("passWord")}
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
                <FormControl sx={{ m: 2, width: "90%" }} variant="standard">
                  <InputLabel htmlFor="confirmPassword">
                    Confirm Password
                  </InputLabel>
                  <Input
                    id="confirmPassword"
                    type={values.showPassword ? "text" : "passWord"}
                    value={values.confirmPassword}
                    required
                    aria-required
                    onChange={handleChange("confirmPassword")}
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
                <FormControl
                  sx={{ marginY: 5, width: "100%" }}
                  variant="standard"
                >
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-around"
                    alignItems="center"
                  >
                    <Grid item>
                      <Avatar
                        sx={{ width: 56, height: 56 }}
                        src={values.imageUrl}
                      />
                    </Grid>
                    <Grid item>
                      <Typography variant="h6" component="p">
                        Profile Picture
                      </Typography>
                      <input
                        onChange={handleImageUpload}
                        accept="image/*"
                        id="profileImage"
                        type="file"
                      />
                    </Grid>
                  </Grid>
                </FormControl>
              </CardContent>
              <CardActions>
                <Grid container justifyContent="space-around">
                  <Button
                    fullWidth
                    sx={{ marginX: 2 }}
                    color="primary"
                    size="large"
                    variant="contained"
                    tabIndex={-1}
                  >
                    <Input
                      sx={{
                        color: "inherit",
                        cursor: "pointer",
                      }}
                      fullWidth
                      size="medium"
                      disableUnderline={true}
                      type="submit"
                      value="SIGN UP"
                    />
                  </Button>
                  <Link
                    to="/auth/login"
                    style={{
                      color: "inherit",
                      textDecoration: "none",
                    }}
                  >
                    <Button tabIndex={-1} sx={{ marginY: 5 }} variant="text">
                      Already Have An Account?
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

const SignUpCard = connect(mapStateToProps, {
  createUser,
  authorizeUser,
})(_SignUpCard);

export default SignUpCard;
