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
  InputBase,
} from "@material-ui/core";
import { Link } from "react-router-dom";

interface SignUpState {
  userName: string;
  password: string;
  confirmPassword: string;
  showPassword: boolean;
  imageUrl: string;
}

const SignUpCard = (): JSX.Element => {
  const [values, setValues] = useState<SignUpState>({
    userName: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    imageUrl: "",
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

  const reset = () => {
    setValues({
      userName: "",
      password: "",
      confirmPassword: "",
      showPassword: false,
      imageUrl: "",
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // const newChat: ChatPartial = {
    //   id: Math.floor(Math.random() * 100),
    //   name: values.name,
    //   imageUrl: values.imageUrl,
    //   lastUpdated: new Date(),
    // };

    // props.addChatPartial(newChat);
    // props.closeNewChat();
    // reset();
  };

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
                <FormControl sx={{ m: 2, width: "90%" }} variant="standard">
                  <InputLabel htmlFor="confirmPassword">
                    Confirm Password
                  </InputLabel>
                  <Input
                    id="confirmPassword"
                    type={values.showPassword ? "text" : "password"}
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
                        id="chatImage"
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
                      color="primary"
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

export default SignUpCard;
