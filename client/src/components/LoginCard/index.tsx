import { useState } from "react";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

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
