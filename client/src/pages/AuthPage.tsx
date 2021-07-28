import { Redirect, Route, Switch } from "react-router-dom";
import { StoreState } from "../reducers";
import LoginCard from "../components/LoginCard";
import SignUpCard from "../components/SignUpCard";
import TopNav from "../components/TopNav";
import { connect } from "react-redux";

interface AuthPageProps {
  isAuth: boolean;
}

const _AuthPage = (props: AuthPageProps): JSX.Element => {
  if (props.isAuth) {
    return <Redirect to="/chats" />;
  }

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

const mapStateToProps = ({ isAuth }: StoreState): { isAuth: boolean } => {
  return { isAuth };
};

const AuthPage = connect(mapStateToProps)(_AuthPage);

export default AuthPage;
