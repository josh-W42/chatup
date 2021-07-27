import { Redirect, Route, Switch } from "react-router-dom";
import { User } from "../actions";
import { StoreState } from "../reducers";
import LoginCard from "../components/LoginCard";
import SignUpCard from "../components/SignUpCard";
import TopNav from "../components/TopNav";
import { connect } from "react-redux";
import { AnonymousUser } from "../util/EmptyModels";

interface AuthPageProps {
  user: User;
}

const _AuthPage = (props: AuthPageProps): JSX.Element => {
  if (props.user.id !== AnonymousUser.id) {
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

const mapStateToProps = ({ user }: StoreState): { user: User } => {
  return { user };
};

const AuthPage = connect(mapStateToProps)(_AuthPage);

export default AuthPage;
