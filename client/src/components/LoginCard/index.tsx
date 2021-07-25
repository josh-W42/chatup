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

interface LoginState {
  userName: string;
  password: string;
  showPassword: boolean;
}

const LoginCard = (): JSX.Element => {
  const [values, setValues] = useState<LoginState>({
    userName: "",
    password: "",
    showPassword: false,
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

  return (
    <Box>
      <Grid container justifyContent="center">
        <Grid item xs={6} md={4}>
          <Card elevation={4} sx={{ maxWidth: 600, minWidth: 100 }}>
            <CardContent>
              <h2>Login</h2>
              <FormControl sx={{ m: 2, width: "80%" }} variant="standard">
                <InputLabel htmlFor="userName">Username</InputLabel>
                <Input
                  id="userName"
                  type="text"
                  value={values.userName}
                  onChange={handleChange("userName")}
                />
              </FormControl>
              <FormControl sx={{ m: 2, width: "80%" }} variant="standard">
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  id="password"
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
                <Button color="primary" size="large" variant="contained">
                  Login
                </Button>
                <Button variant="text">Need An Account?</Button>
              </Grid>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoginCard;
