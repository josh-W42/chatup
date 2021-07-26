import { Route, Switch } from "react-router-dom";
import LoginCard from "../components/LoginCard";
import SignUpCard from "../components/SignUpCard";
import TopNav from "../components/TopNav";

const AuthPage = (): JSX.Element => {
  return (
    <>
      <TopNav />
      <Switch>
        <Route path="/auth/login" component={LoginCard} />
        <Route path="/auth/signup" component={SignUpCard} />
      </Switch>
    </>
  );
};

export default AuthPage;
